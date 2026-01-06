import { useState } from "react";
import { Link } from "react-router-dom";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");



  async function handleLogin(e) {
    e.preventDefault();


    const res = await fetch("http://localhost:5071/api/hikes/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    console.log("status", res.status);

    if (!res.ok) {
      setMessage("Invalid login.");
      return;
    }
    if (res.status === 204) { // I couldn't fix the issue on the backend so I used this as duct tape temporarily 
      setMessage("Invalid login.");
      return;
    }
    const user = await res.json();
    console.log("user", user);


    if (user && (user.id ?? user.Id)) { //used the && because it was letting everyone log in for some reason
      localStorage.setItem("userId", user.id ?? user.Id);
      setMessage("Logged in.");

    } else {
      setMessage("Invalid login.");
    }
  }

  return (
    <>
      <Link to="/"><button>Back to home</button></Link>

      <form onSubmit={handleLogin}>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </>
  );

}


export default Login;