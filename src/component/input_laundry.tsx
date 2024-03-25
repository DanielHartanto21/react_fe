import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../global.css';

interface Pelanggan {
 _id: string;
 nama: string;
 alamat: string;
 nomor_telepon: string;
 email: string;
}

const ListPelanggan: React.FC<{ token: string | null }> = ({ token }) => {
    const navigate = useNavigate();
    const [data, setData] = useState<Pelanggan[]>([]);
    const [selectedPelangganId, setSelectedPelangganId] = useState<string | null>(null);
    const [jenisLayanan, setJenisLayanan] = useState<string>('');
    const [deskripsiItem, setDeskripsiItem] = useState<string>('');
    const [jumlah, setJumlah] = useState<number>(0);
    const [hargaPerItem, setHargaPerItem] = useState<number>(0);
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        const listingPelanggan = async () => {
            if (!token) {
                console.error('Token is not available');
                navigate("/");
                return;
            }
    
            try {
                const response = await fetch(`http://localhost:8080/api/input_pelanggan`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
    
                const fetchedData = await response.json();
    
                if (Array.isArray(fetchedData.pelanggan)) {
                    setData(fetchedData.pelanggan);
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

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPelangganId(event.target.value);
    };

    const sendSelectedPelanggan = async () => {
        if (!selectedPelangganId) {
            console.error('No pelanggan selected');
            return;
        }

        // Example POST request
        try {
            const response = await fetch('http://localhost:8080/api/laundry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    pelanggan: selectedPelangganId,
                    jenis_layanan:jenisLayanan,
                    deskripsi_item:deskripsiItem,
                    jumlah:jumlah,
                    harga_per_item:hargaPerItem,
                    status:status,
                }),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to send data');
            }

            const result = await response.json();
            console.log('Data sent successfully:', result);
            navigate('/');
        } catch (error) {
            console.error('Failed to send data:', error);
        }
    };

    return (
        <center>
            <div className='login-wrapper'>
                <div className='login-container'>
                    <label htmlFor="nama">Select Name:</label><br />
                    <select name="nama" id="nama" onChange={handleSelectChange}>
                        <option value="">Nama Pelanggan</option>
                        {data.map((pelanggan) => (
                            <option key={pelanggan._id} value={pelanggan._id}>
                                {pelanggan.nama} - {pelanggan.nomor_telepon}
                            </option>
                        ))}
                    </select><br />
                    <label htmlFor="jenisLayanan">Jenis Layanan:</label><br />
                    <select name="jenisLayanan" id="jenisLayanan" onChange={(e) => setJenisLayanan(e.target.value)}>
                        <option value="">Select Jenis Layanan</option>
                        <option value="layanan1">Layanan 1</option>
                        <option value="layanan2">Layanan 2</option>
                        {/* Add more options as needed */}
                    </select><br />
                    <label htmlFor="deskripsiItem">Deskripsi Item:</label><br />
                    <input type="text" id="deskripsiItem" value={deskripsiItem} onChange={(e) => setDeskripsiItem(e.target.value)} /><br />
                    <label htmlFor="jumlah">Jumlah:</label><br />
                    <input type="number" id="jumlah" value={jumlah} onChange={(e) => setJumlah(Number(e.target.value))} /><br />
                    <label htmlFor="hargaPerItem">Harga Per Item:</label><br />
                    <input type="number" id="hargaPerItem" value={hargaPerItem} onChange={(e) => setHargaPerItem(Number(e.target.value))} /><br />
                    <label htmlFor="status">Status:</label><br />
                    <select name="jenisLayanan" id="status" onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select Status Layanan</option>
                        <option value="antri">antri</option>
                        <option value="proses">dalam proses</option>
                        <option value="selesai">selesai</option>
                    </select><br />
                    <button onClick={sendSelectedPelanggan}>
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

export default ListPelanggan;
