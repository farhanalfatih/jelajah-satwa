
export interface FotoHewan {
  url: string;
  judul: string;
  sumber: string; // link halaman Wikipedia, untuk atribusi
}

export interface HasilAnalisis {
  namaIlmiah: string;
  deskripsi: string;
  habitat: string;
  makanan: string;
  faktaMenarik: string[];
  statusKonservasi: string;
  foto: FotoHewan | null;
}

export type LevelPemahaman =
  | "pemula"
  | "menengah"
  | "lanjutan";

export async function analyzeAnimal(
  namaHewan: string,
  levelPemahaman: LevelPemahaman
): Promise<HasilAnalisis> {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      namaHewan,
      levelPemahaman,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Gagal menganalisis hewan."
    );
  }

  return data as HasilAnalisis;
}
