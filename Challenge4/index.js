const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST /api/v1/users: Membuat user baru
app.post('/api/v1/users', async (req, res) => {
    const { email, name, identity_type, identity_number, address } = req.body;

    try {
        const user = await prisma.users.create({
            data: {
                email: email,
                name: name,
                password: "password",
                profiles: {
                    create: {
                        identity_type: identity_type,
                        identity_number: identity_number,
                        address: address,
                    }
                }
            },
            include: {
                profiles: true,
            }
        });
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to create user",
            error: error.message
        });
    }
});

// GET /api/v1/users: Mendapatkan daftar user beserta profilnya
app.get('/api/v1/users', async (req, res) => {
    try {
        const users = await prisma.users.findMany({
            include: {
                profiles: true,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve users",
            error: error.message
        });
    }
});

// GET /api/v1/users/:id: Mendapatkan detail user berdasarkan ID
app.get('/api/v1/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.users.findUnique({
            where: { id: Number(id) },
            include: {
                profiles: true,
            }
        });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "User retrieved successfully",
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve user",
            error: error.message
        });
    }
});

// PUT /api/v1/users/:id: Mengupdate user berdasarkan ID
app.put('/api/v1/users/:id', async (req, res) => {
    const { id } = req.params;
    const { email, name, identity_type, identity_number, address } = req.body;

    try {
        const updatedUser = await prisma.users.update({
            where: { id: Number(id) },
            data: {
                email: email,
                name: name,
                profiles: {
                    update: {
                        identity_type: identity_type,
                        identity_number: identity_number,
                        address: address,
                    }
                }
            },
            include: {
                profiles: true,
            }
        });

        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to update user",
            error: error.message
        });
    }
});

// DELETE /api/v1/users/:id: Menghapus user berdasarkan ID
app.delete('/api/v1/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await prisma.users.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
            data: deletedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to delete user",
            error: error.message
        });
    }
});

// POST /api/v1/accounts: Membuat akun bank baru
app.post('/api/v1/accounts', async (req, res) => {
    const { bank_name, bank_account_number, user_id, balance } = req.body;
    try {
        const account = await prisma.bank_accounts.create({
            data: {
                bank_name: bank_name,
                bank_account_number: parseInt(bank_account_number),
                balance: parseInt(balance),
                users: {
                    connect: { id: parseInt(user_id) }
                }
            },
        });
        res.status(201).json({
            status: "success",
            message: "Bank account created successfully",
            data: account
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to create bank account",
            error: error.message
        });
    }
});

// GET /api/v1/accounts: Mendapatkan daftar akun bank
app.get('/api/v1/accounts', async (req, res) => {
    try {
        const accounts = await prisma.bank_accounts.findMany();
        res.status(200).json({
            status: "success",
            message: "Accounts retrieved successfully",
            data: accounts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve accounts",
            error: error.message
        });
    }
});

// GET /api/v1/accounts/:id: Mendapatkan detail akun bank berdasarkan ID
app.get('/api/v1/accounts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const account = await prisma.bank_accounts.findUnique({
            where: { id: Number(id) },
        });

        if (!account) {
            return res.status(404).json({
                status: "error",
                message: "Account not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Account retrieved successfully",
            data: account
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve account",
            error: error.message
        });
    }
});

// PUT /api/v1/accounts/:id: Mengupdate akun bank berdasarkan ID
app.put('/api/v1/accounts/:id', async (req, res) => {
    const { id } = req.params;
    const { bank_name, bank_account_number, user_id, balance } = req.body;

    try {
        const updatedAccount = await prisma.bank_accounts.update({
            where: { id: Number(id) },
            data: {
                bank_name: bank_name,
                bank_account_number: parseInt(bank_account_number),
                balance: parseInt(balance),
                user_id: parseInt(user_id),
            },
        });

        res.status(200).json({
            status: "success",
            message: "Account updated successfully",
            data: updatedAccount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to update account",
            error: error.message
        });
    }
});

// DELETE /api/v1/accounts/:id: Menghapus akun bank berdasarkan ID
app.delete('/api/v1/accounts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAccount = await prisma.bank_accounts.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({
            status: "success",
            message: "Account deleted successfully",
            data: deletedAccount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to delete account",
            error: error.message
        });
    }
});

// Jalankan server
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
