import { Router } from "express"
import { isKabkotaInProvinsi } from "../services/alamatService.js";

const router = Router();

router.post('/', async (req, res) => {
    const { provinsi, kabkota } = req.body ?? {};

    if (!provinsi || !kabkota) {
        return res.status(400).json({
            code: "0",
            message: "provinsi dan kabkota wajib diisi!"
        })
    }
    try {
        const sesuai = await isKabkotaInProvinsi(provinsi, kabkota);

        return res.json(
            sesuai
                ? { code: '1', message: 'Sesuai' }
                : { code: '0', message: 'Tidak Sesuai' }
        );
    } catch (error) {
        console.error("Gagal memanggil API!", error.message);
        return res.status(502).json(
            { code: '0', message: 'gagal mengambil layanan alamat eksternal' }
        );
    }
});

export default router;