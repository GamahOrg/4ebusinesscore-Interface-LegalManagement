import { number, object, string } from "yup";

export const RequiredClientValidationSchema = object({
  name: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried")
   
  .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
    return value?.trim()?.length > 0;  
  }),
  phoneNumber: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried").matches(/^(?:\+966|0)(5\d{8})$/, "InvalidSaudiPhoneNumber"),
  identityType: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
  // identityNumber: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
});
