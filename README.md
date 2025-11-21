````markdown
# 📄 Maersk  – Interactive PDF Highlighter

An interactive web application that connects **analysis text** with **exact source lines inside a PDF report** using clickable references and dynamic highlighting.

This project converts a static PDF into a searchable, explorable, and reference-linked experience.

---

## 🚀 Web App Overview

The application has **two main sections**:

### 1️⃣ PDF Viewer (Left Panel)

- Displays the **Maersk Q2 2025 Interim Report**
- Scrollable across all pages
- When a reference is clicked:
  - Automatically jumps to the correct page
  - Highlights the exact phrase inside the PDF
  - Removes previous highlight (only one active at a time)
- Fully responsive for:
  - Desktop
  - Laptop
  - Tablet
  - Mobile

---

### 2️⃣ Analysis & Reference Panel (Right Panel)

- Contains detailed analysis text
- Includes clickable reference tags like:  
  `[1] [2] [3]`
- Clicking a reference:
  - Highlights the linked phrase in PDF
- Has a **Reference Mapping Section** showing:
  - Reference number  
  - Page number  
  - Exact phrase  
- Users can edit:
  - Analysis content
  - Reference mappings

---

## 🎯 Purpose of the Application

This system is built to:

- Make reading long financial and technical reports easier  
- Remove manual searching inside PDFs  
- Connect insights directly with the original source  
- Enable reusable document analysis  

Useful for:

- Financial analysis  
- Academic case studies  
- Research reports  
- Legal & compliance documents  
- University projects  

---

## ⚙ How It Works (Concept)

1. User clicks a reference like `[2]`
2. The system finds its mapping data:
   - Page number
   - Phrase to highlight
3. The PDF automatically scrolls to that page
4. The phrase is highlighted inside the document
5. The previously highlighted phrase is removed
6. Only one active highlight remains

This ensures clarity and a clean reading experience.

---

## ✨ Key Features

✅ Scrollable PDF viewer  
✅ Clickable reference linking  
✅ Dynamic phrase highlighting  
✅ Single active highlight system  
✅ Editable analysis content  
✅ Editable reference mapping  
✅ Responsive layout (desktop + mobile)  
✅ Reusable for any document or case study  

---

## ▶ How to Run the Project

### Step 1: Install Node.js

Download and install Node.js from:  
👉 https://nodejs.org  

Check installation:
```bash
node -v
npm -v
````

---

### Step 2: Install Project Dependencies

Open terminal inside your project folder and run:

```bash
npm install
```

---

### Step 3: Start the Development Server

```bash
npm run dev
```

Then open your browser and go to:

```text
http://localhost:5173
```

---

### Step 4: Build for Production

To create a production build:

```bash
npm run build
```

To preview the build:

```bash
npm run preview
```

---

## 📁 Project Folder Structure

```
maersk-highlighter/
│
├── public/
│   └── Maersk-Q2-2025-Interim-Report.pdf
│
├── src/
│   ├── components/
│   │   ├── PdfViewer.jsx
│   │   ├── AnalysisPanel.jsx
│   │
│   ├── config/
│   │   └── highlightConfig.js
│   │
│   ├── styles/
│   │   ├── layout.css
│   │   ├── pdf.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔍 Folder Explanation

| Folder/File      | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| `public/`        | Contains the PDF document                       |
| `components/`    | React components like PdfViewer & AnalysisPanel |
| `config/`        | Reference mapping and highlight configuration   |
| `styles/`        | All CSS styling                                 |
| `App.jsx`        | Main layout and logic                           |
| `main.jsx`       | App bootstrap file                              |
| `vite.config.js` | Vite bundler configuration                      |
| `README.md`      | Documentation                                   |

---

## 🔁 Reusability

This project can be reused for:

* Any financial report
* Research journal
* University assignments
* Legal/technical documentation

Just replace:

* The PDF file
* The reference mapping config

No code restructuring required.

---

## 🎉 Conclusion

This project turns static PDFs into an **interactive, reference-based reading experience**.

It helps:

* Students learn from academic reports
* Analysts study financial documents
* Researchers explore technical papers
* Professionals analyze complex documentation

By linking **analysis → references → real source**, this app simplifies understanding of complex content.

---

**Built for interactive learning, research, and document exploration.**

```


Just tell me where you want to host it 🚀
```
