import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailedHike() {
  const { id } = useParams();
  const [hike, setHike] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5071/api/hikes/${id}`) //calls API off of ID
      .then(res => res.json())
      .then(data => {
        setHike(data); //stores the hike object
      })
  }, [id]);

if (!hike) return null; //was crashing on the initial load sometimes


  return (
    <div>
      <h1>{hike.name}</h1>
      <p>Region: {hike.region}</p>
      <p>Distance: {hike.distance} km</p>
      <p>Elevation Gain: {hike.elevationGain} m</p>
    </div>
  );
  
}

export default DetailedHike;
