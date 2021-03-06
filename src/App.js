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

import SimpleForm from "./form-valid/SimpleForm"
import DataTable from "./table/DataTable";

const Background = styled.div`
  background: #e3f2fd;
  min-height: 100vh;
  text-align: center;
  padding: 30px;
`;

const DivForm = styled.div`
  border: 1px solid rgba(144, 202, 249, 0.46);
  background: #fff;
  padding: 30px;
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
  const [results, setResults] = React.useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (alert) => {
    if (alert === "ok") {
      setOpenSuccess(false);
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    setResults(values)
    setOpenSuccess(true);
  }

  const plus10 = () => {
    return Yup.number().test('fieldB-commission-validation', 'invalid value', (value, context) => {
      return context.parent.plus10 === 10
    })  
  }

  const constants = [
    { 
      width: "20%",  
      name : "id",
      component : "InputField",
      label : "M?? lo???i giao d???ch v???i ?????i t??c",
      placeholder : "M?? lo???i giao d???ch v???i ?????i t??c",

      typeInput : "string",
      isRequired: true,
      isRequiredOption: false,
      typeFunctionCustomOption: "",
      listOptions: [],
      passCustomOption: ""
    },
    { 
      width: "20%",  
      name : "name",
        component : "InputField",
        label : "T??n lo???i giao d???ch v???i ?????i t??c",
        placeholder : "T??n lo???i giao d???ch v???i ?????i t??c",

        typeInput : "string",
        isRequired: false,
        isRequiredOption: false,
        typeFunctionCustomOption: "",
        listOptions: [],
        passCustomOption: ""
    },
    
    { 
      width: "20%",  
      name : "description",
        component : "InputField",
        label : "M?? t???",
        placeholder : "M?? t???",

        typeInput : "string",
        isRequired: true,
        isRequiredOption: true,
        typeFunctionCustomOption: "relate",
        listOptions: ["id", "name"],
        passCustomOption: ""
    },
    
    { 
      width: "20%",  
      name : "number",
        component : "InputField",
        label : "Th??? t??? hi???n th???",
        placeholder : "Th??? t??? hi???n th???",

        typeInput : "number",
        isRequired: true,
        isRequiredOption: false,
        typeFunctionCustomOption: "",
        listOptions: [],
        passCustomOption: ""
    },
    
    { 
      width: "20%",  
      name : "selectAmuont",
        component : "ClickNumberField",
        label : "L???a ch???n s?? l?????ng",
        placeholder : "L???a ch???n s?? l?????ng",

        typeInput : "number",
        isRequired: true,
        isRequiredOption: false,
        typeFunctionCustomOption: "",
        listOptions: [],
        passCustomOption: ""
    },
    
    { 
      width: "20%",  
      name : "sum",
        component : "InputField",
        label : "sum",
        placeholder : "sum",

        typeInput : "number",
        isRequired: true,
        isRequiredOption: true,
        typeFunctionCustomOption: "sum",
        listOptions: ["number", "selectAmuont"],
        passCustomOption: ""
    },

    { 
      width: "20%",
      name : "plus10",
      component : "InputField",
      label : "plus10",
      placeholder : "plus10",

      typeInput : "number",
      isRequired: true,
      isRequiredOption: true,
      typeFunctionCustomOption: "",
      listOptions: [],
      passCustomOption: plus10,
    },
    
  ]

  return (
    <Background>
      <DivForm>
        <SimpleForm 
          listInputField={constants} 
          handleSubmit={handleSubmit}
        />

        <DataTable/>

        {results?<div>
          {Object.keys(results).map(function(key) { return <div><i>{key}</i>: {results[key]}</div>; })}
        </div>:""}

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
            Thao t??c th???c hi???n th??nh c??ng
          </Alert>
        </Snackbar>
      </DivForm>
    </Background>
  );
}

export default App;