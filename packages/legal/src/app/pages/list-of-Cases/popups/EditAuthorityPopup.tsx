import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import {
  changeRedirectorStage,
  fetchCauseStageById,
} from "../../../features/cause-stage";
import { useAppDispatch } from "../../../store/store";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { Spinner } from "react-bootstrap";
import { LitigantStatus } from "../../../models/LegalEnums";

interface EditAuthorityPopupProps {
  show: boolean;
  handleClose: () => void;
  causeId: any;
  causeStageId: any;
  redirector: number;
}
// changeRedirectorStage()
const EditAuthorityPopup = ({
  show,
  handleClose,
  causeId,
  causeStageId,
  redirector,
}: EditAuthorityPopupProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  let [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState<number>();

  useEffect(() => {
    if (show) {
      setSelectedOption(redirector);
    }
  }, [show, redirector]);

  function Edit() {
    if (!causeId) {
      showAlert(false, "causeId is missing!", intl);
      return;
    }

    setLoading(true);
    dispatch(
      changeRedirectorStage({ causeStageId, redirector: selectedOption })
    )
      .unwrap()
      .then((res) => {
        if (res.message == "CauseStageIsChangedSuccessfully" || res?.statusEnum==1)
          setLoading(false);
          showAlert(true, "EditSuccessfully", intl);
        dispatch(fetchCauseStageById({ CauseStageId: causeStageId }));
        handleClose();
      })
      .catch((error) => {
        setLoading(false);
        showAlert(false, "EditFailed", intl);
      });
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center position-relative">
          {intl.formatMessage({ id: "EditAuthority" })}
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Edit();
        }}
      >
        {" "}
        <Modal.Body>
          <div className="p-1">
            <p className="text-muted mb-3">
              {" "}
              {intl.formatMessage({
                id: "TheEntityResponsibleFoTheTransferOfTheCase",
              })}
            </p>
            <div className="d-flex flex-column flex-md-row bg-light rounded p-2 gap-3">
              <div className="d-flex justify-content-start gap-1">
                <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                  <input
                    className="form-check-input widget-9-radio xRadioBg"
                    type="radio"
                    name="authority"
                    id="clients"
                    value={LitigantStatus.Client}
                    checked={selectedOption === LitigantStatus.Client}
                    onChange={(e: any) => setSelectedOption(Number(e.target.value))}
                  />
                </div>
                <label className="fs-6" htmlFor="clients">
                  {intl.formatMessage({ id: "Clients" })}
                </label>
              </div>

              <div className="d-flex justify-content-start gap-1">
                <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                  <input
                    className="form-check-input widget-9-radio xRadioBg"
                    type="radio"
                    name="authority"
                    id="opponents"
                    value={LitigantStatus.Opponent}
                    checked={selectedOption === LitigantStatus.Opponent}
                    onChange={(e: any) => setSelectedOption(Number(e.target.value))}
                  />
                </div>
                <label className="fs-6" htmlFor="opponents">
                  {intl.formatMessage({ id: "Opponents" })}
                </label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-end gap-2">
          <Button variant="light" onClick={handleClose} className="px-4">
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          {!loading ? (
                <Button type="submit" className="px-4 btn btn-primary">
                {intl.formatMessage({ id: "Save" })}{" "}
              </Button>
              ) : (
                <Button variant="success" disabled className="px-15 w-25">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mx-2"
                  />
                  <span>{intl.formatMessage({ id: "Adding" })}</span>
                </Button>
              )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditAuthorityPopup;
