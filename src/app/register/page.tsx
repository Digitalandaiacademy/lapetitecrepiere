"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useSupabase } from "@/components/providers";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    whatsapp: "",
    same: false,
    location: "",
    address: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "same" && checked ? { whatsapp: prev.phone } : {}),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: form.email || undefined,
      phone: form.phone || undefined,
      password: form.password,
    });
    if (error) {
      alert(error.message);
      return;
    }
    const user = data.user;
    if (user) {
      await supabase.from("user_profiles").insert({
        id: user.id,
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        phone_number: form.phone,
        whatsapp_number: form.whatsapp,
        location: form.location,
        exact_address: form.address,
      });
      router.push("/");
    }
  };

  return (
    <div className="max-w-lg mx-auto py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Inscription</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            name="first_name"
            placeholder="Prénom"
            value={form.first_name}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border rounded"
            required
          />
          <input
            name="last_name"
            placeholder="Nom"
            value={form.last_name}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border rounded"
            required
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="phone"
          placeholder="Numéro de téléphone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <div className="flex items-center gap-2">
          <input
            name="whatsapp"
            placeholder="Numéro WhatsApp"
            value={form.whatsapp}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="same"
              checked={form.same}
              onChange={handleChange}
            />
            <span>Identique</span>
          </label>
        </div>
        <input
          name="location"
          placeholder="Localisation"
          value={form.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          name="address"
          placeholder="Adresse exacte"
          value={form.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <Button type="submit" className="w-full bg-orange-600 text-white">
          S&apos;inscrire
        </Button>
      </form>
      <p className="text-center mt-4">
        Déjà un compte? <Link href="/login" className="text-orange-600">Connectez-vous</Link>
      </p>
    </div>
  );
}
