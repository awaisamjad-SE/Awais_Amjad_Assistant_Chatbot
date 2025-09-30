import React, { useState } from "react";

export default function MealForm({ studentId }) {
  const [foodItem, setFoodItem] = useState("Chicken Curry");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const foodOptions = [
    { name: "Chicken Curry", price: 150 },
    { name: "Rice", price: 50 },
    { name: "Salad", price: 30 },
    { name: "Dal", price: 40 },
    { name: "Roti", price: 20 },
    { name: "Vegetable", price: 60 },
  ];



  const submitMeal = async () => {
    if (!studentId) {
      setMessage("❌ Please provide a student ID.");
      return;
    }

    const selectedFood = foodOptions.find((f) => f.name === foodItem);
    const totalPrice = selectedFood.price * quantity;

    setLoading(true);
    setMessage("");

    try {
      // Use proxy for both dev and production (Vercel handles the routing)
      const apiUrl = "/api/webhook/mess-log";

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          food_item: foodItem,
          quantity,
          unit_price: selectedFood.price,
          total_price: totalPrice,
          date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      setMessage("✅ Meal logged successfully!");
      setQuantity(1); // reset form
      setFoodItem("Chicken Curry");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error logging meal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      marginTop: 20, 
      padding: 20, 
      background: "#f9f9f9", 
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ color: "#333", marginBottom: "20px" }}>🍽️ Log Meal</h3>

      {/* Food Selection */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold", color: "#333" }}>
          🍽️ Food Item:&nbsp;
          <select 
            value={foodItem} 
            onChange={(e) => setFoodItem(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
              width: "100%",
              maxWidth: "300px"
            }}
          >
            {foodOptions.map((f) => (
              <option key={f.name} value={f.name}>
                {f.name} - ₹{f.price}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Quantity Input */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: "bold", color: "#333" }}>
          📊 Quantity:&nbsp;
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
            style={{ 
              width: "80px", 
              padding: "8px", 
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "16px",
              textAlign: "center"
            }}
          />
        </label>
        <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
          Total: ₹{foodOptions.find(f => f.name === foodItem)?.price * quantity || 0}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={submitMeal}
        disabled={loading || !studentId}
        style={{
          background: loading ? "#6c757d" : !studentId ? "#dc3545" : "#007bff",
          color: "white",
          padding: "12px 24px",
          borderRadius: 8,
          border: "none",
          cursor: loading || !studentId ? "not-allowed" : "pointer",
          width: "100%",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "background-color 0.3s ease"
        }}
      >
        {loading ? "⏳ Submitting..." : "✅ Submit Meal"}
      </button>

      {!studentId && (
        <p style={{ 
          color: "#dc3545", 
          fontSize: "14px", 
          marginTop: "10px",
          textAlign: "center"
        }}>
          ⚠️ Please scan your student QR code first
        </p>
      )}

      {message && (
        <div style={{ 
          marginTop: 15, 
          padding: "12px",
          borderRadius: "8px",
          backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
          color: message.includes("✅") ? "#155724" : "#721c24",
          border: message.includes("✅") ? "1px solid #c3e6cb" : "1px solid #f5c6cb"
        }}>
          {message}
        </div>
      )}
    </div>
  );
}
