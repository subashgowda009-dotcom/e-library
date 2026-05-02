# 🎨 UI Modification Guide

This guide is for quickly changing colors and styles during your project review. All main styles are controlled from one central place.

---

### 1. How to change the Background Color
1. Open the file: `frontend/src/styles/index.css`
2. Look for the top section called `:root`.
3. Find the line: `--bg-color: #050511;`
4. Change the hex code (e.g., `#050511`) to any color you want.
   - *Example for White background:* `--bg-color: #ffffff;`
   - *Example for Dark Blue:* `--bg-color: #001f3f;`

---

### 2. How to change the Upload Button (and all main buttons)
1. Open the file: `frontend/src/styles/index.css`
2. Look for the `:root` section again.
3. Find the line: `--btn-gradient: linear-gradient(90deg, #7b2cbf, #3a86ff);`
4. Change the two hex codes (`#7b2cbf` and `#3a86ff`) to change the button color.
   - *Tip:* If you want a solid color instead of a gradient, change it to: `linear-gradient(90deg, #YOUR_COLOR, #YOUR_COLOR);`

---

### 3. How to change Text Colors
1. Open the file: `frontend/src/styles/index.css`
2. Find these lines in the `:root` section:
   - `--text-primary: #ffffff;` (Changes the main headings)
   - `--text-secondary: #9da0c1;` (Changes the smaller descriptions)

---

### 4. Quick File Reference
- **Website Background & Global Colors**: `frontend/src/styles/index.css`
- **Navigation Bar & Upload Button**: `frontend/src/components/Navbar.css`
- **Homepage (Hero) Section**: `frontend/src/components/Hero.css`
- **Category Cards**: `frontend/src/pages/Landing.css`

---

### 💡 Pro Tip for the Review:
If they ask you to change a color and you don't know the "hex code" (like #ffffff), you can just type the name of the color in plain English (like `red`, `blue`, `white`, `black`) and it will usually work!
