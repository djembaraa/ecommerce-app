# 🛒 MegaMart: Enterprise-Grade E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

> **MegaMart** is a fully functional, enterprise-grade e-commerce application engineered with modern web development practices. Designed with a strong emphasis on performance, security, and a premium user experience, this platform serves as a comprehensive portfolio showcase of modern full-stack capabilities.

---

## 📑 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Security Implementation](#-security-implementation)
- [Getting Started](#-getting-started)
- [Author](#-author)

---

## 🚀 Project Overview

MegaMart goes beyond a standard e-commerce template. It features a robust architecture utilizing **Server-Side Rendering (SSR)** and dynamic client-side interactions to deliver a seamless shopping experience—from product discovery to secure checkout. The UI is meticulously crafted using **Gestalt principles** (Proximity and Similarity) to create an intuitive and premium browsing flow.

---

## ✨ Key Features

*   **🔒 Secure Authentication:** End-to-end user registration, login, and session management using Supabase SSR, complete with protected Edge Middleware routing.
*   **🛍️ Dynamic Product Catalog:** A responsive product grid featuring category filtering via dynamic Next.js routes (`/category/[slug]`).
*   **🛒 Advanced Cart Management:** Efficient global state management for the shopping cart, providing instant user feedback with a persistent sidebar drawer UI.
*   **💳 Streamlined Checkout:** A frictionless, responsive checkout process designed to maximize conversion rates.
*   **📊 Admin Dashboard:** A strictly role-protected control panel (`/admin`) for authorized personnel to manage product inventory and view customer orders efficiently.
*   **👤 User Profiles & Order History:** Protected customer portals allowing users to track their order statuses seamlessly.

---

## 💻 Tech Stack & Architecture

This project is built using industry-standard technologies to ensure massive scalability and maintainability:

### Frontend
*   **Next.js (App Router):** Leveraged for robust server-side rendering, dynamic route handling, and optimized SEO.
*   **React 18:** For building highly interactive, reusable, and concurrent UI components.
*   **Tailwind CSS & Shadcn UI:** A utility-first CSS framework combined with accessible, highly customizable component primitives for rapid UI development.

### Backend & Database
*   **Supabase (PostgreSQL):** An open-source Firebase alternative powering the relational database and real-time features.
*   **Supabase Auth (SSR):** Handling secure user authentication directly at the server level via cookies.
*   **TypeScript:** Providing strict static type checking across the entire stack to ensure code predictability and eliminate runtime errors.

---

## 🛡️ Security Implementation

As a showcase of secure coding practices, MegaMart implements robust defenses against common web vulnerabilities:

1.  **Cross-Site Scripting (XSS) Protection:** The product review mechanism strictly leverages React's native data-binding and sanitization to prevent malicious script injection.
2.  **Function-Level Access Control:** The backend API routes (`/api/admin/products`) enforce strict server-side validation using Supabase SSR to ensure only verified `admin` users can manipulate database records.
3.  **Edge Middleware Security:** Next.js Edge Middleware acts as a primary firewall, instantly redirecting unauthorized users away from protected administrative dashboards and private profiles before the page even renders.

---

## 🛠️ Getting Started

Follow these steps to run the MegaMart platform on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/megamart.git
cd megamart
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory. You will need an active Supabase project to obtain these credentials.
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
*(Refer to the `SUPABASE_SETUP.md` file in this repository for detailed SQL scripts to build the exact database schema).*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience the application.

---

**Author:** Djembar Arafat - Fullstack Developer
