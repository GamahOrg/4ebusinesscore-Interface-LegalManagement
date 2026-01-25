import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ViewAllcardsCardActions } from "./CardActions";
import { TurnOffPopup } from "@4eplatform/shared/src/popups/TurnOffPopup";
import { TurnOnPopup } from "@4eplatform/shared/src/popups/TurnOnPopup";

interface Iprop {
  cardInfo: {
    badgeColor: string;
    svgIcon: any;
    iconTextColor: string;
    title: string;
    category: string;
    owner: string;
    permissionBadgeColor: string;
    permissionTitle: string;
    cardStatus: string;
  };
}
const ViewallcardsTableCardRowInformation: FC<Iprop> = ({ cardInfo }) => {
  const [isTurndeOn, setIsTurndeOn] = useState(false);
  const [showTurnOffModel, setShowTurnOffModel] = useState<boolean>(false);
  const { workspaceName } = useParams();
  var checkedCard;
  if (cardInfo?.cardStatus) {
    checkedCard = true;
  }

  return (
    <tr>
      <td className="">
        <Link to={`/training-system-settings/card-details/${workspaceName}`}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="symbol symbol-50px mb-2 toolsIcon">
              <span className={`symbol-label ${cardInfo.badgeColor}`}>
                <span
                  className={`svg-icon svg-icon-3x svg-icon-${cardInfo.iconTextColor}`}
                >
                  {cardInfo.svgIcon}
                </span>
              </span>
            </div>
            <div className="d-flex flex-column mx-3">
              <span className={`text-${cardInfo.iconTextColor}`}>
                {cardInfo.title}
              </span>
              <span className="text-gray-600">
                وصف الكارت, وصف الكارت, وصف الكارت,
              </span>
            </div>
          </div>
        </Link>
      </td>
      <td className="text-center">{cardInfo.category}</td>
      <td className="text-center">{cardInfo.owner}</td>
      <td className="text-center">
        <span className={`badge ${cardInfo.permissionBadgeColor} p-3`}>
          {cardInfo.permissionTitle}
        </span>
      </td>
      <td className="text-center">
        <div className="form-check form-switch form-check-custom form-check-solid d-flex justify-content-center">
          <input
            className="form-check-input"
            type="checkbox"
            id="status"
            name="status"
            onClick={() => {
              setIsTurndeOn(!isTurndeOn);
              setShowTurnOffModel(true);
            }}
            defaultChecked={checkedCard}
          />
        </div>
      </td>
      <td className="text-center">
        <ViewAllcardsCardActions id={0} />
      </td>
      <td className="text-center">
        {isTurndeOn ? (
          <div className="modal fade" aria-hidden="true">
            <TurnOffPopup
              show={showTurnOffModel}
              handleClose={() => setShowTurnOffModel(false)}
            />
          </div>
        ) : (
          <div className="modal fade" aria-hidden="true">
            <TurnOnPopup
              show={showTurnOffModel}
              handleClose={() => setShowTurnOffModel(false)}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export { ViewallcardsTableCardRowInformation };
