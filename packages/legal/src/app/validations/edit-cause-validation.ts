import { object, string, InferType, mixed } from "yup";

export const EditCauseSchema = object({
    title: string()
    .required("InputFieldIsRequried")  
    .typeError("InputFieldIsRequried")  
   
    .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
      return value?.trim()?.length > 0;  
    }),
    incidentDate: string()
    ,
    incidentLocation: string()
     
   
   ,
    subject: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")  
    
    .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
      return value?.trim()?.length > 0;  
    }),
    LK_TypeJudiciaryId: string()
    .required("InputFieldIsRequried"),
});

export type EditCauseProps = InferType<typeof EditCauseSchema>;
