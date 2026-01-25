import { FC } from "react";
import { useIntl } from "react-intl";
import SwitchToggling from "./SwitchToggling";

interface INewsList {
  id: string;
  cardName: string;
  note: string;
}
export const NotificationsList: FC<{ notification: INewsList }> = ({
  notification,
}) => {
  const { id, cardName, note } = notification;
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
              {intl.formatMessage({ id: cardName })}
            </a>
          </div>
        </div>
      </td>

      <td className="text-center">
        <div className="text-dark fw-bolder  d-block mb-1 fs-6">{note}</div>
      </td>
      <td className="text-center">
        <SwitchToggling />
      </td>

      <td className="text-center">
        <SwitchToggling />
      </td>
    </>
  );
};
