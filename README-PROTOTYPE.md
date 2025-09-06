# Prototype Appointment Management System (Demo Only)

Important: Prototype only — no security. Sensitive fields stored in plain text for demo. Do NOT use in production.

What is this?
- A judge-ready prototype with JSON file storage, seeded users, a simple login page, and a role-aware dashboard.
- No backend auth. All checks are client-side and JSON-based.

Seeded Users (DEV-ONLY, plain text):
- Aditya — admin — phone: 9990001111 — password: admin123
- Kislaya — practitioner — phone: 9990002222 — password: pract123
- Shivani — patient — phone: 9990003333 — password: patient123
All DOBs: 2007-09-06. All data stored in JSON under `data/`.

Storage (JSON files in data/):
- users.json — seeded users (3 only)
- appointments.json — appointments list
- admin_actions.json — admin actions append-only log
- audit_log.json — audit trail with timestamps (Asia/Kolkata)

Run the demo (static pages):
1) Start a static server from the repo root:
   python -m http.server 8000
2) Open the login page:
   http://localhost:8000/frontend/login.html

Optional — enable persistence endpoints (CGI):
- Use Python’s CGI mode to serve `/cgi-bin/api.py`:
   python -m http.server --cgi 8000
- Then open the dashboard: http://localhost:8000/frontend/dashboard.html
- Note: Without `--cgi`, login works, but create/cancel/escalate (which write JSON) won’t.

Disclaimer: This is a demo. No authentication security; plain-text credentials. Do not deploy in production.
