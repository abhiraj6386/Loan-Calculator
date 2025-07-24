"use client"

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (error) {
      setError("Failed to log in: " + error.message)
    }

    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue</p>
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
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary auth-btn">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-links">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Create one here
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
