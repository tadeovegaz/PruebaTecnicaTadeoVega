require("dotenv").config();

const app = require("./app");

app.listen(8080);
console.log("Server on port", 8080);
