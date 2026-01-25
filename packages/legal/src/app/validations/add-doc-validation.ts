import { object, InferType, mixed } from "yup";

export const AddDocSchema = object({
  attachments: mixed()
    .required("InputFieldIsRequried")
    .test("isArray", "InputFieldIsRequried", (value) => {
      return Array.isArray(value) && value.length > 0;
    })
    .test("fileType", "OnlyImageOrPdfFilesAreAllowed", (value) => {
      if (!value || value.length === 0) return true;
      return Array.from(value).every((file: any) =>
        file.type.startsWith("image/") || file.type === "application/pdf"
      );
    })
    .test("fileSize", "FileSizeMustBeLessThan10MB", (value) => {
      if (!value || value.length === 0) return true;
      return value.every((file: File) => file.size <= 10 * 1024 * 1024);
    }),
});

export type AddDocProps = InferType<typeof AddDocSchema>;
