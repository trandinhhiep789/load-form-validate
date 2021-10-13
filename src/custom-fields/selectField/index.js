import React from "react";

// material-ui
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";

import { FastField } from "formik";

const CustomizedSelectForFormik = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
    >
      {children}
    </Select>
  );
};

const SelectField = (props) => {
  const [age, setAge] = React.useState("");

  const {
    field,
    form, // fastfeild
    label,
    options,
    placeholder, // truyền vô
  } = props;

  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <>
      <Grid item xs={12} sm={3}>
        {label && <label htmlFor={name}>{label}</label>}
      </Grid>
      <Grid item xs={12} sm={9}>
        <FormControl
          size="small"
          fullWidth
          error={Boolean(showError ? true : false)}
        >
          <FastField name={name} component={CustomizedSelectForFormik}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FastField>
          {showError ? <FormHelperText>{errors[name]}</FormHelperText> : false}
        </FormControl>
      </Grid>
    </>
  );
};

export default SelectField;
