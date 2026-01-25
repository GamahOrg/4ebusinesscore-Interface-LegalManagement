import { object, string, array, mixed } from "yup";

export const EditSessionCreateValidationSchema = object({
  causeId: string().required("YouShouldSelectACase").nullable(),

  causeStageId: string().required("InputFieldIsRequried").nullable(),
  SessionDate: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),

  SessionTime: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),

  CourtName: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
      return value?.trim()?.length > 0;
    }),

  AreaName: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
      return value?.trim()?.length > 0;
    }),


  Attachments: array()
    .notRequired()
    .nullable(),
  Location: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
      return value?.trim()?.length > 0;
    }),
});
