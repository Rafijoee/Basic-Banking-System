const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class transactionControllers {
    static async getTransactions(req, res) {
        try {
            const transactions = await prisma.transaction.findMany();
            if (!transactions) {
                return res.status(404).json({
                    status: "error",
                    message: "Transactions not found"
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Transactions retrieved successfully",
                data: transactions
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "Failed to retrieve transactions",
                error: error.message
            });
        }
    }

    static async createTransaction(req, res) {
        try {
            const {sourceAccount, destinationAccount, amount, sourceAccountId, destinationAccountId} = req.body;
            
            const checkSourceAccount = await prisma.bankAccount.findUnique({
                where: {id: parseInt(sourceAccountId)}
            });

            if (!checkSourceAccount) {
                return res.status(400).json({
                    status: "error",
                    message: "Source account not found"
                });
            }
            const checkDestinationAccount = await prisma.bankAccount.findUnique({
                where: {id: parseInt(destinationAccountId)}
            });
            if (!checkDestinationAccount) {
                return res.status(400).json({
                    status: "error",
                    message: "Destination account not found"
                });
            }
            if (checkSourceAccount.balance < amount) {
                return res.status(400).json({
                    status: "error",
                    message: "Insufficient balance"
                });
            }
            const newBalance = checkSourceAccount.balance - amount;
            const updateSourceAccount = await prisma.bankAccount.update({
                where: {id: parseInt(sourceAccountId)},
                data: {balance: newBalance}
            });
            const newDestinationBalance = checkDestinationAccount.balance + amount;
            const updateDestinationAccount = await prisma.bankAccount.update({
                where: {id: parseInt(destinationAccountId)},
                data: {balance: newDestinationBalance}
            });
            const transaction = await prisma.transaction.create({
                data: {
                    source_account: sourceAccount,
                    destination_account: destinationAccount,
                    amount: amount,
                    source_account_id: sourceAccountId,
                    destination_account_id: destinationAccountId
                }
            });
            return res.status(201).json({
                status: "success",
                message: "Transaction created successfully",
                data: transaction
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "Failed to create transaction",
                error: error.message
            });
        }
    }

    static async getTransactionById(req, res) {
        try {
            const {id} = req.params;
            const transaction = await prisma.transaction.findUnique({
                where: {id: parseInt(id)}
            });
            if (!transaction) {
                return res.status(404).json({
                    status: "error",
                    message: "Transaction not found"
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Transaction retrieved successfully",
                data: transaction
            });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "Failed to retrieve transaction",
                error: error.message
            });
        }
    }

    static async updateTransaction(req, res) {
        try {
            const {id} = req.params;
            const {sourceAccount, destinationAccount, amount, sourceAccountId, destinationAccountId} = req.body;
            const testTransaction = await prisma.transaction.findUnique({
                where: {id: parseInt(id)}
            });
            if (!testTransaction) {
                return res.status(404).json({
                    status: "error",
                    message: "Transaction not found"
                });
            }
            const transaction = await prisma.transaction.update({
                where: {id: parseInt(id)},
                data: {
                    source_account: sourceAccount,
                    destination_account: destinationAccount,
                    amount: amount,
                    source_account_id: sourceAccountId,
                    destination_account_id: destinationAccountId
                }
            });
            return res.status(200).json({
                status: "success",
                message: "Transaction updated successfully",
                data: transaction
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "Failed to update transaction",
                error: error.message
            });
        }
    }

    static async deleteTransaction(req, res) {
        try {
            const {id} = req.params;
            const transaction = await prisma.transaction.delete({
                where: {id: parseInt(id)}
            });
            if (!transaction) {
                return res.status(404).json({
                    status: "error",
                    message: "Transaction not found"
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Transaction deleted successfully",
                data: transaction
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "Failed to delete transaction",
                error: error.message
            });
        }
    }
}
module.exports = transactionControllers;