import { object, string, array, InferType } from "yup";

export const EditSessionValidationSchema = object({
    date: string()
        .required("InputFieldIsRequried")
        .typeError("InputFieldIsRequried"),
    
    time: string()
        .required("InputFieldIsRequried")
        .typeError("InputFieldIsRequried"),
    
    court: string()
        .required("InputFieldIsRequried")
        .typeError("InputFieldIsRequried"),
    
    department: string()
        .required("InputFieldIsRequried")
        .typeError("InputFieldIsRequried"),
    
    lawyers: array()
        .of(
            string()
                .required("InputFieldIsRequried")
                .typeError("InputFieldIsRequried")
        )
        .notRequired()
        .nullable(),
    
    dataEntry: array()
        .of(
            string()
                .required("InputFieldIsRequried")
                .typeError("InputFieldIsRequried")
        )
        .notRequired()
        .nullable(),
});

