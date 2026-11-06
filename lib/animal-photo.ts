import type { FotoHewan } from "@/lib/api";

// Wikimedia mewajibkan User-Agent yang jelas. Ganti emailnya dengan milikmu.
const USER_AGENT = "AnimalAnalyzer/1.0 (kontak: alfatihf504@gmail.com)";

interface WikiPage {
  title: string;
  missing?: string;
  thumbnail?: { source: string; width: number; height: number };
  pageprops?: { disambiguation?: string };
}

interface WikiResponse {
  query?: { pages?: Record<string, WikiPage> };
}

async function cariDiWikipedia(
  judul: string,
  bahasa: "en" | "id"
): Promise<FotoHewan | null> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    titles: judul,
    redirects: "1",
    prop: "pageimages|pageprops",
    piprop: "thumbnail",
    pithumbsize: "800",
    ppprop: "disambiguation",
  });

  const response = await fetch(
    `https://${bahasa}.wikipedia.org/w/api.php?${params.toString()}`,
    {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
    }
  );

  if (!response.ok) return null;

  const data = (await response.json()) as WikiResponse;
  const page = Object.values(data.query?.pages ?? {})[0];

  // Halaman tidak ada, halaman disambiguasi, atau tidak punya gambar
  if (!page || page.missing !== undefined) return null;
  if (page.pageprops?.disambiguation !== undefined) return null;
  if (!page.thumbnail?.source) return null;

  return {
    url: page.thumbnail.source,
    judul: page.title,
    sumber: `https://${bahasa}.wikipedia.org/wiki/${encodeURIComponent(
      page.title.replace(/ /g, "_")
    )}`,
  };
}

// Mencari 1 foto hewan. Tidak pernah melempar error: kalau gagal, hasilnya null.
export async function cariFotoHewan(
  namaIlmiah: string,
  namaHewan: string
): Promise<FotoHewan | null> {
  // Urutan = prioritas akurasi: nama Latin dulu, nama umum paling akhir
  const kandidat: Array<{ judul: string; bahasa: "en" | "id" }> = [
    { judul: namaIlmiah, bahasa: "en" },
    { judul: namaIlmiah, bahasa: "id" },
    { judul: namaHewan, bahasa: "id" },
  ];

  for (const { judul, bahasa } of kandidat) {
    const kueri = judul.trim();
    if (!kueri) continue;

    try {
      const foto = await cariDiWikipedia(kueri, bahasa);
      if (foto) return foto;
    } catch (error) {
      console.error(`Gagal mencari foto (${bahasa}: ${kueri}):`, error);
    }
  }

  return null;
}