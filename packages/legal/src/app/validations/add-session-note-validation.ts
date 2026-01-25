import { object, string, InferType, mixed } from "yup";

export const SessionNoteSchema = object({
  sessionId: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  sessionNumber: string()
    .required("YouMustEnterCauseThatHasActiveSession")
    .typeError("YouMustEnterCauseThatHasActiveSession"),
  causeId: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  causeStageId: string()
    .required("YouMustSelectCaseThatHasActiveCauseStage")
    .typeError("YouMustSelectCaseThatHasActiveCauseStage"),
  description: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .test("not-only-whitespace", "InputFieldIsRequried", (value: any) => {
      return value?.trim()?.length > 0;
    })
    ,
  attachments: mixed().test("minLength", "MustAddDocs", (value) => {
    return value && value.length >= -1;
  }),
});

export type SessionNoteProps = InferType<typeof SessionNoteSchema>;
