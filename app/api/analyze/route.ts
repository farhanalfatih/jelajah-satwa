
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

type LevelPemahaman = "pemula" | "menengah" | "lanjutan";

interface AnalyzeResponse {
  deskripsi: string;
  habitat: string;
  makanan: string;
  faktaMenarik: string[];
  statusKonservasi: string;
}

const validLevels = [
  "pemula",
  "menengah",
  "lanjutan",
] as const;

const levelInstruksi: Record<LevelPemahaman, string> = {
  pemula:
    "Gunakan bahasa sederhana, mudah dipahami, dan hindari istilah ilmiah yang rumit.",

  menengah:
    "Gunakan bahasa informatif dengan istilah ilmiah yang dijelaskan secara singkat.",

  lanjutan:
    "Gunakan bahasa ilmiah dan detail dengan terminologi zoologi.",
};

// Mengambil JSON dari response AI
function extractJSON(text: string): string {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("Response AI bukan JSON valid.");
  }

  return cleaned.substring(firstBrace, lastBrace + 1);
}

// Validasi struktur response AI
function validateResponse(
  data: unknown
): data is AnalyzeResponse {
  if (!data || typeof data !== "object") {
    return false;
  }

  const result = data as Record<string, unknown>;

  return (
    typeof result.deskripsi === "string" &&
    typeof result.habitat === "string" &&
    typeof result.makanan === "string" &&
    Array.isArray(result.faktaMenarik) &&
    result.faktaMenarik.length === 4 &&
    result.faktaMenarik.every(
      (item) => typeof item === "string"
    ) &&
    typeof result.statusKonservasi === "string"
  );
}

// Data dummy untuk development
function getDummyData(
  namaHewan: string
): AnalyzeResponse {
  return {
    deskripsi: `${namaHewan} adalah hewan yang memiliki karakteristik unik dan menarik untuk dipelajari.`,

    habitat: `${namaHewan} hidup di lingkungan alami yang sesuai dengan karakteristik dan kemampuan adaptasinya.`,

    makanan: `${namaHewan} memiliki pola makan yang bergantung pada jenis dan karakteristik biologisnya.`,

    faktaMenarik: [
      `${namaHewan} memiliki kemampuan adaptasi yang unik.`,
      `${namaHewan} merupakan bagian penting dari ekosistem.`,
      `${namaHewan} memiliki karakteristik fisik yang menarik.`,
      `${namaHewan} memiliki cara bertahan hidup yang khas.`,
    ],

    statusKonservasi:
      `Status konservasi ${namaHewan} perlu diperhatikan berdasarkan kondisi populasinya.`,
  };
}

// Mengambil status error dari SDK Gemini
function getErrorDetails(error: unknown) {
  const err = error as {
    status?: number;
    code?: number | string;
    message?: string;
    response?: {
      status?: number;
    };
    error?: {
      code?: number;
      message?: string;
    };
  };

  const message =
    err?.message ||
    err?.error?.message ||
    "Unknown Gemini API error";

  const status = Number(
    err?.status ??
    err?.response?.status ??
    err?.error?.code ??
    (typeof err?.code === "number" ? err.code : 0)
  );

  // Fallback jika status tidak tersedia sebagai property
  const statusMatch = message.match(
    /\b(400|401|403|404|429|500|503)\b/
  );

  return {
    status: status || Number(statusMatch?.[1] ?? 0),
    message,
  };
}

export async function POST(request: NextRequest) {
  try {
    // 1. Ambil request
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Request JSON tidak valid." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Request tidak valid." },
        { status: 400 }
      );
    }

    const { namaHewan, levelPemahaman } = body as {
      namaHewan?: unknown;
      levelPemahaman?: unknown;
    };

    // 2. Validasi nama hewan
    if (
      typeof namaHewan !== "string" ||
      !namaHewan.trim() ||
      namaHewan.trim().length > 100
    ) {
      return NextResponse.json(
        { error: "Nama hewan tidak valid." },
        { status: 400 }
      );
    }

    // 3. Validasi level pemahaman
    if (
      typeof levelPemahaman !== "string" ||
      !validLevels.includes(
        levelPemahaman as LevelPemahaman
      )
    ) {
      return NextResponse.json(
        { error: "Level pemahaman tidak valid." },
        { status: 400 }
      );
    }

    const nama = namaHewan.trim();
    const level = levelPemahaman as LevelPemahaman;

    // 4. Mode dummy
    if (process.env.USE_DUMMY_DATA === "true") {
      console.log("Using dummy data mode.");

      return NextResponse.json(
        getDummyData(nama)
      );
    }

    // 5. Periksa API Key
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing.");

      return NextResponse.json(
        { error: "GEMINI_API_KEY belum dikonfigurasi." },
        { status: 500 }
      );
    }

    // Jangan melakukan validasi prefix API Key secara manual.
    // Key AQ. juga dapat digunakan pada SDK Gemini terbaru.

    // 6. Inisialisasi Gemini
    const ai = new GoogleGenAI({
      apiKey,
    });

    // 7. Prompt AI
    const prompt = `
Kamu adalah ahli zoologi dan pendidik profesional.

Analisis hewan berikut:

Nama hewan: ${nama}

Level pemahaman: ${level}

Instruksi:
${levelInstruksi[level]}

Ketentuan:
1. Berikan informasi zoologi yang akurat.
2. Jangan mengarang fakta.
3. Jika nama hewan ambigu, jelaskan ketidakpastiannya.
4. Berikan tepat 4 fakta menarik.
5. Status konservasi harus spesifik jika spesies diketahui.
6. Gunakan status "Tidak diketahui" jika status konservasi tidak dapat dipastikan.
7. Gunakan bahasa Indonesia.
8. Jangan menambahkan informasi di luar struktur JSON.

Kembalikan JSON dengan struktur berikut:

{
  "deskripsi": "Deskripsi hewan",
  "habitat": "Habitat dan distribusi",
  "makanan": "Pola makan",
  "faktaMenarik": [
    "Fakta 1",
    "Fakta 2",
    "Fakta 3",
    "Fakta 4"
  ],
  "statusKonservasi": "Status konservasi"
}

Hanya keluarkan JSON valid tanpa markdown.
`;

    console.log("Calling Gemini API...");
    console.log("Animal:", nama);
    console.log("Level:", level);

    // 8. Panggil Gemini API
    const result = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt,
    });

    const aiText = result.output_text;

    if (!aiText) {
      throw new Error(
        "Gemini tidak memberikan response."
      );
    }

    // 9. Parse JSON
    const parsedData: unknown = JSON.parse(
      extractJSON(aiText)
    );

    // 10. Validasi hasil AI
    if (!validateResponse(parsedData)) {
      console.error("Invalid AI response structure.");

      throw new Error(
        "Struktur response AI tidak sesuai."
      );
    }

    console.log("Animal analysis completed.");

    // 11. Kirim hasil ke frontend
    return NextResponse.json(parsedData);

  } catch (error: unknown) {
    const { status, message } = getErrorDetails(error);

    // Log error untuk debugging
    console.error("========== GEMINI ERROR ==========");
    console.error("HTTP STATUS:", status);
    console.error("ERROR MESSAGE:", message);
    console.error("RAW ERROR:", error);
    console.error("==================================");

    // 401 / 403
    if (status === 401 || status === 403) {
      return NextResponse.json(
        {
          error: "API Key atau izin Gemini bermasalah.",
        },
        { status }
      );
    }

    // 404
    if (status === 404) {
      return NextResponse.json(
        {
          error: "Model Gemini tidak ditemukan atau tidak tersedia.",
        },
        { status: 404 }
      );
    }

    // 429
    if (
      status === 429 ||
      message.toLowerCase().includes("resource_exhausted") ||
      message.toLowerCase().includes("quota")
    ) {
      return NextResponse.json(
        {
          error: "Kuota atau batas request Gemini telah tercapai.",
        },
        { status: 429 }
      );
    }

    // 503
    if (status === 503) {
      return NextResponse.json(
        {
          error: "Server Gemini sedang mengalami gangguan. Coba lagi nanti.",
        },
        { status: 503 }
      );
    }

    // 500
    if (status === 500) {
      return NextResponse.json(
        {
          error: "Terjadi kesalahan internal pada layanan Gemini.",
        },
        { status: 500 }
      );
    }

    // Response JSON tidak valid
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: "Response AI bukan JSON valid.",
        },
        { status: 502 }
      );
    }

    // Error lainnya
    return NextResponse.json(
      {
        error: "Gagal menganalisis hewan.",
        detail: message,
      },
      { status: 500 }
    );
  }
}
