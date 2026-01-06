import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {

  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); //allows the form to go back to the home page



  async function handleCreate(e) {
    e.preventDefault();
    //builds a new user object when they register
    const newUser = {
      name: createName,
      email: createEmail,
      password: createPassword
    };
    //sends the new user object to be added
    const res = await fetch("http://localhost:5071/api/hikes/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    if (res.ok) {
      localStorage.removeItem("userId"); //removes any lingering ID
      const createdUser = await res.json();       // lets me keep the user ID to use
      localStorage.setItem("userId", createdUser.id); //stores ID in local memory
      setMessage("Registered successfully.");
      setCreateName("");
      setCreateEmail("");
      setCreatePassword("");
      navigate("/");
    } else {
      setMessage("Error creating account.");
    }
  }
  return (
    <div className="center-page">
      <div className="center-card">
        <h1>Register for an account</h1>
        <form onSubmit={handleCreate}>
          <input placeholder="Name" value={createName} onChange={e => setCreateName(e.target.value)} />
          <input type="email" placeholder="Email" value={createEmail} onChange={e => setCreateEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={createPassword} onChange={e => setCreatePassword(e.target.value)} />

          <div className="form-actions">

            <Link to="/"><button>Back to home</button></Link>
            <button type="submit">Register</button>
          </div>
        </form>
        {message && <p>{message}</p>}
        {/* displays if there is success o not */}
      </div>
    </div>
  );
}


export default Register;