
import { object, string, InferType, array, mixed, boolean } from "yup";

export const EditCauseCommentSchema = object({
  comment: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),

    attachments: array().of(
    object({
      file: mixed<File>().when("isExisting", {
        is: false, // فقط لو المرفق جديد
        then: (schema) => schema.required("AttachmentFileIsRequired"),
        otherwise: (schema) => schema.notRequired(),
      }),
      fileName:string().when("isExisting", {
        is: false,
        then: (schema) => schema.required("AttachmentNameIsRequired"),
        otherwise: (schema) => schema.notRequired(),
      }),
      isExisting: boolean().default(false),
    }))
});
export type EditCauseCommentProps = InferType<typeof EditCauseCommentSchema>;