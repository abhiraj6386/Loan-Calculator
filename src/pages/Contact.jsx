"use client"

import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock form submission
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="main-content">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with our team for support, feedback, or questions about our Loan Calculator.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h2>Get In Touch</h2>

          <div className="contact-item">
            <h3>Email</h3>
            <p>support@loancalculator.com</p>
            <p>info@loancalculator.com</p>
          </div>

          <div className="contact-item">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
            <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
          </div>

          <div className="contact-item">
            <h3>Address</h3>
            <p>
              123 Financial Street
              <br />
              Suite 456
              <br />
              New York, NY 10001
              <br />
              United States
            </p>
          </div>

          <div className="contact-item">
            <h3>Business Hours</h3>
            <p>
              Monday - Friday: 9:00 AM - 6:00 PM EST
              <br />
              Saturday: 10:00 AM - 4:00 PM EST
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send us a Message</h2>

          {submitted && <div className="success-message">Thank you for your message! We'll get back to you soon.</div>}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="name">Full Name *</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address *</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="subject">Subject *</label>
              <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Please describe your inquiry in detail..."
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
