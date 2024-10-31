const express = require('express');
const router = express.Router();
const TransactionControllers = require('../controllers/transactionControllers');

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Mendapatkan daftar semua transaksi
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Daftar transaksi berhasil diambil
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
 *                   sourceAccountId:
 *                     type: integer
 *                     example: 2
 *                   destinationAccountId:
 *                     type: integer
 *                     example: 3
 *                   amount:
 *                     type: integer
 *                     example: 5000
 */
router.get('/transactions', TransactionControllers.getTransactions);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Membuat transaksi baru
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sourceAccountId:
 *                 type: integer
 *                 example: 2
 *               destinationAccountId:
 *                 type: integer
 *                 example: 3
 *               amount:
 *                 type: integer
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Transaksi berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 sourceAccountId:
 *                   type: integer
 *                   example: 2
 *                 destinationAccountId:
 *                   type: integer
 *                   example: 3
 *                 amount:
 *                   type: integer
 *                   example: 5000
 */
router.post('/transactions', TransactionControllers.createTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Mendapatkan detail transaksi berdasarkan ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Detail transaksi berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 sourceAccountId:
 *                   type: integer
 *                   example: 2
 *                 destinationAccountId:
 *                   type: integer
 *                   example: 3
 *                 amount:
 *                   type: integer
 *                   example: 5000
 *       404:
 *         description: Transaksi tidak ditemukan
 */
router.get('/transactions/:id', TransactionControllers.getTransactionById);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Memperbarui transaksi berdasarkan ID
 *     tags: [Transactions]
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
 *               sourceAccountId:
 *                 type: integer
 *                 example: 2
 *               destinationAccountId:
 *                 type: integer
 *                 example: 3
 *               amount:
 *                 type: integer
 *                 example: 7000
 *     responses:
 *       200:
 *         description: Transaksi berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 sourceAccountId:
 *                   type: integer
 *                   example: 2
 *                 destinationAccountId:
 *                   type: integer
 *                   example: 3
 *                 amount:
 *                   type: integer
 *                   example: 7000
 *       404:
 *         description: Transaksi tidak ditemukan
 */
router.put('/transactions/:id', TransactionControllers.updateTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Menghapus transaksi berdasarkan ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID transaksi yang akan dihapus
 *         example: 1
 *     responses:
 *       200:
 *         description: Transaksi berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaksi berhasil dihapus"
 *       404:
 *         description: Transaksi tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaksi tidak ditemukan"
 */
router.delete('/transactions/:id', TransactionControllers.deleteTransaction);



module.exports= router