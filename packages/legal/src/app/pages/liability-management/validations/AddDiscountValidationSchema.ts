import { InferType, number, object, string } from "yup";

export const AddDiscountValidationSchema = object({
  name: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried")
  
  .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
    return value?.trim()?.length > 0;  
  }),
  PhoneNumber:string().required("InputFieldIsRequried").typeError("InputFieldIsRequried").matches(/^(?:\+966|0)(5\d{8})$/, "InvalidSaudiPhoneNumber"),
  // litigantStatus: number().required("InputFieldIsRequried"),
  IdentityNumber:string().required("InputFieldIsRequried").matches(/\d/, "IdentityNumberMustContainNumbers"),
  lK_IdentityTypeId: number()
  .required("InputFieldIsRequried")
  .typeError("InputFieldIsRequried")
  .min(1, "InputFieldIsRequried"),
});
export type AddDiscountValidationProps = InferType<typeof AddDiscountValidationSchema>;




