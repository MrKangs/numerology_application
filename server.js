const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const mongoUrl = "mongodb://localhost:27017";
const dbName = "your_database_name";

app.use(express.json());
app.use(express.static("public"));

app.get("/query", async (req, res) => {
    try {
        const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
        await client.connect();

        const db = client.db(dbName);

        // Perform MongoDB query based on req.query parameters
        const queryResult = await db.collection("your_collection_name").findOne({
            name: req.query.name,
            birthYear: parseInt(req.query.birthYear),
            birthMonth: req.query.birthMonth,
            birthday: parseInt(req.query.birthday),
        });

        client.close();

        // Respond with JSON data
        res.json(queryResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
