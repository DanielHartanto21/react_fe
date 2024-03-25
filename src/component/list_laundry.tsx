import { useNavigate, useParams } from 'react-router-dom';
import '../global.css';
import { useEffect, useState } from 'react';
interface Laundry {
    _id:string;
    jenis_layanan: string;
    deskripsi_item:string;
    jumlah:number;
    harga_per_item: number;
    status:string;
    // Add other properties as needed
   }
const ItemDetailPage :React.FC<{ token: string | null }> = ({ token })=>  {
    const navigate = useNavigate(); 
    const { id } = useParams(); // Extracts the ID from the URL
    const [data, setData] = useState<Laundry[]>([]); // State to store the fetched data

    useEffect(() => {
        const listingPelanggan = async () => {
            if (!token) {
                console.error('Token is not available');
                navigate("/");
                return; // Exit the function if the token is not available
            }
    
            try {
                const response = await fetch(`http://localhost:8080/api/laundry?id=${id}`, {
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
                if (Array.isArray(fetchedData.list_laundry)) {
                    setData(fetchedData.list_laundry); // Update the state with the fetched data
                } else {
                    console.error('Fetched data is not an array:', fetchedData);
                    setData([]);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
    
        listingPelanggan(); 
    }, [token, navigate]); 
    return (
        <center>
            <div className='login-wrapper'>
                <div className='login-container'>
                    <table >
                        <thead>
                            <tr>
                                <th>Layanan</th>
                                <th>Deskripsi</th>
                                <th>Jumlah</th>
                                <th>Harga </th>
                                <th>Status</th>
                                <th>ubah status</th>
                                <th>pembayaran</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.jenis_layanan}</td>
                                    <td>{item.deskripsi_item}</td>
                                    <td>{item.jumlah}</td>
                                    <td>{item.harga_per_item}</td>
                                    <td>{item.status}</td>
                                    <td><button onClick={() => navigate(`/status/${item._id}`)}>change status</button></td>
                                    <td><button onClick={() => navigate(`/pembayaran/${item._id}`)}>Lakukan Pembayaran</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => navigate('/')}>
                        back to dashboard
                    </button>
                    <button onClick={() => navigate('/listpelanggan')}>
                    back to list pelanggan
                    </button>
                </div>
            </div>
        </center>
    );
};

export default ItemDetailPage;
