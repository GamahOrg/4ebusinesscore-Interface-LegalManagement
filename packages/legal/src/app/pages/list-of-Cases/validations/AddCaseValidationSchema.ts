import * as yup from "yup";

export const CaseValidationSchema = yup.object({
  // CauseStageNumber: yup
  //   .string()
  //   .required("InputFieldIsRequried")
  //   .typeError("InputFieldIsRequried")
  //   // .test(
  //   // "valid-chars",
  //   //  "CharactersAndNumbersAllowedOnly",
  //   // (value) =>
  //   // /^[\u0621-\u064A\u0660-\u0669a-zA-Z0-9#&/]+$/.test(value ?? "")
  //   //  )
  //   .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
  //     return value?.trim()?.length > 0;
  //   }),

  Lk_StageId: yup
    .string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),

  CauseStageNumber: yup
    .string()
    .nullable()
    .when("Lk_StageId", {
      is: (val: string) => val !== "1",
      then: (schema) => schema.required("InputFieldIsRequried"),
      otherwise: (schema) => schema.notRequired(),
    }),
  Redirector: yup
    .string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  SuperVisorId: yup
    .string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
});
export type AddCaseValidationProps = yup.InferType<typeof CaseValidationSchema>;
