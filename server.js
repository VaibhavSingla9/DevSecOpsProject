
const express = require("express");

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("DevSecOpssssssss CI/CD Pipeline - Automated Trigger Test");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy"
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
