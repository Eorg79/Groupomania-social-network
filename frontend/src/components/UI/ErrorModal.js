import React from 'react';
import classes from './ErrorModal.module.css';

const ErrorModal = (props) => {

    return (
      <div>
        <div className={classes.backdrop} />
        <div className={classes.modal}>
          <header className={classes.header}>
            <h2>{props.title}</h2>
          </header>
          <div className={classes.content}>
            <p>{props.message}</p>
          </div>
          <footer className={classes.actions}>
            <Button className="btn">OK</Button>
          </footer>
        </div>
      </div>
    );
  };
  
  export default ErrorModal;