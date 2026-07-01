# Panduan Proyek (SOT)

## Skema Database Supabase

Berikut adalah skema database kompleks untuk aplikasi ecommerce:

- **users**: `(id, email, password_hash, role [admin/user], created_at)`
- **profiles**: `(id, user_id, full_name, address, preferred_brands, settings [JSON])` -> Untuk profil kompleks
- **categories**: `(id, name, slug)` -> Adidas, Nike, Puma, dll.
- **products**: `(id, category_id, name, slug, price, stock, details [JSON], image_urls [Array])`
- **orders**: `(id, user_id, total_amount, shipping_cost, status, payment_details [JSON])`
- **order_items**: `(id, order_id, product_id, quantity, unit_price)`
- **reviews**: `(id, product_id, user_id, rating, content)`
