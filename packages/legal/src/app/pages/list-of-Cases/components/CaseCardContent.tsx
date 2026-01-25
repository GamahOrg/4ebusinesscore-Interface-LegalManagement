import { ReactNode } from "react";
import { useIntl } from "react-intl";

const MODIFICATIONS = "modifications";
const CHANGES = "changes";

interface CaseCardContentProps {
  type: typeof MODIFICATIONS | typeof CHANGES;
  title?: string;
  firstContent?: string | ReactNode;
  secondContent?: string | ReactNode;
  firstCase?: string;
  secondCase?: string;
}

const CaseCardContent = ({
  type,
  title,
  firstContent,
  secondContent,
  firstCase,
  secondCase,
}: CaseCardContentProps) => {
  const intl = useIntl();

  return (
    <div className="bg-body p-5 rounded-2">
      {title && <p className="mb-4 fw-bolder text-dark">{title}</p>}

      {type === MODIFICATIONS ? (
        <div className="text-dark mb-2 fs-5">
          {firstContent ? (
            <>
              <span className="text-muted fs-6">{firstCase}</span>
              <span
                className="mx-1"
                style={{ maxWidth: "90%", overflow: "auto" }}
              >
                {firstContent}
              </span>
              <div>
                <i className="fa-solid fa-arrow-down-long fs-5 fa-fw text-primary my-2"></i>
              </div>
            </>
          ) : (
            <span
              className="mx-1"
              style={{ maxWidth: "90%", overflow: "auto" }}
            >
              {!firstContent &&
                !secondContent &&
                intl.formatMessage({ id: "NotFound" })}
            </span>
          )}
          {secondContent && (
            <div className="d-flex flex-md-nowrap flex-wrap text-dark mb-2 fs-5">
              <span className="text-muted fs-6 flex-shrink-0">
                {secondCase}
              </span>
              <span
                className="mx-1"
                style={{ maxWidth: "90%", overflow: "auto" }}
              >
                {secondContent}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex flex-md-nowrap flex-wrap align-items-center gap-3 my-1">
          {firstCase && (
            <span className="text-dark fs-6 fw-bolder">{firstCase}</span>
          )}
          {secondCase && (
            <>
              <i
                className={`fa-solid fa-arrow-${
                  intl.locale === "ar" ? "left" : "right"
                }-long fs-5 fa-fw text-primary`}
              ></i>
              <span className="text-primary fs-6 fw-bolder">{secondCase}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CaseCardContent;
