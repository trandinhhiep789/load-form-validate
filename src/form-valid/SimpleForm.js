import React, { memo, useEffect, useState } from 'react'
import { Formik, Form, FastField } from "formik";

import InputField from "../custom-fields/inputField";
import Button from "@mui/material/Button";
import SelectField from "../custom-fields/selectField";
import ClickNumberField from "../custom-fields/clickNumberField";

const SimpleForm = memo((props) => {

    const {validationSchema, listInputField, handleSubmit } = props

    const [loadingForm, setLoadingForm] = useState(false)
    const [initialValues, setInitialValues] = useState(false)

    let initial

    useEffect(() => {
        initial = listInputField.map((item, i) => {
            return item.name
        })
        initial = initial.reduce((acc,curr)=> (acc[curr]='',acc),{});
        setInitialValues(initial)
        setLoadingForm(true)
    },[])

  return (
    <div>
        {loadingForm &&  <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values)
            // resetForm();
          }}
        >
            {(formikProps) => {
            const { values, errors, touched } = formikProps;
            // console.log(values, errors, touched);
            return (
              <>
                <Form>
                    { listInputField.map((eachField, i) => {
                        return(
                            <div style={{ margin: "15px 0" }} key={i}>
                                <FastField
                                    name={eachField.name}
                                    component={
                                        eachField.component == "InputField" ? InputField : ClickNumberField
                                    }
                                    // label={eachField.label}
                                    placeholder={eachField.placeholder}
                                />
                            </div>
                        )
                    }) }
                     <Button type="submit" variant="contained">
                        Cập nhật
                     </Button>
                </Form>
              </>
            )
            }}
        </Formik> }
    </div>
  )
})

export default SimpleForm