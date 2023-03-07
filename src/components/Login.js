import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const[credentials,setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
            //save the authtoken in local storage
            localStorage.setItem('token',json.authToken);
            console.log(json.authToken)
            props.showAlert("Logged In Successfully","success")
            navigate("/home");
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <div className="mt-3">
      <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" value={credentials.email}     placeholder="Enter email" />
          <small id="emailHelp" className="form-text" style={{color:props.mode==='dark'?'white':'black',opacity: "0.8"}}>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn my-3" style={{backgroundColor:props.mode==='light'?'#0d6efd':'#ffd700',color:props.mode==='light'?'white':'black'}}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
