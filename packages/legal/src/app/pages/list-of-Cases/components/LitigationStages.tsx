import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useIntl } from "react-intl";
import CaseInfo from "./CaseInfo";
import AssignmentPopup from "../popups/AssignmentPopup";
import EditSessionPopup from "../popups/EditSessionPopup";
import AddSessionPopup from "../popups/AddSessionPopup";
import TerminateCasePopup from "../popups/TerminateCasePopup";
import { useLocation, useParams } from "react-router-dom";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import AddNewLitigationPopup from "../popups/AddNewLitigationPopup";
import { useSelector, useDispatch } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { CauseStatus, CauseStatusV2 } from "../../../models/LegalEnums";
import { fetchCauseById } from "../../../features/cause";

import "moment/locale/ar";
import moment from "moment";
import CauseStageDetails from "./CauseStageDetails";
import { DeleteLitigantPopup } from "../popups/DeleteLitigantPopup";
import Spinner from "react-bootstrap/esm/Spinner";

type LitigationStages = {
  isConsultive?: boolean;
  isLawyerToTakeAction?: boolean;
  isDataEntry?: any;
  isOwnerOrSuperVisor?: any;
};
export const LitigationStages: React.FC<LitigationStages> = ({
  isConsultive,
  isLawyerToTakeAction,
  isDataEntry,
  isOwnerOrSuperVisor,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [key, setKey] = useState(0);
  const [showAssignmentPopup, setShowAssignmentPopup] = useState(false);
  const [showEditSessionPopup, setShowEditSessionPopup] = useState(false);
  const [showAddSessionPopup, setShowAddSessionPopup] = useState(false);
  const [showTerminateCasePopup, setShowTerminateCasePopup] = useState(false);
  const [showChangeLitigationLevelPopup, setShowChangeLitigationLevelPopup] =
    useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAccordionEdit, setShowAccordionEdit] = useState(false);
  moment.locale("en");

  const { id: causeId } = useParams();

  const location = useLocation();
  const item = location?.state?.item;
  const comeFrom = location.state?.comeFrom || "";
  let { causeStages } = useSelector((state: RootState) => {
    return state?.causes?.causeById;
  });

  let loadingForCause = useSelector((state: RootState) => {
    return state?.causes?.loadingForCause;
  });
  let [currentCauseIndexIsLast, setCurrentCauseIndexIsLast] = useState(0);
  useEffect(() => {
    if (item?.id && causeStages?.length > 0) {
      let currentCauseIndex = causeStages?.findIndex((causeStage) => {
        return item?.id === causeStage?.id;
      });
      // console.log("currentCauseIndex",currentCauseIndex)
      if (currentCauseIndex === causeStages?.length - 1) {
        setCurrentCauseIndexIsLast(0);
      }
    }
  }, [item, causeStages]);
  // console.log("currentCauseIndexIsLast", currentCauseIndexIsLast);

  const [selectedCauseStageId, setSelectedCauseStageId] = useState<any>("");
  const specificClaim = location.state?.specificClaim || false;
  useEffect(() => {
    if (causeStages && causeStages?.length > 0 && !specificClaim) {
      setSelectedCauseStageId(causeStages?.slice()?.reverse()[0]?.id);
    } else if (specificClaim) {
      setSelectedCauseStageId(item?.id);
    }
  }, [causeStages, specificClaim, item?.id]);
  const caseData = useSelector((state: RootState) => state.causes.causeById);

  const navCauseStageId = location.state?.causeStageId;

  useEffect(() => {
    if (navCauseStageId) {
      setSelectedCauseStageId(navCauseStageId);
      setKey(
        causeStages.findIndex((causeStage) => causeStage.id === navCauseStageId)
      );
    }
  }, [navCauseStageId, causeStages]);
  useEffect(() => {
    if (item?.id && comeFrom != "cases-list") {
      let stages = [...causeStages]?.reverse();
      let causeStageIndex = stages?.findIndex((stage) => {
        return stage?.id == item?.id;
      });
      setKey(causeStageIndex);
    } else {
      setKey(0);
    }
  }, [item, causeStages, caseData]);

  return (
    <>
      <CaseInfo />

      <div className="w-100">
        {/* <style>
          {`
          .tab-content {
            width: 100% !important;
          }
          .tab-pane {
            width: 100% !important;
          }
        `}
        </style> */}
        <Card className="border-0 bg-gray-100 shadow-none w-100">
          <div className=" border-bottom p-6">
            <div className="w-100">
              <div className="d-flex justify-content-sm-between mb-6 flex-column flex-sm-row">
                <h4 className="fw-bolder mb-sm-0 mb-4 d-flex align-items-center">
                  {intl.formatMessage({ id: "lawsuits" })}
                </h4>
                <div className="d-flex gap-3">
                  {/* <button
                    className="btn btn-danger text-white"
                    onClick={() => {
                      deleteCase();
                    }}
                  >
                    {" "}
                    {intl.formatMessage({ id: "CaseClosure" })}
                  </button> */}
                  {(isOwnerOrSuperVisor || isDataEntry) && (
                    <button
                      className="btn btn-outline-primary border border-primary bg-white text-dark bg-fix-dark border-fix-dark"
                      onClick={() => {
                        setShowChangeLitigationLevelPopup(true);
                      }}
                    >
                      <i className="fas fa-sync "></i>
                      {intl.formatMessage({ id: "AddNewLawsuit" })}
                    </button>
                  )}
                </div>
              </div>
              {loadingForCause ? (
                <div className="d-flex gap-4 justify-content-center align-items-center py-4">
                  {intl.formatMessage({ id: "DataIsLoaded..." })}
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <>
                  <div className="d-flex gap-2 flex-wrap mb-3 p-3">
                    {
                      // +caseData?.causeStatus === CauseStatus?.InProgress ||
                      // +caseData?.causeStatus === CauseStatus?.Finished
                      //   ?
                      causeStages
                        ?.slice()
                        ?.reverse()
                        ?.map((cause, index) => (
                          <button
                            key={index}
                            className={`btn ${
                              key === index ? "btn-primary" : "btn-white"
                            } px-4 py-2 rounded-3 bg-fix-dark border-fix-dark`}
                            onClick={() => {
                              setKey(index);
                              setSelectedCauseStageId(cause.id);
                            }}
                          >
                            {/* {intl.formatMessage({ id: "TheLawsuit" })}  */}#
                            {cause?.causeStageNumber &&
                              cause?.causeStageNumber !== "null" &&
                              cause?.causeStageNumber}{" "}
                            {intl.locale === "ar"
                              ? cause?.lK_Stage?.nameAr
                              : cause?.lK_Stage?.nameEn}
                            {index === 0 && (
                              <i className="fa-solid fa-pen cursor-pointer"></i>
                            )}
                          </button>
                        ))
                      // : causeStages
                      //     ?.slice()
                      //     ?.reverse()
                      //     ?.map((cause, index) => (
                      //       <button
                      //         key={index}
                      //         className={`btn ${
                      //           key === index ? "btn-primary" : "btn-white"
                      //         } px-4 py-2 rounded-3 bg-fix-dark border-fix-dark`}
                      //         onClick={() => {
                      //           setKey(index);
                      //           setSelectedCauseStageId(cause.id);
                      //         }}
                      //       >
                      //         {intl.formatMessage({ id: "TheLawsuit" })}#
                      //         {cause?.lk_StageId || cause?.lK_Stage?.id} -
                      //         {intl.locale === "ar"
                      //           ? cause?.lK_Stage?.nameAr
                      //           : cause?.lK_Stage?.nameEn}
                      //         {index === 0 && (
                      //           <i className="fa-solid fa-pen cursor-pointer"></i>
                      //         )}
                      //       </button>
                      //     ))
                    }
                  </div>
                  <div className="w-100">
                    <CauseStageDetails
                      causeId={causeId}
                      selectedCauseStageId={selectedCauseStageId}
                      lastOne={key === 0 && currentCauseIndexIsLast === 0}
                      isConsultive={isConsultive}
                      isLawyerToTakeAction={isLawyerToTakeAction}
                      isDataEntry={isDataEntry}
                      isOwnerOrSuperVisor={isOwnerOrSuperVisor}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
      {showAssignmentPopup ? (
        <>
          <AssignmentPopup
            show={showAssignmentPopup}
            handleClose={() => {
              setShowAssignmentPopup(false);
            }}
          />
        </>
      ) : (
        <></>
      )}
      {showEditSessionPopup ? (
        <>
          <EditSessionPopup
            show={showEditSessionPopup}
            handleClose={() => {
              setShowEditSessionPopup(false);
            }}
          />
        </>
      ) : (
        <></>
      )}
      {showAddSessionPopup ? (
        <>
          <AddSessionPopup
            show={showAddSessionPopup}
            handleClose={() => {
              setShowAddSessionPopup(false);
            }}
            setShowAccordionEdit={setShowAccordionEdit}
            causeId={causeId}
            causeStageId={selectedCauseStageId}
          />
        </>
      ) : (
        <></>
      )}

      {showTerminateCasePopup ? (
        <>
          <TerminateCasePopup
            show={showTerminateCasePopup}
            handleClose={() => {
              setShowTerminateCasePopup(false);
            }}
            handleTerminate={() => {
              showAlert(true, "TheCaseWasSuccessfullyClosed", intl);
            }}
          />
        </>
      ) : (
        <></>
      )}
      {showChangeLitigationLevelPopup && (
        <AddNewLitigationPopup
          causeStagesDispatched={causeStages}
          causeId={caseData?.id}
          show={showChangeLitigationLevelPopup}
          handleClose={() => {
            setShowChangeLitigationLevelPopup(false);
          }}
          comeFrom="litigation-stages"
          callingData={() => {
            if (causeId) {
              dispatch(fetchCauseById(causeId) as any);
            }

            setKey((prevKey) => prevKey + 1);

            setKey(0);
          }}
          selectedCauseStageId={selectedCauseStageId}
          setSelectedCauseStageId={setSelectedCauseStageId}
        />
      )}
      {showDeletePopup ? (
        <>
          <DeleteLitigantPopup
            showDelete={showDeletePopup}
            handleCloseDelete={() => {
              setShowDeletePopup(false);
            }}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default LitigationStages;
