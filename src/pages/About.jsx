export default function About() {
    return (
      <main className="main-content">
        <div className="page-header">
          <h1>About Loan Calculator</h1>
        </div>
  
        <div className="content-section">
          <div className="about-content">
            <section>
              <h2>Our Mission</h2>
              <p>
                Our Loan Calculator app is designed to help individuals and families make informed financial decisions. We
                believe that understanding your loan terms and payment schedules is crucial for effective financial
                planning.
              </p>
            </section>
  
            <section>
              <h2>Features</h2>
              <ul>
                <li>
                  <strong>Accurate Calculations:</strong> Get precise monthly payment amounts, total interest, and
                  repayment totals
                </li>
                <li>
                  <strong>Detailed Amortization:</strong> View complete payment schedules showing principal and interest
                  breakdown
                </li>
                <li>
                  <strong>Loan Management:</strong> Save, edit, and compare multiple loan scenarios
                </li>
                <li>
                  <strong>Payment Reminders:</strong> Never miss a payment with our reminder system
                </li>
                <li>
                  <strong>Secure Authentication:</strong> Your data is protected with Firebase authentication
                </li>
                <li>
                  <strong>Responsive Design:</strong> Access your calculations on any device, anywhere
                </li>
              </ul>
            </section>
  
            <section>
              <h2>How It Works</h2>
              <p>
                Simply enter your loan amount, interest rate, and term length. Our calculator uses standard financial
                formulas to compute your monthly payments and generate a complete amortization schedule. You can adjust
                parameters in real-time to see how changes affect your payments.
              </p>
            </section>
  
            <section>
              <h2>Privacy & Security</h2>
              <p>
                Your financial data is important to us. All calculations are performed securely, and any saved loan
                information is stored with industry-standard encryption using Firebase. We never share your personal
                financial information with third parties.
              </p>
            </section>
  
            <section>
              <h2>Get Started</h2>
              <p>
                Ready to take control of your loan planning? Create an account or log in to start exploring your options.
                Whether you're planning a mortgage, auto loan, or personal loan, we're here to help you understand the
                numbers.
              </p>
            </section>
          </div>
        </div>
      </main>
    )
  }
  