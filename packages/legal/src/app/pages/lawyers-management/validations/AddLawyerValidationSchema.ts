import { object, string, boolean, number } from "yup";
import { LitigantStatus, LawyerStatus } from "../../../models/LegalEnums";
import { useIntl } from "react-intl";

export const AddLawyerValidationSchema = () => {
  const intl = useIntl();

  return object({
    litigantStatus: number()
      .required(intl.formatMessage({ id: "ErrorlitigantStatus" }))
      .oneOf([LitigantStatus.Client, LitigantStatus.Opponent]),

    isInternal: boolean().when("litigantStatus", {
      is: LitigantStatus.Client,
      then: (schema) =>
        schema.required(intl.formatMessage({ id: "ErrorLitigantIsInternal" })),
    }),

    lawyerStatus: number().when("litigantStatus", {
      is: LitigantStatus.Client,
      then: (schema) =>
        schema
          .required(intl.formatMessage({ id: "ErrorLawyerStatus" }))
          .oneOf([LawyerStatus.Active, LawyerStatus.Banned]),
    }),
    internalLawyerName: string().when(["isInternal", "litigantStatus"], {
      is: (litigantStatus, isInternal) =>
        litigantStatus === LitigantStatus.Opponent ||
        (litigantStatus === LitigantStatus.Client && isInternal),
      then: (schema) =>
        schema
          .required(intl.formatMessage({ id: "InputFieldIsRequried" }))
          // .min(2, intl.formatMessage({ id: "ErrorNameTooShort" }))
          // .max(100, intl.formatMessage({ id: "ErrorNameTooLong" }))
          .matches(
            /^[\u0600-\u06FFa-zA-Z\s\-']+$/,
            intl.formatMessage({ id: "InvalidNameFormat" })
          )
          .test(
            "no-sql-injection",
            intl.formatMessage({ id: "InputFieldIsRequried" }),
            (value) => {
              if (!value) return true;
              const sqlInjectionPatterns = [
                /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC|ALTER|CREATE|TRUNCATE)\b)/i,
                /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
                /(\b(OR|AND)\s+['"]\s*=\s*['"])/i,
                /(\b(OR|AND)\s+\w+\s*=\s*\w+)/i,
              ];
              return !sqlInjectionPatterns.some((pattern) =>
                pattern.test(value)
              );
            }
          )
          .test(
            "no-xss",
            intl.formatMessage({ id: "InputFieldIsRequried" }),
            (value) => {
              if (!value) return true;
              const xssPatterns = [
                /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                /javascript:/i,
                /on\w+\s*=/i,
                /<[^>]*>/i,
              ];
              return !xssPatterns.some((pattern) => pattern.test(value));
            }
          ),
      otherwise: (schema) => schema.optional(),
      // otherwise: (schema) =>
      //   schema.required(intl.formatMessage({ id: "InputFieldIsRequried" })),
    }),

    externalLawyerName: string().when(["isInternal"], {
      is: false,
      then: (schema) =>
        schema
          .required(intl.formatMessage({ id: "InputFieldIsRequried" }))
          // .min(2, intl.formatMessage({ id: "ErrorNameTooShort" }))
          // .max(100, intl.formatMessage({ id: "ErrorNameTooLong" }))
          .matches(
            /^[\u0600-\u06FFa-zA-Z\s\-']+$/,
            intl.formatMessage({ id: "InvalidNameFormat" })
          )
          .test(
            "no-sql-injection",
            intl.formatMessage({ id: "InputFieldIsRequried" }),
            (value) => {
              if (!value) return true;
              const sqlInjectionPatterns = [
                /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC|ALTER|CREATE|TRUNCATE)\b)/i,
                /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
                /(\b(OR|AND)\s+['"]\s*=\s*['"])/i,
                /(\b(OR|AND)\s+\w+\s*=\s*\w+)/i,
              ];
              return !sqlInjectionPatterns.some((pattern) =>
                pattern.test(value)
              );
            }
          )
          .test(
            "no-xss",
            intl.formatMessage({ id: "InputFieldIsRequried" }),
            (value) => {
              if (!value) return true;
              const xssPatterns = [
                /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                /javascript:/i,
                /on\w+\s*=/i,
                /<[^>]*>/i,
              ];
              return !xssPatterns.some((pattern) => pattern.test(value));
            }
          ),
      otherwise: (schema) => schema.optional(),
    }),
    phone: string().when(["litigantStatus", "isInternal"], {
      is: (litigantStatus, isInternal) =>
        litigantStatus === LitigantStatus.Opponent ||
        (litigantStatus === LitigantStatus.Client && !isInternal),
      then: (schema) =>
        schema
          .required(intl.formatMessage({ id: "InputFieldIsRequried" }))
          .matches(
            /^(?:009665|9665|05)[0-9]{8}$/,
            intl.formatMessage({ id: "InvalidSaudiPhoneNumber" })
          ),
      otherwise: (schema) => schema.optional(),
    }),

    count: number().when(["litigantStatus", "isInternal"], {
      is: (litigantStatus, isInternal) => !litigantStatus || !isInternal,
      then: (schema) =>
        schema.required(intl.formatMessage({ id: "ErrorCount" })),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
};
