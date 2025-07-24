"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useAuth } from "../../contexts/AuthContext"
import { calculateLoan, formatCurrency } from "../../utils/LoanCalculations"

export default function SavedLoans({ onLoadLoan, currentLoanDetails }) {
  const [savedLoans, setSavedLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [showSaveForm, setShowSaveForm] = useState(false)
  const [loanName, setLoanName] = useState("")
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      loadSavedLoans()
    }
  }, [currentUser])

  const loadSavedLoans = async () => {
    try {
      const q = query(collection(db, "loans"), where("userId", "==", currentUser.uid))
      const querySnapshot = await getDocs(q)
      const loans = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        loans.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        })
      })
      setSavedLoans(loans.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
    } catch (error) {
      console.error("Error loading saved loans:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveLoan = async () => {
    if (!loanName.trim() || !currentLoanDetails) return

    try {
      await addDoc(collection(db, "loans"), {
        ...currentLoanDetails,
        name: loanName,
        userId: currentUser.uid,
        createdAt: new Date(),
      })
      setLoanName("")
      setShowSaveForm(false)
      loadSavedLoans()
    } catch (error) {
      console.error("Error saving loan:", error)
    }
  }

  const deleteLoan = async (id) => {
    if (!window.confirm("Are you sure you want to delete this loan?")) return

    try {
      await deleteDoc(doc(db, "loans", id))
      loadSavedLoans()
    } catch (error) {
      console.error("Error deleting loan:", error)
    }
  }

  const loadLoan = (loan) => {
    const { id, name, createdAt, userId, ...loanDetails } = loan
    onLoadLoan(loanDetails)
  }

  if (loading) {
    return <div className="loading">Loading saved loans...</div>
  }

  return (
    <div className="saved-loans">
      <div className="section-header">
        <h2>Saved Loans</h2>
        <button className="btn-primary" onClick={() => setShowSaveForm(true)} disabled={!currentLoanDetails}>
          Save Current Loan
        </button>
      </div>

      {showSaveForm && (
        <div className="save-form">
          <h3>Save Current Loan</h3>
          <div className="input-group">
            <label htmlFor="loanName">Loan Name</label>
            <input
              id="loanName"
              type="text"
              value={loanName}
              onChange={(e) => setLoanName(e.target.value)}
              placeholder="e.g., Home Mortgage, Car Loan"
            />
          </div>
          <div className="form-actions">
            <button onClick={saveLoan} className="btn-primary">
              Save
            </button>
            <button onClick={() => setShowSaveForm(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="loans-grid">
        {savedLoans.length === 0 ? (
          <div className="empty-state">
            <p>No saved loans yet. Save your first loan calculation!</p>
          </div>
        ) : (
          savedLoans.map((loan) => {
            const summary = calculateLoan(loan)
            return (
              <div key={loan.id} className="loan-card">
                <div className="loan-header">
                  <h3>{loan.name}</h3>
                  <div className="loan-actions">
                    <button onClick={() => loadLoan(loan)} className="btn-secondary">
                      Load
                    </button>
                    <button onClick={() => deleteLoan(loan.id)} className="btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="loan-details">
                  <div className="detail-item">
                    <span>Principal:</span>
                    <span>{formatCurrency(loan.principal)}</span>
                  </div>
                  <div className="detail-item">
                    <span>Interest Rate:</span>
                    <span>{loan.interestRate}%</span>
                  </div>
                  <div className="detail-item">
                    <span>Term:</span>
                    <span>
                      {loan.termYears}y {loan.termMonths}m
                    </span>
                  </div>
                  <div className="detail-item highlight">
                    <span>Monthly Payment:</span>
                    <span>{formatCurrency(summary.monthlyPayment)}</span>
                  </div>
                </div>
                <div className="loan-date">Saved: {loan.createdAt.toLocaleDateString()}</div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
