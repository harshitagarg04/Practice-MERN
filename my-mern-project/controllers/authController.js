const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup Controller
exports.signup = async (req, res) => {
    const { name, phone, email, address, age, gender, password, confirmPassword } = req.body;
//checking how to commit
    // Validate password and confirm password
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password and Confirm Password must match." });
    }

    try {
        // Check for duplicate email or phone
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email or phone number." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const newUser = new User({ name, phone, email, address, age, gender, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later.", error });
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: "Invalid email " });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("checking is match", isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later.", error });
    }
};


//hvcbbcbvcxg