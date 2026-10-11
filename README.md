<div align="center">

# 🛒 বাজার দর

Daily market prices of everyday essentials, in Bengali, all in one place.

</div>

---

## About

**BazarDor** is a Bengali-first web app that helps people check today's market prices for everyday products such as vegetables, grains and groceries. Browse prices by category, see which items went up or down today, and sign in to view full product details.

## 🛠️ Technologies Used

| Area                   | Tools                                              |
| ---------------------- | -------------------------------------------------- |
| **Framework**          | Next.js (App Router, Cache Components), React      |
| **Language**           | TypeScript                                         |
| **Styling & UI**       | Tailwind CSS, shadcn/ui, lucide-react, react-icons |
| **Authentication**     | Better Auth (email/password, Google, GitHub)       |
| **Database**           | MongoDB                                            |
| **Forms & Validation** | React Hook Form, Zod                               |
| **Feedback**           | react-hot-toast, skeleton loaders                  |

## ✨ Key Features

1. **Daily prices in Bengali:** product prices, units and percentage changes, formatted with Bengali numerals and `টাকা`.
2. **Top risers & fallers:** home page sections that highlight which products got more expensive or cheaper today.
3. **Browse by category:** category pages with a price sort (low to high, high to low) that sorts by numeric value, so Bengali numerals order correctly.
4. **Secure authentication:** sign up and sign in with email/password, or continue with Google or GitHub.
5. **Protected pages & profile:** product details and the profile page are for signed-in users only, and users can update their name from their profile.

## 💡 What I Learned

- I learned about **Next.js Cache Components**: how `"use cache"`, `cacheLife` and `<Suspense>` boundaries decide what is prerendered and what renders at request time.
- I came across many **prerendering errors** (like unstable values such as `new Date()`) and learned how to fix them with `connection()`, Suspense and caching.
- I learned how to **format data**: Bengali numbers, prices, percentages and dates using `Intl` and small helper functions.

---

<div align="center">

Built with ❤️ as a learning project.

</div>
