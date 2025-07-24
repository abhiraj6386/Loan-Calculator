"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useAuth } from "../../contexts/AuthContext"

export default function PaymentReminders() {
  const [reminders, setReminders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newReminder, setNewReminder] = useState({
    loanName: "",
    amount: 0,
    dueDate: "",
    frequency: "monthly",
  })
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      loadReminders()
    } else {
      setLoading(false)
    }
  }, [currentUser])

  const loadReminders = async () => {
    if (!currentUser) {
      setLoading(false)
      return
    }

    try {
      const q = query(collection(db, "reminders"), where("userId", "==", currentUser.uid))
      const querySnapshot = await getDocs(q)
      const remindersList = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        remindersList.push({
          id: doc.id,
          ...data,
          dueDate: data.dueDate?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date(),
        })
      })
      setReminders(remindersList.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime()))
    } catch (error) {
      console.error("Error loading reminders:", error)
    } finally {
      setLoading(false)
    }
  }

  const addReminder = async () => {
    if (!newReminder.loanName.trim() || !newReminder.amount || !newReminder.dueDate || !currentUser) return

    try {
      await addDoc(collection(db, "reminders"), {
        ...newReminder,
        dueDate: new Date(newReminder.dueDate),
        userId: currentUser.uid,
        isActive: true,
        createdAt: new Date(),
      })
      setNewReminder({
        loanName: "",
        amount: 0,
        dueDate: "",
        frequency: "monthly",
      })
      setShowAddForm(false)
      loadReminders()
    } catch (error) {
      console.error("Error adding reminder:", error)
    }
  }

  const deleteReminder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reminder?")) return

    try {
      await deleteDoc(doc(db, "reminders", id))
      loadReminders()
    } catch (error) {
      console.error("Error deleting reminder:", error)
    }
  }

  const getUpcomingReminders = () => {
    const now = new Date()
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    return reminders.filter(
      (reminder) => reminder.isActive && reminder.dueDate >= now && reminder.dueDate <= thirtyDaysFromNow,
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  if (loading) {
    return <div className="loading">Loading payment reminders...</div>
  }

  if (!currentUser) {
    return (
      <div className="empty-state">
        <p>Please log in to manage payment reminders.</p>
      </div>
    )
  }

  const upcomingReminders = getUpcomingReminders()

  return (
    <div className="payment-reminders">
      <div className="section-header">
        <h2>Payment Reminders</h2>
        <button className="btn-primary" onClick={() => setShowAddForm(true)}>
          Add Reminder
        </button>
      </div>

      {upcomingReminders.length > 0 && (
        <div className="upcoming-section">
          <h3>Upcoming Payments (Next 30 Days)</h3>
          <div className="upcoming-list">
            {upcomingReminders.map((reminder) => (
              <div key={reminder.id} className="upcoming-item">
                <div className="reminder-info">
                  <span className="loan-name">{reminder.loanName}</span>
                  <span className="amount">{formatCurrency(reminder.amount)}</span>
                </div>
                <div className="due-date">Due: {reminder.dueDate.toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="add-form">
          <h3>Add Payment Reminder</h3>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="reminderLoanName">Loan Name</label>
              <input
                id="reminderLoanName"
                type="text"
                value={newReminder.loanName}
                onChange={(e) => setNewReminder((prev) => ({ ...prev, loanName: e.target.value }))}
                placeholder="e.g., Home Mortgage"
              />
            </div>

            <div className="input-group">
              <label htmlFor="reminderAmount">Payment Amount ($)</label>
              <input
                id="reminderAmount"
                type="number"
                value={newReminder.amount || ""}
                onChange={(e) => setNewReminder((prev) => ({ ...prev, amount: Number(e.target.value) }))}
                min="0"
                step="0.01"
              />
            </div>

            <div className="input-group">
              <label htmlFor="reminderDueDate">Due Date</label>
              <input
                id="reminderDueDate"
                type="date"
                value={newReminder.dueDate}
                onChange={(e) => setNewReminder((prev) => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>

            <div className="input-group">
              <label htmlFor="reminderFrequency">Frequency</label>
              <select
                id="reminderFrequency"
                value={newReminder.frequency}
                onChange={(e) => setNewReminder((prev) => ({ ...prev, frequency: e.target.value }))}
              >
                <option value="monthly">Monthly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button onClick={addReminder} className="btn-primary">
              Add Reminder
            </button>
            <button onClick={() => setShowAddForm(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="all-reminders">
        <h3>All Reminders</h3>
        {reminders.length === 0 ? (
          <div className="empty-state">
            <p>No payment reminders set. Add your first reminder!</p>
          </div>
        ) : (
          <div className="reminders-list">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="reminder-card">
                <div className="reminder-header">
                  <h4>{reminder.loanName}</h4>
                  <button onClick={() => deleteReminder(reminder.id)} className="btn-danger">
                    Delete
                  </button>
                </div>
                <div className="reminder-details">
                  <div className="detail-item">
                    <span>Amount:</span>
                    <span>{formatCurrency(reminder.amount)}</span>
                  </div>
                  <div className="detail-item">
                    <span>Due Date:</span>
                    <span>{reminder.dueDate.toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span>Frequency:</span>
                    <span className="capitalize">{reminder.frequency}</span>
                  </div>
                  <div className="detail-item">
                    <span>Status:</span>
                    <span className={reminder.isActive ? "active" : "inactive"}>
                      {reminder.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
