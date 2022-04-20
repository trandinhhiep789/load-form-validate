import React from "react";

// material-ui
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

const InputField = (props) => {
  const {
    field,
    form, // fastfeild
    type,
    label,
    placeholder, // truyền vô
  } = props;

  const { name, value } = field;
  const { errors, touched, setFieldValue } = form;

  const showError = errors[name] && touched[name];

  // name={name}
  // id={name}
  // value={value}
  // onChange={onChange}
  // onBlur={onBlur}

  return (
    <>
      <Grid item xs={12} sm={3}>
        {label && <label htmlFor={name}>{label}</label>}
      </Grid>
      <Grid item xs={12} sm={9}>
        <TextField
          {...field}
          type={type}
          size="small"
          className="text-field"
          autoComplete="off"
          label={placeholder}
          variant="outlined"
          error={Boolean(showError ? true : false)}
          helperText={showError && errors[name]}
        />
      </Grid>
    </>
  );
};

export default InputField;
