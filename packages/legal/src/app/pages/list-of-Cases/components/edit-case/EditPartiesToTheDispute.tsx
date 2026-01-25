import { useState } from "react";
import { useIntl } from "react-intl";
import { Form, Button } from "react-bootstrap";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { useNavigate } from "react-router-dom";
import OpponentPopup from "../edit-case-user/popup/OpponentPopup";
import EditMultiselectClientsPopup from "./popups/EditMultiselectClientsPopup";
import EditNewClientPopup from "./popups/EditNewClientPopup";
import EditNewOpponentPopup from "./popups/EditNewOpponentPopup";
import { useAppDispatch } from "../../../../store/store";
import { removeLitigantId } from "../../../../features/litigant-consume";
import { showAlert } from "@4eplatform/shared/services/showAlert";

type EditPartiesToTheDisputeProps = {
  setClients ?:any;
  clients ?:any;
  setOpponents?:any;
  opponents?:any;
  setClientStatus?:any;
  clientStatus?:any;
  onNext?:any;
  onBack?:any
};

const EditPartiesToTheDispute:React.FC<EditPartiesToTheDisputeProps> =({
  setClients,
  clients,
  setOpponents,
  opponents,
  setClientStatus ,
  clientStatus ,
  onNext,
  onBack,
})=> {
  const intl = useIntl();
  const [showClientsPopup, setShowClientsPopup] = useState(false);
  const [showModifyClientsPopup, setShowModifyClientsPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showOpponentPopup, setShowOpponentPopup] = useState<boolean>(false);
  const [showOpponentEditPopup, setShowOpponentEditPopup] = useState<boolean>(false);

  let navigate = useNavigate();
  const [selectedClientId, setSelectedClientId] = useState<any | null>(null);
  const [clientToDelete, setClientToDelete] = useState<any>(null);
  const [opponenetToDelete, setOpponentToDelete] = useState<any>(null);
  const dispatch = useAppDispatch();
    const handleCanDeleteClient = async (clientToDelete: any) => {
      if (clientToDelete?.litigant?.canEdit) {
        try {
          const res:any = await dispatch(removeLitigantId(clientToDelete?.litigant?.id));
          if (res?.payload?.message === "litigant Delete Success") {
            handleDeleteClient(clientToDelete?.litigant?.id); 
            showAlert(true, "DeletedSuccessfully", intl);
          } else {
            showAlert(false, res?.payload?.message, intl);
          }
        } catch (error) {
          console.log("errorAtDelete" , error)
        }
      } else {
        handleDeleteClient(clientToDelete?.litigant?.id);
        showAlert(true, "DeletedSuccessfully", intl);
      }
    };
  const handleDeleteClient = (id: any) => {
    if (!id) return;
    setClients((prevClients) => prevClients.filter(client => client?.litigant?.id !== id));
  };
  const [showDeleteOpponentPopup, setShowDeleteOpponentPopup] = useState<boolean>(false);
  const [selectedOpponentId, setSelectedOpponentId] = useState<any | null>(null);

  const handleDeleteOpponent = (id: any) => {
    if (!id) return;
    setOpponents((prevOpponents) => prevOpponents.filter(opponent => opponent?.litigant?.id !== id));
  };
  const handleCanDeleteOpponent = async (opponentDeleted: any) => {
    if (opponentDeleted?.litigant?.canEdit) {
      try {
        const res:any = await dispatch(removeLitigantId(opponentDeleted?.litigant?.id));
        if (res?.payload?.message === "litigant Delete Success") {
          handleDeleteOpponent(opponentDeleted?.litigant?.id); 
          showAlert(true, "DeletedSuccessfully", intl);
        } else {
          showAlert(false, res?.payload?.message, intl);
        }
      } catch (error) {
        console.log("errorAtDelete" , error)
      }
    } else {
      handleDeleteOpponent(opponentDeleted?.litigant?.id);
      showAlert(true, "DeletedSuccessfully", intl);
    }
  };
  return (
    <>
      <div className="bg-gray-100 p-5 rounded">
        <div className="grid row">
          <p className="main-title-lawsuit">
            {intl.formatMessage({ id: "PartiesToTheDispute" })}
          </p>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div
              className="bg-white bg-fix-dark py-5 px-4 mb-4 rounded border-fix-dark "
              style={{ border: "1px solid #d7d7f3" }}
            >
              <div className="d-flex justify-content-between align-items-center py-3">
                <div className="mb-5">
                  <label className="fw-bold-900 text-dark fs-4 required">
                    {intl.formatMessage({ id: "Clients" })}
                  </label>
                </div>

                <div
                  className="bg-primary rounded-circle d-flex justify-content-center align-items-center cursor-pointer"
                  style={{ width: "30px", height: "30px" }}
                  onClick={() => setShowClientsPopup(true)}
                 
                >
                  <i className="fas fa-plus text-white fs-5"></i>
                </div>

              </div>
              {/* static Data */}
              {/* <div
                style={{ border: "1px solid #d7d7f3" }}
                className="card bg-gray-100 mb-4 border-fix-dark "
              >
                <div className="d-flex justify-content-between align-items-center p-5">
                  <span className="fw-bold fs-5">
                    {intl.formatMessage({
                      id: "GeneralAuthorityForRealEstate",
                    })}
                  </span>
                </div>
              </div> */}

              {/* map clients */}
              <div className="max-custom-height">
              {clients?.map((client:any)=>{
                return(
                  <div
                  key={client?.litigant?.id}
                  style={{ border: "1px solid #d7d7f3" }}
                  className="card bg-gray-100 mb-4 border-fix-dark"
                >
                  <div className="d-flex justify-content-between align-items-center p-5">
                    <div className="w-100">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-bold fs-5">
                          {client?.litigant?.name}
                        </span>
                        <div className="d-flex gap-1">
                          {/* {client?.litigant?.canEdit && (
    <button
    onClick={() => {
      setSelectedClientId(client?.litigant?.id)
       setShowModifyClientsPopup(true)
    }
      }
    className="btn m-0 p-2"
    type="button"
  >
    <i className="fas fa-pen text-primary  fs-3"></i>
  </button>
                          )} */}
                      
                          <button
                            onClick={() => {
                              setClientToDelete(client);
                              setSelectedClientId(client?.litigant?.id);
                              setShowDeletePopup(true);
                            }}
                            className="btn m-0 p-2"
                            type="button"
                            aria-label="Delete client"
                          >
                            <i className="fas fa-trash text-danger fs-3"></i>
                          </button>
                        </div>
                      </div>
                      <div className="fw-bold fs-5">
                        {intl.formatMessage({ id: "LicenseNumber" })}: {client?.litigant?.identityNumber}
                      </div>
                    </div>
                  </div>
                </div>
                )
              })}
              </div>
            </div>

            <div
              className="bg-white bg-fix-dark py-5 px-4 mb-2 rounded border-fix-dark "
              style={{ border: "1px solid #d7d7f3" }}
            >
              <div className="mb-5">
                <label className="fw-bold-900 text-dark fs-4 required">
                  {intl.formatMessage({ id: "Clients' Status" })}
                </label>
              </div>
              <div
                style={{ border: "1px solid #d7d7f3" }}
                className="card bg-gray-100 border-fix-dark"
              >
                <div className="card-body ">
                  <Form.Group>
                    <div className="d-flex flex-wrap">
                    <div className="d-flex justify-content-start gap-1 my-1">
                <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                <input
                  className="form-check-input widget-9-radio xRadioBg"
                  type="radio"
                  name="lawyers"
                  id="lawyers"
                  checked={clientStatus === 'lawyers'}
                  onChange={() => setClientStatus('lawyers')}
                />
                </div>
                <label
                  className="fs-6"
                  htmlFor="lawyers"
                >
                  {intl.formatMessage({ id: "Claimant" })}
                </label>
              </div>
              <div className="d-flex justify-content-start gap-1 my-1">
                <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                <input
                  className="form-check-input widget-9-radio xRadioBg"
                  type="radio"
                  name="dayManager"
                  id="dayManager"
                  checked={clientStatus === 'dayManager'}
                  onChange={() => setClientStatus('dayManager')}
                />
                </div>
                <label
                  className="fs-6"
                  htmlFor="dayManager"
                >
                  {intl.formatMessage({ id: "Respondent" })}
                </label>
              </div>
                    </div>
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div
              className="bg-white bg-fix-dark p-5 rounded border-fix-dark "
              style={{ border: "1px solid #d7d7f3" }}
            >
              <div className="d-flex justify-content-between align-items-center py-3 mb-3">
                <h5 className="mb-0">
                  {intl.formatMessage({ id: "Opponents" })}
                  <span className="text-danger mx-2">*</span>
                </h5>
                <div
                  className="bg-primary rounded-circle d-flex justify-content-center align-items-center cursor-pointer"
                  style={{ width: "30px", height: "30px" }}
                  onClick={() => setShowOpponentPopup(true)}
                >
                  <i className="fas fa-plus text-white fs-5"></i>
                </div>
              </div>


              <div className="max-custom-height">
              {opponents?.map((opponent:any)=>{
                return(
                  <div
                  className="bg-gray-100 py-3 px-4 rounded mb-3 border-fix-dark "
                  style={{ border: "1px solid #d7d7f3" }}
                  key={opponent?.litigant?.id}
                >
                  <div className="d-flex justify-content-between align-items-center p-1 mb-3">
                    <div className="w-100">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-bold">
                          {opponent?.litigant?.name}
                        </span>
                        <div className="d-flex gap-2">
                          {/* {opponent?.litigant?.canEdit && (
              <button
              onClick={() => {
                setSelectedOpponentId(opponent?.litigant?.id);
                setShowOpponentEditPopup(true)}}
              className="btn m-0 p-2"
              type="button"
            >
              <i className="fas fa-pen text-primary fs-3"></i>
            </button>
                          )} */}
            
                          <button
                            onClick={() => {
                              setOpponentToDelete(opponent);
                              setSelectedOpponentId(opponent?.litigant?.id);
                              setShowDeleteOpponentPopup(true);
                            }}
                            className="btn m-0 p-2"
                            type="button"
                             aria-label ="Delete opponent"
                          >
                            <i className="fas fa-trash text-danger fs-3"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        {intl.formatMessage({ id: "LicenseNumber" })}: {opponent?.litigant?.identityNumber}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white bg-fix-dark p-3 rounded mb-2">
                    <p className="text-gray-400">
                      {intl.formatMessage({ id: "ConmplainReason" })}:
                    </p>
                    <p>
                      {opponent?.compliment ? opponent?.compliment : intl.formatMessage({id:"NotFound"}) }
                    </p>
                  </div>
                </div>
                )
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end px-5 pb-4 mx-5 mt-3">
        <Button
          variant="secondary"
          className="me-3"
          onClick={onBack}
        >
          {intl.formatMessage({ id: "Cancel" })}
        </Button>
        <Button
          variant="primary"
          onClick={() => onNext()}
        >
          {intl.formatMessage({ id: "Next" })}
        </Button>
      </div>
      {/* تعديل خصم */}
      {showOpponentEditPopup ? (
        <EditNewOpponentPopup

          show={showOpponentEditPopup}
          handleCloseNewOpponent={() => setShowOpponentEditPopup(false)}
          opponents={opponents}
          setOpponents={setOpponents}
          selectedOpponentId={selectedOpponentId}
        />
      ) : (
        ""
      )}
      {/* اضافة خصم */}
      {showOpponentPopup ? (
        <OpponentPopup
          show={showOpponentPopup}
          handleClose={() => setShowOpponentPopup(false)}
          setOpponents={setOpponents}
          opponents={opponents}
        />
      ) : (
        ""
      )}
      {showModifyClientsPopup ? (
        <EditNewClientPopup
          show={showModifyClientsPopup}
          handleCloseNewClient={() => setShowModifyClientsPopup(false)}
          setClients={setClients}
          clients={clients}
          selectedClientId={selectedClientId}
        />
      ) : (
        ""
      )}
      {/* حذف موكل من القضية */}
      {showDeletePopup ? (
        <DeletePopup
          showDelete={showDeletePopup}
          handleCloseDelete={() => setShowDeletePopup(false)}
          id={selectedClientId}
          handleDelete={()=>{
            handleCanDeleteClient(clientToDelete);
          }}
        />
      ) : (
        ""
      )}
      {/*  اضافة موكل */}
      {showClientsPopup ? (
        <EditMultiselectClientsPopup
          show={showClientsPopup}
          handleClose={() => setShowClientsPopup(false)}
          setClients={setClients}
          clients={clients}
        />
      ) : (
        ""
      )}
{/* حذف خصم من القضية */}
{showDeleteOpponentPopup ? (
        <DeletePopup
          showDelete={showDeleteOpponentPopup}
          handleCloseDelete={() => setShowDeleteOpponentPopup(false)}
          id={selectedOpponentId}
          handleDelete={()=>{
            handleCanDeleteOpponent(opponenetToDelete)
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default EditPartiesToTheDispute;
