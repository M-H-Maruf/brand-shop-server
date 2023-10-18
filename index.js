// imports
const express = require('express');
const cors = require('cors');

// express server initialization
const app = express();
const PORT = process.env.PORT || 5000;

// necessary middlewares
app.use(cors());
app.use(express.json());

// server paths
app.get('/', (req, res) => {
    res.send('Brand Shop Server is running.')
})

// server listener
app.listen(PORT, () => {
    console.log(`Brand Shop Server is running on port: ${PORT}`);
});