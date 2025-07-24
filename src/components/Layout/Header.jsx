"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useState } from "react"

export default function Header() {
  const { currentUser, logout } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Don't show navbar on auth pages when not logged in
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup"

  const handleLogout = async () => {
    try {
      await logout()
      setIsMobileMenuOpen(false)
    } catch (error) {
      console.error("Failed to log out:", error)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <span>💰</span>
          <span className="logo-text">Loan Calculator</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          {/* Always show these navigation links */}
          {currentUser && (
            <>
              <Link to="/" className="nav-link" onClick={closeMobileMenu}>
                <span className="nav-icon">🏠</span>
                Home
              </Link>
              <Link to="/about" className="nav-link" onClick={closeMobileMenu}>
                <span className="nav-icon">ℹ️</span>
                About
              </Link>
              <Link to="/contact" className="nav-link" onClick={closeMobileMenu}>
                <span className="nav-icon">📞</span>
                Contact
              </Link>
            </>
          )}

          {/* Show About and Contact for non-auth pages even when not logged in */}
          {!currentUser && !isAuthPage && (
            <>
              <Link to="/about" className="nav-link" onClick={closeMobileMenu}>
                <span className="nav-icon">ℹ️</span>
                About
              </Link>
              <Link to="/contact" className="nav-link" onClick={closeMobileMenu}>
                <span className="nav-icon">📞</span>
                Contact
              </Link>
            </>
          )}

          {/* Authentication section */}
          {currentUser ? (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-avatar">👤</span>
                <span className="user-email">{currentUser.email}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <span className="btn-icon">🚪</span>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              {location.pathname !== "/login" && (
                <Link to="/login" className="nav-link auth-nav-link login-link" onClick={closeMobileMenu}>
                  <span className="nav-icon">🔑</span>
                  Login
                </Link>
              )}
              {location.pathname !== "/signup" && (
                <Link to="/signup" className="nav-link auth-nav-link signup-link" onClick={closeMobileMenu}>
                  <span className="nav-icon">📝</span>
                  Sign Up
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu}></div>}
      </nav>
    </header>
  )
}
