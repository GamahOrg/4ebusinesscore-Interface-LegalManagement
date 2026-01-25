import { object, string, array, number, mixed } from "yup";

export const JudgeReportValidationSchema = object({
  judgmentSituation: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  reportInfo: object({
    type: string()
      .required("InputFieldIsRequried")
      .typeError("InputFieldIsRequried"),
    attachments: mixed()
      // .required("InputFieldIsRequried")
      // .test("isArray", "InputFieldIsRequried", (value) => {
      //   return Array.isArray(value) && value.length > 0;
      // })
      .test("fileType", "fileTypeMustBeValid", (value) => {
        if (!value || value.length === 0) return true;
        const validExtensions = [
          ".pdf", ".txt", ".xlsx", ".csv", ".xls", ".xlsm", ".xlsb",
          ".docx", ".dot", ".dotm", ".pptx", ".jpeg", ".png", ".svg",
          ".webp", ".jpg"
        ];
        return Array.from(value).every((file: any) => {
          const fileExtension = file.name.toLowerCase();
          return validExtensions.some((ext) => fileExtension.endsWith(ext));
        });
      })
      .test("fileSize", "FileSizeMustBeLessThan10MB", (value) => {
        if (!value || value.length === 0) return true;
        return value.every((file: File) => file.size <= 10 * 1024 * 1024);
      }),
    description: string()
      .required("InputFieldIsRequried")
      .typeError("InputFieldIsRequried")
      .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
        return value?.trim()?.length > 0;
      })
      // .test("valid-chars", "InvalidInput", value =>
      //  /^[\u0621-\u064A\u0660-\u0669a-zA-Z0-9 ]*$/.test(value ?? "")
      //  )
      ,
    judgmentTitle: string()
      .required("InputFieldIsRequried")
      .typeError("InputFieldIsRequried")
      .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
        return value?.trim()?.length > 0;
      })
      // .test("valid-chars", "InvalidInput", value =>
      //  /^[\u0621-\u064A\u0660-\u0669a-zA-Z0-9 ]*$/.test(value ?? "")
      //  )
      ,
    nextSession: object({
      date: string()
        .nullable()
        .test(
          "nextSession is required",
          "InputFieldIsRequried",
          function (value) {
            const judgmentSituation =
              this.from?.slice(-1)[0]?.value?.judgmentSituation;
            if (judgmentSituation === "8" && !value) {
              return false;
            }
            return true;
          }
        ),

      time: string()
        .nullable()
        .test(
          "nextSession is required",
          "InputFieldIsRequried",
          function (value) {
            const judgmentSituation =
              this.from?.slice(-1)[0]?.value?.judgmentSituation;

            if (judgmentSituation === "8" && !value) {
              return false;
            }
            return true;
          }
        ),
    }),
  }),
  clientRequests: array()
    .of(
      object({
        id: string().optional(),
        requirementsText: string().optional(),
        requirementType: number().optional(),
      })
    )
    .nullable(),
  opponentRequests: array()
    .of(
      object({
        id: string().optional(),
        requirementsText: string().optional(),
        requirementType: number().optional(),
      })
    )
    .nullable(),
});
