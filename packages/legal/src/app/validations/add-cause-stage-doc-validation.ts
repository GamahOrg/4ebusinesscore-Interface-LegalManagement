import { object, InferType, mixed, number, array } from "yup";

export const CauseStageDocSchema = object({
  lK_AttachmentSourceIds: array()
    .of(number().required())
    .min(1, "InputFieldIsRequried")
    .required("InputFieldIsRequried"),
  attachments: mixed()
    .required("InputFieldIsRequried")
    .test("isArray", "InputFieldIsRequried", (value) => {
      return Array.isArray(value) && value.length > 0;
    })
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
});

export type CauseStageDocProps = InferType<typeof CauseStageDocSchema>;
