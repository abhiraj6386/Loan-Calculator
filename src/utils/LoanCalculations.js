export function calculateLoan(loanDetails) {
    const { principal, interestRate, termYears, termMonths } = loanDetails
    const totalMonths = termYears * 12 + termMonths
    const monthlyRate = interestRate / 100 / 12
  
    // Calculate monthly payment using the formula
    const monthlyPayment =
      monthlyRate === 0
        ? principal / totalMonths
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1)
  
    const schedule = []
    let remainingBalance = principal
    let totalInterest = 0
  
    for (let i = 1; i <= totalMonths; i++) {
      const interestPaid = remainingBalance * monthlyRate
      const principalPaid = monthlyPayment - interestPaid
      remainingBalance = Math.max(0, remainingBalance - principalPaid)
      totalInterest += interestPaid
  
      schedule.push({
        paymentNumber: i,
        principalPaid,
        interestPaid,
        remainingBalance,
        totalPayment: monthlyPayment,
      })
    }
  
    return {
      monthlyPayment,
      totalInterest,
      totalRepayment: principal + totalInterest,
      schedule,
    }
  }
  
  export function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }
  