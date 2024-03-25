import { useNavigate, useParams } from 'react-router-dom';
import '../global.css';
import {  useState } from 'react';



const ChangeStatus :React.FC<{ token: string | null }> = ({ token })=>  {
    const navigate = useNavigate(); 
    const { id } = useParams(); 
    const [status, setStatus] = useState<string>('');
    const sendStatus = async () => {

        try {
            const response = await fetch('http://localhost:8080/api/laundry', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    id:id,
                    status:status
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
                    <label htmlFor="jenisLayanan">Jenis Status:</label><br />
                    <select name="jenisLayanan" id="status" onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select Status Layanan</option>
                        <option value="antri">antri</option>
                        <option value="proses">dalam proses</option>
                        <option value="selesai">selesai</option>
                    </select>
                    <button onClick={sendStatus}>
                        simpan data
                    </button>
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
export default ChangeStatus;