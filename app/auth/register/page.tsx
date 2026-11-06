"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // Confirm email OFF: sesi langsung ada
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    // Confirm email ON: tunggu konfirmasi lewat email
    setInfo("Pendaftaran berhasil. Cek email kamu untuk konfirmasi, lalu login.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Daftar</h1>

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {info && (
          <div className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
            {info}
          </div>
        )}

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
        <input
          type="password"
          required
          placeholder="Password (min. 8 karakter)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
        <input
          type="password"
          required
          placeholder="Ulangi password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>

        <p className="text-sm text-center">
          Sudah punya akun?{" "}
          <Link href="/login" className="underline">
            Masuk
          </Link>
        </p>
      </form>
    </div>
  );
}