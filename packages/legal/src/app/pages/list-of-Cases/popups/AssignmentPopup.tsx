import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useAppDispatch } from "../../../store/store";
import { fetchAssignMember } from "../../../features/members";
import { AssignationType } from "../../../models/LegalEnums";
import { useForm } from "react-hook-form";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { postSessionAssign } from "../../../features/session-assign";
import { fetchCauseStageById } from "../../../features/cause-stage";
import { Spinner } from "react-bootstrap";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import { LegalAggRootUrl } from "@4eplatform/shared/apis/legal_agg";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { fetchSessionById, fetchSessionByIdParams } from "../../../features/session";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";


interface Lawyer {
  userId: string;
  userName: string;
  userImage?: string;
  isChecked: boolean;
  assignationType: number;
}
interface DataEntry {
  userId: string;
  userName: string;
  userImage?: string;
  isChecked: boolean;
  assignationType: number;
}
const AssignmentPopup = ({
  show,
  handleClose,
  causeId,
  selectedCauseStageId,
  selectedSessionId,
  selectedSession
}: any) => {
  const dispatch = useAppDispatch();
  let [loading, setLoading] = useState(false);

  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [dataEntry, setDataEntry] = useState<DataEntry[]>([]);
  const [assignee, setAssignee] = useState([]);
  let theme=localStorage.getItem("Theme")
  let sessionAssignees=Array.isArray(selectedSession?.sessionAssigneeDto) && selectedSession?.sessionAssigneeDto?.map((user)=>{return user?.userId})




  useEffect(() => {
    if (show && causeId && selectedSessionId) {
      const data = {
        id: selectedSessionId,
        params: {
          CauseId: causeId,
        },
      };
  
      dispatch(fetchSessionByIdParams(data)).then((res: any) => {
        const assignees = res?.payload?.result?.sessionAssigneeDto;
        setAssignee(assignees);
        const lawyersWithType3 = assignees?.filter(
          (item: any) => item.assignationType ===  AssignationType.Lawyers,
        );
        setLawyers(lawyersWithType3);
        const dataEntryWithType4 = assignees?.filter(
          (item: any) => item.assignationType ===  AssignationType.DataEntry,
        );
        setDataEntry(dataEntryWithType4);
      });
    }
  }, [show, causeId, selectedSessionId]);
  
  const handleLawyerCheckboxChange = (lawyerId: string, checked: boolean) => {
    setLawyers((prevLawyers) =>
      prevLawyers.map((lawyer) =>
        lawyer.userId === lawyerId
          ? { ...lawyer, isChecked: checked }
          : lawyer
      )
    );
  };
  const handleDataentryCheckboxChange = (dataEntryId: string, checked: boolean) => {
    setDataEntry((prevDataEntry) =>
      prevDataEntry.map((ele:any) =>
        ele.userId === dataEntryId
          ? { ...ele, isChecked: checked }
          : ele
      )
    );
  };
  const intl = useIntl();

  const {
    handleSubmit,
    formState,
  } = useForm<any>({});

  const handleAddAssignMembers = async (formValues: any) => {
    const dataCheckedLawyers = lawyers
      ?.filter((lawyer: any) => lawyer.isChecked)
      ?.map((lawyer: any) => ({
        userId: lawyer.userId,
        sessionId: selectedSessionId,
        causeStageId: selectedCauseStageId,
        assignationType: AssignationType.Lawyers,
      }));
  
    const dataCheckedDataEntry = dataEntry
      ?.filter((entry: any) => entry.isChecked)
      ?.map((entry: any) => ({
        userId: entry.userId,
        sessionId: selectedSessionId,
        causeStageId: selectedCauseStageId,
        assignationType: AssignationType.DataEntry,
      }));
  
      console.log(dataCheckedLawyers);
      if(dataCheckedLawyers?.length == 0){
      showAlert(false, "MustInsertLawyerAssign", intl);
      return;
      }
      if(dataCheckedDataEntry?.length == 0){
      showAlert(false, "MustInsertDataEntryAssign", intl);
      return;
      }
    const body = [...dataCheckedLawyers, ...dataCheckedDataEntry];
  
    const params = {
      body,
      ids: [selectedSessionId, causeId],
    };
  
    if (body.length === 0) {
      showAlert(false, "MustInsertSessionAssign", intl);
      return;
    }
  
    setLoading(true);
  
    dispatch(postSessionAssign(params) as any).then((res: any) => {
      if (
        res?.payload?.statusEnum === 1 ||
        res?.payload?.message === "SavedSuccessfully"
      ) {
        setLoading(false);
        dispatch(fetchCauseStageById({ causeStageId: selectedCauseStageId }));
        showAlert(true, "AddedSuccessfully", intl);
        handleClose();
      } else if (res?.payload?.message === "Must Insert Session Assign") {
        setLoading(false);
        showAlert(false, "MustInsertSessionAssign", intl);
      } else {
        setLoading(false);
        showAlert(false, res?.payload?.message, intl);
      }
    });
  };
  

  return (
    <Modal size={"lg"} show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center position-relative w-100 mt-3">
          {intl.formatMessage({ id: "Assignation" })}
        </Modal.Title>
      </Modal.Header>
      <form 
      onSubmit={handleSubmit(handleAddAssignMembers)}
      >
        <Modal.Body>
          <div className="mb-4">
            <div className="bg-light p-4 rounded">
              <h5 className="fw-bolder fs-4 mb-5">
                {" "}
                {intl.formatMessage({ id: "Assignation" })}
              </h5>
              <div className="d-flex flex-column flex-md-row gap-3">
                {/* Lawyers Col */}
                <div className="flex-grow-1 w-100">
                  <p className="fs-6 text-muted">
                    {intl.formatMessage({ id: "Lawyers" })}
                  </p>
                  <div className={`d-flex flex-column  bg-${theme=="dark"?"light":"white"} p-2 rounded rounded gap-2`}>
                    {/* First Row */}
                    {Array.isArray(lawyers) &&
                      lawyers?.length !== 0 &&
                      lawyers.map((lawyer: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <div className="d-flex align-items-center gap-2">
                              <img
                               src={getIconSrc(
                                lawyer?.userImage,
                                { filePath: lawyer?.userImage },
                                UserManagmentRootUrl
                              )}
                              onError={(e: any) =>
                                (e.target.src =toAbsoluteUrl("/media/avatars/user.jpeg"))
                              }
                                alt="user"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                }}
                              />
                              <span>{lawyer?.userName}</span>
                              <span className="text-muted">
                                {/* {lawyer?.isInternal
                                  ? intl.formatMessage({ id: "Internal" })
                                  : intl.formatMessage({ id: "External" })} */}
                                  {intl.formatMessage({id:"Internal"})}
                              </span>
                            </div>
                            <Form.Check
                              type="checkbox"
                              checked={lawyer.isChecked === true}
                              onChange={(e) =>
                                handleLawyerCheckboxChange(lawyer.userId, e.target.checked)
                              }
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                {/* Data Entry Col */}
                <div className="flex-grow-1 w-100">
                  <p className="fs-6 text-muted">
                    {intl.formatMessage({ id: "dataEntry" })}
                  </p>
                  <div className={`d-flex flex-column bg-${theme=="dark"?"light":"white"} p-2 rounded  gap-2`}>
                    {/* First Row */}
                    {Array.isArray(dataEntry) &&
                      dataEntry?.length !== 0 &&
                      dataEntry.map((ele: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <div className="d-flex align-items-center gap-2">
                              <img
                                 src={getIconSrc(
                                  ele?.userImage,
                                  { filePath: ele?.userImage },
                                  UserManagmentRootUrl
                                )}
                                onError={(e: any) =>
                                  (e.target.src = toAbsoluteUrl("/media/avatars/user.jpeg"))
                                }
                                alt="user"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                }}
                              />
                              <span>{ele?.userName}</span>
                              <span className="text-muted">
                                {/* {ele?.isInternal
                                  ? intl.formatMessage({ id: "Internal" })
                                  : intl.formatMessage({ id: "External" })} */}
                                     {intl.formatMessage({id:"Internal"})}
                              </span>
                            </div>
                            <Form.Check
                              type="checkbox"
                              checked={ele?.isChecked === true}
                              onChange={(e) =>
                                handleDataentryCheckboxChange(ele.userId, e.target.checked)
                              }
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end gap-2">
          <Button
            className="px-4"
            variant="light"
            onClick={() => {
              handleClose();
              setLoading(false);
            }}
          >
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          {!loading ? (
            <Button
              type="submit"
              className="px-4"
              variant="primary"
              style={{ backgroundColor: "#00A3FF" }}
            >
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

export default AssignmentPopup;
