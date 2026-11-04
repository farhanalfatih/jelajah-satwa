# Gemini Models untuk Jelajah Satwa

## ✅ Model yang Tersedia (Free Tier)

### 1. `gemini-1.5-flash` (Recommended) ⭐
- **Kecepatan**: Sangat cepat
- **Biaya**: GRATIS
- **Rate Limit**: 15 requests/menit (free tier)
- **Best for**: Aplikasi real-time seperti ini
- **Status**: SEDANG DIGUNAKAN

### 2. `gemini-1.5-pro`
- **Kecepatan**: Sedang
- **Biaya**: GRATIS (dengan limit)
- **Rate Limit**: 2 requests/menit (free tier)
- **Best for**: Analisis kompleks
- **Catatan**: Lebih lambat tapi hasil lebih detail

### 3. `gemini-pro` (Legacy)
- **Status**: Deprecated, akan dihapus
- **Rekomendasi**: Jangan gunakan

## ⚠️ Error 503 - Service Unavailable

### Penyebab:
1. Model sedang high demand (banyak yang pakai)
2. Temporary spike in traffic
3. Server maintenance

### Solusi:

**1. Coba Lagi Beberapa Saat**
```bash
# Tunggu 1-2 menit, lalu coba lagi
```

**2. Gunakan Dummy Data Mode**
Edit `.env.local`:
```env
USE_DUMMY_DATA=true
```

**3. Ganti Model** (edit `app/api/analyze/route.ts`):
```typescript
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", // Ganti dari gemini-1.5-flash
  // ...
});
```

**4. Auto-Retry** (Sudah diimplementasi)
- System otomatis retry 2x dengan delay
- Jika masih gagal, return error

## 🔧 Konfigurasi Model

File: `app/api/analyze/route.ts`

```typescript
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,      // Kreativitas (0-1)
    topP: 0.95,           // Diversity
    topK: 40,             // Top-K sampling
    maxOutputTokens: 2048, // Max output length
  },
});
```

## 📊 Rate Limits (Free Tier)

| Model | Requests/Minute | Requests/Day |
|-------|-----------------|--------------|
| gemini-1.5-flash | 15 | 1,500 |
| gemini-1.5-pro | 2 | 50 |

## 💡 Tips

1. **Untuk Development**: Gunakan `USE_DUMMY_DATA=true`
2. **Untuk Testing API**: Gunakan `gemini-1.5-flash`
3. **Jika Error 503**: Coba lagi dalam 1-2 menit
4. **Peak Hours**: Hindari jam sibuk (09:00-17:00 WIB)

## 🔗 Resources

- [Gemini Models Documentation](https://ai.google.dev/models/gemini)
- [Rate Limits](https://ai.google.dev/pricing)
- [Get API Key](https://makersuite.google.com/app/apikey)
