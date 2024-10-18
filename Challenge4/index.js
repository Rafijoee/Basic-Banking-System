const express = require('express');
const bodyParser = require('body-parser');
const {PrismaClient}  = require('@prisma/client');


const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/v1/users', async (req, res) => {
    const { email, name, identity_type, identity_number, address } = req.body;

    try {
        const user = await prisma.users.create({
            data: {
                email: email,
                name: name,
                password : "password",
                profiles: {
                    create: {
                        identity_type: identity_type,
                        identity_number: identity_number,
                        address: address,
                    }
                }
            },
            include: {
                Profile: true, // Mengembalikan data profil juga
            }
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint lain yang relevan

// GET /api/v1/users: Mendapatkan daftar semua user beserta profilnya
app.get('/api/v1/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                Profile: true,
            },
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data user' });
    }
});

// GET /api/v1/users/:id: Mendapatkan detail user berdasarkan ID
app.get('/api/v1/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
            include: {
                Profile: true,
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data user' });
    }
});

// PUT /api/v1/users/:id: Mengupdate user berdasarkan ID
app.put('/api/v1/users/:id', async (req, res) => {
    const { id } = req.params;
    const { email, name, identity_type, identity_number, address } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                email: email,
                name: name,
                Profile: {
                    update: {
                        identity_type: identity_type,
                        identity_number: identity_number,
                        address: address,
                    }
                }
            },
            include: {
                Profile: true,
            }
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate user' });
    }
});

// DELETE /api/v1/users/:id: Menghapus user berdasarkan ID
app.delete('/api/v1/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: id },
        });
        res.status(200).json({ message: 'User berhasil dihapus', user: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menghapus user' });
    }
});


app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));