import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function AddHike() {

  const [createName, setCreateName] = useState("");
  const [createRegion, setCreateRegion] = useState("");
  const [createDistance, setCreateDistance] = useState("");
  const [createElevationGain, setCreateElevationGain] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); //allows the form to go back to the home page


//form submission
  async function handleCreate(e) {
    e.preventDefault();
//making a new hike object
    const newHike = {
      name: createName,
      region: createRegion,
      distance: Number(createDistance),
      elevationGain: Number(createElevationGain)
    };
//post request to DB to make and add the object
    const res = await fetch("http://localhost:5071/api/hikes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHike)
    });
//Clears the form and displays success or failure
    if (res.ok) {
      // setMessage("Hike created successfully.");
      setCreateName("");
      setCreateRegion("");
      setCreateDistance("");
      setCreateElevationGain("");
      navigate("/");
    } else {
      setMessage("Error creating hike.");
    }
  }
  return (
    <div>
      <h1>Add New Hike</h1>
       <Link to="/"><button>Back to home</button></Link>
      <form onSubmit={handleCreate}>
        <input placeholder="Name" value={createName} onChange={e => setCreateName(e.target.value)} />
        <input placeholder="Region" value={createRegion} onChange={e => setCreateRegion(e.target.value)} />
        <input placeholder="Distance" type = "number" value={createDistance} onChange={e => setCreateDistance(e.target.value)} />
        <input placeholder="Elevation Gain" type = "number" value={createElevationGain} onChange={e => setCreateElevationGain(e.target.value)} />
        <button type="submit">Add Hike</button>
      </form>
      {message && <p>{message}</p>}
      {/* displays if there is success o not */}
    </div>
  );
}


export default AddHike;