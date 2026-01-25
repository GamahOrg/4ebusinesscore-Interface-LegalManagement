import { object, string } from "yup";

export const AddClientValidationSchema = object({
  name: string().optional().typeError("InputFieldIsRequried"),
  //  .test("no-special-chars", "SpecialCharactersNotAllowed", (value: any) => {
  //       if (!value) return true; 
  //       const forbiddenChars = /[\[@\-\+=]/;
  //       return !forbiddenChars.test(value);
  //     }),
  phone: string().optional().typeError("InputFieldIsRequried"),
  identityType: string().optional().typeError("InputFieldIsRequried"),
});
