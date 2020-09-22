import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import teststyles from "../componentsStyles/Testelement.module.css";
import axios from "axios";
import Resultelement from "./ResultElement.component";
import styles from "../componentsStyles/Dashboard.module.css";
import resultstyles from "../componentsStyles/TestResult.module.css";

function Testresult(props) {
  console.log("hello");
  let history = useHistory();
  const [result, setresult] = useState([]);
  const forceupdate = useState()[1];

  let check = setInterval(() => forceupdate(), 60000);
  let expiry = new Date(props.location.state.expiry);

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    axios
      .post(
        "http://localhost:4000/test/getresults",
        { pin: props.location.state.pin },
        options
      )
      .then((res) => setresult(res.data))
      .catch((err) => {
        console.log(err);
        alert("couldn't fetch please reload");
      });
    return () => clearInterval(check);
  }, []);
  return (
    <Fragment>
      <div>
        <h1
          className={teststyles.heading}
          style={{ background: "white", fontSize: "2em", padding: "2%" }}
        >
          Welcome {localStorage.getItem("name")}
        </h1>
      </div>
      <button
        className={styles.buttons}
        style={{ float: "left", display: "block" }}
        onClick={() => history.goBack()}
      >
        &lt;- Back
      </button>
      <br />
      <br />
      <br />
      <br />
      <div className={teststyles.container}>
        <div className={resultstyles.info}>
          <strong>Pin: </strong> {props.location.state.pin}
          <br />
          <strong>Topic: </strong> {props.location.state.topicname}
          <br />
          <strong>No. of Ques: </strong> {props.location.state.amount}
          <br />
          <strong>Time Duration: </strong> {props.location.state.time} <br />
          <strong>Expiry: </strong> {expiry.getDate()}-{expiry.getMonth()}-
          {expiry.getFullYear(1)}
          <br />
        </div>
        <div className={resultstyles.parent}>
          <div className={resultstyles.resultrow}>
            <div className={teststyles.element}>
              <strong>Name</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Email</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Score</strong>
            </div>
          </div>
          {result.length === 0 ? (
            <div className={resultstyles.resultrow}>
              <div
                className={teststyles.element}
                style={{ gridColumnStart: "2" }}
              >
                No result found!
              </div>
            </div>
          ) : (
            result.map((obj) => <Resultelement key={obj._id} {...obj} />)
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Testresult;
