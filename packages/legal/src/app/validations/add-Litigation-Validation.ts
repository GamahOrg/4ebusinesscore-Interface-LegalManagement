import { object, string, InferType, number } from "yup";

export const LitigationSchema = object({
    causeStageNumber: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried")
    .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
        return value?.trim()?.length > 0;
      })
    //    .test(
    // "valid-chars",
    //  "CharactersAndNumbersAllowedOnly",
    // (value) =>
    // /^[\u0621-\u064A\u0660-\u0669a-zA-Z0-9#&/]+$/.test(value ?? "")
    //  )
      ,
    causeId: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
    lk_StageId: number()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
    Redirector: number().required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
    superVisorId: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
});

export type LitigationProps = InferType<typeof LitigationSchema>;
