const express = require("express");

const app = express();

app.use(express.json());

let transactionRecord = [];
/* new-transaction */
app.post("/newTransaction", (req, res) => {
    const newTransaction = req.body;
    transactionRecord.push(newTransaction);
})

app.use(express.static('./build'))

app.listen(8080, () => {
    console.log("Server is working on port 8080");
})