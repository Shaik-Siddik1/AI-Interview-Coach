import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          borderRadius: "20px",
          background: "white",
          textAlign: "center",
          boxShadow: "0 0 40px rgba(0,255,255,0.4)",
        }}
      >
        <h1
          style={{
            color: "black",
            marginBottom: "30px",
            fontSize: "40px",
          }}
        >
          Login Page
        </h1>

        <input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{
    padding: "12px",
    width: "250px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "1px solid gray",
    outline: "none",
  }}
/>

<br />

<input
  type="password"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={{
    padding: "12px",
    width: "250px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "1px solid gray",
    outline: "none",
  }}
/>

<br />

        <br />

        <button
          onClick={async () => {
  try {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Success");
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Success");
    }

    navigate("/home");
  } catch (error) {
    alert(error.message);
  }
}}
        >
          {isLogin ? "Login" : "Signup"}
        </button>
        <p
  onClick={() => setIsLogin(!isLogin)}
  style={{
    marginTop: "20px",
    cursor: "pointer",
    color: "blue",
  }}
>
  {isLogin
    ? "Don't have an account? Signup"
    : "Already have an account? Login"}
</p>
      </div>
    </div>
  );
}

export default Login;