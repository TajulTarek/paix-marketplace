import { useState } from "react";

export default function Login() {
    const [accountNumber, setAccountNumber] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [showSecretKey, setShowSecretKey] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the login logic
        console.log('Login attempted with:', { accountNumber, secretKey });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center mb-2">Login to Your Account</h2>
                    <p className="text-center text-gray-600 mb-6">
                        Enter your account details to access your banking services
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                                Account Number
                            </label>
                            <input
                                id="accountNumber"
                                type="text"
                                placeholder="Enter your account number"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700">
                                Secret Key
                            </label>
                            <div className="relative">
                                <input
                                    id="secretKey"
                                    type={showSecretKey ? "text" : "password"}
                                    placeholder="Enter your secret key"
                                    value={secretKey}
                                    onChange={(e) => setSecretKey(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowSecretKey(!showSecretKey)}
                                >
                                    {showSecretKey ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                            Login Securely
                        </button>
                    </form>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Forgot account number?</a>
                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Forgot secret key?</a>
                </div>
            </div>
        </div>
    );
}

