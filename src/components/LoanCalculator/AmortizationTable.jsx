"use client"

import { useState } from "react"
import { formatCurrency } from "../../utils/loanCalculations"

export default function AmortizationTable({ schedule }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const totalPages = Math.ceil(schedule.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSchedule = schedule.slice(startIndex, endIndex)

  return (
    <div className="amortization-section">
      <div className="section-header">
        <h2>Amortization Schedule</h2>
        <div className="schedule-info">
          <span>Total Payments: {schedule.length}</span>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="amortization-table">
          <thead>
            <tr>
              <th>Payment #</th>
              <th>Payment Amount</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {currentSchedule.map((payment) => (
              <tr key={payment.paymentNumber}>
                <td>{payment.paymentNumber}</td>
                <td>{formatCurrency(payment.totalPayment)}</td>
                <td>{formatCurrency(payment.principalPaid)}</td>
                <td>{formatCurrency(payment.interestPaid)}</td>
                <td>{formatCurrency(payment.remainingBalance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
          Previous
        </button>

        <div className="page-numbers">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={currentPage === pageNum ? "active" : ""}
              >
                {pageNum}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
