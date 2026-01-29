# 🌩️ CloudoFilesAI

CloudoFilesAI is an AI-powered cloud file management system inspired by Google Drive, enhanced with smart intelligence features.  
It allows users to securely upload, organize, search, and manage files with AI-based classification and smart suggestions.

This project is built as a full-stack MERN application and is designed to be scalable, secure, and resume-worthy.

---

## 🚀 Features

### 🔐 Authentication
- User registration & login
- JWT-based secure authentication
- Protected routes

### 📁 File Management
- Upload files (PDF, images, documents, media, etc.)
- Cloud storage using **Cloudinary**
- View files in a clean dashboard
- Open files directly from cloud
- Pagination for large file collections

### 🗑️ Trash System
- Soft delete (move files to trash)
- Restore deleted files
- Permanently delete files
- Separate Trash view

### 🧠 AI-Powered Intelligence
- **Automatic file classification**
  - Resume
  - Certificate
  - Project
  - Notes
  - Images
  - Documents
- Confidence score for classification
- Importance detection (high / normal / low)
- AI-generated **Smart Suggestions**
  - Highlights important files
  - Suggests unused or critical documents

### 🔍 Search & Filters
- Search files by name
- Filter by file type (image, pdf, document)
- Client-side filtering for fast UX

### 🎨 UI / UX
- Clean, modern dashboard UI
- Sidebar navigation
- Responsive design
- Attractive card-based layout

---

## 🧠 Why This Project is Different

Unlike a basic Google Drive clone, **CloudoFilesAI adds intelligence**:
- Files are **understood**, not just stored
- Important documents are **highlighted automatically**
- System gives **smart insights**, not just storage

This makes the project **AI-enhanced**.

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS (custom design system)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer
- Cloudinary

### AI / Intelligence (Rule-based, extensible)
- File name + MIME analysis
- Smart tagging
- Importance detection
- Smart suggestions engine

---
## 📂 Project Structure

CloudoFilesAI/
│

├── backend/

│ ├── controllers/

│ ├── models/

│ ├── routes/

│ ├── middleware/

│ ├── utils/

│ └── server.js

│

├── client/

│ ├── src/

│ │ ├── components/

│ │ ├── pages/

│ │ ├── styles/

│ │ └── api/

│ └── vite.config.js

│
├── package.json

└── README.md


--
## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

git clone https://github.com/sumitannie/CloudoFilesAI.git

cd CloudoFilesAI

2️⃣ Backend Setup
cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Run backend:

npm start
3️⃣ Frontend Setup
cd client
npm install
npm run dev

Frontend runs on:
http://localhost:5173

Backend runs on:
http://localhost:5000

🔒 Security Notes:
-node_modules is excluded using .gitignore
-JWT tokens stored securely in localStorage
-All file routes are protected

📌 Future Improvements
-True semantic search using embeddings
-File content analysis (PDF text extraction)
-AI-based file recommendations
-Usage analytics dashboard
-Sharing files with permissions

👤 Author
Sumitannie
Final-year Computer Science student
Full-Stack & AI-focused Developer


