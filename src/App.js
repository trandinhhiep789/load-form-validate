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

  return (
    <Background>
      <DivForm>
        <Grid container spacing={2}>
          {/* Mã loại giao dịch với đối tác */}
          <Grid item xs={12} sm={3}>
            <label>Mã loại giao dịch với đối tác</label>
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              onChange={(e) => handleChange(setId, e.target.value)}
              size="small"
              className="text-field"
              autoComplete="off"
              id="outlined-basic"
              label="Mã loại giao dịch với đối tác"
              variant="outlined"
              error={Boolean(id === "" ? true : false)}
              helperText={id === "" ? "Vui lòng không để trống" : ""}
            />
          </Grid>

          {/* Tên loại giao dịch với đối tác */}
          <Grid item xs={12} sm={3}>
            <label>Tên loại giao dịch với đối tác</label>
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              onChange={(e) => handleChange(setName, e.target.value)}
              size="small"
              className="text-field"
              autoComplete="off"
              id="outlined-basic"
              label="Tên loại giao dịch với đối tác"
              variant="outlined"
              error={Boolean(name === "" ? true : false)}
              helperText={name === "" ? "Vui lòng không để trống" : ""}
            />
          </Grid>

          {/* Là giao dịch gọi đến đối tác */}
          <Grid item xs={12} sm={3}>
            <label>Là giao dịch gọi đến đối tác</label>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Checkbox defaultChecked color="success" />
          </Grid>
          {/* Mô tả */}
          <Grid item xs={12} sm={3}>
            <label>Mô tả</label>
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              onChange={(e) => handleChange(setDescription, e.target.value)}
              size="small"
              className="text-field"
              id="outlined-multiline-static"
              label="Mô tả"
              multiline
              rows={3}
              error={Boolean(description === "" ? true : false)}
              helperText={description === "" ? "Vui lòng không để trống" : ""}
            />
          </Grid>

          {/* Thứ tự hiển thị */}
          <Grid item xs={12} sm={3}>
            <label>Thứ tự hiển thị</label>
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              onChange={(e) => onChangeIdNumber(setNumber, e.target.value)}
              size="small"
              className="text-field"
              autoComplete="off"
              id="outlined-basic"
              label="Thứ tự hiển thị"
              variant="outlined"
              error={
                Boolean(number === "" ? true : false) ||
                validateNumber === false
              }
              helperText={
                number === ""
                  ? "Vui lòng không để trống"
                  : "" || validateNumber === false
                  ? "Vui lòng nhập số"
                  : ""
              }
            />
          </Grid>

          {/* Kích hoạt */}
          <Grid item xs={12} sm={3}>
            <label>Kích hoạt</label>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Checkbox defaultChecked color="success" />
          </Grid>

          {/* Hệ thống */}
          <Grid item xs={12} sm={3}>
            <label>Hệ thống</label>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Checkbox defaultChecked color="success" />
          </Grid>
        </Grid>
        <Btn>
          <Button onClick={handleSubmit} variant="contained">
            Cập nhật
          </Button>
        </Btn>

        {/* alert results */}
        <Snackbar
          open={openSuccess}
          autoHideDuration={3000}
          onClose={() => handleClose("ok")}
        >
          <Alert
            onClose={() => handleClose("ok")}
            severity="success"
            sx={{ width: "100%" }}
          >
            Thao tác thực hiện thành công
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={3000}
          onClose={() => handleClose("err")}
        >
          <Alert
            onClose={() => handleClose("err")}
            severity="error"
            sx={{ width: "100%" }}
          >
            Vui lòng điền đúng kiểu dữ liệu và đầy đủ các trường thông tin
          </Alert>
        </Snackbar>
      </DivForm>
    </Background>
  );
}

export default App;
