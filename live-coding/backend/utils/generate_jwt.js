const jwt = require("jsonwebtoken");


JWT_SECRET = "f9d354c89eb786a30075859f80640ef1eb45d3a15a48608d3951476034a78cec"

const generateToken = (id) => {
    return jwt.sign({ id: id }, JWT_SECRET, { expiresIn: "15m" });
};

module.exports = {
    generateToken
}