# 🏠 NestIn - Room Rental Platform

Welcome to **NestIn** — a modern room renting web application where users can **search for places**, 
**add their own listings**, **leave reviews**, and even **Check a map** powered by **Lifey**. Built with the **Full-stack Stack** 
(MongoDB, Express, Node.js, and Vanilla JS for frontend), it's a fully functional platform.

🌐 **Live Demo:** https://nestinf.onrender.com

---

## 🚀 Features

- 🔍 **Search Rooms** – Easily filter and browse listings by location and keywords.
- 🧭 **Map Integration** – See listings on a dynamic map powered by Lifey Maps.
- 🏡 **Add New Listings** – Login and post your own rooms or properties for rent.
- 📝 **Reviews** – Leave feedback for any listing after login.
- 👤 **User Authentication** – Secure login and register using sessions.
  
<img width="1873" height="920" alt="Screenshot 2026-01-05 214852" src="https://github.com/user-attachments/assets/dc14b0eb-6d4a-4ad5-9486-951eed9f7d0f" />

---<img width="1895" height="1017" alt="Screenshot 2026-01-05 214738" src="https://github.com/user-attachments/assets/47f1b34b-d2d6-4c76-b54e-cefedf457729" />

<img width="1920" height="1080" alt="Screenshot 2026-01-05 214802" src="https://github.com/user-attachments/assets/8552dde7-7535-4c3a-8f9e-97b0c285e59d" />
<img width="1920" height="1080" alt="Screenshot 2026-01-05 214825" src="https://github.com/user-attachments/assets/f2707404-157b-4076-bbda-58fefec4ee88" />

## 🛠️ Tech Stack

**Frontend:**
- HTML
- CSS
- JavaScript (Vanilla)

**Backend:**
- Node.js
- Express.js
- MongoDB (via MongoDB Atlas)
- EJS (templating engine)

**Other Tools:**
- Lifey Map API (for maps & location)
- Render (deployment)
- Multer (image uploads)
- bcrypt (password hashing)
- connect-mongo & express-session (authentication)

---

## 📂 Folder Structure


.
├── public/             # Static files (CSS, JS, images)
├── views/              # EJS templates
├── models/             # Mongoose models (User, Listings, Review)
├── routes/             # Express routes
├── controllers/        # Business logic
├── utils/              # Helper functions
├── .env                # Environment variables
└── app.js              # Entry point
