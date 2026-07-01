# MegaMart: Enterprise-Grade E-Commerce Platform

## Project Overview

MegaMart is a fully functional, enterprise-grade e-commerce application built with modern web development practices. Designed with a strong emphasis on performance, security, and a premium user experience, this platform serves as a comprehensive showcase of modern full-stack capabilities. The application features a robust architecture utilizing Server-Side Rendering (SSR) and dynamic client-side interactions to deliver a seamless shopping experience from product discovery to secure checkout.

## Tech Stack

This project is built using the latest industry-standard technologies to ensure scalability and maintainability:

*   **Next.js (App Router):** The core React framework, utilized for robust server-side rendering, dynamic routing, and API route handling.
*   **React:** For building highly interactive and reusable UI components.
*   **TypeScript:** Providing static type checking to ensure code quality, predictability, and fewer runtime errors.
*   **Tailwind CSS:** A utility-first CSS framework used for rapid UI development and implementing a cohesive, responsive design system.
*   **Shadcn UI:** High-quality, accessible, and customizable UI components integrated seamlessly with Tailwind.
*   **Supabase:** An open-source Firebase alternative powering the backend database (PostgreSQL) and real-time authentication system via `@supabase/ssr`.

## Core Features

*   **Authentication & Authorization:** Secure user registration, login, and session management using Supabase SSR, complete with protected Edge Middleware routing.
*   **Product Catalog:** A dynamic product grid meticulously designed using Gestalt principles (Proximity and Similarity) to create a premium, intuitive browsing experience.
*   **Dynamic Categories & Search:** Seamless navigation through brands and categories, featuring robust database querying and dynamic Next.js routes (`/category/[slug]`).
*   **Shopping Cart Management:** Efficient global state management for the shopping cart, providing users with instant feedback and a persistent sidebar drawer UI.
*   **Checkout Flow:** A streamlined and responsive checkout process designed for high conversion rates.
*   **Admin Dashboard:** A secure, role-protected control panel (`/admin`) for authorized personnel to manage product inventory and view customer orders efficiently.
*   **Secure Reviews System:** A product review mechanism that leverages React's native sanitization to ensure maximum protection against XSS vulnerabilities.

## Local Setup & Installation

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
Create a `.env.local` file in the root directory of the project. You will need a Supabase project set up to obtain these credentials.
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
*(Refer to `SUPABASE_SETUP.md` for detailed instructions on creating the database schema).*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

## 🔬 Security Research & Vulnerability Lab (Educational Purpose)

Beyond serving as a functional e-commerce platform, MegaMart is deliberately engineered to double as a local Web Security Testing Environment (similar to DVWA). This architecture was specifically designed for academic research regarding the OWASP Top 10 vulnerabilities.

**Embedded Vulnerabilities for Pentesting:**
*   **Stored Cross-Site Scripting (XSS):** The 'Product Reviews' component is deliberately configured to render raw HTML input without server-side sanitization. This allows researchers to test persistent XSS payloads safely within a local, sandboxed environment.
*   **Business Logic Flaws:** The checkout process contains intentional validation gaps in the API layer regarding price calculations, demonstrating the severe impact of trusting client-side price payloads.
*   **Broken Access Control (BAC):** Certain API endpoints for product management lack robust session-role validation, creating a scenario for unauthorized data manipulation.

*Disclaimer: This repository contains intentional security flaws. It is strictly intended for local, educational, and academic research purposes only. Do not deploy this exact iteration to a production environment.*

---

**Author:** Djembar Arafat - Fullstack Developer
