"use client";
import React, { useState } from "react";
import "../../styles/signup.css";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [mssg, setMssg] = useState("");

  const handleSubmit = async () => {
    try {
      if (
        !email ||
        password.length <= 6 ||
        password !== confirmPassword ||
        !status
      ) {
        console.log("incorrect input");
        return "please check your Inputs";
      }
      const response = await axios.post("http://localhost:3500/user/signup", {
        email: email,
        password: password,
        status: status,
      });
      setMssg(response.data.message);
      console.log("hello", response);
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setConfirmPassword("");
    setPassword("");
    setStatus("");
  };
  return (
    <div className="signInContainer">
      <div className="formContainer">
        <h2>SignIn</h2>
        <input
          type="text"
          placeholder="Email"
          className="emailForm"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="emailForm"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="confirm password"
          className="emailForm"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <select
          className="statusDropDown"
          onChange={(e) => {
            setStatus(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="">select an option</option>
          <option value="admin">Admin</option>
          <option value="Team Member">Team Member</option>
        </select>
        <button type="submit" onClick={handleSubmit} className="signInBtn">
          Submit
        </button>
        <div>{mssg}</div>
      </div>
    </div>
  );
};

export default SignIn;
