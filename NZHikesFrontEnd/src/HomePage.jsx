import { useEffect, useState } from "react"; //hook for state and lifecycle
import { Link } from "react-router-dom"; //navigates without full page reload

function HomePage() {
  //list of hikes from the backend
  const [hikes, setHikes] = useState([]);
  const userId = localStorage.getItem("userId");
  const isLoggedIn = !!userId;



  //gets all hikes in the hikes DB
  useEffect(() => {
    fetch("http://localhost:5071/api/hikes")
      .then(response => response.json())
      .then(data => setHikes(data))
      .catch(err => console.error("Error fetching hikes:", err));
  }, []);
  // uses Shenandoah's √((Elevation Gain (ft) x 2) x Distance (miles)) to calculate difficulty
  function calculateScore(distanceKm, elevationMeters) {
    const elevationFeet = elevationMeters * 3.28084; //need to convert to feet
    const distanceMiles = distanceKm * 0.621371; //convert to miles

    return Math.sqrt((elevationFeet * 2) * distanceMiles);
  }

  //UI is conditional on if they are logged in or not
  return (
    <div className="page">
      <div className="header-bar">
        <div className="header-space"></div>
        <h1 className="header-title">New Zealand Hikes</h1>
        <Link to="/add-hike" className="add-hike-button"><button>Add Hike</button></Link>
        {isLoggedIn ? (
          <>
            <Link to="/stats"><button>My Completed</button></Link>
            <button onClick={() => { localStorage.removeItem("userId"); window.location.reload(); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register" className="register-button"><button>Register</button></Link>
          </>
        )}


      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Distance</th>
            <th>Elevation Gain</th>
            <th>Difficulty Score</th>
          </tr>
        </thead>
        <tbody>
          {hikes.map(hike => (
            <tr key={hike.id}>
              <td><Link to={`/hikes/${hike.id}`}>{hike.name}</Link></td>
              {/* Link to navigate to detailed view */}
              <td>{hike.region}</td>
              <td>{hike.distance}</td>
              <td>{hike.elevationGain}</td>
              <td>{calculateScore(hike.distance, hike.elevationGain).toFixed(1)}</td> 
              {/* to fixed used for formatting */}

            </tr>
          ))}
        </tbody>
      </table>

    </div >
  );


}
export default HomePage;
