"use client";
import React, { useState } from "react";
import "../../styles/signin.css";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleSignIn = async () => {
    try {
      if (!email || !password || password.length <= 6) {
        console.log("incorrect input");
        return "incorrect email or password";
      }
      const response = await axios.post("http://localhost:3500/user/signin", {
        email: email,
        password: password,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="signInContainer">
      <div className="signUpform">
        <div>Sign In</div>
        <input
          type="text"
          placeholder="Email"
          className="formElement"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          className="formElement"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSignIn} className="submitBtn">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
