-- Tabel Nasabah
CREATE TABLE Nasabah (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(100) NOT NULL,
    alamat TEXT NOT NULL,
    telepon VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Tabel Akun
CREATE TABLE Akun (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    no_rekening VARCHAR(20) UNIQUE NOT NULL,
    jenis_akun VARCHAR(50) NOT NULL,
    saldo NUMERIC(15, 2) DEFAULT 0.00,
    nasabah_id UUID REFERENCES Nasabah(id) ON DELETE CASCADE
);

-- Tabel Transaksi
CREATE TABLE Transaksi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipe_transaksi VARCHAR(10) CHECK (tipe_transaksi IN ('kredit', 'debit')),
    jumlah NUMERIC(15, 2) NOT NULL,
    akun_id UUID REFERENCES Akun(id) ON DELETE CASCADE
);
-- CRUD NASABAH
-- Create NASABAH
INSERT INTO Nasabah (nama, alamat, telepon, email)
VALUES 
('John Doe', 'Jl. Merpati No.10', '081234567890', 'user@example.com'),
('Ikhsan', 'Jl. Riau No. 5', '08124567890', 'ikhsan@gmail.com'),
('Sarah Connor', 'Jl. Emas No. 7', '08129998888', 'sarah@gmail.com');

--Read NASABAH
SELECT * FROM Nasabah;

--Update NASABAH
UPDATE Nasabah
SET telepon = '081298765432', alamat = 'Jl. Baru No.123'
WHERE email = 'user@example.com';

--Delete Nasabah
DELETE FROM Nasabah WHERE id = 'UUID-OF-NASABAH';

--CRUD AKUN
--Create AKUN
INSERT INTO Akun (no_rekening, jenis_akun, saldo, nasabah_id)
VALUES 
('1234567890', 'tabungan', 1000000.00, (SELECT id FROM Nasabah WHERE email = 'user@example.com')),
('9876543210', 'giro', 2500000.00, (SELECT id FROM Nasabah WHERE email = 'ikhsan@gmail.com')),
('1357924680', 'tabungan', 1500000.00, (SELECT id FROM Nasabah WHERE email = 'sarah@gmail.com'));


--Read AKUN
SELECT * FROM Akun;

--Update AKUN
UPDATE Akun
SET saldo = 2000000.00, jenis_akun = 'tabungan premium'
WHERE no_rekening = '1234567890';

--Delete AKUN
DELETE FROM Akun WHERE no_rekening = '1234567890';

--CRUD Transaksi
--Create Transaksi
INSERT INTO Transaksi (tipe_transaksi, jumlah, akun_id)
VALUES 
('kredit', 500000.00, (SELECT id FROM Akun WHERE no_rekening = '1234567890')),
('debit', 200000.00, (SELECT id FROM Akun WHERE no_rekening = '9876543210')),
('kredit', 300000.00, (SELECT id FROM Akun WHERE no_rekening = '1357924680'));

--Read Transaksi
SELECT * FROM Transaksi;

--Update Transaksi
UPDATE Transaksi
SET jumlah = 600000.00, tipe_transaksi = 'debit'
WHERE id = (SELECT id FROM Transaksi WHERE akun_id = (SELECT id FROM Akun WHERE no_rekening = '1234567890') LIMIT 1);

--Delete Transaksi
DELETE FROM Transaksi WHERE id = '8467d9ae-7952-49fa-ba7c-c7106ed0593b';

--JOIN 
--Mengambil Data Nasabah dan Akun
SELECT n.nama, n.telepon, a.no_rekening, a.jenis_akun, a.saldo
FROM Nasabah n
JOIN Akun a ON n.id = a.nasabah_id;

--Mengambil Data Transaksi dengan Informasi Nasabah dan Akun
SELECT n.nama AS nama_nasabah, 
       a.no_rekening, 
       t.tanggal, 
       t.tipe_transaksi, 
       t.jumlah
FROM Transaksi t
JOIN Akun a ON t.akun_id = a.id
JOIN Nasabah n ON a.nasabah_id = n.id
ORDER BY t.tanggal DESC; -- Mengurutkan berdasarkan tanggal transaksi terbaru

