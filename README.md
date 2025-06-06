# MyEra Sticker App

A small React application that lets you add, drag, delete, and download stickers on a 600×400 canvas using [react-konva](https://github.com/konvajs/react-konva). Stickers are loaded from local assets (`public/images/`) and can be exported as a single PNG image. 

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Customization](#customization)
- [Technologies](#technologies)
- [License](#license)

---

## Demo

<p align="center">
  <img src="./demo-screenshot.png" alt="App Screenshot" width="700" />
</p>

> *Note: The above screenshot is for illustration only.*  

---

## Features

- **Add Stickers**  
  Click any of the sticker buttons (Dragon, Fox, Lion) to place a 100×100 sticker onto the canvas at a default position.

- **Drag & Drop**  
  Once a sticker is on the canvas, drag it anywhere within the 600×400 area. On drag end, the sticker will snap to a 40×40 pixel grid.

- **Double‐Click to Delete**  
  Double‐click any sticker on the canvas to remove it.

- **Download as PNG**  
  Click “Download PNG” to export the current canvas (with all placed stickers) as a single `canvas.png` file.

---

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) (comes bundled with Node.js)

---

## Installation

1. **Clone this repository**  
   ```bash
   git clone https://github.com/your-username/myera-sticker-app.git
   cd myera-sticker-app
Install dependencies
From the project root, run:

bash
Copy
Edit
npm install
Running the App
bash
Copy
Edit
npm start
This will start the development server at http://localhost:3000. The browser should open automatically; if not, navigate there manually.

Edit code under src/ to see live updates.

Any static assets you place in public/images/ will be served at /images/<filename>.

Project Structure
pgsql
Copy
Edit
myera-sticker-app/
├─ public/
│  ├─ images/
│  │  ├─ dragon.png
│  │  ├─ fox.avif
│  │  └─ lion.jpg
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
├─ src/
│  ├─ components/
│  │  ├─ CanvasStage.js       # Main Konva canvas component
│  │  ├─ CanvasStage.css      # Styles for the canvas wrapper
│  │  ├─ StickerButton.js     # Reusable sticker-button component
│  │  └─ StickerButton.css    # Styles for sticker buttons
│  ├─ App.js                  # Root React component
│  ├─ App.css                 # Global styles for the app
│  ├─ index.js                # Entry point (renders <App />)
│  ├─ index.css               # Optional global reset
│  ├─ reportWebVitals.js
│  ├─ setupTests.js
│  ├─ App.test.js
│  └─ logo.svg
├─ .gitignore
├─ package.json
├─ package-lock.json
└─ README.md
public/images/
Contains all local sticker assets. Files in this folder (e.g. dragon.png, fox.avif, lion.jpg) are statically served at /images/<filename>.

src/components/CanvasStage.js
Renders the 600×400 Konva <Stage> and individual <Image> shapes. Uses use-image with crossOrigin="Anonymous" to prevent CORS‐tainting.

src/components/StickerButton.js
Simple button component that displays a preview image (or fallback label) and calls a callback when clicked.

src/App.js
Holds the main application logic:

Tracks an array of stickers: { id, src, x, y } in React state.

Passes callbacks to add, drag‐end, double‐click, and download.

Usage
Add a Sticker

Click “Dragon,” “Fox,” or “Lion” in the sidebar.

The new sticker appears at (50, 50), snapped to the 40×40 grid → usually (40, 40).

Move a Sticker

Click and drag any sticker to reposition it.

On mouse‐up, the sticker snaps to the nearest 40×40 grid intersection.

Delete a Sticker

Double‐click any sticker on the canvas to remove it.

Download Canvas

Once you have arranged your stickers, click “Download PNG.”

A file named canvas.png containing all visible stickers will be saved to your computer.

Customization
Change Sticker Assets

Place any new image files (PNG, JPEG, AVIF, etc.) under public/images/.

In src/App.js, update the STICKER_URLS array to reference "/images/<your-file>.<ext>".

Adjust Canvas Size

In src/components/CanvasStage.js, modify:

js
Copy
Edit
<Stage width={600} height={400} …>
to your desired dimensions (e.g. 800×600).

Update any related CSS in CanvasStage.css if needed.

Toggle Grid Snapping

In src/App.js, change:

js
Copy
Edit
const GRID_SIZE = 40; 
to 0 for free‐drag (no snapping), or to another value (e.g. 20) for a finer/coarser grid.

Sticker Dimensions

By default, each sticker is forced to width={100} and height={100} in the <KonvaImage> element.

To allow natural image dimensions, remove or comment out width/height props in DraggableSticker (in CanvasStage.js).

Technologies
React (v18+)

Konva & react-konva (for 2D canvas rendering)

use-image (from @konvajs/use-image, for loading images with crossOrigin)

JavaScript (ES6+) & CSS3

Create React App (base boilerplate)

Troubleshooting
1. Images Not Showing on Canvas
Confirm your STICKER_URLS point to valid, same-origin paths (e.g. /images/dragon.png).

If you see a CORS‐related error in the console, ensure each URL is either:

Served from your own public/ folder (no cross-origin), or

A remote host that sends Access-Control-Allow-Origin: *.

2. Downloaded PNG Is Blank or Missing Stickers
Verify that in DraggableSticker, you’re using:

js
Copy
Edit
const [image] = useImage(sticker.src, "Anonymous");
The second argument "Anonymous" ensures the <img> has crossOrigin="Anonymous" before loading.

Make sure the source URLs truly allow cross-origin requests. Wikimedia Commons thumbnails (e.g. upload.wikimedia.org/...) are a safe choice.