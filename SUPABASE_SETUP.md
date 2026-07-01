# Panduan Setup Supabase untuk MegaMart

Dokumen ini berisi panduan langkah demi langkah untuk mengonfigurasi *database* Supabase Anda dari nol hingga siap digunakan oleh aplikasi *MegaMart*.

---

## 1. Membuat Proyek Supabase Baru
1. Buka [https://supabase.com/](https://supabase.com/) dan lakukan pendaftaran atau *login*.
2. Di dasbor utama, klik tombol **"New Project"**.
3. Pilih organisasi Anda (jika belum ada, buat organisasi baru).
4. Masukkan **Name** proyek (misalnya: `megamart-db`).
5. Buat **Database Password** yang kuat dan simpan baik-baik (Anda akan membutuhkannya jika ingin terhubung secara langsung via Postgres).
6. Pilih **Region** yang paling dekat dengan target pengguna Anda (misalnya: `Singapore`).
7. Klik **"Create new project"**. Proses ini akan memakan waktu sekitar 1-2 menit hingga *database* siap.

---

## 2. Mendapatkan Kredensial Environment (.env.local)
Aplikasi Next.js kita membutuhkan kredensial ini untuk berinteraksi dengan Supabase.

1. Di Dasbor Supabase Anda, buka proyek yang baru saja dibuat.
2. Lihat menu navigasi di sisi kiri, klik ikon roda gigi **"Project Settings"**.
3. Pilih menu **"API"**.
4. Di bagian **Project URL**, salin URL yang ada. Buka file `.env.local` di *root* proyek Next.js Anda, dan *paste* sebagai nilai untuk `NEXT_PUBLIC_SUPABASE_URL`.
5. Di bagian **Project API keys**, cari kunci yang memiliki tag `anon` dan `public`. Salin kunci tersebut dan *paste* sebagai nilai untuk `NEXT_PUBLIC_SUPABASE_ANON_KEY` di file `.env.local`.

---

## 3. Eksekusi Script SQL (Membuat Tabel)
Langkah selanjutnya adalah membangun arsitektur tabel yang dibutuhkan aplikasi sesuai dengan definisi `SOT.md`.

1. Di Dasbor Supabase, perhatikan menu sebelah kiri, lalu klik **"SQL Editor"**.
2. Klik tombol **"New query"**.
3. **Copy (salin)** seluruh *script* SQL di bawah ini, dan **Paste (tempel)** ke dalam jendela *editor* SQL Supabase.
4. Klik tombol **"Run"** (atau tekan `Cmd/Ctrl + Enter`) untuk mengeksekusi *script*.
5. Pastikan notifikasi di pojok kanan bawah menyatakan "Success".

### Script SQL Lengkap
```sql
-- 1. Membuat Tipe Data Kustom (Enums)
CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE order_status AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- 2. Membuat Tabel "users" (Terhubung ke Supabase Auth)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'user'::user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Membuat Tabel "profiles" (Informasi Detail Pengguna)
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  address TEXT,
  preferred_brands TEXT[],
  settings JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Membuat Tabel "categories"
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Membuat Tabel "products"
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  details JSONB DEFAULT '{}'::jsonb,
  image_urls TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Membuat Tabel "orders"
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE RESTRICT NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  shipping_cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  status order_status DEFAULT 'PENDING'::order_status NOT NULL,
  payment_details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Membuat Tabel "order_items"
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Membuat Tabel "reviews"
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. (Opsional) Nonaktifkan Row Level Security (RLS) sementara untuk fase Development/Demo
-- PERINGATAN: Di tahap produksi, RLS WAJIB diaktifkan dan dikonfigurasi!
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;
```

---

## 4. Langkah Akhir (Testing)
1. Setelah tabel berhasil dibuat, Anda bisa mencoba menambahkan data dummy (seperti "Adidas" atau "Nike") secara manual ke tabel `categories` dan `products` melalui menu **Table Editor** di dasbor Supabase.
2. Pastikan file `.env.local` sudah tersimpan di aplikasi Next.js.
3. Restart server Next.js Anda (`npm run dev`).
4. Semua halaman (*Home*, *Categories*, *Auth*, *Dashboard*) seharusnya sudah terhubung dan menampilkan data dengan baik!
