import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "email": email
        }),
    });
    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
    } else {
        alert("A user with this username is already registered");
        window.location.href = window.location.origin;
    }
  };

  return (
    <div className="register_container" style={{ width: "50%", margin: "auto" }}>
      <div className="header" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <span className="text" style={{ flexGrow: "1" }}>Sign Up</span>
        <div className="d-flex justify-content-end">
          <a href="/" onClick={() => gohome()}>
            <img style={{ width: "50px" }} src="/static/close.png" alt="X"/>
          </a>
        </div>
        <hr />
      </div>

      <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <img src="/static/person.png" className="img_icon" alt="Username" />
            <input type="text" name="userName" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} required />
          </div>
          <div className="input">
            <img src="/static/person.png" className="img_icon" alt="First Name" />
            <input type="text" name="firstName" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="input">
            <img src="/static/person.png" className="img_icon" alt="Last Name" />
            <input type="text" name="lastName" placeholder="Last Name" className="input_field" onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="input">
            <img src="/static/email.png" className="img_icon" alt="Email" />
            <input type="email" name="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input">
            <img src="/static/password.png" className="img_icon" alt="Password" />
            <input type="password" name="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        <div className="submit_panel">
          <button className="submit" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;