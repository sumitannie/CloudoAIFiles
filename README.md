# 🚀 CloudoAIFiles

An AI-powered smart file manager that automatically reads your files and organizes your uploads into intelligent folders based on the unique file content.

Upload documents, images, resumes, projects, and more — the system reads content, understands context, and organizes everything for you.

---

## ✨ Features

### 🤖 AI Document Intelligence

* Extracts text from PDFs, DOCX, and text files
* Uses **Google Gemini AI API** to analyze content
* Auto-generates:

  * 📁 Folder name
  * 📂 Category

---

### 🧠 Smart Auto-Organization

* Files automatically grouped into AI folders like:

  * Career
  * Learning
  * Projects
  * AI Ideas
  * Finance
  * Personal
* Unlimited dynamic folder generation
* Context-aware organization

---

### 🖼 Media Handling

* Images → auto sorted into **Images**
* Videos → auto sorted into **Videos**
* Documents → AI classified intelligently

---

### ☁️ Cloud Storage

* Secure uploads via **Cloudinary**
* Fast file delivery & preview

---

### 🔐 Authentication & Security

* JWT-based authentication
* User-specific file storage
* Protected routes

---

### 🗑 File Management

* Upload & delete files
* Trash & restore system
* Permanent delete option
* Search by filename
* Pagination for performance

---

### 🧭 AI Folder Navigation

* Dedicated **AI-Generated Folders** page
* Click folder → view filtered files
* Back navigation & breadcrumbs
* Folder counts & sorting

---

## 🛠 Tech Stack

### Frontend

* React + Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Cloudinary

### AI & Processing

* Google Gemini API
* pdf-parse (PDF text extraction)
* mammoth (DOCX extraction)

---

## 📂 Project Structure

```
CloudoFilesAI/
│
├── client/              # React frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── styles/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/CloudoFilesAI.git
cd CloudoFilesAI
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_api_key
```

Start backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Getting Gemini API Key

1. Go to: https://aistudio.google.com/apikey
2. Create API key
3. Enable Generative Language API
4. Add to `.env`

---

## 🤖 How AI Organization Works

1️⃣ User uploads file
2️⃣ Backend extracts text
3️⃣ Gemini AI analyzes content
4️⃣ AI returns:

```json
{
  "category": "Resume",
  "folder": "Career",
  "summary": "...",
  "tags": ["skills", "projects"]
}
```

5️⃣ File saved & auto-organized

---

## 📸 Screenshots

![alt text](<Screenshot (996).png>)
![alt text](<Screenshot (993).png>)
![alt text](<Screenshot (994).png>)
![alt text](<Screenshot (995).png>)
![alt text](<Screenshot (997).png>)
---

## 🚀 Future Improvements

* Drag & drop file organization
* Folder color themes
* AI file search (semantic search)
* Duplicate detection
* File preview thumbnails
* Mobile responsive UI
* Shareable file links
* Voice upload & organization

---
