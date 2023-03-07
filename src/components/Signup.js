import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      const { name, email, password } = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      if (json.success) {
        //save the authtoken in local storage
        console.log(json.success)
        localStorage.setItem("token", json.authToken);
        props.showAlert("Account Created Successfully", "success");
        navigate("/home");
      } else {
        props.showAlert("Email Already exists !!! Try with Signing up", "danger");
      }
    }
    else{
      props.showAlert("Confirm Password does not match", "danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-2">
      <h2 className="my-3">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" id="text" onChange={onChange} aria-describedby="emailHelp" name="name" placeholder="Enter name" />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text" style={{color:props.mode==='dark'?'white':'black',opacity: "0.8"}}>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Password" minLength={5} required />
        </div>
        <div className="form-group my-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Re-Enter your Password" minLength={5} required />
        </div>
        <button type="submit" className="btn" style={{backgroundColor:props.mode==='light'?'#0d6efd':'#ffd700',color:props.mode==='light'?'white':'black'}}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
