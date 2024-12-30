require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}!`);
});
