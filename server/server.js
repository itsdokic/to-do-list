import express from "express";
import cors from "cors";

import index from "./routes/index.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", index);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
