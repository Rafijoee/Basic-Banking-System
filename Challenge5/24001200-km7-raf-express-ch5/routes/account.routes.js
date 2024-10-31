const express = require('express');
const router = express.Router();
const AccountControllers = require('../controllers/accountControllers');

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
 * /accounts:
 *   post:
 *     summary: Membuat akun baru
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bank_name:
 *                 type: string
 *                 example: "BRI"
 *               bank_account_number:
 *                 type: string
 *                 example: "12345678"
 *               balance:
 *                 type: integer
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Akun berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "berhasil membuat akun"
 *                 insertData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     bank_name:
 *                       type: string
 *                       example: "BRI"
 *                     bank_account_number:
 *                       type: string
 *                       example: "12345678"
 *                     balance:
 *                       type: integer
 *                       example: 5000
 */
router.post('/accounts', AccountControllers.createAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Mendapatkan detail akun berdasarkan ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari akun yang ingin ditampilkan
 *     responses:
 *       200:
 *         description: Detail akun berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 bank_name:
 *                   type: string
 *                   example: "BRI"
 *                 bank_account_number:
 *                   type: string
 *                   example: "12345678"
 *                 balance:
 *                   type: integer
 *                   example: 5000
 *       404:
 *         description: Akun tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Akun tidak ditemukan"
 */
router.get('/accounts/:id', AccountControllers.getAccountById);

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     summary: Memperbarui informasi akun berdasarkan ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: Akun berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Akun berhasil diperbarui"
 *                 account:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phone:
 *                       type: string
 *                       example: "1234567890"
 *       404:
 *         description: Akun tidak ditemukan
 *       400:
 *         description: Permintaan tidak valid
 */
router.put('/accounts/:id', AccountControllers.updateAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     summary: Menghapus akun berdasarkan ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID akun yang akan dihapus
 *         example: 1
 *     responses:
 *       200:
 *         description: Akun berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Akun berhasil dihapus"
 *       404:
 *         description: Akun tidak ditemukan
 */
router.delete('/accounts/:id', AccountControllers.deleteAccount);


module.exports= router