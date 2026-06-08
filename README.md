# MD. Athaher Sayem Fahim — Portfolio Website

A modern, fully responsive single-page portfolio built with **Flask**, **Bootstrap 5**, and vanilla JavaScript.

---

## 🚀 Quick Start

### 1. Clone / Download
Place all files in a folder called `portfolio/`.

### 2. Create a virtual environment (recommended)
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the app
```bash
python app.py
```

### 5. Open your browser
```
http://127.0.0.1:5000
```

---

## 📁 Project Structure

```
portfolio/
├── app.py                  ← Flask backend + all portfolio data
├── requirements.txt        ← Python dependencies
├── README.md
├── templates/
│   └── index.html          ← Jinja2 single-page template
└── static/
    ├── css/
    │   └── style.css       ← All custom styles + dark/light theme
    └── js/
        └── main.js         ← Typing effect, form, scroll, tilt, AOS
```

---

## 🎨 Features

| Feature | Details |
|---|---|
| **Dark / Light Mode** | Toggle persists via `localStorage` |
| **Typing Animation** | Cycles through role taglines |
| **Scroll Spy** | Active nav link highlights on scroll |
| **AOS Animations** | Fade/zoom reveals on scroll |
| **Card Tilt** | 3D perspective tilt on hover (desktop) |
| **Count-Up Stats** | Numbers animate when scrolled into view |
| **Hero Parallax** | Orbs follow mouse movement subtly |
| **Contact Form** | POSTs to Flask `/contact` route |
| **Back to Top** | Smooth scroll, appears after 400px |
| **Fully Responsive** | Mobile, tablet, and desktop |

---

## ✏️ Customisation

All portfolio content lives in **`app.py`** inside the `PORTFOLIO` dictionary.  
Edit your projects, experience, skills, and achievements there — no HTML editing needed.

To add a **profile photo**:
1. Place your image at `static/img/profile.jpg`
2. In `index.html`, replace the `.avatar-placeholder` div with:
   ```html
   <img src="{{ url_for('static', filename='img/profile.jpg') }}"
        alt="Profile photo" class="w-100 h-100 rounded-circle object-fit-cover" />
   ```

To add your **CV for download**:
1. Place it at `static/cv/MD_Athaher_Sayem_Fahim_CV.docx`
2. The "Download CV" button in the hero will link to it automatically.

---

## 🌐 Deployment

For production, use **Gunicorn**:
```bash
pip install gunicorn
gunicorn -w 4 app:app
```

For **Render / Railway / PythonAnywhere**, just push the folder — they detect Flask automatically.

---

## 📄 License
© 2025 MD. Athaher Sayem Fahim. All rights reserved.
