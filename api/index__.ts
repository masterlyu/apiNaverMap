const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

const PORT = process.env.PORT || 0;
const server = app.listen(PORT, () =>
    console.log('Server ready on port ${server.address().port},')
);

module.exports = app;