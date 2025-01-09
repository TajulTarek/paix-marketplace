import React, { useState } from 'react';
import Navbar from './components/Navbar';
import loginBg from './assets/loginbg.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const toggleForm = () => {
        navigate('/register');
    };

    function routetohome() {
        navigate("/");
    }

    const [SignUpData, setSignUpData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp) {
            try {
                await fetch('http://localhost:3097/auth/signup', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(SignUpData),
                });
                toast.success('Sign up successful!');
                routetohome();
            } catch (error) {
                toast.error("Error during signup");
                console.log("Error during signup:", error);
            }
        } else {
            try {
                const { data } = await axios.post('http://localhost:8000/auth/login', {
                    email: SignUpData.email,
                    password: SignUpData.password,
                });

                // Assuming the response contains userId and isAdd
                
                const { _id, isAdd } = data.user;
                
                console.log(data.user)
                // Save userId and isAdd to local storage
                localStorage.setItem('userId', _id);
                localStorage.setItem('isAdd', isAdd);
                
                toast.success('Login successful!');
                setTimeout(() => routetohome(), 2000);
            } catch (error) {
                toast.error("Login failed. Please check your credentials.");
                console.log("Error during login:", error);
            }
        }
    };

    const handleChange = (e) => {
        setSignUpData({
            ...SignUpData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <ToastContainer />
            <div
                className="relative min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${loginBg})` }}
            >
                <Navbar />
                <div className="flex flex-1 flex-col justify-center px-6 py-20 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    className="mx-auto h-10 w-auto"
                                />
                                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    {isSignUp ? 'Sign up for an account' : 'Sign in to your account'}
                                </h2>
                            </div>

                            <div className="mt-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {isSignUp && (
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Fullname
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    value={SignUpData.name}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                value={SignUpData.email}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                            {!isSignUp && (
                                                <div className="text-sm">
                                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                        Forgot password?
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                autoComplete="current-password"
                                                value={SignUpData.password}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            {isSignUp ? 'Sign Up' : 'Sign In'}
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-6 text-center">
                                    {isSignUp ? (
                                        <p className="text-sm text-gray-600">
                                            Already have an account?{' '}
                                            <button
                                                onClick={toggleForm}
                                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                                            >
                                                Sign In
                                            </button>
                                        </p>
                                    ) : (
                                        <p className="text-sm text-gray-600">
                                            Didn't have an account?{' '}
                                            <button
                                                onClick={toggleForm}
                                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                                            >
                                                Sign Up
                                            </button>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;