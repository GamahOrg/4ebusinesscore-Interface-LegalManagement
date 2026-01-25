import { FC } from "react";
import { useIntl } from "react-intl";
import { Actions } from "./Actions";

interface INewsList {
  id: string;
  entityName: string;
}
export const BasicDataList: FC<{ basicData: INewsList }> = ({ basicData }) => {
  const { id, entityName } = basicData;
  const intl = useIntl();

  return (
    <>
      <td>
        <div
          className="text-primary fw-bolder text-hover-primary mb-1 fs-6"
          onClick={(event) => event.preventDefault()}
        >
          {id}
        </div>
      </td>

      <td>
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-start flex-column">
            <a
              onClick={(event) => event.preventDefault()}
              className="text-dark fw-bolder mb-1 fs-6"
            >
              {intl.formatMessage({ id: entityName })}
            </a>
          </div>
        </div>
      </td>

      <td className="text-center">
        <Actions />
      </td>
    </>
  );
};
