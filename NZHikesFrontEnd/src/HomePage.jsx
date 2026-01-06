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
            <button onClick={() => {localStorage.removeItem("userId");window.location.reload();}}>Logout</button>
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
            </tr>
          ))}
        </tbody>
      </table>

    </div >
  );


}
export default HomePage;
