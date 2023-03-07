import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3" style={{}}>
      <div className="card my-3" style={{border: props.mode==="light"?"1px solid black":"none",borderRadius: "0px"}}>
        <div className="card-body" style={{color: props.mode==="light"?"black":"white", backgroundColor:props.mode==="light"?"white":"#343434" }}>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="far fa-trash-alt mx-2" onClick={() => {deleteNote(note._id);props.showAlert("Note Deleted Successfully","success");}} style={{color:props.mode==='light'?"black":"rgb(255, 215, 0)"}}></i>
          <i className="far fa-edit mx-2" onClick={() => {updateNote(note);}} style={{color:props.mode==='light'?"black":"rgb(255, 215, 0)"}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
