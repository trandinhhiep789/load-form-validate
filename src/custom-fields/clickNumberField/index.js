import React from "react";

// material-ui
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

const ClickNumberField = (props) => {
  const {
    field,
    form, // fastfeild
    type,
    label,
    placeholder, // truyền vô
  } = props;

  const { name } = field;
  const { errors, touched } = form;
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
          className="text-field"
          InputProps={{ inputProps: { min: 0, max: 30 } }}
          id="outlined-number"
          label={placeholder}
          size="small"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          error={Boolean(showError ? true : false)}
          helperText={showError && errors[name]}
        />
      </Grid>
    </>
  );
};

export default ClickNumberField;
