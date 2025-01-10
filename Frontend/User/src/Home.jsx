import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Productlist from './components/Productlist';
import Footer from './components/Footer';
import BankAccountDialog from './components/BankAccountDialog';

function Home() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        // Retrieve the isAdd value from local storage
        const isAdd = localStorage.getItem('isAdd') === 'true'; // Convert to boolean

        const userId = localStorage.getItem('userId');        // Open the dialog if isAdd is false, indicating it's the first login
        console.log(userId)
        if (!isAdd) {
            setIsDialogOpen(true);
        }
    }, []);

    const handleDialogClose = () => {
        setIsDialogOpen(false);

        // Optionally update local storage to reflect the user has completed the setup
        localStorage.setItem('isAdd', 'true');
    };

    return (
        <>
            <div className='bg-gray-100'>
                <Navbar />
                <Carousel />
                <Productlist />
                <Productlist />
                <Footer />
                {isDialogOpen && (
                    <BankAccountDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
                    )}
            </div>
        </>
    );
}

export default Home;
