import React from 'react';
import './App.css';
import Feed from "./pages/Feed"
import Left from "./pages/Left"
import Right from "./pages/Right"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Left />
        <Routes>
          <Route path='/' element={<Feed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
