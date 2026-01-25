import { object, string, array, number, mixed } from "yup";

const validCharactersRegex = /^[\u0621-\u064A\u0660-\u0669a-zA-Z0-9_\-/ ]*$/;

export const JudgmentValidationSchema = object({
  judgmentSituation: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .test(
      "not-only-whitespace",
      "InputFieldIsRequried",
      (value) => (value ?? "").trim().length > 0
    ),

  toLevel: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .test(
      "not-only-whitespace",
      "InputFieldIsRequried",
      (value) => (value ?? "").trim().length > 0
    ),

  causeStage: string().optional(),
  nextSession: mixed().when("judgmentSituation", (value, schema) => {
    if (value === "8") {
      return object({
        date: string().required("InputFieldIsRequried"),
        time: string().required("InputFieldIsRequried"),
        reason: string(),
      }).required();
    }
    return schema.notRequired();
  }),
  reportInfo: object({
    type: string()
      .required("InputFieldIsRequried")
      .test(
        "not-only-whitespace",
        "InputFieldIsRequried",
        (value) => (value ?? "").trim().length > 0
      ),

    description: string()
      .required("InputFieldIsRequried")
      .typeError("InputFieldIsRequried")
      .test(
        "not-only-whitespace",
        "InputFieldIsRequried",
        (value) => (value ?? "").trim().length > 0
      ),
    // .test("valid-chars", "InputFieldIs", value =>
    //   validCharactersRegex.test(value ?? "")
    // ),

    judgmentTitle: string()
      .required("InputFieldIsRequried")
      .typeError("InputFieldIsRequried")
      .test(
        "not-only-whitespace",
        "InputFieldIsRequried",
        (value) => (value ?? "").trim().length > 0
      )
      // .test("valid-chars", "InputFieldIs", (value) =>
      //   validCharactersRegex.test(value ?? "")
      // ),
  }),
  attachments: mixed()
    // .test("fileRequired", "fileRequired", function (value) {
    //   if (!value || !Array.isArray(value)) return false;
    //   return value.length > 0;
    // })
    .test("fileType", "fileTypeMustBeValid", function (value) {
      if (!value || value.length === 0) {
        return true;
        }
      if (!value || !Array.isArray(value)) return true;

      return value.every((file) => {
        const fileName = (file.file && file.file.name) || file.fileName || "";

        if (!fileName) return false;

        const lowerFileName = fileName.toLowerCase();
        return (
          lowerFileName.endsWith(".pdf") ||
          lowerFileName.endsWith(".txt") ||
          lowerFileName.endsWith(".xlsx") ||
          lowerFileName.endsWith(".csv") ||
          lowerFileName.endsWith(".xls") ||
          lowerFileName.endsWith(".xlsm") ||
          lowerFileName.endsWith(".xlsb") ||
          lowerFileName.endsWith(".docx") ||
          lowerFileName.endsWith(".dot") ||
          lowerFileName.endsWith(".dotm") ||
          lowerFileName.endsWith(".pptx") ||
          lowerFileName.endsWith(".jpeg") ||
          lowerFileName.endsWith(".png") ||
          lowerFileName.endsWith(".svg") ||
          lowerFileName.endsWith(".webp") ||
          lowerFileName.endsWith(".jpg")
        );
      });
    }),

  clientRequests: array()
    .of(
      object({
        requirementsText: string().optional(),
        requirementType: number().optional(),
      })
    )
    .nullable(),

  opponentRequests: array()
    .of(
      object({
        requirementsText: string().optional(),
        requirementType: number().optional(),
      })
    )
    .nullable(),
});
