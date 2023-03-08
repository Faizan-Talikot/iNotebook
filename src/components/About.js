import React, { useState } from "react";
import image1 from "./image1.jpeg";
import image2 from "./image2.jpeg";
import image3 from "./image3.jpg";
import Alert from "./Alert";


const About = (props) => {
  const [alert,setAlert]=useState(null);
  const showAlert = (message,type) =>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }
  const[suggestion,setSuggestion] = useState({email:"", description:""})
  const onChange = (e) => {
    setSuggestion({ ...suggestion, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch("https://inotebook-api-e9qe.onrender.com/api/suggestion/createsuggestion", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email:suggestion.email,description:suggestion.description})
      });
      const json = await response.json();
      console.log(json)
      if(json.success){
        //save the authtoken in local storage
        showAlert("Suggestion Noted Successfully","success")
        setSuggestion({email:"", description:""})
      }
      else{
        props.showAlert("Invalid Credentials","danger")
      }
}
  return (
    <div>
      <div className="container d-flex flex-column mb-3 justify-content-center" style={{ width: "80%" }}>
        <h1 className="text-center">About Us</h1>
        <hr style={{ width: "26%", marginLeft: "37%" }} />
        <p className="text-center fw-semibold">iNotebook is a solution for to you to save your note anytime and anywhere. In today's busy world we dont have time to carry notebooks and pen to write out small notes.iNotebook comes handy in such situation.It provides you interface to save your notes easily and securly.iNotebook is a CRUD application, it means your Create, Read, Update and Delete your notes. We provide complete security and your notes can be accessed by only you and not any third party. We use encryption method to store your password and hence your identity is save with us. So login to iNotebook and create your notes now!!!</p>
        <div className="container d-flex justify-content-between my-5" style={{ padding: "0" }} id="aboutcard">
          <div className="card" style={{ width: "15rem",color: props.mode ==="light"?"black":"black" }}>
            <img src={image1} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Notes on the cloud</h5>
              <p className="card-text">Create and Maintain notes without any charge. You can create any number of notes you want for free..</p>
            </div>
          </div>

          <div className="card" style={{ width: "15rem",color: props.mode ==="light"?"black":"black" }}>
            <img src={image2} className="card-img-top" alt="..." style={{ height: "169px" }} />
            <div className="card-body">
              <h5 className="card-title">Security Guarantee</h5>
              <p className="card-text">Your notes will be highly secured on the cloud and will be able to access them easily via your account login credentials.</p>
            </div>
          </div>

          <div className="card" style={{ width: "15rem",color: props.mode ==="light"?"black":"black" }}>
            <img src={image3} className="card-img-top" alt="..." style={{ height: "170px" }} />
            <div className="card-body">
              <h5 className="card-title">Free to use</h5>
              <p className="card-text">Create and Maintain notes without any charge. You can create any number of notes you want for free.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ width: "80%",backgroundColor: "#ededed", borderRadius: "10px",color: props.mode ==="light"?"black":"black"}}>
      <Alert alert={alert}/>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Suggestion Form</h2>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={suggestion.email}/>
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Enter Your Suggestion Here
          </label>
          <textarea className="form-control" id="description" name="description" style={{resize: "none"}} rows="3" onChange={onChange} value={suggestion.description}></textarea>
          <button type="submit" disabled={suggestion.description<5 || suggestion.email<5} className="btn btn-primary my-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default About;
