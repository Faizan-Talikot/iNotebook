import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import NoteState from "./context/notes/noteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Landing from "./components/Landing";

function App() {
  const [alert,setAlert]=useState(null);
  const [mode , setMode] = useState('light');
  const showAlert = (message,type) =>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }
  

  const toggleMode = ()=>{
    if(mode==='dark'){
      console.log(mode)
      setMode('light')
      document.body.style.backgroundColor =  'white';
      document.body.style.color = 'black'
    }
    else if(mode==='light'){
      console.log(mode)
      setMode('dark')
      document.body.style.backgroundColor =  'black';
      document.body.style.color = 'white'
    }
  }
  
  return (
    <>
    <NoteState>
        <Router>
            <Navbar mode={mode} aboutText="About" toggleMode={toggleMode}/>
            <Alert alert={alert}/>
          <div className="container" id="changecolor">
            <Routes>
              <Route exact path=" https://inotebook-n8it.onrender.com/" element={<Landing showAlert = {showAlert} mode= {mode}/>} />
              <Route exact path=" https://inotebook-n8it.onrender.com/home" element={<Home showAlert = {showAlert} mode= {mode}/>} />
              <Route exact path=" https://inotebook-n8it.onrender.com/about" element={<About showAlert = {showAlert} mode= {mode}/>} />
              <Route exact path=" https://inotebook-n8it.onrender.com/login" element={<Login showAlert = {showAlert} mode= {mode}/>} />
              <Route exact path=" https://inotebook-n8it.onrender.com/signup" element={<Signup showAlert = {showAlert} mode= {mode}/>} />
            </Routes>
          </div>
        </Router>
        </NoteState>
    </>
  );
}

export default App;
