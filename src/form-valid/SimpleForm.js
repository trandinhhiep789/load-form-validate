import React, { memo, useEffect, useState } from 'react'
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";

import InputField from "../custom-fields/inputField";
import Button from "@mui/material/Button";
import SelectField from "../custom-fields/selectField";
import ClickNumberField from "../custom-fields/clickNumberField";

const alertMinimum = (min) => {
  return `Tối thiểu ${min} kí tự`
}
const alertMaximum = (max) => {
  return `Tối đa ${max} kí tự`
}
const requiredFieldsText = "Vui lòng không bỏ trống"
const typeErrorNumberText = "Vui lòng nhập chữ số"

const SimpleForm = memo((props) => {

    const {listInputField, handleSubmit } = props

    const [loadingForm, setLoadingForm] = useState(false)
    const [initialValues, setInitialValues] = useState(false)
    const [initialvalidate, setInitialValidate] = useState()

    const requiredField = (type) => {
      if(type == "string"){
        return Yup.string().min(2, alertMinimum(2)).max(200, alertMaximum(200)).required(requiredFieldsText)
      }
      else if(type == "number"){
        return Yup.number().typeError(typeErrorNumberText).required(requiredFieldsText)
      }
    }   

    const relateField = (index, type) => {
      if(type == "string"){
        return Yup.string().when(["id", "name"], (id, name) => {
          console.log(id, name)
          return id && name
            ? Yup.string().required("Vui lòng mô tả khi 2 fild id và name đã điền")
            : Yup.string().notRequired();
        })
      }
      else if(type == "number"){
        return Yup.number().when(["id", "name"], (id, name) => {
          console.log(id, name)
          return id && name
            ? Yup.number().required("Vui lòng mô tả khi 2 fild id và name đã điền")
            : Yup.number().notRequired();
        })
      }
    }

    const totalSumField = (index) => {
      return Yup.number().when(
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
      )
    }

    let initial  // initial value
    let validate // dinh nghia validation

    useEffect(() => {
      initial = listInputField.map((item, i) => {
          return item.name
      })
      console.log("initial", initial)
      initial = initial.reduce((acc,curr)=> (acc[curr]='',acc),{});
      setInitialValues(initial)
      setLoadingForm(true)

      validate = {...initial}

      let index = 0
      for (let key in validate) {
          // Required field
          if(listInputField[index].isRequired && !listInputField[index].isRequiredOption){
            if(listInputField[index].typeInput == "string"){
              validate[key] = requiredField("string")
            }
            else if(listInputField[index].typeInput == "number"){
              validate[key] = requiredField("number")
            }
          }

          // notRequired field
          else if (!listInputField[index].isRequired){
            validate[key] = Yup.string().notRequired()
          }


          // RequiredOption field
          else if(listInputField[index].isRequired && listInputField[index].isRequiredOption){

            console.log(index)
            // typeFunctionCustomOption == relate
            if(listInputField[index].typeFunctionCustomOption == "relate"){
              validate[key] = relateField(index, listInputField[index].typeInput)
            }
            // typeFunctionCustomOption == sum
            else if(listInputField[index].typeFunctionCustomOption == "sum"){
              if(listInputField[index].typeInput == "number"){
                validate[key] = totalSumField(index)
              }
              else{
                alert("This field must be a number!")
              }
            }
            else if(listInputField[index].passCustomOption != ""){
              validate[key] = listInputField[index].passCustomOption()
            }
          }
          index += 1
      }
      console.log("validate",validate)
      setInitialValidate(Yup.object().shape(validate))
    },[])

  return (
    <div>
        {loadingForm &&  <Formik
          initialValues={initialValues}
          validationSchema={initialvalidate}
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
                    <div style={{  display: "flex", flexWrap: "wrap" }}>
                      { listInputField.map((eachField, i) => {
                          return(
                              <div style={{ boxSizing: "border-box", padding: "0 15px 15px 0", width: eachField.width }} key={i}>
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
                    </div>
                     <Button type="submit" variant="contained">
                        Cập nhật
                     </Button>
                     <br/>
                     <br/>
                </Form>
              </>
            )
            }}
        </Formik> }
    </div>
  )
})

export default SimpleForm