# NEBS IT Notice Board

## Project Overview
The **NEBS IT Notice Board** is a complete web application designed to facilitate the posting and viewing of notices within an organization. It features a modern, responsive user interface and a robust backend API for managing data persistence including  notice creation, and management like create ,update, delete, view, search, filter, and more operations.    

## Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Date Handling:** date-fns

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Utilities:** Dotenv, Cors

## Live URL
- **Frontend:** [https://nebs-it-notice-board-1.onrender.com]
- **Backend:** [https://nebs-it-notice-board.onrender.com]

## GitHub Repository
- [https://github.com/Tanvir19026/Nebs-IT-Notice_Board]

## Installation Steps

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- A MongoDB Atlas connection string

### Backend Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `server` directory and add the following:
   ```env
   MONGODB_URI=mongodb+srv://tanvirrafi1999_db_user:hzL1ZikbRypIJ9DX@cluster0.odmn3tr.mongodb.net/?appName=Cluster0
   PORT=5000
   ```

4. **Start the Server:**
   ```bash
   node index.js
   ```
   The server will start on port 5000 (or the port specified in .env).

### Frontend Setup

1. **Navigate to the client directory:**
   ```bash
   cd client-vite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open  browser and visit `http://localhost:5173`.

## Environment Variable Instructions

### Server (.env)
- **MONGODB_URI**: Connection string for MongoDB database (Required)
- **PORT**: Port number for the server to listen on (Default: 5000)

### Client
The client is currently configured to automatically detect the environment:
- **Development:** Connects to `http://localhost:5000/api`
- **Production:** Connects to `https://nebs-it-notice-board.onrender.com/api`

No specific `.env` file is required for the client unless customizing build configurations.
