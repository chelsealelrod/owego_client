import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { OweGo } from "./components/OweGo.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <OweGo />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
