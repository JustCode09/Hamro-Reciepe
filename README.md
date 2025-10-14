# 🍳 Hamro Recipe

A full-stack **MERN Recipe Sharing App** that allows users to create, explore, and manage cooking recipes.  
Users can register, log in, and share their favorite dishes with descriptions, ingredients, and images.

---
🔗 **Live Demo:** [hamro-reciepe.vercel.app](https://hamro-reciepe.vercel.app/)


##  Features

- 👤 User authentication (Register/Login with JWT)
- 📸 Upload and view recipe images
- ✏️ Create, edit, and delete your recipes
- 🧾 Detailed recipe pages with ingredients and steps
- 🌍 Fully responsive frontend design

---

##  Tech Stack

**Frontend:** React + Vite + Tailwind CSS  
**Backend:** Node.js + Express + MongoDB  
**Auth:** JSON Web Token (JWT)  
**Hosting:** Render (Backend) + Vercel (Frontend)

---

##  Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/JustCode09/Hamro-Reciepe.git
cd hamro-recipe
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hamro_recipes
JWT_SECRET=your_super_secret_here
```

Run backend server:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## 🌍 Deployment

- **Backend:** Hosted on Render  
- **Frontend:** Hosted on Vercel

---

## 👨‍💻 Author

**Saurav Bhandari**  
Aspiring MERN Developer | Nepal

---

⭐ If you like this project, give it a star on GitHub!  
