import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    age: '',
    gender: 'Male',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/signup', formData);
//       alert('Signup successful!');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
//       <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {['name', 'phone', 'email', 'address', 'age', 'password', 'confirmPassword'].map((field) => (
//         <div className="mb-4" key={field}>
//           <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//           <input
//             type={field === 'age' ? 'number' : 'text'}
//             name={field}
//             value={formData[field]}
//             onChange={handleChange}
//             className="w-full mt-1 p-2 border rounded-lg"
//             placeholder={`Enter your ${field}`}
//             required={field !== 'address'}
//           />
//         </div>
//       ))}
//       <div className="mb-4">
//         <label className="block text-gray-700">Gender</label>
//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           className="w-full mt-1 p-2 border rounded-lg"
//         >
//           <option>Male</option>
//           <option>Female</option>
//           <option>Other</option>
//         </select>
//       </div>
//       <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
//         Signup
//       </button>
//     </form>
//   );
// };

// export default SignupForm;






const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      if (response.data.success) {
        alert('Signup successful! Redirecting to login...');
        navigate('/login'); // Redirect to the login page
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        {/* Add inputs for phoneNumber, email, address, age, gender */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;





