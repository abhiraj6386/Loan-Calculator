"use client"

import { useState, useEffect } from "react"
import { calculateLoan, formatCurrency } from "../../utils/LoanCalculations"
import AmortizationTable from "./AmortizationTable"
import SavedLoans from "./SavedLoans"
import PaymentReminders from "./PaymentReminders"

export default function LoanCalculator() {
  const [loanDetails, setLoanDetails] = useState({
    principal: 200000,
    interestRate: 4.5,
    termYears: 30,
    termMonths: 0,
  })

  const [loanSummary, setLoanSummary] = useState(null)
  const [activeTab, setActiveTab] = useState("calculator")

  useEffect(() => {
    const summary = calculateLoan(loanDetails)
    setLoanSummary(summary)
  }, [loanDetails])

  const handleInputChange = (field, value) => {
    setLoanDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="loan-calculator">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "calculator" ? "active" : ""}`}
          onClick={() => setActiveTab("calculator")}
        >
          Calculator
        </button>
        <button className={`tab ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>
          Saved Loans
        </button>
        <button
          className={`tab ${activeTab === "reminders" ? "active" : ""}`}
          onClick={() => setActiveTab("reminders")}
        >
          Payment Reminders
        </button>
      </div>

      {activeTab === "calculator" && (
        <div className="calculator-content">
          <div className="calculator-grid">
            <div className="input-section">
              <h2>Loan Details</h2>

              <div className="input-group">
                <label htmlFor="principal">Loan Amount ($)</label>
                <input
                  id="principal"
                  type="number"
                  value={loanDetails.principal}
                  onChange={(e) => handleInputChange("principal", Number(e.target.value))}
                  min="0"
                  step="1000"
                />
              </div>

              <div className="input-group">
                <label htmlFor="interestRate">Interest Rate (%)</label>
                <input
                  id="interestRate"
                  type="number"
                  value={loanDetails.interestRate}
                  onChange={(e) => handleInputChange("interestRate", Number(e.target.value))}
                  min="0"
                  max="30"
                  step="0.1"
                />
              </div>

              <div className="term-inputs">
                <div className="input-group">
                  <label htmlFor="termYears">Term (Years)</label>
                  <input
                    id="termYears"
                    type="number"
                    value={loanDetails.termYears}
                    onChange={(e) => handleInputChange("termYears", Number(e.target.value))}
                    min="0"
                    max="50"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="termMonths">Additional Months</label>
                  <input
                    id="termMonths"
                    type="number"
                    value={loanDetails.termMonths}
                    onChange={(e) => handleInputChange("termMonths", Number(e.target.value))}
                    min="0"
                    max="11"
                  />
                </div>
              </div>
            </div>

            {loanSummary && (
              <div className="summary-section">
                <h2>Loan Summary</h2>
                <div className="summary-card">
                  <div className="summary-item">
                    <span className="label">Monthly Payment:</span>
                    <span className="value primary">{formatCurrency(loanSummary.monthlyPayment)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Total Interest:</span>
                    <span className="value">{formatCurrency(loanSummary.totalInterest)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Total Repayment:</span>
                    <span className="value">{formatCurrency(loanSummary.totalRepayment)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {loanSummary && (
            <AmortizationTable schedule={loanSummary.schedule} loanDetails={loanDetails} loanSummary={loanSummary} />
          )}
        </div>
      )}

      {activeTab === "saved" && <SavedLoans onLoadLoan={setLoanDetails} currentLoanDetails={loanDetails} />}
      {activeTab === "reminders" && <PaymentReminders />}
    </div>
  )
}
