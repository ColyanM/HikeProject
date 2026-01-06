import { useEffect, useState } from "react"; //hook for state and lifecycle
import { Link } from "react-router-dom"; //navigates without full page reload

function Stats() {
  const [hikes, setHikes] = useState([]);
  const userId = localStorage.getItem("userId");
  const isLoggedIn = !!userId;
  const totalHikes = hikes.length;

  const totalMinutes = hikes.reduce((sum, h) => sum + (Number(h.minutesTaken) || 0), 0);
  const totalDistance = hikes.reduce((sum, h) => sum + (Number(h.distance) || 0), 0);
  const totalElevation = hikes.reduce((sum, h) => sum + (Number(h.elevationGain) || 0), 0);



  useEffect(() => {
    fetch(`http://localhost:5071/api/hikes/users/${userId}/completed-details`)
      .then(async (res) => {
        const text = await res.text();
        console.log("status:", res.status);
        console.log("raw body:", text);

        if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
        if (!text) return [];

        return JSON.parse(text);
      })
      .then(data => setHikes(data))
      .catch(err => console.error("Error fetching completed hikes:", err));
  }, [userId]);

  const longestTime = hikes.reduce(
    (best, h) => (Number(h.minutesTaken) || 0) > (Number(best?.minutesTaken) || 0) ? h : best,
    null
  );

  const longestDistance = hikes.reduce(
    (best, h) => (Number(h.distance) || 0) > (Number(best?.distance) || 0) ? h : best,
    null
  );

  const longestElevation = hikes.reduce(
    (best, h) => (Number(h.elevationGain) || 0) > (Number(best?.elevationGain) || 0) ? h : best,
    null
  );

  return (
    <div className="page">
      <div className="header-bar">
        <div className="header-space"></div>
        <h1 className="header-title">Your completed hikes</h1>
        <Link to="/"><button>Back to home</button></Link>

      </div>
      <div style={{ margin: "16px 0" }}>
        <h2>Totals</h2>
        <p>Total hikes: {totalHikes}</p>
        <p>Total time: {totalMinutes} minutes</p>
        <p>Total distance: {totalDistance} km</p>
        <p>Total elevation: {totalElevation} m</p>

        <h2>Personal bests</h2>

        {longestTime && (
          <p>
            Longest time:{" "}
            <Link to={`/hikes/${longestTime.hikeId}`}>{longestTime.name}</Link>{" "}
            ({longestTime.minutesTaken} min)
          </p>
        )}

        {longestDistance && (
          <p>
            Longest distance:{" "}
            <Link to={`/hikes/${longestDistance.hikeId}`}>{longestDistance.name}</Link>{" "}
            ({longestDistance.distance} km)
          </p>
        )}

        {longestElevation && (
          <p>
            Most elevation:{" "}
            <Link to={`/hikes/${longestElevation.hikeId}`}>{longestElevation.name}</Link>{" "}
            ({longestElevation.elevationGain} m)
          </p>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Distance</th>
            <th>Elevation Gain</th>
            <th>Date</th>
            <th>Minutes</th>
            <th>Notes</th>

          </tr>
        </thead>
        <tbody>
          {hikes.map(row => (
            <tr key={row.completedId}>
              <td><Link to={`/hikes/${row.hikeId}`}>{row.name}</Link></td>
              <td>{row.region}</td>
              <td>{row.distance}</td>
              <td>{row.elevationGain}</td>
              <td>{row.dateCompleted}</td>
              <td>{row.minutesTaken}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );


}
export default Stats;
