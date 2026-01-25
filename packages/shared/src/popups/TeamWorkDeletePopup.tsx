import { FC } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { showAlert } from "../../services/showAlert";
import { useDispatch } from "react-redux";
import { deleteCauseAssignment } from "../../../legal/src/app/features/cause";
import { AppDispatch, useAppSelector } from "../../../legal/src/app/store/store";

type DeletePopupProps = {
  id?: any;
  handleDelete?: (id?: any, additionalData?: {}) => void;
  showDelete?: any;
  handleCloseDelete?: any;
  caseId?: string;
  fetchFilteredMembers: (
    caseId: string,
    searchWord: string,
    causeStageId: string,
    sessionId: string
  ) => Promise<void>;
  causeStageId?: string;
  sessionId?: string;
  searchTerm?: string;
};

export const TeamWorkDeletePopup: FC<DeletePopupProps> = ({
  showDelete,
  handleCloseDelete,
  id = 0,
  caseId,
  fetchFilteredMembers,
  handleDelete = null,
  causeStageId,
  sessionId,
  searchTerm,
}) => {
  const intl = useIntl();
  let theme = localStorage.getItem("Theme");
  const dispatch: AppDispatch = useDispatch();
  const causeId = useAppSelector((state) => state.causes.causeById.id);


  const deleteAssignMember = async (selectedMember: string) => {
    const res = await dispatch(deleteCauseAssignment({ id: selectedMember }) as any).unwrap();
    console.log(res)
      if(res?.message === "CauseAssign Delete Success" || res?.message === "CauseAssign deleted successfully" )
        {
          if (fetchFilteredMembers && caseId) {
            await fetchFilteredMembers(causeId,
              searchTerm || "",
              causeStageId || "",
              sessionId || "");
          }
        showAlert(true, "DeletedSuccessfully", intl);
        }else if (res?.message === "This member is appointed as an supervisor for  Stage in this Cause") {
          showAlert(false, "DeleteSupervisor", intl);
        }else if (res?.message === "This member is appointed as an Laywer for  session in this cause.") {
          showAlert(false, "DeleteLawyer", intl);
        }else if (res?.message === "This member is appointed as an DataEntry for  session in this cause.") {
          showAlert(false, "DeleteDataEntry", intl);
        }else if (res?.message === "ThisMemberIsAppointedAsALawyerForASessionInThisCause"){
          showAlert(false, "ThisMemberIsAppointedAsALawyerForASessionInThisCause", intl);
        }else if (res?.message === "ThisMemberIsAppointedAsADataEntryForASessionInThisCause"){
           showAlert(false, "ThisMemberIsAppointedAsADataEntryForASessionInThisCause", intl);
        }else if (res?.message === "ThisMemberIsAppointedAsASupervisorForAStageInThisCause"){
           showAlert(false, "ThisMemberIsAppointedAsASupervisorForAStageInThisCause", intl);
        }
      else { showAlert(false, res?.message, intl); }
};
  

  return (
    <div className="modal-dialog modal-dialog-centered ">
      <Modal
        centered
        show={showDelete}
        onHide={handleCloseDelete}
        className={!showDelete ? "inert" : ""}
      >
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "center",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center my-5 pb-4">
            <div className="text-center">
              <h3> {intl.formatMessage({ id: "ConfirmDeletion" })}</h3>
            </div>
          </Row>

          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>
                {intl.formatMessage({ id: "AreYouSureToDeleteThisItem" })}
              </h5>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center py-2">
          <div className="row">
            <div className="col-12 col-lg-7 mx-auto my-2 pb-2">
              <div className="outputCard card-diff-toolbar w-100 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="reset"
                    className="btn btn-secondary me-3 w-100"
                    onClick={handleCloseDelete}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <div
                    onClick={() => {
                      handleCloseDelete();
                      if (deleteAssignMember) {
                        deleteAssignMember(id);
                      }
                    }}
                    className="  btn btn-danger me-5 w-100 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Delete" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Deleting" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
