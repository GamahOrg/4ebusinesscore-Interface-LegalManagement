import { object, InferType, string, array } from "yup";

export const AddMemberSchema = object({
    // member:string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
    member: array()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return originalValue.split(",").map((v) => v.trim());
      }
      return value;
    })
    .of(string().required())
    .min(1, "InputFieldIsRequried")
    .required("InputFieldIsRequried"),
  
});

export type AddMemberProps = InferType<typeof AddMemberSchema>;
