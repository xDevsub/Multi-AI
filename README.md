# Multi-LLM Web App

A full-stack web application to interact with multiple AI LLMs (GPT-4O, Claude, Mistral, Gemini).  
Features include **Start Conversation**, **MultiCompare**, and **history management**.

---

## Tech Stack

- **Frontend:** React, Axios, React Router  
- **Backend:** Node.js, Express, MongoDB (Mongoose)  
- **API Integration:** OpenRouter / custom LLM endpoints  

---

## Installation

### Backend Setup

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in backend:

```
MONGO_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_api_key_here
```

4. Start backend server:

```bash
npm start
```

- Backend runs on `http://localhost:5000`  

---

### Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend server:

```bash
npm start
```

- Frontend runs on `http://localhost:3000`  
- Connects automatically to backend at port 5000  

---

## Usage

### Start Conversation

- Navigate to **Start Conversation** tab.  
- Enter a prompt in the right-side input box.  
- Press **Send**:  
  - Each of the 4 LLMs will respond in their individual chat boxes on the left.  

### MultiCompare

- Navigate to **MultiCompare** tab.  
- Enter a prompt and press **Compare**:  
  - Responses from all LLMs appear side by side.  

### History / Settings

- Implemented as future enhancements. Can store conversation history in MongoDB.  

---

## Project Structure

```
backend/
  server.js
  api/
  config/
  .env
frontend/
  src/
    components/
    pages/
    services/
    styles/
  public/
```

---

## Environment Variables

- `MONGO_URI` → MongoDB connection string  
- `OPENROUTER_API_KEY` → OpenRouter API key for LLM calls  

---

## Notes

- Make sure MongoDB is running before starting the backend.  
- Adjust ports if conflicts occur.  
- LLM models can be customized in `config/models.js` (backend) and `llmModels` array (frontend).

