import React from 'react'
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
              method:"POST",
              headers:{
                "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
          });

          const data = await response.json();

          if(response.ok){
            alert("Signup Successful");
            navigate("/login");
          }
          else{
            alert(data.message);
          }
        } catch (error) {
          console.log(error);
          alert("Something went wrong!");
        }

        console.log(formData);
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-500 ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup