const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const movieRouter = require("./movies");

app.use(bodyParser.json());

app.use("/movies", movieRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
