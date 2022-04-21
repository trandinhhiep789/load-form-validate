import React, { memo } from 'react'

const useConstForm = memo(() => {

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
            label : "Thứ tự hiển thị",
            placeholder : "Thứ tự hiển thị",
        },
        
    ]

  return {constants}
})

export default useConstForm