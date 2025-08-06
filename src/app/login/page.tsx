"use client";

import { useState, FormEvent } from "react";
import { useSupabase } from "@/components/providers";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [form, setForm] = useState({ identifier: "", password: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const identifier = form.identifier;
    const credentials = identifier.includes("@")
      ? { email: identifier, password: form.password }
      : { phone: identifier, password: form.password };
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      alert(error.message);
      return;
    }
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Connexion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="identifier"
          placeholder="Email ou téléphone"
          value={form.identifier}
          onChange={(e) => setForm({ ...form, identifier: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <Button type="submit" className="w-full bg-orange-600 text-white">
          Se connecter
        </Button>
      </form>
      <p className="text-center mt-4">
        Pas de compte? <Link href="/register" className="text-orange-600">Inscrivez-vous</Link>
      </p>
    </div>
  );
}