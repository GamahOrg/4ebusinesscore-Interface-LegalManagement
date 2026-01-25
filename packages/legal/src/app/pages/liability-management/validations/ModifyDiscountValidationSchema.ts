import { number, object, string } from "yup";

export const ModifyDiscountValidationSchema = object({
  name: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried")
  
  .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
    return value?.trim()?.length > 0;  
  }),
  // litigantStatus: number().required("InputFieldIsRequried"),
  PhoneNumber:string().required("InputFieldIsRequried").typeError("InputFieldIsRequried").matches(/^(?:\+966|0)(5\d{8})$/, "InvalidSaudiPhoneNumber"),
  IdentityNumber:string().required("InputFieldIsRequried"),
  lK_IdentityTypeId :string().required("InputFieldIsRequried")
});
