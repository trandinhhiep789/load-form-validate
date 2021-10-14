import "./App.css";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// material-ui
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// style-component
import styled from "styled-components";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { ConnectedFocusError } from "focus-formik-error";
import InputField from "./custom-fields/inputField";
import SelectField from "./custom-fields/selectField";
import ClickNumberField from "./custom-fields/clickNumberField";

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
  const options = [
    { value: 1, label: "Iphone" },
    { value: 2, label: "SamSung" },
    { value: 3, label: "LG" },
    { value: 4, label: "Wave" },
    { value: 5, label: "SH" },
  ];

  // alert
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

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

  const initialValues = {
    id: "",
    name: "",
    description: "",
    number: "",
    dataSelect: "",
    selectAmuont: "",
    sum: "",
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string()
      .min(2, "Mininum 2 characters")
      .max(15, "Maximum 15 characters")
      .required("Vui lòng không bỏ trống"),

    name: Yup.string().required("Vui lòng không bỏ trống"),

    description: Yup.string().when(["id", "name"], (id, name) => {
      return id && name
        ? Yup.string().required("Vui lòng mô tả khi 2 fild id và name đã điền")
        : Yup.string().notRequired();
    }),

    number: Yup.number()
      .typeError("Vui lòng nhập chữ số")
      .required("Vui lòng không bỏ trống"),

    selectAmuont: Yup.number().required("Vui lòng chọn số lượng"),

    sum: Yup.number().when(
      ["number", "selectAmuont"],
      (number, selectAmuont) => {
        return number + selectAmuont < 10
          ? Yup.number().required(
              "Vui lòng nhập tổng vì number + selectAmuont bé lớn hơn 10"
            )
          : Yup.number().notRequired(
              "Không cần nhập vì number + selectAmuont đã lớn hơn 10"
            );
      }
    ),

    dataSelect: Yup.number().required("Vui lòng chọn data"),
  });

  return (
    <Background>
      <DivForm>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            if (Number(values.number) + Number(values.selectAmuont) > 10) {
              values.sum = Number(values.number) + Number(values.selectAmuont);
            }

            console.log(values);

            setOpenSuccess(true);
            resetForm();
          }}
        >
          {(formikProps) => {
            // const { values, errors, touched } = formikProps;
            // console.log(values, errors, touched);
            return (
              <>
                <Form>
                  <ConnectedFocusError />
                  <Grid container spacing={2}>
                    {/* Mã loại giao dịch với đối tác */}
                    <FastField
                      name="id"
                      component={InputField}
                      label="Mã loại giao dịch với đối tác"
                      placeholder="Mã loại giao dịch với đối tác"
                    />

                    {/* Tên loại giao dịch với đối tác */}
                    <FastField
                      name="name"
                      component={InputField}
                      label="Tên loại giao dịch với đối tác"
                      placeholder="Tên loại giao dịch với đối tác"
                    />

                    {/* Là giao dịch gọi đến đối tác */}
                    <Grid item xs={12} sm={3}>
                      <label>Là giao dịch gọi đến đối tác</label>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Checkbox defaultChecked color="success" />
                    </Grid>

                    {/* Mô tả */}
                    <FastField
                      name="description"
                      component={InputField}
                      label="Mô tả"
                      placeholder="Mô tả"
                    />

                    {/* Thứ tự hiển thị */}
                    <FastField
                      name="number"
                      component={InputField}
                      label="Thứ tự hiển thị"
                      placeholder="Thứ tự hiển thị"
                    />

                    {/* Số lượng */}
                    <FastField
                      name="selectAmuont"
                      component={ClickNumberField}
                      label="Lựa chọn sô lượng"
                      placeholder="Lựa chọn sô lượng"
                    />

                    {/* Tổng */}
                    <FastField
                      name="sum"
                      component={InputField}
                      label="Tổng number + select > 10"
                      placeholder="Tổng number + select > 10"
                    />

                    {/* Loại data */}
                    <FastField
                      name="dataSelect"
                      component={SelectField}
                      label="Phân loại data"
                      placeholder="Phân loại data"
                      options={options}
                    />

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
                    <Button type="submit" variant="contained">
                      Cập nhật
                    </Button>
                  </Btn>
                </Form>
              </>
            );
          }}
        </Formik>

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
