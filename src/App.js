import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
function App() {
  const [mobileOperator, setMobileOperator] = useState("");
  const [networkType, setNetworkType] = useState("");
  const [effectiveType, setEffectiveType] = useState("");
 const [mobileInfo, setMobileInfo] = useState(null);
  useEffect(() => {
      const getMobileInfo = () => {
        const { userAgent, platform } = navigator;

        // Check if the user is on a mobile device
        const isMobile = /Mobile/.test(userAgent);

        // Get the device information
        const device = isMobile ? "Mobile Device" : "Desktop";

        // Set the mobile information in state
        setMobileInfo({
          userAgent,
          platform,
          isMobile,
          device,
        });
      };

      getMobileInfo();
    const handleNetworkChange = () => {
      const { connection } = navigator;
      console.log(navigator, "checking navigaor")
      if (connection) {
        setNetworkType(connection.type || "");
        setEffectiveType(connection.effectiveType || "");
      }
    };

    handleNetworkChange();

    // Add an event listener to detect network changes
    navigator.connection.addEventListener("change", handleNetworkChange);

    // Cleanup the event listener on component unmount
    return () => {
      navigator.connection.removeEventListener("change", handleNetworkChange);
    };
  }, []);
  
  useEffect(() => {
   
    const fetchMobileInfo = async () => {
      try {
        const response = await fetch(
          "https://api.ipdata.co?api-key=d45e27bf8e1bf87c780a0e478208df948ae60edd8a209022baca0e95"
        );
        const data = await response.json();
        console.log(data, " line 14")
        setMobileOperator(data.carrier.name || "Unknown");
      } catch (error) {
        console.error("Error fetching mobile information:", error);
      }
    };

    fetchMobileInfo();
  }, []);

  return (
    <div>
      <p>Mobile Operator: {mobileOperator}</p>
      <p>Network Type: {networkType}</p>
      <p>Effective Network Type: {effectiveType}</p>
      {mobileInfo ? (
        <div>
          <h2>Mobile Information:</h2>
          <p>User Agent: {mobileInfo.userAgent}</p>
          <p>Platform: {mobileInfo.platform}</p>
          <p>Is Mobile: {mobileInfo.isMobile ? "Yes" : "No"}</p>
          <p>Device: {mobileInfo.device}</p>
        </div>
      ) : (
        <p>Loading mobile information...</p>
      )}
    </div>
  );
}

export default App;
