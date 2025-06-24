# 🍔 Foodwagon – The Best Food Delivery in Jaipur 🚀

Welcome to **Foodwagon**, your one-stop solution for ordering delicious food from the best restaurants in Jaipur! Whether you're craving spicy street food, gourmet meals, or sweet desserts, Foodwagon delivers it all—fast, fresh, and right to your doorstep. 

---

## ✨ Features

- ⚡ **Fast Delivery:** Get your food delivered in 30-45 minutes or less!
- 🛡️ **Safe & Secure:** Your payments and personal data are always protected.
- 🚚 **Live Tracking:** Track your order in real-time from kitchen to your door.
- 🍽️ **Wide Variety:** Choose from top-rated restaurants and diverse cuisines.
- 📱 **Modern UI:** Sleek, responsive design for a seamless experience.
- 🔒 **Authentication:** Secure sign-in and sign-up with Clerk.
- 🛒 **Smart Cart:** Add, update, and remove items with ease.
- 🧑‍💼 **Admin Panel:** Manage restaurants and menu items effortlessly.

---

## 🏗️ Project Structure

```
📦 root/
├── app/                            # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── admin/                      # Admin routes
│   └── restaurant/[id]/page.tsx   # Dynamic restaurant pages
│
├── components/                    # Reusable components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── cart-sheet.tsx
│   ├── restaurant-grid.tsx
│   ├── admin/                     # Admin dashboard UIs
│   └── ui/                        # UI library (buttons, dialogs, etc.)
│
├── hooks/                         # Custom hooks (e.g., use-toast)
│
├── lib/                           # Shared utilities (e.g., cart-store, prisma)
│
├── prisma/                        # Prisma setup
│   └── schema.prisma
│
├── public/                        # Static assets
│
├── .env.local                     # Environment variables
├── next.config.js                 # Next.js config
├── tailwind.config.ts            # Tailwind CSS config
├── package.json                  # Project metadata
└── tsconfig.json                 # TypeScript config


```


---

## 🚀 Getting Started

### 1. **Clone the repository**

```sh
git clone https://github.com/your-username/foodwagon.git
cd foodwagon

2. Install dependencies
npm install

3. Set up environment variables
Copy .env.example to .env and fill in the required values.

4. Run database migrations and seed data
npx prisma migrate dev
node [seed.js](http://_vscodecontentref_/11)

5. Start the development server
npm run dev

```

---

## 🛠️ Tech Stack

- Next.js 13 (App Router)
- React 18
- TypeScript
- Tailwind CSS for styling
- Prisma ORM & SQLite/Postgres
- Clerk for authentication
- Lucide Icons
- React Hot Toast for notifications

---

## 👨‍💻 Contributing

Contributions are welcome! Please open issues or pull requests for any improvements or bug fixes.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📫 Wanna Connect?

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/piyush64bit)
[![Email](https://img.shields.io/badge/Email-Me-informational?style=flat&logo=gmail)](mailto:piiyush.sonii@outlook.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit%20Now-9cf?style=flat&logo=vercel)](https://piyushportfolio.live)

---

**Foodwagon – Bringing Jaipur’s best food to your doorstep, one order at a time! 🍕🍟🍛**