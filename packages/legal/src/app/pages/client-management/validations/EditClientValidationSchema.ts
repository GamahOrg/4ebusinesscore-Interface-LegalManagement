import { object, string , number} from "yup";

export const EditClientValidationSchema = object({
  name: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
  //  .test("no-special-chars", "SpecialCharactersNotAllowed", (value: any) => {
  //       if (!value) return true; 
  //       const forbiddenChars = /[\[@\-\+=]/;
  //       return !forbiddenChars.test(value);
  //     }),
  phoneNumber: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried").matches(/^(?:\+966|0)(5\d{8})$/, "InvalidSaudiPhoneNumber"),
  identityType: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
    // litigantStatus: number().required("InputFieldIsRequried")
});
