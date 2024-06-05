import mongoose from "mongoose";

import "dotenv/config";

export default async function connectDB() {
    const url = process.env.ATLAS_URI;

    try {
        await mongoose.connect(url, {});
        console.log(`Database connected: ${url}`);
    } catch (err) {
        console.error(`Connection error: ${err.message}`);
        process.exit(1);
    }

    const dbConnection = mongoose.connection;

    dbConnection.on("error", (err) => {
        console.error(`Connection error: ${err}`);
    });
}
