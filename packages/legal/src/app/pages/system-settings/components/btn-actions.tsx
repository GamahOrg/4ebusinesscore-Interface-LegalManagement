import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

export const BtnsActions = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => navigate(-1)}
        className="btn border border-2 border-primary text-primary text-center px-10 w-10 mb-2"
      >
        {intl.formatMessage({ id: "Cancel" })}
      </div>
      <div
        onClick={() => setModalShow(true)}
        className="btn btn-primary text-center px-10 w-10 mb-2"
      >
        {intl.formatMessage({ id: "Add" })}
      </div>
      <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
    </>
  );
};
