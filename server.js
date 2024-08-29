const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.json({ message: "Server Running." });
});

// app.use('/api/auth' , require('./src/routes/auth.route'));

const PORT = 8003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. `);
});