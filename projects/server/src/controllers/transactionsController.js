const { messages } = require("../helpers");
const { transactionService } = require("../services");

async function addTransaction(req, res) {
    try {
        const { id } = req.account;
        // const { total, products } = req.body;
        const result = await transactionService.addTransaction(
            id,
            // total,
            // products
        );
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getTransactions(req, res) {
    try {
        const queries = req.query;
        const result = await transactionService.getTransactions(queries);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addTransaction,
    getTransactions,
};
