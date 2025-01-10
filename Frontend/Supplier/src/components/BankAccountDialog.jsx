import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BankAccountDialog = ({ isOpen, onClose }) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const userId = localStorage.getItem("userId")
        console.log(userId)
        const bankDetails = {
            account_number: accountNumber,
            secret_key: secretKey
        };

        try {
            const response = await fetch(`http://localhost:8000/bank/addDetails/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bankDetails),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accountNo', accountNumber);
                console.log("Banc Ac: "+accountNumber)
                toast.success('Bank details added successfully!');

                console.log('Response:', data);
            } else {
                const errorData = await response.json();
                toast.error(`Failed to add bank details: ${errorData.message || response.statusText}`);
                console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('Error adding bank details:', error);
            toast.error('Error adding bank details. Please try again.');
        }

        onClose(); // Close the dialog after submission
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '400px',
                width: '100%',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}>
                <h2 style={{ marginBottom: '16px', textAlign: 'center', fontSize: '20px' }}>Enter Bank Details</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '4px' }}>Account Number:</label>
                        <input
                            type='text'
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '4px' }}>Secret Key:</label>
                        <input
                            type='password'
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                        <button type='button' onClick={onClose} style={{
                            padding: '8px 16px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>
                            Cancel
                        </button>
                        <button type='submit' style={{
                            padding: '8px 16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BankAccountDialog;