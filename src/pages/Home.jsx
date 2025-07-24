import LoanCalculator from "../components/LoanCalculator/LoanCalculator"
import ProtectedRoute from "../components/ProtectedRoute"

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="main-content">
        <div className="hero-section">
          <h1>Loan Calculator</h1>
          <p>Calculate your loan payments, view amortization schedules, and manage your loans with ease.</p>
        </div>
        <LoanCalculator />
      </main>
    </ProtectedRoute>
  )
}
