import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function DetailedHike() {
  const { id } = useParams();
  const [hike, setHike] = useState(null);
  const [minutesTaken, setMinutesTaken] = useState("");
  const [notes, setNotes] = useState("");
  const userId = localStorage.getItem("userId");
  const isLoggedIn = !!userId;



  useEffect(() => {
    fetch(`http://localhost:5071/api/hikes/${id}`) //calls API off of ID
      .then(res => res.json())
      .then(data => {
        setHike(data); //stores the hike object
      })
  }, [id]);
  if (!hike) return null; //was crashing on the initial load sometimes

  const handleComplete = (e) => {

    e.preventDefault();

    fetch("http://localhost:5071/api/hikes/completed", {
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
  };


  return (
    <div>
      <h1>{hike.name}
        <Link to="/"><button>Back to home</button></Link>

      </h1>
      <p>Region: {hike.region}</p>
      <p>Distance: {hike.distance} km</p>
      <p>Elevation Gain: {hike.elevationGain} m</p>

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
            <button type="submit">Complete</button>
          </form>
        </>
      ) : (
        <p>Please log in to mark this hike as completed.</p>
      )}


    </div>
  );

}

export default DetailedHike;
