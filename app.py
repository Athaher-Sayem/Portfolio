from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

PORTFOLIO = {
    "name": "MD. Athaher Sayem Fahim",
    "first_name": "Athaher",
    "title": "Computer Science & Engineering Student",
    "taglines": [
        "Full-Stack Developer",
        "Algorithm Enthusiast",
        "Teaching Apprentice Fellow Candidate",
        "Open-Source Contributor",
    ],
    "bio": (
        "Driven Computer Science & Engineering student at Daffodil International University "
        "with a consistent academic record. Proficient in full-stack web development, systems "
        "programming, and computer networking. Passionate about translating complex technical "
        "concepts into clear, impactful solutions — and equally passionate about teaching "
        "those concepts to others."
    ),
    "goal": (
        "My goal is to grow as a software engineer while contributing to open-source projects "
        "and the education community through the Teaching Apprentice Fellowship (TAF) program. "
        "I believe that great engineers are also great communicators and mentors."
    ),
    "email": "athahersayem336@gmail.com",
    "phone": "+880 1775692383",
    "location": "Bhola, Barisal, Bangladesh",
    "github": "https://github.com/Athaher-Sayem",
    "linkedin": "https://www.linkedin.com/in/athaher-sayem-3656671b8/",

    "education": [
        {
            "degree": "BSc in Computer Science & Engineering",
            "institution": "Daffodil International University",
            "year": "2024 – Present",
            "detail": "GPA: 3.9 / 4.0 (Previous Semester)",
            "icon": "mortarboard-fill",
        },
        {
            "degree": "Higher Secondary Certificate (HSC)",
            "institution": "Adamjee Cantonment College, Dhaka",
            "year": "2020 – 2022",
            "detail": "GPA: 5.00 / 5.00 — Science Group",
            "icon": "award-fill",
        },
        {
            "degree": "Secondary School Certificate (SSC)",
            "institution": "Bhola Government High School",
            "year": "2018 – 2020",
            "detail": "GPA: 5.00 / 5.00 — Science Group",
            "icon": "book-fill",
        },
    ],

    "skills": {
        "Frontend": [
            "HTML5", "CSS3", "JavaScript (ES6+)",
            "React.js", "Tailwind CSS", "Bootstrap", "DaisyUI",
        ],
        "Backend": [
            "Python", "Django", "Flask",
            "REST APIs", "Java", "C", "C++",
        ],
        "Database": [
            "SQL", "MySQL", "SQLite",
            "Apache Derby", "MongoDB (basics)",
        ],
        "Systems & DevOps": [
            "Linux / Ubuntu", "Bash Scripting",
            "Git", "GitHub", "Cron Jobs",
        ],
        "Networking": [
            "TCP/IP", "OSPF", "RIP", "VLSM",
            "DHCP", "NAT", "Cisco Packet Tracer",
        ],
        "ML / AI": [
            "Python (NumPy, Keras)", "CNNs",
            "TensorFlow", "Data Augmentation",
            "Hyperparameter Tuning",
        ],
    },

    "projects": [
        {
            "title": "Community Management Forum Platform",
            "description": (
                "Full-stack community portal featuring member profiles, centralised notice boards, "
                "and dynamic event-hosting capabilities. Engineered a scalable Django backend with "
                "secure role-based authentication and REST API integration."
            ),
            "tech": ["React.js", "Django", "Tailwind CSS", "REST API", "PostgreSQL"],
            "github": "https://github.com/Athaher-Sayem",
            "live": None,
            "featured": True,
            "icon": "people-fill",
        },
        {
            "title": "Phimart — E-Commerce Platform",
            "description": (
                "Full-stack e-commerce web application with dynamic product listing, secure "
                "user authentication, cart management, and seamless data persistence using "
                "Django ORM and REST APIs. Responsive UI with React.js and Tailwind CSS."
            ),
            "tech": ["React.js", "Django", "Tailwind CSS", "REST API", "SQLite"],
            "github": "https://github.com/Athaher-Sayem",
            "live": None,
            "featured": True,
            "icon": "cart-fill",
        },
        {
            "title": "Automated Lab Backup & Restore System",
            "description": (
                "System-administration automation utility using Bash shell scripts to schedule "
                "routine backups, handle data archiving, and execute rapid disaster-recovery "
                "protocols across Linux lab environments. Automated via cron scheduling."
            ),
            "tech": ["Linux", "Bash Scripting", "Cron", "Shell Automation"],
            "github": "https://github.com/Athaher-Sayem",
            "live": None,
            "featured": False,
            "icon": "hdd-fill",
        },
        {
            "title": "CIFAR Image Classification — CNN",
            "description": (
                "Convolutional Neural Network trained to classify images across 10 CIFAR-10 "
                "categories. Improved accuracy through hyperparameter tuning, dropout "
                "regularisation, and data augmentation techniques."
            ),
            "tech": ["Python", "TensorFlow", "Keras", "CNN", "NumPy"],
            "github": "https://github.com/Athaher-Sayem",
            "live": None,
            "featured": False,
            "icon": "cpu-fill",
        },
    ],

    "experience": [
        {
            "role": "Lab Teaching Assistant",
            "org": "Daffodil International University",
            "period": "Oct 2025 – Dec 2025",
            "location": "Dhaka, Bangladesh",
            "type": "Academic",
            "bullets": [
                "Facilitated CSE lab sessions, guiding students through programming (C, Java, Python) and computer networking exercises.",
                "Designed and explained lab materials, simplifying complex concepts like network topologies and OOP for first-year students.",
                "Directly aligned with TAF competencies: instructional delivery, curriculum support, and student engagement.",
            ],
            "icon": "laptop-fill",
            "color": "blue",
        },
        {
            "role": "Deputy & Press Secretary",
            "org": "Bhola Zila Student Forum (BZSF)",
            "period": "Aug 2024 – Feb 2025",
            "location": "Bhola, Barisal",
            "type": "Leadership",
            "bullets": [
                "Managed all press activities, public relations, and external communications for a district-level student organisation.",
                "Coordinated cross-functional communication strategies and produced official statements and event coverage.",
                "Received formal recognition: Event Management Award for excellence in event coordination.",
            ],
            "icon": "megaphone-fill",
            "color": "gold",
        },
        {
            "role": "Executive — Scientific Content",
            "org": "Science Bee",
            "period": "May 2020 – Dec 2023",
            "location": "Bangladesh",
            "type": "Volunteer",
            "bullets": [
                "Managed, reviewed, and validated scientific Q&A content ensuring technical accuracy and educational quality.",
                "Developed and curated question banks meeting defined educational standards; content reached thousands of students.",
                "Built strong editorial and curriculum-development skills directly applicable to TAF instructional roles.",
            ],
            "icon": "lightbulb-fill",
            "color": "teal",
        },
    ],

    "achievements": [
        {
            "title": "Take Off Contest — National Finalist",
            "detail": "Reached the final round at position 34 in a national algorithmic problem-solving competition.",
            "icon": "trophy-fill",
            "color": "gold",
        },
        {
            "title": "Unlock the Algorithm — National Finalist",
            "detail": "Reached the final round at position 36 in an advanced algorithms and competitive programming contest.",
            "icon": "puzzle-fill",
            "color": "blue",
        },
        {
            "title": "Event Management Award",
            "detail": "Recognised for excellence in large-scale event coordination at Bhola Zila Student Forum (BZSF), 2025.",
            "icon": "star-fill",
            "color": "teal",
        },
        {
            "title": "Perfect GPA — HSC (5.00 / 5.00)",
            "detail": "Achieved the highest possible GPA in the Higher Secondary Certificate at Adamjee Cantonment College, 2022.",
            "icon": "award-fill",
            "color": "gold",
        },
        {
            "title": "Perfect GPA — SSC (5.00 / 5.00)",
            "detail": "Achieved the highest possible GPA in the Secondary School Certificate at Bhola Government High School, 2020.",
            "icon": "patch-check-fill",
            "color": "blue",
        },
    ],

    "stats": [
        {"value": "3.9", "label": "University GPA", "suffix": "/4.0"},
        {"value": "4", "label": "Projects Built", "suffix": "+"},
        {"value": "3", "label": "Leadership Roles", "suffix": ""},
        {"value": "2", "label": "Contest Finalist", "suffix": "x"},
    ],
}


@app.route("/")
def index():
    return render_template("index.html", p=PORTFOLIO)


@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not all([name, email, message]):
        return jsonify({"status": "error", "message": "All fields are required."}), 400

    # In production: send an email or store to DB here
    print(f"\n[Contact] From: {name} <{email}>\nMessage: {message}\n")

    return jsonify({
        "status": "success",
        "message": f"Thank you {name}! Your message has been received. I'll get back to you soon.",
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
