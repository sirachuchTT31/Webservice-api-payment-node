const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.get("/api/payment", (req, res) => {
    res.json({ message: "Server Running payment gateway" });
});

app.use('/api/payment' , require('./src/routes/payment.route'));

const PORT = 8003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. `);
});