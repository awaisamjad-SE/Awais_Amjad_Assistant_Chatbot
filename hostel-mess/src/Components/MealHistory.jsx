import React, { useState, useEffect } from "react";

export default function MealHistory({ studentId }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? dateString
        : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return dateString;
    }
  };

  const fetchMealHistory = async () => {
    if (!studentId || studentId.toString().trim() === "") {
      setError("Please provide a valid student ID.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Ensure exact student ID matching - no partial IDs
      const exactStudentId = studentId.toString().trim();
      console.log("🔍 Fetching for EXACT student ID:", exactStudentId);
      
      const apiUrl = `/api/webhook/4d9d546e-220a-45ae-9c50-5f9336856494/get-meals/${encodeURIComponent(exactStudentId)}`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ 
          student_id: exactStudentId, // Use exact ID, not converted
          request_type: "fetch_meals" 
        }),
      });
      
      console.log("📤 Request sent for student ID:", exactStudentId);

      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

      const data = await res.json();

      let parsed = data;
      if (Array.isArray(data) && data[0]?.output) {
        parsed = JSON.parse(data[0].output);
      }

      if (parsed.meals && Array.isArray(parsed.meals)) {
        setMeals(parsed.meals);
      } else {
        setMeals([]);
        setError("No meals found for this student.");
      }
    } catch (err) {
      setError(err.message || "Error fetching meal history");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = meals.reduce((sum, m) => sum + (Number(m.total_price) || 0), 0);

  return (
    <div style={{ padding: 20, background: "white", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", margin: "20px 0" }}>
      <h3 style={{ marginBottom: 20 }}>Meal History {studentId && `(Student: ${studentId})`}</h3>

      <button
        onClick={fetchMealHistory}
        disabled={loading}
        style={{
          background: loading ? "#6c757d" : "#007bff",
          color: "white",
          padding: "10px 20px",
          borderRadius: 6,
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: 20,
        }}
      >
        {loading ? "Loading..." : "Show My Meals"}
      </button>

      {error && <div style={{ color: "#b00020", marginBottom: 20 }}>{error}</div>}

      {!loading && meals.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#007bff", color: "white" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Food Item</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Qty</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Total Price</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{meal.food_item}</td>
                <td style={{ padding: "8px" }}>{meal.quantity}</td>
                <td style={{ padding: "8px" }}>₹{Number(meal.total_price).toFixed(2)}</td>
                <td style={{ padding: "8px" }}>{formatDate(meal.date)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: "#f8f9fa", fontWeight: "bold" }}>
              <td colSpan="2" style={{ padding: "10px" }}>Total Spent</td>
              <td style={{ padding: "10px" }}>₹{totalSpent.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      )}

      {!loading && meals.length === 0 && !error && studentId && (
        <div style={{ color: "#666", marginTop: 20 }}>No meals found.</div>
      )}
    </div>
  );
}
