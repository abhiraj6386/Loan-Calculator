import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Loan Calculator</h3>
          <p>Your trusted partner for loan calculations and financial planning.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Calculator</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="mailto:support@loancalculator.com">Email Support</a>
            </li>
            <li>
              <a href="tel:+15551234567">Phone Support</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Loan Calculator. All rights reserved.</p>
      </div>
    </footer>
  )
}
