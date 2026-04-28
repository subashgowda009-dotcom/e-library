import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import PdfReader from './pages/PdfReader';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Category from './pages/Category';
import About from './pages/About';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/books" element={<Home />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/read/:id" element={<PdfReader />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
