import { useEffect, useState } from "react";

function Dashboard() {

  const [data, setData] = useState({
    victims: 0,
    drones: 0,
    alerts: 0,
    missions: 0,
  });

  useEffect(() => {

    fetch("http://127.0.0.1:8000/dashboard")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });

  }, []);

  return (

    <div style={{ padding: "30px" }}>

      <h1>Mission Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        <div style={{background:"#ef4444",padding:"20px",color:"white",borderRadius:"10px"}}>
          <h2>Victims</h2>
          <h1>{data.victims}</h1>
        </div>

        <div style={{background:"#3b82f6",padding:"20px",color:"white",borderRadius:"10px"}}>
          <h2>Drones</h2>
          <h1>{data.drones}</h1>
        </div>

        <div style={{background:"#f59e0b",padding:"20px",color:"white",borderRadius:"10px"}}>
          <h2>Alerts</h2>
          <h1>{data.alerts}</h1>
        </div>

        <div style={{background:"#22c55e",padding:"20px",color:"white",borderRadius:"10px"}}>
          <h2>Missions</h2>
          <h1>{data.missions}</h1>
        </div>

      </div>

    </div>

  );

}

export default Dashboard;