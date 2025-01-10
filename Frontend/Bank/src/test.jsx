export default function CardCenterDashboard() {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-bold text-blue-700">doit</h1>
                </div>
                <nav className="px-4 space-y-2">
                    <a
                        href="#"
                        className="flex items-center text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="flex items-center text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        My Wallet
                    </a>
                    <a
                        href="#"
                        className="flex items-center text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        Transactions
                        <span className="ml-auto text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                            14
                        </span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        Invoices
                    </a>
                    <a
                        href="#"
                        className="flex items-center text-blue-700 px-4 py-2 bg-blue-100 rounded-md"
                    >
                        Card Center
                    </a>
                    <a
                        href="#"
                        className="flex items-center text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        Contacts
                    </a>
                    <a
                        href="#"
                        className="flex items-center text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        Messages
                        <span className="ml-auto text-xs bg-red-600 text-white px-2 py-1 rounded-full">
                            New
                        </span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        Settings
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Top Bar */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Card Center</h1>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-yellow-300 rounded-full"></div>
                            <p className="text-sm font-medium">Adam Jackson</p>
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-4 gap-6 mt-6">
                    {['blue', 'orange', 'purple', 'green'].map((color, index) => (
                        <div
                            key={index}
                            className={`bg-${color}-500 p-6 text-white rounded-xl`}
                        >
                            <h2 className="text-sm font-medium">Main Balance</h2>
                            <p className="text-2xl font-bold mt-2">$88,455.12</p>
                            <p className="text-xs mt-4">Valid Thru: 08/21</p>
                            <p className="text-xs">Card Holder: Adam Jackson</p>
                        </div>
                    ))}
                </div>

                {/* Wallet Balance and Other Cards */}
                <div className="grid grid-cols-2 gap-6 mt-6">
                    {/* Wallet Balance */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold">Wallet Balance</h2>
                        <p className="text-2xl font-bold text-blue-600 mt-4">$824,571.93</p>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                            <div className="h-full bg-blue-600 rounded-full w-3/4"></div>
                        </div>
                        <p className="text-sm mt-4">Valid Thru: 08/21</p>
                        <p className="text-sm">Card Holder: Adam Jackson</p>
                    </div>

                    {/* Other Cards */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold">Other Card List</h2>
                        <div className="mt-4 space-y-4">
                            {['Primary', 'Secondary', 'Secondary'].map(
                                (type, index) => (
                                    <div key={index} className="flex justify-between">
                                        <p>{type}</p>
                                        <p>See Number</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
