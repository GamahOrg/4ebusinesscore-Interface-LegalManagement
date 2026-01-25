import { object, string, InferType, mixed, number } from "yup";

export const AddCauseSchema = object({
  title: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")

    .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
      return value?.trim()?.length > 0;
    }),
  incidentDate: string(),

  incidentLocation: string(),

  subject: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")

    .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
      return value?.trim()?.length > 0;
    }),
  caseType: string().required("InputFieldIsRequried"),

  causeStageId: string()
    .nullable()
    .when("caseType", {
      is: (val: string) => val === "lawsuit",
      then: (schema) => schema.required("InputFieldIsRequried"),
      otherwise: (schema) => schema.notRequired(),
    }),
  caseDate: string()
    .nullable()
    .when("caseType", {
      is: (val: string) => val === "lawsuit",
      then: (schema) => schema.required("InputFieldIsRequried"),
      otherwise: (schema) => schema.notRequired(),
    }),
  causeStageNumber: string()
    .nullable()
    .when("caseType", {
      is: (val: string) => val === "lawsuit",
      then: (schema) =>
        schema
          .required("InputFieldIsRequried")

          .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
            return value?.trim()?.length > 0;
          }),
      otherwise: (schema) => schema.notRequired(),
    }),
  causeClassification: string().required("InputFieldIsRequried"),
  LK_TypeJudiciaryId: string().required("InputFieldIsRequried"),

  // LK_StageId: string()
  //   .nullable()
  //   .when("caseType", {
  //     is: (val: string) => val === "study",
  //     then: (schema) => schema.required("InputFieldIsRequried"),
  //     otherwise: (schema) => schema.notRequired(),
  //   }),

  OtherCategoryNameAr: string()
    .required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s]+$/, "NameMustBeInArabicWords")
    .when("causeClassification", {
      is: (val: string) => val === "12",
      then: (schema) => schema.required("InputFieldIsRequried"),
      otherwise: (schema) => schema.notRequired(),
    }),

  OtherCategoryNameEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[A-Za-z\s]+$/, "NameMustBeInEnglishWords")
    .when("causeClassification", {
      is: (val: string) => val === "12",
      then: (schema) => schema.required("InputFieldIsRequried"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export type AddCauseProps = InferType<typeof AddCauseSchema>;
