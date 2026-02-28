# VC Intelligence Interface

A full‑stack SaaS‑style workflow built with **React** (frontend) and **Django REST Framework** (backend).  
This project demonstrates seamless integration between modern UI/UX and robust API services, designed for real‑world deployment and assignment submission.

---

## 🚀 Features

- **Dashboard**
  - Live counts of Companies, Lists, Enrichments, and Saved Searches
  - Recent activity tracking

- **Companies**
  - Full CRUD (Add, Edit inline, Delete)
  - Search + Saved Searches persistence
  - Responsive table with hover effects

- **Lists**
  - Create lists with title + associated companies
  - Delete lists
  - Dashboard metrics auto‑update

- **Saved Searches**
  - Store and view user queries
  - Integrated with search bar

- **Enrichments**
  - Manage enrichment status (Pending → Enriched)

- **UI/UX**
  - Responsive design (Bootstrap + Tailwind)
  - Animated Navbar with bounce and hover effects
  - Mobile‑friendly hamburger menu

---

## 🛠 Tech Stack

- **Frontend:** React, Axios, TailwindCSS/Bootstrap  
- **Backend:** Django REST Framework  
- **Database:** SQLite (dev) / PostgreSQL (production)  
- **Deployment:** Netlify (frontend) + Railway/Render (backend)

---

## ⚙️ Setup Instructions

### Backend (Django)
```bash
git clone <repo-url>
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Frontend React : 
cd frontend
npm install
npm start
