import React, { useState, FC } from "react";
import { Col, Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import DiscountPopup from "./popup/DiscountPopup";
import AddMultiselectClientsPopup from "./popup/AddMultiselectClientsPopup";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { getLitigantConsume, removeLitigantId } from "../../../../features/litigant-consume";
import { LitigationStatus } from "../../../../models/LegalEnums";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";

type ClientsSectionProps = {
  setClients?: any;
  clients?: any;
  setOpponents?: any;
  setClientStatus?: any;
  clientStatus?: any;
  opponents?:any;
};
const RightSection: FC<ClientsSectionProps> = ({
  setClients,
  clients,
  setOpponents,
  setClientStatus,
  clientStatus,
  opponents,
}) => {
  const intl = useIntl();
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [showClientsPopup, setShowClientsPopup] = useState(false);

  const [showDeleteClientPopup, setShowDeleteClientPopup] = useState<boolean>(false);
  const [formattedClients, setFormattedClients] = useState<any>([]);
  const [selectedClients, setSelectedClients] = useState<any>([]);
  const [clientToDelete, setClientToDelete] = useState<any>([]);
  let language = intl.locale;
  const dispatch = useAppDispatch();
  const clientsData = useAppSelector((state) => state?.libability?.litigantConsume as any);

  React.useEffect(() => {
    const params = { status: LitigationStatus?.Client, PageIndex: 1, PageSize: 1000  } as any;
    dispatch(getLitigantConsume(params) as any);
    
  }, []);
 
  React.useEffect(() => {
    if (!Array.isArray(clients) || clients.length > 0) return;
    if (!Array.isArray(clientsData) || clientsData.length === 0) return;

    const preferredNames = ["الهيئة العامة للعقار", "General Authority for Real Estate"];
    const defaultClient = clientsData.find((c: any) => preferredNames.includes((c?.name || "").trim()));
    if (!defaultClient) return;

    setClients([{ litigantId: defaultClient.id }]);
    setFormattedClients([defaultClient]);
    setSelectedClients([{ value: defaultClient.id, label: defaultClient.name }]);
  
  }, [clientsData]);
  const handleCanDeleteClient = async (clientToDelete: any) => {

    if (clientToDelete.canEdit) {
      try {
        const res:any = await dispatch(removeLitigantId(clientToDelete?.id));
        if (res?.payload?.message === "litigant Delete Success") {
          handleDeleteClient(clientToDelete); 
          showAlert(true, "DeletedSuccessfully", intl);
        } else {
          showAlert(false, res?.payload?.message, intl);
        }
      } catch (error) {
        console.log("errorAtDelete" , error)
      }
    } else {
      handleDeleteClient(clientToDelete);
    }
  };
  
    const handleDeleteClient = (clientToDelete: any) => {
      setClients((prev) =>
        prev.filter((client) => client.litigantId !== clientToDelete.id)
      );
      setFormattedClients((prev) =>
        prev.filter((client) => client.id !== clientToDelete.id)
      );
      setSelectedClients((prev: any) =>
        prev?.filter((option: any) => option.value !== clientToDelete.id)
      );
      showAlert(true, "DeletedSuccessfully", intl);
    };
    const [selectedOpponents, setSelectedOpponents] = useState<any>([]);
    // الخصوم بالشكوى 
    const [selectedOpponentsWithDetails, setSelectedOpponentsWithDetails] =useState<any[]>([]);
    const [formattedOpponets, setFormattedOpponets] = useState<any>([]);
    const [opponentToDelete, setOpponentToDelete] = useState<any>([]);
    const [showDeleteOpponentPopup, setShowDeleteOpponentPopup] = useState<boolean>(false);
    const handleCanDeleteOpponent = async (opponentDeleted: any) => {
      if (opponentDeleted.canEdit) {
        try {
          const res:any = await dispatch(removeLitigantId(opponentDeleted?.id));
          if (res?.payload?.message === "litigant Delete Success") {
            handleDeleteOpponent(opponentDeleted); 
            showAlert(true, "DeletedSuccessfully", intl);
          } else {
            showAlert(false, res?.payload?.message, intl);
          }
        } catch (error) {
          console.log("errorAtDelete" , error)
        }
      } else {
        handleDeleteOpponent(opponentDeleted);
      }
    };
    const handleDeleteOpponent = (opponentToDeleted: any) => {
      setSelectedOpponents((prev) =>
        prev.filter((opponent: any) => opponent.value !== opponentToDeleted.id)
      );
      setSelectedOpponentsWithDetails((prev) =>
        prev.filter((opponent: any) => opponent.id !== opponentToDeleted.id)
      );
      setFormattedOpponets((prev) =>
        prev.filter((opponent) => opponent.id !== opponentToDeleted.id)
      );
      setOpponents((prev) =>
        prev.filter((opponent) => opponent.litigantId !== opponentToDeleted.id)
      );
         showAlert(true, "DeletedSuccessfully", intl);
    };
  let darkMode = localStorage.getItem("Theme") == "dark" ? true : false;
  return (
    <>
      {/* right section  */}
      <Col lg={6}>
        <div className="rounded-2 mt-15 mb-5 w-100 mx-2">
          <div className="p-7 bg-gray-100 rounded-2 w-100">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <p className="mb-0 fs-4 required add-cause-subtitle text-gray-800">
                {intl.formatMessage({ id: "Clients" })}
              </p>
              <Button
                variant="link"
                className="p-0 custom-bg-transparent"
                onClick={() => {
                  setSelectedClients([]);
                  setShowClientsPopup(true);
                }}
                aria-label="Clients"
              >
                <div
                  className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "30px", height: "30px" }}
                >
                  <i className="fas fa-plus text-white fs-5"></i>
                </div>
              </Button>
            </div>
            <div className=" ">
              <div className="max-custom-height d-flex flex-column  ">
                {formattedClients?.map((client: any, index: number) => (
                  <div
                    key={index}
                    className=" border rounded p-3 d-flex justify-content-between align-items-center flex-wrap custom-input-bg mb-3" 
                  >
                    <div className="w-100">
                      <div className="d-flex justify-content-between my-1">
                        <div className={`fw-bolder fs-5 text-muted`}>{client.name} <span className="fw-normal fs-6 text-muted">( {intl.formatMessage({ id: "GeneralAuthorityForRealEstate" })} )</span></div>
                        <button
                          className="custom-input-bg btn p-0"
                          type="button"
                          onClick={() => {
                            setClientToDelete(client);
                            setShowDeleteClientPopup(true);
                          }}
                        >
                        <i className="fa fa-trash text-danger fs-3"></i>
                        </button>
                      </div>
                      <div className="text-muted my-1 fs-5">
                        {language == "ar" ? client.identityTypeNameAr : client.identityTypeNameEn} : {client.identityNumber}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* ClientsStatus  */}
        <div className="p-7 bg-gray-100 rounded-2 w-100 mx-2 rounded-2 mb-5">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-4 fs-4 add-cause-subtitle text-gray-800">
              {intl.formatMessage({ id: "ClientsStatus" })}
              <span className="text-danger mx-2">*</span>
            </p>
          </div>

          <div className="card ">
            <div className="d-flex  rounded  p-4 gap-3">
              <div className="d-flex justify-content-start gap-1">
                <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                  <input
                    className="form-check-input widget-9-radio xRadioBg"
                    type="radio"
                    name="authority"
                    id="lawyers"
                    checked={clientStatus === "lawyers"}
                    onChange={() => setClientStatus("lawyers")}
                  />
                </div>
                <label className="fs-6 text-primary fa-solid" htmlFor="lawyers">
                  {intl.formatMessage({ id: "Claimant" })}
                </label>
              </div>
              <div className="d-flex justify-content-start gap-1">
                <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                  <input
                    className="form-check-input widget-9-radio xRadioBg"
                    type="radio"
                    name="authority"
                    id="dayManager"
                    checked={clientStatus === "dayManager"}
                    onChange={() => setClientStatus("dayManager")}
                  />
                </div>
                <label className="fs-6 text-primary fa-solid" htmlFor="dayManager">
                  {intl.formatMessage({ id: "Respondent" })}
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Opponents */}
        <div className="p-7 bg-gray-100 rounded-2 w-100 mx-2 rounded-2">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <p className="mb-0 fs-4 required add-cause-subtitle text-gray-800">
              {intl.formatMessage({ id: "Opponents" })}
            </p>
            <Button
              variant="link"
              className="p-0 custom-bg-transparent"
              onClick={() => {
                setSelectedOpponents([]);
                setSelectedOpponentsWithDetails([]);
                setShowDiscountPopup(true);
              }}
              aria-label="Opponents"
            >
              <div
                className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "30px", height: "30px" }}
              >
                <i className="fas fa-plus text-white fs-5"></i>
              </div>
            </Button>
          </div>
          <div className=" ">
              <div className="max-custom-height d-flex flex-column">
                {formattedOpponets?.map((opponent: any, index: number) => (
                  <div
                    key={index}
                    className="border rounded p-3 d-flex justify-content-between align-items-center flex-wrap custom-input-bg mb-3" 
                  >
                    <div className="w-100">
                      <div className="d-flex justify-content-between my-1">
                        <div className="fw-bolder fs-5 text-muted ">{opponent.name}</div>
                        <button
                          className="custom-input-bg btn p-0"
                          type="button"
                          onClick={() => {
                            setOpponentToDelete(opponent);
                            setShowDeleteOpponentPopup(true);
                          }}
                        >
                        <i className="fa fa-trash text-danger fs-3"></i>
                        </button>
                      </div>
                      <div className="text-muted my-1 fs-5">
                        {language == "ar" ? opponent.identityTypeNameAr : opponent.identityTypeNameEn} : {opponent.identityNumber}
                      </div>
                      <div className="text-muted my-1 fs-5">
                        {intl.formatMessage({id:"Complaint"})} : {opponent.complaintReason ? opponent.complaintReason  :intl.formatMessage({id:"NotFound"})}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </Col>

      {/*  popups */}
      <div className="modal fade">
        <DiscountPopup
          show={showDiscountPopup}
          handleClose={() => {
            setShowDiscountPopup(false);
            setSelectedOpponents([]);
            setSelectedOpponentsWithDetails([]);
          }}
          setOpponents={setOpponents}
          selectedOpponents = {selectedOpponents}
          setSelectedOpponents = {setSelectedOpponents}
          selectedOpponentsWithDetails={selectedOpponentsWithDetails} 
          setSelectedOpponentsWithDetails ={setSelectedOpponentsWithDetails}
          setFormattedOpponets = {setFormattedOpponets}
          opponents={opponents}
        />
        <AddMultiselectClientsPopup
          show={showClientsPopup}
          handleClose={() => {
            setShowClientsPopup(false);
            setSelectedClients([]);
          }}
          setClients={setClients}
          clients={clients}
          formattedClients={formattedClients}
          setFormattedClients={setFormattedClients}
          selectedClients={selectedClients}
          setSelectedClients={setSelectedClients}
        />
      </div>
      {showDeleteClientPopup && (
          <DeletePopup
          id={clientToDelete?.id}
          showDelete={showDeleteClientPopup}
          handleCloseDelete={() => setShowDeleteClientPopup(false)}
          handleDelete={() => {
            handleCanDeleteClient(clientToDelete);
            setShowDeleteClientPopup(false);
          }}
        />
        )}
{showDeleteOpponentPopup && (
          <DeletePopup
          id={opponentToDelete?.id}
          showDelete={showDeleteOpponentPopup}
          handleCloseDelete={() => setShowDeleteOpponentPopup(false)}
          handleDelete={() => {
            handleCanDeleteOpponent(opponentToDelete);
            setShowDeleteOpponentPopup(false);
          }}
        />
        )}
    </>
  );
};

export default RightSection;
