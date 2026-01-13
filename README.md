# Rituraj Portfolio

Personal portfolio site built with React (CRA + CRACO) + Tailwind, with an optional FastAPI backend.

## Run locally

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend (optional)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

Backend env vars are read from `backend/.env` (at minimum: `MONGO_URL` and `DB_NAME`).

## Edit content
- `frontend/src/mock.js` (navigation, profile, experience, projects)
- `frontend/src/pages/Portfolio.jsx` (page layout + sections)
- `frontend/public/RITURAJ_CV_2025_Sales_.pdf` (resume PDF)
