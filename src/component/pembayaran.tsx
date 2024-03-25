import React, { useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../global.css';

const Pembayaran: React.FC<{ token: string | null }> = ({ token }) => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [metodePembayaran, setPembayaran] = useState<string>('');
    const [totalPembayaran, setTotal] = useState<number>(0);

    const sendPembayaran = async () => {

        // Example POST request
        try {
            const response = await fetch('http://localhost:8080/api/pembayaran', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    id:id,
                    metode_pembayaran:metodePembayaran,
                    total_pembayaran:totalPembayaran,
                }),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to send data');
            }

            const result = await response.json();
            console.log('Data sent successfully:', result);
            navigate('/listpelanggan');
        } catch (error) {
            console.error('Failed to send data:', error);
        }
    };

    return (
        <center>
            <div className='login-wrapper'>
                <div className='login-container'>
                    
                    <label htmlFor="jenisLayanan">Jenis Layanan:</label><br />
                    <select name="jenisLayanan" id="jenisLayanan" onChange={(e) => setPembayaran(e.target.value)}>
                        <option value="">Select Jenis Pembayaran</option>
                        <option value="Cash">Cash</option>
                        <option value="Debit">Debit</option>
                        <option value="QRIS">QRIS</option>
                        {/* Add more options as needed */}
                    </select><br />
                    <label htmlFor="jumlah">Jumlah:</label><br />
                    <input type="number" id="jumlah" value={totalPembayaran} onChange={(e) => setTotal(Number(e.target.value))} />
                    <button onClick={sendPembayaran}>
                        simpan data
                    </button>
                    <button onClick={() => navigate('/')}>
                        back to dashboard
                    </button>
                </div>
            </div>
        </center>
    );
};

export default Pembayaran;
