import express from "express";

const app = express();

// ENV
const PORT = +(process.env.PORT || 8000);


async function startServer(port: number) {
    

    app.listen(port, () => console.log("Server started successfully! 🎉"));   
}

startServer(PORT);