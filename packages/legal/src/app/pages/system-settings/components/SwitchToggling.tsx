import React, { useState } from "react";
import { TurnOnPopup } from "@4eplatform/shared/src/popups/TurnOnPopup";
import { TurnOffPopup } from "@4eplatform/shared/src/popups/TurnOffPopup";

const SwitchToggling = () => {
  const [isTurndeOn1, setIsTurndeOn1] = useState(true);

  const [showTurnOffModelA, setShowTurnOffModelA] = useState<boolean>(false);
  const handleToggleCheckbox = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    showModalSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prevValue) => !prevValue);
    showModalSetter(true);
  };
  return (
    <>
      <div className="form-check form-switch form-check-custom form-check-solid d-flex  justify-content-center ">
        <input
          className="form-check-input"
          type="checkbox"
          id="status1"
          name="status1"
          onClick={() => {
            handleToggleCheckbox(setIsTurndeOn1, setShowTurnOffModelA);
          }}
          defaultChecked={isTurndeOn1}
        />
      </div>
      {isTurndeOn1 ? (
        <div className="modal fade" aria-hidden="true">
          <TurnOnPopup
            show={showTurnOffModelA}
            handleClose={() => setShowTurnOffModelA(false)}
          />
        </div>
      ) : (
        <div className="modal fade" aria-hidden="true">
          <TurnOffPopup
            show={showTurnOffModelA}
            handleClose={() => setShowTurnOffModelA(false)}
          />
        </div>
      )}
    </>
  );
};

export default SwitchToggling;
