import express from "express";
import cekAlamatRouter from "./routes/cekAlamat.js";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use('/cekAlamat', cekAlamatRouter);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
})