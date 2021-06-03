import React, {useEffect, useState} from "react";

export default function GameContainer(props) {
  return (
    <>
      <h3 className="s-title" style={{marginBottom: "10px"}}>
        {props.title}
      </h3>
      {props.children}
      <JumpTo {...props}/>
      <GameConsole {...props}/>
      <PopUp {...props.message}/>
    </>
  )
}

export function JumpTo(props) {
  return (
    <>
      <div className="divider text-center" data-content="Actions"></div>
      <div style={{overflowY: "scroll", height: "200px"}}>
        {props.jumpTo}
      </div>
    </>
  )
}

export function GameConsole(props) {
  return (
    <>
      <div className="divider text-center" data-content="Console"></div>
      <div>
        {props.console}
      </div>
    </>
  )
}

export function PopUp(props) {
  const {solved, message, handleCloseEvent} = props;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(solved);
  }, [solved]);

  function closeModal() {
    setOpen(false);
    handleCloseEvent();
  }

  return (
    <div className={open ? 'modal modal-sm active' : 'modal modal-sm'} id="modal-id">
      <a href="#close" className="modal-overlay" aria-label="Close"
         onClick={closeModal}
      ></a>
      <div className="modal-container">
        <div className="modal-header">
          <a href="#close" className="btn btn-clear float-right" aria-label="Close"
             onClick={closeModal}
          ></a>
          {/*<div className="modal-title h5">Modal title</div>*/}
        </div>
        <div className="modal-body">
          <div className="content">
            {message}
          </div>
        </div>
        <div className="modal-footer">

        </div>
      </div>
    </div>
  )
}
