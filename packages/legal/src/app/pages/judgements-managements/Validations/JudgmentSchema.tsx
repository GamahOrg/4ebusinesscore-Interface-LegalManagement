import { object, string, array, number, mixed } from "yup";

const validCharactersRegex = /^[\u0621-\u064A\u0660-\u0669a-zA-Z0-9_\-/ ]*$/;

export const JudgmentValidationSchema = object({
  judgmentSituation: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .test("not-only-whitespace", "InputFieldIsRequried", value => (value ?? "").trim().length > 0),

  toLevel: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .test("not-only-whitespace", "InputFieldIsRequried", value => (value ?? "").trim().length > 0),

  causeStage: string().optional(),
  nextSession:
  mixed().when("judgmentSituation", (value, schema) => {
    if (value === "8") {
      return object({
        date: string().required("InputFieldIsRequried"),
        time: string().required("InputFieldIsRequried"),
        reason: string(),
      }).required()
    }
    return schema.notRequired()
  }),
  reportInfo: object({
    type: string()
      .required("InputFieldIsRequried")
      .test("not-only-whitespace", "InputFieldIsRequried", value => (value ?? "").trim().length > 0),

    description: string()
      .required("InputFieldIsRequried")
      .typeError("InputFieldIsRequried")
      .test("not-only-whitespace", "InputFieldIsRequried", value => (value ?? "").trim().length > 0)
     
      // .test("valid-chars", "InputFieldIs", value =>
      //   validCharactersRegex.test(value ?? "")
      // )
      ,

    judgmentTitle: string()
      .required("InputFieldIsRequried")
      .typeError("InputFieldIsRequried")
      .test("not-only-whitespace", "InputFieldIsRequried", value => (value ?? "").trim().length > 0)
      
      // .test("valid-chars", "InputFieldIs", value =>
      //   validCharactersRegex.test(value ?? "")
      // )
      ,
  }),
  attachments: mixed()
    // .test("fileRequired", "fileRequired", function (value) {
    //   console.log(value);
    //     if (value && value != null && value != undefined && value.length && value.length > 0) return true;
    //     else return false;
  
    // })
    .test("fileType", "fileTypeMustBeValid", function (value) {
      if (!value || value.length === 0) {
        return true;
        }
      return (
        (value &&
          value[0] &&
          (value[0].file.name.toLowerCase().endsWith(".pdf") ||
            value[0].file.name.toLowerCase().endsWith(".txt") ||
            value[0].file.name.toLowerCase().endsWith(".xlsx") ||
            value[0].file.name.toLowerCase().endsWith(".csv") ||
            value[0].file.name.toLowerCase().endsWith(".xls") ||
            value[0].file.name.toLowerCase().endsWith(".xlsm") ||
            value[0].file.name.toLowerCase().endsWith(".xlsb") ||
            value[0].file.name.toLowerCase().endsWith(".docx") ||
            value[0].file.name.toLowerCase().endsWith(".dot") ||
            value[0].file.name.toLowerCase().endsWith(".dotm") ||
            value[0].file.name.toLowerCase().endsWith(".pptx") ||
            value[0].file.name.toLowerCase().endsWith(".jpeg") ||
            value[0].file.name.toLowerCase().endsWith(".png") ||
            value[0].file.name.toLowerCase().endsWith(".svg") ||
            value[0].file.name.toLowerCase().endsWith(".webp") ||
            value[0].file.name.toLowerCase().endsWith(".jpg")))
      );
    }),
    
  clientRequests: array()
    .of(
      object({
        requirementsText: string().optional(),
        requirementType: number().optional()
      })
    )
    .nullable(),

  opponentRequests: array()
    .of(
      object({
        requirementsText: string().optional(),
        requirementType: number().optional()
      })
    )
    .nullable()
});