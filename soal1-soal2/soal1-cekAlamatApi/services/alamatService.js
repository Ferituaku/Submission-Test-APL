process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const BASE_URL = 'https://alamat.thecloudalert.com/api';

function normalizeName(str = '') {
    return str
        .toLowerCase()
        .replace(/^(kabupaten|kab\.?|kota)\s+/i, '')
        .trim();
}

export async function isKabkotaInProvinsi(provinsi, kabkota) {
    const provinsiRes = await fetch(`${BASE_URL}/provinsi/get/`);

    if (!provinsiRes.ok) {
        throw new Error(`Gagal ambil data provinsi (status ${provinsiRes.status})`);
    }

    const provinsiData = await provinsiRes.json();
    const daftarProvinsi = provinsiData.result ?? provinsiData.results ?? [];

    const ketemuProvinsi = daftarProvinsi.find(
        (p) => p.text.trim().toLowerCase() === provinsi.trim().toLowerCase()
    );

    if (!ketemuProvinsi) {
        return false;
    }

    const kabkotaRes = await fetch(`${BASE_URL}/kabkota/get/?d_provinsi_id=${ketemuProvinsi.id}`);
    if (!kabkotaRes.ok) {
        throw new Error(`Gagal ambil data kabkota (status ${kabkotaRes.status})`);
    }

    const kabkotaData = await kabkotaRes.json();
    const daftarKabkota = kabkotaData.result ?? kabkotaData.results ?? [];

    const inputKabkota = kabkota.trim().toLowerCase();
    const inputKabkotaNorm = normalizeName(kabkota);

    return daftarKabkota.some((k) => {
        const itemText = k.text.trim().toLowerCase();
        return itemText === inputKabkota || normalizeName(itemText) === inputKabkotaNorm;
    });
}