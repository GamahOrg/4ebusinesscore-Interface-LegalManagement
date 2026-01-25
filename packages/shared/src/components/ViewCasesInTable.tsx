import { Modal, Spinner } from "react-bootstrap";
import { useIntl } from "react-intl";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "./../../../legal/src/app/store/store";
import { fetchCausesForLitigant } from "../../../legal/src/app/features/lawyer";
import {
  CauseStatus,
  CauseStatusV2,
} from "../../../legal/src/app/models/LegalEnums";
import { fetchAllCauses } from "../../../legal/src/app/features/cause";
import { useSelector } from "react-redux";
import { getStyleByStatus } from "@4eplatform/shared/functions/getStyleByStatus";
import causeStatus from "@4eplatform/shared/functions/causeStatus";
import AddLawyersPopup from "../popups/AddLawyersPopup";

interface ViewCases {
  show: boolean;
  handleClose: () => void;
  id?: any;
  name?: string;
  type?: string;
  selectedUserId?: any;
  lawyerName?: any;
  isLawyerInternal?: any;
  isLawyers?: boolean;
  onReloadTable?: () => void; 
}

const ViewCasesInTable = ({
  show,
  handleClose,
  id,
  name,
  type,
  selectedUserId,
  isLawyerInternal,
  lawyerName,
  isLawyers,
  onReloadTable,
}: ViewCases) => {
  const intl = useIntl();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [showLawyersPopup, setShowLawyersPopup] = useState<boolean>(false);
  const [selectedCauseId, setSelectedCauseId] = useState<any>(null);
  const dispatch = useAppDispatch();
  const causes = useAppSelector((state) => state?.causes?.causes);

  useEffect(() => {
    if (selectedUserId && show && isLawyers) {
      let params = {
        pageSize: 1000,
        pageIndex: 1,
        LawyerId: selectedUserId,
      };
      dispatch(fetchAllCauses(params) as any);
    }
  }, [selectedUserId, show, isLawyers]);
  let loadingForCauses = useSelector((state: RootState) => {
    return state?.causes?.loadingForCauses;
  });
  let navigate = useNavigate();
  const handleNavigate = (cause: any) => {
    navigate(
      `${location.pathname.replace("/legalmanagement", "")}/list-of-cases/${
        cause?.id
      }`,
      {
        state: { item: cause },
      }
    );
  };
  useEffect(() => {
    if (id && show && isLawyers !== true) {
      dispatch(fetchCausesForLitigant(id) as any);
    }
  }, [id, show, isLawyers]);
  const causeForLitigant = useAppSelector(
    (state) => state?.lawyer?.causeForLitigant
  );
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center position-relative w-100">
          <h3 className="mt-5"> {intl.formatMessage({ id: "ViewCases" })}</h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isLawyers && (
          <>
            <div className="d-flex align-items-center mb-2 mb-sm-0 bg-light-primary p-4 rounded-2 fw-bolder">
              <i className="fa-solid fa-circle-user fs-3x text-primary me-3"></i>
              <div>
                <span>{lawyerName}</span>
                {isLawyerInternal == true ? (
                  <span className="text-gray-500 me-2">
                    ( {intl.formatMessage({ id: "Internal" })} )
                  </span>
                ) : (
                  <span className="text-gray-500 me-2">
                    ( {intl.formatMessage({ id: "External" })} )
                  </span>
                )}
                <p className="text-muted mt-1 mb-0 cursor-pointer">
                  {id?.toString().slice(0, 6)} {"#"}
                </p>
              </div>
            </div>
            {loadingForCauses ? (
              <div className="d-flex gap-4 justify-content-center align-items-center py-4">
                {intl.formatMessage({ id: "DataIsLoaded..." })}
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              causes?.map((cause: any, index: number) => (
                <div className="row px-4 gy-3 mb-4" key={index}>
                  {/* <div className="py-3"></div> */}
                  <div>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mt-3 mb-sm-0 fw-bolder">
                        <div className="d-flex flex-column mt-3">
                          <span>{cause.title}</span>
                          <div className="text-primary mt-2 mb-0 ">
                            #{cause.causeNumber}
                          </div>
                        </div>

                        <div
                          className={`bg-${
                            causeStatus(cause?.causeStatus, intl)?.statusEnum === 2
                              ? "light-danger"
                              : causeStatus(cause?.causeStatus, intl)?.statusEnum === 1
                              ? "light-success"
                              : "light-warning"
                          } rounded-2 px-5 py-3`}
                        >
                          <span
                            className={`text-${
                              causeStatus(cause?.causeStatus, intl)?.statusEnum === 2
                                ? "danger"
                                : causeStatus(cause?.causeStatus, intl)?.statusEnum === 1
                                ? "success"
                                : "warning"
                            } fs-7`}
                          >
                            {causeStatus(cause?.causeStatus, intl)?.name || ""}
                          </span>
                        </div>

                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                          <button
                            className="btn btn-info"
                            onClick={() => handleNavigate(cause)}
                          >
                            {intl.formatMessage({ id: "View" })}
                          </button>
                        </div>
                        <div>
                          <button
                            className="btn btn-primary px-2 py-4"
                            onClick={() => {
                              setSelectedCauseId(cause.id);
                              setShowLawyersPopup(true);
                            }}
                          >
                            {intl.formatMessage({ id: "ChangeConsultant" })}
                          </button>
                        </div>
                      </div>

                      <hr />
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
        {isLawyers !== true && (
          <>
            {causeForLitigant?.map((item: any) => (
              <div
                className="row px-4 gy-3 mb-4"
                key={item?.litigantName + "-" + item?.litigantId}
              >
                <div className="d-flex align-items-center mb-2 mb-sm-0 bg-light-primary p-4 rounded-2 fw-bolder">
                  <i className="fa-solid fa-circle-user fs-3x text-primary me-3"></i>
                  <div>
                    <span>{item?.litigantName}</span>
                    {item?.type && (
                      <span className="text-gray-500 me-2">
                        ( {intl.formatMessage({ id: item?.type })} )
                      </span>
                    )}
                    <p className="text-muted mt-1 mb-0 cursor-pointer">
                      #{item?.litigantNumber}
                    </p>
                  </div>
                </div>
                <div className="py-3"></div>
                <div style={{ height: "450px", overflowY: "auto" }}>
                  {item?.causes?.map((cause: any) => (
                    <div key={cause.causeId + "-" + item?.causes}>
                      <div className="d-flex justify-content-between align-items-center mb-2 mb-sm-0 fw-bolder">
                        <div className="d-flex flex-column">
                          <span>{cause.causeName}</span>
                          <Link
                            to={`${location.pathname.replace(
                              "/legalmanagement",
                              ""
                            )}/list-of-cases/${cause.causeId}`}
                            state={{
                              item: item,
                              comeFrom: "/client-management",
                              selectedCauseIdFromClients: cause.causeId,
                            }}
                            className="text-primary mt-2 mb-0 cursor-pointer"
                          >
                            #{cause.causeNumber}
                          </Link>
                        </div>
                        <div
                          className={`bg-${getStyleByStatus(
                            causeStatus(cause?.causeStatus, intl)
                              ?.statusEnum as number
                          )} p-3 fw-bolder fs-6 d-flex justify-content-center align-items-center rounded-2`}
                        >
                          {causeStatus(cause?.causeStatus, intl)?.name}
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </Modal.Body>

      <div className="modal fade">
        <AddPopup
          show={modalShow}
          handleClose={() => {
            setModalShow(false);
          }}
          handleCloseMainPopup={() => handleClose()}
        />
      </div>
      <div className="modal fade">
        <AddLawyersPopup
          show={showLawyersPopup}
          handleClose={() => {
            setShowLawyersPopup(false);
            setSelectedCauseId(null);
          }}
          causeId={selectedCauseId}
          onSuccess={onReloadTable}
          currentLawyerId={selectedUserId}
          // handleCloseMainPopup={() => handleClose()}
        />
      </div>
    </Modal>
  );
};

export default ViewCasesInTable;
