# Cách sử dụng component: SimpleForm (/src/form-valid/SimpleForm)


### SimpleForm nhận vào 3 props

```
listInputField 
validationSchema
handleSubmit

<SimpleForm 
  listInputField={constants} 
  validationSchema={validation}  
  handleSubmit={handleSubmit}
/>
```
## VD

### constants
```js
const constants = [
    { 
        name : "id",
        component : "InputField",
        label : "Mã loại giao dịch với đối tác",
        placeholder : "Mã loại giao dịch với đối tác",
    },
    { 
        name : "name",
        component : "InputField",
        label : "Tên loại giao dịch với đối tác",
        placeholder : "Tên loại giao dịch với đối tác",
    },
    { 
        name : "description",
        component : "InputField",
        label : "Mô tả",
        placeholder : "Mô tả",
    },
    { 
        name : "number",
        component : "InputField",
        label : "Thứ tự hiển thị",
        placeholder : "Thứ tự hiển thị",
    },
    { 
        name : "selectAmuont",
        component : "ClickNumberField",
        label : "Lựa chọn sô lượng",
        placeholder : "Lựa chọn sô lượng",
    },
    { 
        name : "sum",
        component : "InputField",
        label : "sum",
        placeholder : "sum",
    },
  ]
```


### validation

```js
  const validation = Yup.object().shape({
    id: Yup.string()
      .min(2, "Mininum 2 characters")
      .max(15, "Maximum 15 characters")
      .required("Vui lòng không bỏ trống"),

    name: Yup.string().notRequired(),

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
  });
```

### handleSubmit

```js
const handleSubmit = (values) => {
    console.log(values);
    setResults(values)
    setOpenSuccess(true);
}
```
