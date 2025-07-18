// api/saveCustomer.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST istekleri kabul edilir.' });
  }

  const {
    ad_soyad = "",
    telefon,
    otel_adi,
    mesaj = "",
    fiyat = "",
    durum = "bekliyor",
    not = "",
    updated_by = ""
  } = req.body;

  if (!telefon || !otel_adi) {
    return res.status(400).json({ error: "Telefon ve otel adı zorunludur." });
  }

  const { data, error } = await supabase.from('musteriler').insert([
    {
      ad_soyad,
      telefon,
      otel_adi,
      mesaj,
      fiyat,
      durum,
      not,
      updated_by
    }
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true, data });
}
