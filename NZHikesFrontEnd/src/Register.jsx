import { useState } from "react";

function Register() {

  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [message, setMessage] = useState("");



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
    } else {
      setMessage("Error creating account.");
    }
  }
  return (
    <div>
      <h1>Register for an account</h1>
      <form onSubmit={handleCreate}>
        <input placeholder="Name" value={createName} onChange={e => setCreateName(e.target.value)} />
        <input type="email" placeholder="Email" value={createEmail} onChange={e => setCreateEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={createPassword} onChange={e => setCreatePassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      {/* displays if there is success o not */}
    </div>
  );
}


export default Register;