import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/theme.css" 
import "./index.css"          // Tailwind і базові стилі


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
