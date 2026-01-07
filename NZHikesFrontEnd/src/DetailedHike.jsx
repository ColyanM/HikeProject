import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function DetailedHike() {
  const { id } = useParams(); //pulled from URL
  const [hike, setHike] = useState(null);
  const [minutesTaken, setMinutesTaken] = useState("");
  const [notes, setNotes] = useState("");
  const userId = localStorage.getItem("userId");
  const isLoggedIn = !!userId;
  const navigate = useNavigate(); //allows the form to go back to the user page



  useEffect(() => {
    fetch(`http://localhost:5071/api/hikes/${id}`) //calls API off of ID
      .then(res => res.json())
      .then(data => {
        setHike(data); //stores the hike object
      })
  }, [id]);
  if (!hike) return null; //was crashing on the initial load sometimes

  const handleComplete = async (e) => {

    e.preventDefault();
    //sends the hike o the completed hikes 
    const res = await fetch("http://localhost:5071/api/hikes/completed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: Number(userId),
        hikeId: Number(id),
        dateCompleted: new Date().toISOString(),
        minutesTaken: Number(minutesTaken),
        notes: notes
      })
    });
    if (res.ok) {
      navigate("/stats");
    }
  };

  return (
    <div className="page">
      <h1>{hike.name}

      </h1>
      <p>Region: {hike.region}</p>
      <p>Distance: {hike.distance} km</p>
      <p>Elevation Gain: {hike.elevationGain} m</p>

      <div className="form-actions">
        <Link to="/"><button>Back to home</button></Link>
      </div>

      {/* This shouldn't be needed because it doesn't show unless you login but just in case */}
      {isLoggedIn ? (
        <>
          <h2>Complete Hike</h2>
          <form onSubmit={handleComplete}>
            <input
              type="number"
              placeholder="Minutes taken"
              value={minutesTaken}
              onChange={e => setMinutesTaken(e.target.value)}
            />
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <div className="form-actions">
              <button type="submit">Complete</button>
            </div>
          </form>

        </>
      ) : (
        <div className="form-actions">
          <Link to="/login">
            <button>Login to complete hike</button>
          </Link>
        </div>

      )}


    </div>
  );

}

export default DetailedHike;
