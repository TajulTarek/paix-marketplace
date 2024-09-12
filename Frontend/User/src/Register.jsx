import React from 'react';
import Navbar from './components/Navbar';
import registerBg from './assets/loginbg.jpg';

function Register() {
    return (
        <>
            <div
                className="relative min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${registerBg})` }}
            >
                <Navbar />
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-4 px-8 shadow-lg rounded-lg sm:px-10">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    className="mx-auto h-8 w-auto"
                                />
                                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Create your account
                                </h2>
                            </div>

                            <div className="mt-4">
                                <form action="#" method="POST" className="space-y-6">
                                    {/* Full Name */}
                                    <div>
                                        <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                                            Full Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="fullname"
                                                name="fullname"
                                                type="text"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/* User Type Dropdown */}
                                    <div>
                                        <label htmlFor="usertype" className="block text-sm font-medium leading-6 text-gray-900">
                                            User Type
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="usertype"
                                                name="usertype"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            >
                                                <option value="User">User</option>
                                                <option value="Seller">Seller</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Register
                                        </button>
                                    </div>
                                </form>

                                <div className="relative mt-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-center space-x-4">
                                    <button
                                        type="button"
                                        className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        <img
                                            src="https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png"
                                            alt="Google"
                                            className="h-5 w-5 mr-2"
                                        />
                                        Google
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                            alt="Facebook"
                                            className="h-5 w-5 mr-2"
                                        />
                                        Facebook
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
