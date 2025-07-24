"use client"

import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { useNavigate, Link } from "react-router-dom"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long")
    }

    try {
      setError("")
      setLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (error) {
      setError("Failed to create account: " + error.message)
    }

    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join us to start managing your loans</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a password (min 6 characters)"
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary auth-btn">
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-links">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="auth-footer">
            <Link to="/about" className="footer-link">
              About
            </Link>
            <span className="separator">•</span>
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
