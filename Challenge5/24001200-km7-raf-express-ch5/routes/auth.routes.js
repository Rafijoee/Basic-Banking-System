const express = require('express');
const router = express.Router();
const passport = require('../lib/passport');
const AuthController = require('../controllers/authControllers');
const userControllers = require('../controllers/userControllers');
const restrict = require('../middleware/restrict');
const AccountControllers = require('../controllers/accountControllers');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "password"
 *     responses:
 *       200:
 *         description: Login berhasil
 *       401:
 *         description: Kredensial tidak valid
 */
router.post('/login', AuthController.handleLogin);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Daftar pengguna baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               password:
 *                 type: string
 *                 example: "newpassword"
 *     responses:
 *       201:
 *         description: Pengguna berhasil didaftarkan
 *       400:
 *         description: Data tidak valid
 */
router.post('/register', AuthController.registerPost);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mendapatkan daftar semua pengguna
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Daftar pengguna berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: "user1"
 */
router.get('/users', userControllers.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Mendapatkan detail pengguna berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail pengguna berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "user1"
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.get('/users/:id', userControllers.getUserById);

/**
 * @swagger
 * /jwttoken:
 *   post:
 *     summary: Mengarahkan ke endpoint autentikasi JWT
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Berhasil diarahkan ke autentikasi JWT
 */
router.post('/jwttoken', restrict, (req, res) => {
    res.redirect('auth/authenticate');
});

/**
 * @swagger
 * /auth/authenticate:
 *   get:
 *     summary: Verifikasi autentikasi pengguna
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Pengguna telah terautentikasi
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Authenticated"
 */
router.get('/auth/authenticate', (req, res) => {
    res.send('Authenticated');
});

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Mendapatkan daftar semua akun
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: Daftar akun berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   bank_name:
 *                     type: string
 *                     example: "BNI"
 *                   bank_account_number:
 *                     type: string
 *                     example: "12345678"
 *                   balance:
 *                     type: integer
 *                     example: 10000
 */
router.get('/accounts', AccountControllers.getAccounts);



/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mengupdate data pengguna berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pengguna yang akan diupdate
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *     responses:
 *       200:
 *         description: Data pengguna berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pengguna berhasil diperbarui"
 *       404:
 *         description: Pengguna tidak ditemukan
 *   delete:
 *     summary: Menghapus data pengguna berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pengguna yang akan dihapus
 *         example: 1
 *     responses:
 *       200:
 *         description: Pengguna berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pengguna berhasil dihapus"
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.put('/users/:id', userControllers.updateUser);
router.delete('/users/:id', userControllers.deleteUser);

module.exports = router;
