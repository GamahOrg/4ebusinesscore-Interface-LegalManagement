import { mixed, number, object, string } from "yup";

const FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]; // PDF, DOC, DOCX

export const BookValidationSchema = object({
  nameAr: string()
    .required("InputFieldIsRequried")

    .matches(/^[\u0600-\u06FF\s]+$/, "YouMustEnterTextInArabicOnly"),

  nameEn: string()
    .required("InputFieldIsRequried")

    .matches(/^[A-Za-z\s]+$/, "YouMustEnterTextInEnglishOnly"),
  LK_ClassificationTypeELibraryId: string().required("InputFieldIsRequried"),
  url: string()
    .required("InputFieldIsRequried")
    .matches(/^(www\.)?[^\s]+?\.[a-z]{2,}$/, "InvalidURL")
    .typeError("InputFieldIsRequried"),
  imagePath: mixed()
    .test("fileRequired", "fileRequired", function (value) {
      if (value && value != null && value != undefined) return true;
      return false;
    })
    .test("fileType", "fileTypeMustBeValid", function (value) {
      if (!value) return true;
      if (typeof value === "string") return true;
      const fileName = value.name?.toLowerCase() || "";
      const allowedExtensions = [".jpg", ".jpeg", ".webp", ".svg", ".png"];
      return allowedExtensions.some((ext) => fileName.endsWith(ext));
    }),

  filePath: mixed()
    .test("fileRequired", "fileRequired", function (value) {
      if (value && value != null && value != undefined) return true;
      return false;
    })
    .test("fileType", "fileTypeMustBeValid", function (value) {
      if (!value) return true;

      if (typeof value === "string") return true;

      const fileName = value.name?.toLowerCase() || "";
      const allowedExtensions = [".pdf", ".doc", ".docx", ".dot", ".dotm"];
      return allowedExtensions.some((ext) => fileName.endsWith(ext));
    }),
});
