import type { FotoHewan } from "@/lib/api";

interface FotoHewanCardProps {
  foto: FotoHewan | null;
  namaHewan: string;
  namaIlmiah?: string;
}

export default function FotoHewanCard({
  foto,
  namaHewan,
  namaIlmiah,
}: FotoHewanCardProps) {
  if (!foto) return null;

  return (
    <figure className="mb-6 overflow-hidden rounded-xl border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={foto.url}
        alt={namaHewan}
        className="h-64 w-full object-cover"
      />
      <figcaption className="px-3 py-2 text-xs text-muted-foreground">
        Foto dari{" "}
        <a
          href={foto.sumber}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Wikipedia
        </a>
        {namaIlmiah && ` · ${namaIlmiah}`}
      </figcaption>
    </figure>
  );
}