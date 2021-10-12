import "./App.css";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// material-ui
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// style-component
import styled from "styled-components";

const Background = styled.div`
  background: #e3f2fd;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivForm = styled.div`
  border: 1px solid rgba(144, 202, 249, 0.46);
  background: #fff;
  padding: 30px;
  width: 70%;
  border-radius: 15px;
`;

const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function App() {
  const [timer, setTimer] = useState(null);

  // alert
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [validateNumber, setValidateNumber] = useState(true);

  // text-field
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [number, setNumber] = useState(null);

  const handleChange = (setData, data) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setData(data);
      }, 300)
    );
  };

  const validateNumberField = (idNumber) => {
    const numberRegEx = /^[0-9]+$/;
    return numberRegEx.test(String(idNumber).toLowerCase());
  };

  const onChangeIdNumber = (setData, data) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        setData(data);
        if (data !== "") {
          const isValid = !data || validateNumberField(data);
          setValidateNumber(isValid);
        }
      }, 300)
    );
  };

  const handleSubmit = () => {
    if (
      id === null ||
      id === "" ||
      name === null ||
      name === "" ||
      description === null ||
      description === "" ||
      number === null ||
      number === "" ||
      validateNumber === false
    ) {
      setOpenError(true);
    } else {
      setOpenSuccess(true);
      console.log(id, name, description, number);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (alert) => {
    if (alert === "ok") {
      setOpenSuccess(false);
    } else {
      setOpenError(false);
    }
  };

  return <Background>hello</Background>;
}

export default App;
