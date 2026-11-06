import { NextRequest, NextResponse } from 'next/server'

const USER_AGENT = "JelajahSatwa/1.0 (https://jelajahsatwa.my.id)"

interface WikiPage {
  title: string
  missing?: string
  thumbnail?: { 
    source: string
    width: number
    height: number 
  }
  pageprops?: { 
    disambiguation?: string 
  }
}

interface WikiResponse {
  query?: { 
    pages?: Record<string, WikiPage> 
  }
}

async function cariDiWikipedia(
  judul: string,
  bahasa: "en" | "id"
): Promise<{ url: string; judul: string; sumber: string } | null> {
  try {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      titles: judul,
      redirects: "1",
      prop: "pageimages|pageprops",
      piprop: "thumbnail",
      pithumbsize: "800",
      ppprop: "disambiguation",
    })

    const response = await fetch(
      `https://${bahasa}.wikipedia.org/w/api.php?${params.toString()}`,
      {
        headers: { 
          "User-Agent": USER_AGENT, 
          Accept: "application/json" 
        },
        signal: AbortSignal.timeout(4000),
      }
    )

    if (!response.ok) return null

    const data = (await response.json()) as WikiResponse
    const page = Object.values(data.query?.pages ?? {})[0]

    if (!page || page.missing !== undefined) return null
    if (page.pageprops?.disambiguation !== undefined) return null
    if (!page.thumbnail?.source) return null

    return {
      url: page.thumbnail.source,
      judul: page.title,
      sumber: `https://${bahasa}.wikipedia.org/wiki/${encodeURIComponent(
        page.title.replace(/ /g, "_")
      )}`,
    }
  } catch (error) {
    console.error(`Error searching Wikipedia (${bahasa}: ${judul}):`, error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { namaHewan } = body

    if (!namaHewan || typeof namaHewan !== 'string') {
      return NextResponse.json(
        { error: 'Nama hewan harus diisi' },
        { status: 400 }
      )
    }

    // Daftar kandidat pencarian
    const kandidat: Array<{ judul: string; bahasa: "en" | "id" }> = [
      { judul: namaHewan.trim(), bahasa: "id" },
      { judul: namaHewan.trim(), bahasa: "en" },
      { judul: namaHewan.charAt(0).toUpperCase() + namaHewan.slice(1).toLowerCase(), bahasa: "id" },
    ]

    // Cari foto
    for (const { judul, bahasa } of kandidat) {
      if (!judul) continue

      const foto = await cariDiWikipedia(judul, bahasa)
      
      if (foto) {
        return NextResponse.json(foto, { status: 200 })
      }

      await new Promise(resolve => setTimeout(resolve, 100))
    }

    return NextResponse.json(
      { error: 'Foto tidak ditemukan' },
      { status: 404 }
    )

  } catch (error) {
    console.error('Error in animal-photo API:', error)
    
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mencari foto' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const namaHewan = searchParams.get('animal') || searchParams.get('nama')

  if (!namaHewan) {
    return NextResponse.json(
      { error: 'Parameter "animal" atau "nama" diperlukan', success: false },
      { status: 400 }
    )
  }

  // Daftar kandidat pencarian
  const kandidat: Array<{ judul: string; bahasa: "en" | "id" }> = [
    { judul: namaHewan.trim(), bahasa: "id" },
    { judul: namaHewan.trim(), bahasa: "en" },
    { judul: namaHewan.charAt(0).toUpperCase() + namaHewan.slice(1).toLowerCase(), bahasa: "id" },
  ]

  // Cari foto
  for (const { judul, bahasa } of kandidat) {
    if (!judul) continue

    const foto = await cariDiWikipedia(judul, bahasa)
    
    if (foto) {
      return NextResponse.json({ 
        success: true, 
        imageUrl: foto.url,
        title: foto.judul,
        source: foto.sumber 
      }, { status: 200 })
    }

    await new Promise(resolve => setTimeout(resolve, 100))
  }

  return NextResponse.json(
    { success: false, error: 'Foto tidak ditemukan' },
    { status: 404 }
  )
}
