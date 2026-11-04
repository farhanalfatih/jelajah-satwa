# Setup Gemini API untuk Jelajah Satwa

## 🚀 Quick Start - Development Mode

Untuk testing tanpa API key, set di `.env.local`:

```env
USE_DUMMY_DATA=true
```

Restart dev server dan aplikasi akan menggunakan dummy data.

---

## 📋 Setup dengan Gemini API (Production Mode)

### 1. Install Package Gemini AI

Jalankan command berikut di terminal (gunakan Command Prompt jika PowerShell error):

```bash
npm install @google/generative-ai
```

**Jika PowerShell Error:**
```powershell
# Buka PowerShell as Administrator, jalankan:
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Dapatkan API Key Gemini

1. Buka [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan akun Google kamu
3. Klik "Create API Key" atau "Get API Key"
4. Copy API Key yang dihasilkan (format: `AIzaSy...`)

**PENTING**: API key harus dimulai dengan `AIza`

### 3. Setup Environment Variable

Edit file `.env.local`:

```env
# Ganti dengan API key kamu
GEMINI_API_KEY=AIzaSyD...your_actual_api_key_here

# Set ke false untuk menggunakan real API
USE_DUMMY_DATA=false
```

**PENTING**: 
- Jangan commit file `.env.local` ke git!
- API key format: `AIzaSy...` (bukan format lain)
- Pastikan tidak ada spasi sebelum/sesudah API key

### 4. Restart Development Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

## 🎯 Cara Kerja

### API Route: `/app/api/analyze/route.ts`
- Menerima POST request dengan `namaHewan` dan `levelPemahaman`
- Mengirim prompt ke Gemini AI
- Mengembalikan hasil analisis dalam format JSON

### Helper Function: `/lib/api.ts`
- Function `analyzeAnimal()` untuk memanggil API
- Handle error dan parsing response

### Frontend: `/app/(pages)/create/page.tsx`
- Function `handleNextToStep2()` memanggil `analyzeAnimal()`
- Menampilkan loading di Step 2
- Menampilkan hasil di Step 3

## 🧪 Testing

1. Akses halaman `/create`
2. Masukkan nama hewan (contoh: "Harimau")
3. Pilih level pemahaman
4. Klik "Mulai Jelajah"
5. Tunggu AI menganalisis (~5-10 detik)
6. Lihat hasil analisis

## ⚠️ Error Handling

### Error: "Gemini API key tidak valid"
**Penyebab:** API key tidak dimulai dengan "AIza"

**Solusi:**
1. Pastikan kamu copy API key dari [Google AI Studio](https://makersuite.google.com/app/apikey)
2. API key yang benar formatnya: `AIzaSyD...`
3. Bukan format lain seperti `AQ.Ab8...` atau sejenisnya

**Atau gunakan dummy data untuk testing:**
```env
USE_DUMMY_DATA=true
```

### Error: "Gemini API key belum diisi"
- Pastikan file `.env.local` ada di root project
- Pastikan variable name adalah `GEMINI_API_KEY`
- Restart dev server setelah edit `.env.local`

### Error: "Gagal memproses response dari AI"
- Response dari Gemini tidak dalam format JSON
- Check console browser untuk melihat raw response
- Coba gunakan hewan yang lebih umum (Harimau, Gajah, dll)

### Error: PowerShell Execution Policy
```powershell
# Buka PowerShell as Administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Atau gunakan Command Prompt biasa untuk `npm install`

## 📚 Dokumentasi Tambahan

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
