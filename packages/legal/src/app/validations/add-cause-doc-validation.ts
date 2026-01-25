import { object, InferType, mixed } from "yup";

export const AddCauseDocSchema = object({
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
  }),
});

export type AddCauseDocProps = InferType<typeof AddCauseDocSchema>;
