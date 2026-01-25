import { Modal, Button, Form } from "react-bootstrap";
import { useIntl } from "react-intl";
import { fetchAssignMember } from "../../../features/members";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import {
  changeUserCauseStage,
  fetchCauseStageById,
} from "../../../features/cause-stage";
import { useParams } from "react-router-dom";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

interface EditSupervisorPopupProps {
  show: boolean;
  handleClose: () => void;
  causeStageId: string;
  supervisor: string;
}

const EditSupervisorPopup = ({
  show,
  handleClose,
  causeStageId,
  supervisor,
}: EditSupervisorPopupProps) => {
  const intl = useIntl();
  const { id } = useParams();
  let [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>();
  const dispatch = useAppDispatch();
  const supervisors = useAppSelector(
    (state) => state.members?.members?.supervisor
  );

  //set initial value to the supervisor
  useEffect(() => {
    if (show) {
      setSelectedMember(supervisor);
    }
  }, [show, supervisor]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      causeStageId: causeStageId,
      userId: selectedMember,
    };
    setLoading(true)
    dispatch(changeUserCauseStage(data)).then((res: any) => {
      if (
        res?.payload?.message === "changeUserCauseStage" ||
        res?.payload?.message === "CauseStageIsChangedSuccessfully" || res?.payload?.statusEnum==1
      ) {
        setLoading(false)
        showAlert(true, "EditedSuccessfully", intl);
        dispatch(fetchCauseStageById({ CauseStageId: causeStageId }));
        handleClose();
      } else {
        setLoading(false)
        showAlert(false, "AnErrorOccurred", intl);
      }
    });
  };

  useEffect(() => {
    if (id && show) {
      dispatch(fetchAssignMember({ causeId: id, assignationType: 2 }) as any);
    }
  }, [id, show]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center position-relative">
          {intl.formatMessage({ id: "EditAdministrationManager" })}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="p-1">
            <div className="d-flex flex-column bg-light rounded p-2 gap-3">
              <div className="fs-4 fw-bolder mb-2 p-2">
                {" "}
                {intl.formatMessage({ id: "Assign" })}
              </div>

              <div
                className="d-flex flex-column"
                style={{ maxHeight: "500px", overflowY: "auto" }}
              >
                {supervisors?.map((supervisor: any, idx: number) => (
                  <div
                    key={supervisor?.userId || idx}
                    className="d-flex align-items-center gap-2 m-0 my-2"
                  >
                    <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                      <input
                        className="form-check-input widget-9-radio xRadioBg"
                        type="radio"
                        name="supervisor"
                        id={`supervisor-${supervisor?.fullName}-${idx + 1}`}
                        checked={selectedMember === supervisor?.userId}
                        onChange={() => setSelectedMember(supervisor?.userId)}
                        style={{ marginTop: "0" }}
                      />
                    </div>

                    <label
                      className=" d-flex align-items-center gap-2"
                      htmlFor={`supervisor-${supervisor?.fullName}-${idx + 1}`}
                    >
                      <img
                        alt="supervisor"
                        className="rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        src={
                          supervisor?.userImage ? UserManagmentRootUrl+supervisor?.userImage 
                          : UserManagmentRootUrl+supervisor?.userImage
                        }
                        onError={(e: any) => {
                          e.target.src =toAbsoluteUrl("/media/avatars/user.jpeg")
                        }}
                      />
                      <span className="fs-6">{supervisor?.fullName}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-end gap-2">
          <Button variant="light" onClick={handleClose} className="px-4">
            {intl.formatMessage({ id: "Cancel" })}{" "}
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
      </Form>
    </Modal>
  );
};

export default EditSupervisorPopup;
