import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../global.css';

// Define the data type
interface Pelanggan {
 _id:string;
 nama: string;
 alamat:string;
 nomor_telepon:string;
 email: string;
 // Add other properties as needed
}

const ListPelanggan: React.FC<{ token: string | null }> = ({ token }) => {
    const navigate = useNavigate();
    // Use the defined type for the state
    const [data, setData] = useState<Pelanggan[]>([]); // State to store the fetched data

    useEffect(() => {
        const listingPelanggan = async () => {
            if (!token) {
                console.error('Token is not available');
                navigate("/");
                return; // Exit the function if the token is not available
            }
    
            try {
                const response = await fetch(`http://localhost:8080/api/input_pelanggan`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`, // Use the token parameter directly
                    },
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
    
                const fetchedData = await response.json();
                console.log(fetchedData);
    
                // Check if fetchedData is an array before setting it to the state
                if (Array.isArray(fetchedData.pelanggan)) {
                    setData(fetchedData.pelanggan); // Update the state with the fetched data
                } else {
                    console.error('Fetched data is not an array:', fetchedData);
                    // Optionally, handle this case differently, e.g., set an empty array or show an error message
                    setData([]);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
    
        listingPelanggan(); // Call the function to fetch and update the data
    }, [token, navigate]); 
    return (
        <center>
            <div className='login-wrapper'>
                <div className='login-container'>
                    
                    <table >
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>Nomor Telepon</th>
                                <th>Email</th>
                                <th>List Pesanan</th>
                                <th>List Pembayan</th>
                                {/* Add more headers as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>{item.nomor_telepon}</td>
                                    <td>{item.email}</td>
                                    <td><button onClick={() => navigate(`/item/${item._id}`)}>List Laundryan</button></td>
                                    <td><button onClick={() => navigate(`/list_pembayaran/${item._id}`)}>List Pembayan</button></td>
                                    {/* Add more cells as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => navigate('/')}>
                        back to dashboard
                    </button>
                </div>
            </div>
        </center>
    );
};

export default ListPelanggan;
