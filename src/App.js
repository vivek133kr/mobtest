import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
function App() {
  const [mobileOperator, setMobileOperator] = useState("");

  useEffect(() => {
   
    const fetchMobileInfo = async () => {
      try {
        const response = await fetch(
          "https://api.ipdata.co/carrier?api-key=d45e27bf8e1bf87c780a0e478208df948ae60edd8a209022baca0e95"
        );
        const data = await response.json();
        console.log(data, " line 14")
        setMobileOperator(data.mobile.carrier || "Unknown");
      } catch (error) {
        console.error("Error fetching mobile information:", error);
      }
    };

    fetchMobileInfo();
  }, []);

  return (
    <div>
      <p>Mobile Operator: {mobileOperator}</p>
    </div>
  );
}

export default App;
