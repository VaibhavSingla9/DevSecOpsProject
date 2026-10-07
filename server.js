const express = require("express");

const app = express();

const PORT = process.env.PORT ||3000 ;

app.get("/", (req, res) => {
res.send("conflict. this is the enw conflict    successfully directly from github ! Version-2 ");
});

app.get("/health", (req, res) => {
    res.status(200).json({ 
        status: "healthy" 
    });
} );
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
