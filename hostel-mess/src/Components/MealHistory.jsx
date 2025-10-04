import React, { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function MealHistory({ studentId }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Filter states
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    foodItem: "",
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    maxQuantity: "",
    sortBy: "date",
    sortOrder: "desc"
  });
  
  const [showGraphs, setShowGraphs] = useState(false);

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

  // Filter and sort meals
  const filteredMeals = useMemo(() => {
    let filtered = [...meals];

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(meal => {
        const mealDate = new Date(meal.date || meal.timestamp);
        const fromDate = new Date(filters.dateFrom);
        return mealDate >= fromDate;
      });
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(meal => {
        const mealDate = new Date(meal.date || meal.timestamp);
        const toDate = new Date(filters.dateTo);
        return mealDate <= toDate;
      });
    }

    // Food item filter
    if (filters.foodItem) {
      filtered = filtered.filter(meal =>
        meal.food_item?.toLowerCase().includes(filters.foodItem.toLowerCase())
      );
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(meal => 
        parseFloat(meal.total_price) >= parseFloat(filters.minPrice)
      );
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(meal => 
        parseFloat(meal.total_price) <= parseFloat(filters.maxPrice)
      );
    }

    // Quantity range filter
    if (filters.minQuantity) {
      filtered = filtered.filter(meal => 
        parseInt(meal.quantity) >= parseInt(filters.minQuantity)
      );
    }
    
    if (filters.maxQuantity) {
      filtered = filtered.filter(meal => 
        parseInt(meal.quantity) <= parseInt(filters.maxQuantity)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case "date":
          aValue = new Date(a.date || a.timestamp);
          bValue = new Date(b.date || b.timestamp);
          break;
        case "price":
          aValue = parseFloat(a.total_price);
          bValue = parseFloat(b.total_price);
          break;
        case "quantity":
          aValue = parseInt(a.quantity);
          bValue = parseInt(b.quantity);
          break;
        case "foodItem":
          aValue = a.food_item?.toLowerCase() || "";
          bValue = b.food_item?.toLowerCase() || "";
          break;
        default:
          aValue = a.date || a.timestamp;
          bValue = b.date || b.timestamp;
      }

      if (filters.sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [meals, filters]);

  // Chart data preparation
  const chartData = useMemo(() => {
    const foodItems = {};
    const dailySpending = {};
    const monthlySpending = {};
    
    filteredMeals.forEach(meal => {
      const price = parseFloat(meal.total_price) || 0;
      const quantity = parseInt(meal.quantity) || 1;
      const foodItem = meal.food_item || 'Unknown';
      
      // Food items aggregation
      if (foodItems[foodItem]) {
        foodItems[foodItem].quantity += quantity;
        foodItems[foodItem].totalPrice += price;
        foodItems[foodItem].count += 1;
      } else {
        foodItems[foodItem] = {
          quantity,
          totalPrice: price,
          count: 1
        };
      }
      
      // Daily spending
      const date = new Date(meal.date || meal.timestamp);
      const dateKey = date.toISOString().split('T')[0];
      dailySpending[dateKey] = (dailySpending[dateKey] || 0) + price;
      
      // Monthly spending
      const monthKey = date.toISOString().substring(0, 7); // YYYY-MM
      monthlySpending[monthKey] = (monthlySpending[monthKey] || 0) + price;
    });

    return {
      foodItems,
      dailySpending,
      monthlySpending
    };
  }, [filteredMeals]);

  // Chart configurations
  const getFoodItemsChart = () => {
    const labels = Object.keys(chartData.foodItems);
    const quantities = labels.map(item => chartData.foodItems[item].quantity);
    const prices = labels.map(item => chartData.foodItems[item].totalPrice);

    return {
      bar: {
        labels,
        datasets: [
          {
            label: 'Total Quantity',
            data: quantities,
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: 'Total Price (₹)',
            data: prices,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            yAxisID: 'y1'
          }
        ]
      },
      pie: {
        labels,
        datasets: [
          {
            label: 'Spending by Food Item',
            data: prices,
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 205, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
            ],
            borderWidth: 2
          }
        ]
      }
    };
  };

  const getSpendingTrendChart = () => {
    const dailyLabels = Object.keys(chartData.dailySpending).sort();
    const dailyData = dailyLabels.map(date => chartData.dailySpending[date]);
    
    const monthlyLabels = Object.keys(chartData.monthlySpending).sort();
    const monthlyData = monthlyLabels.map(month => chartData.monthlySpending[month]);

    return {
      daily: {
        labels: dailyLabels,
        datasets: [
          {
            label: 'Daily Spending (₹)',
            data: dailyData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      monthly: {
        labels: monthlyLabels,
        datasets: [
          {
            label: 'Monthly Spending (₹)',
            data: monthlyData,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.4,
            fill: true
          }
        ]
      }
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Meal Statistics'
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
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

      const responseText = await res.text();
      console.log("Raw response:", responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
      }
      
      let meals = [];
      
      // Handle the complex nested response format
      if (Array.isArray(data) && data.length > 0 && data[0].output) {
        try {
          // Remove markdown code blocks if present
          const cleanOutput = data[0].output.replace(/```json\n|\n```/g, '');
          const parsedOutput = JSON.parse(cleanOutput);
          
          if (Array.isArray(parsedOutput) && parsedOutput[0]?.output) {
            const finalOutput = parsedOutput[0].output;
            
            // Check if the response is valid
            if (finalOutput.valid === true) {
              meals = finalOutput.meals || [];
            } else {
              // Handle error case
              const errorMessage = finalOutput.error || "Student not found";
              throw new Error(errorMessage);
            }
          }
        } catch (innerError) {
          console.error("Error parsing nested response:", innerError);
          throw new Error(innerError.message || "Failed to parse meal data");
        }
      } else if (data.meals && Array.isArray(data.meals)) {
        meals = data.meals;
      } else if (Array.isArray(data)) {
        meals = data;
      }

      if (meals && meals.length > 0) {
        setMeals(meals);
        setError("");
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

  const totalSpent = filteredMeals.reduce((sum, m) => sum + (Number(m.total_price) || 0), 0);
  const totalFilteredMeals = filteredMeals.length;

  const filterStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #dee2e6"
  };

  const inputStyle = {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px"
  };

  const buttonStyle = {
    background: "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
    marginBottom: "10px"
  };

  return (
    <div style={{ padding: 20, background: "white", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", margin: "20px 0" }}>
      <h3 style={{ marginBottom: 20 }}>📋 Meal History {studentId && `(Student: ${studentId})`}</h3>

      <button
        onClick={fetchMealHistory}
        disabled={loading}
        style={{
          ...buttonStyle,
          background: loading ? "#6c757d" : "#007bff",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: 20,
        }}
      >
        {loading ? "Loading..." : "🔍 Fetch My Meals"}
      </button>

      {error && <div style={{ color: "#b00020", marginBottom: 20, padding: "10px", backgroundColor: "#ffebee", borderRadius: "4px" }}>❌ {error}</div>}

      {!loading && meals.length > 0 && (
        <>
          {/* Filter Controls */}
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ marginBottom: "15px", color: "#007bff" }}>🔧 Filters & Analytics</h4>
            
            <div style={filterStyle}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>📅 Date From:</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>📅 Date To:</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>🍽️ Food Item:</label>
                <input
                  type="text"
                  placeholder="Search food item..."
                  value={filters.foodItem}
                  onChange={(e) => setFilters({...filters, foodItem: e.target.value})}
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>💰 Min Price:</label>
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>💰 Max Price:</label>
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>📊 Min Quantity:</label>
                <input
                  type="number"
                  placeholder="Min qty"
                  value={filters.minQuantity}
                  onChange={(e) => setFilters({...filters, minQuantity: e.target.value})}
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>📊 Max Quantity:</label>
                <input
                  type="number"
                  placeholder="Max qty"
                  value={filters.maxQuantity}
                  onChange={(e) => setFilters({...filters, maxQuantity: e.target.value})}
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>🔄 Sort By:</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  style={inputStyle}
                >
                  <option value="date">Date</option>
                  <option value="price">Price</option>
                  <option value="quantity">Quantity</option>
                  <option value="foodItem">Food Item</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>⬆️⬇️ Order:</label>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => setFilters({...filters, sortOrder: e.target.value})}
                  style={inputStyle}
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => setFilters({
                  dateFrom: "", dateTo: "", foodItem: "", minPrice: "", maxPrice: "",
                  minQuantity: "", maxQuantity: "", sortBy: "date", sortOrder: "desc"
                })}
                style={{ ...buttonStyle, background: "#6c757d" }}
              >
                🔄 Clear Filters
              </button>
              
              <button
                onClick={() => setShowGraphs(!showGraphs)}
                style={{ ...buttonStyle, background: showGraphs ? "#28a745" : "#17a2b8" }}
              >
                {showGraphs ? "📊 Hide Charts" : "📈 Show Charts"}
              </button>
            </div>
          </div>

          {/* Statistics Summary */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "15px", 
            marginBottom: "20px" 
          }}>
            <div style={{ 
              padding: "15px", 
              backgroundColor: "#e3f2fd", 
              borderRadius: "8px", 
              textAlign: "center",
              border: "1px solid #bbdefb"
            }}>
              <h4 style={{ margin: "0 0 10px 0", color: "#1976d2" }}>📊 Total Meals</h4>
              <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>{totalFilteredMeals}</p>
            </div>
            
            <div style={{ 
              padding: "15px", 
              backgroundColor: "#e8f5e8", 
              borderRadius: "8px", 
              textAlign: "center",
              border: "1px solid #c8e6c9"
            }}>
              <h4 style={{ margin: "0 0 10px 0", color: "#388e3c" }}>💰 Total Spent</h4>
              <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>₹{totalSpent.toFixed(2)}</p>
            </div>
            
            <div style={{ 
              padding: "15px", 
              backgroundColor: "#fff3e0", 
              borderRadius: "8px", 
              textAlign: "center",
              border: "1px solid #ffcc02"
            }}>
              <h4 style={{ margin: "0 0 10px 0", color: "#f57c00" }}>📈 Avg Per Meal</h4>
              <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
                ₹{totalFilteredMeals > 0 ? (totalSpent / totalFilteredMeals).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>

          {/* Charts Section */}
          {showGraphs && filteredMeals.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <h4 style={{ marginBottom: "20px", color: "#007bff" }}>📊 Visual Analytics</h4>
              
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: window.innerWidth > 768 ? "1fr 1fr" : "1fr", 
                gap: "20px",
                marginBottom: "20px"
              }}>
                {/* Food Items Bar Chart */}
                <div style={{ 
                  padding: "20px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "8px",
                  border: "1px solid #dee2e6"
                }}>
                  <h5 style={{ marginBottom: "15px", textAlign: "center" }}>🍽️ Food Items Analysis</h5>
                  <Bar 
                    data={getFoodItemsChart().bar} 
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: { display: true, text: 'Quantity vs Price by Food Item' }
                      }
                    }} 
                  />
                </div>

                {/* Spending Pie Chart */}
                <div style={{ 
                  padding: "20px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "8px",
                  border: "1px solid #dee2e6"
                }}>
                  <h5 style={{ marginBottom: "15px", textAlign: "center" }}>🥧 Spending Distribution</h5>
                  <Pie 
                    data={getFoodItemsChart().pie} 
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: 'Money Spent by Food Type' }
                      }
                    }} 
                  />
                </div>
              </div>

              {/* Spending Trends */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: window.innerWidth > 768 ? "1fr 1fr" : "1fr", 
                gap: "20px"
              }}>
                {/* Daily Spending Trend */}
                <div style={{ 
                  padding: "20px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "8px",
                  border: "1px solid #dee2e6"
                }}>
                  <h5 style={{ marginBottom: "15px", textAlign: "center" }}>📅 Daily Spending Trend</h5>
                  <Line 
                    data={getSpendingTrendChart().daily} 
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Daily Spending Pattern' }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: { display: true, text: 'Amount (₹)' }
                        },
                        x: {
                          title: { display: true, text: 'Date' }
                        }
                      }
                    }} 
                  />
                </div>

                {/* Monthly Spending Trend */}
                <div style={{ 
                  padding: "20px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "8px",
                  border: "1px solid #dee2e6"
                }}>
                  <h5 style={{ marginBottom: "15px", textAlign: "center" }}>📊 Monthly Spending Trend</h5>
                  <Line 
                    data={getSpendingTrendChart().monthly} 
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Monthly Spending Overview' }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: { display: true, text: 'Amount (₹)' }
                        },
                        x: {
                          title: { display: true, text: 'Month' }
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Meal Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr style={{ background: "#007bff", color: "white" }}>
                  <th style={{ padding: "12px", textAlign: "left", cursor: "pointer" }} 
                      onClick={() => setFilters({...filters, sortBy: "foodItem", sortOrder: filters.sortOrder === "asc" ? "desc" : "asc"})}>
                    🍽️ Food Item {filters.sortBy === "foodItem" && (filters.sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", cursor: "pointer" }}
                      onClick={() => setFilters({...filters, sortBy: "quantity", sortOrder: filters.sortOrder === "asc" ? "desc" : "asc"})}>
                    📊 Qty {filters.sortBy === "quantity" && (filters.sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th style={{ padding: "12px", textAlign: "left" }}>💰 Unit Price</th>
                  <th style={{ padding: "12px", textAlign: "left", cursor: "pointer" }}
                      onClick={() => setFilters({...filters, sortBy: "price", sortOrder: filters.sortOrder === "asc" ? "desc" : "asc"})}>
                    💵 Total Price {filters.sortBy === "price" && (filters.sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", cursor: "pointer" }}
                      onClick={() => setFilters({...filters, sortBy: "date", sortOrder: filters.sortOrder === "asc" ? "desc" : "asc"})}>
                    📅 Date {filters.sortBy === "date" && (filters.sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMeals.map((meal, i) => (
                  <tr key={i} style={{ 
                    borderBottom: "1px solid #eee",
                    backgroundColor: i % 2 === 0 ? "#f8f9fa" : "white"
                  }}>
                    <td style={{ padding: "10px", fontWeight: "500" }}>{meal.food_item}</td>
                    <td style={{ padding: "10px" }}>{meal.quantity}</td>
                    <td style={{ padding: "10px" }}>₹{Number(meal.unit_price || 0).toFixed(2)}</td>
                    <td style={{ padding: "10px", fontWeight: "bold", color: "#28a745" }}>₹{Number(meal.total_price).toFixed(2)}</td>
                    <td style={{ padding: "10px" }}>{formatDate(meal.date || meal.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: "#28a745", color: "white", fontWeight: "bold" }}>
                  <td colSpan="3" style={{ padding: "12px" }}>📊 Filtered Total ({totalFilteredMeals} meals)</td>
                  <td style={{ padding: "12px" }}>₹{totalSpent.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}

      {!loading && meals.length === 0 && !error && studentId && (
        <div style={{ 
          color: "#666", 
          marginTop: 20, 
          textAlign: "center",
          padding: "40px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px"
        }}>
          📭 No meals found for this student.
        </div>
      )}
    </div>
  );
}
