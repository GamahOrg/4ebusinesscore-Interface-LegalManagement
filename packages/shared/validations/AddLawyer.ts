import { object, array } from "yup";

export const LawyerCreateValidationSchema = object({
  lawyers: array().min(1, "SelectAtLeastOneLawyer"),
  dataEntry: array().min(1, "SelectAtLeastOneDataEntryOperator"),
});
