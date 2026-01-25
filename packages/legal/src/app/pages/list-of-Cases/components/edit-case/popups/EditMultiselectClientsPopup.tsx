import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddClientValidationSchema } from "../../../../client-management/validations/AddClientValidationSchema";
import AddClientsPopup from "../../add-case-user/popup/AddClientsPopup";
import { searchSelectStylesModeStyles } from "@4eplatform/shared/functions/searchSelectStylesModeStyles";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { getLitigantConsume } from "../../../../../features/litigant-consume";
import { useDispatch, useSelector } from "react-redux";
import { LitigantStatus, LitigationStatus } from "../../../../../models/LegalEnums";
import { RootState } from "../../../../../store/store";
type PopupProps = {
  show: boolean;
  handleClose: () => void;
  setClients?: any;
  clients?: any;
};

const EditMultiselectClientsPopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  setClients,
  clients,

}) => {
  const intl = useIntl();
  const [showNewClientPopup, setShowNewClientPopup] = useState(false);
  let darkMode = localStorage.getItem("Theme") == "dark" ? true : false;
  const {
    control,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    mode: "all",
    reValidateMode: "onChange",
  });
  let dispatch = useDispatch();
    const [clientsData,setClientsData] =useState([]);
  const FetchData = () => {
    let params = { status: LitigationStatus.Client ,
      PageIndex:1,PageSize:1000,
    };
    dispatch(getLitigantConsume(params) as any).then((res)=> setClientsData(res?.payload?.result));
  };
  useEffect(() => {
    if (show) {
      FetchData();
    }
  }, [show]);
     const [firstClient, setFirstClient] = useState<any>(null);
     const [clientsOptions, setClientsOptions] = useState<any[]>([]);
    useEffect(() => {
    if (Array.isArray(clientsData)) {
      setClientsOptions(
        clientsData?.map((client: any) => ({
          value: client?.id,
          label: client?.name,
        }))
      );
    }
  }, [clientsData]); 


  const [selectedClients, setSelectedClients] = useState<any[]>([]);
  const handleClientsChange = (selectedOptions: any) => {
  const mergedOptions = [
    ...(selectedOptions ?? []),
    clientsOptions.find((op: any) => op.value === firstClient)
  ].filter(Boolean); 

  const uniqueOptions = Array.from(
    new Map(mergedOptions.map((item: any) => [item.value, item])).values()
  );

  setSelectedClients(uniqueOptions);
};
  const handleSubmitClients = () => {
    const formattedClients = selectedClients?.map((client: any) => {
      const clientData:any = clientsData.find((c: any) => c.id === client.value);
      return {
        litigant: {
          id:clientData?.id,
          identityNumber: clientData?.identityNumber, 
          name: clientData?.name, 
          canEdit:clientData?.canEdit, //test edit client
        }
      };
    });
    setClients(prevClients => {
      const uniqueClients = formattedClients.filter(
        newClient => !prevClients.some(existingClient => existingClient?.litigant?.id == newClient?.litigant?.id)
      );
  
      if (uniqueClients.length > 0) {
        showAlert(true, "AddedSuccessfully", intl);
        handleClose();
      }else{
        handleClose();
      }
      return [...prevClients, ...uniqueClients];
    });
  };
  
  

  return (
 <>
     <Modal
       aria-labelledby="contained-modal-title-vcenter"
       centered
       show={show}
       onHide={handleClose}
       className={!show ? "inert" : ""}
     >
       <div className="card">
         <Modal.Header closeButton>
           <Modal.Title className="w-100 text-center">
             <h1>{intl.formatMessage({ id: "AddClients" })}</h1>
           </Modal.Title>
         </Modal.Header>
  
         <Modal.Body className="px-5 py-4">
           <div className="mb-4 mt-3">
             <div className="d-flex align-items-center mb-2">
               <label className="form-label me-2 required">
                 {intl.formatMessage({ id: "ClientName" })}
               </label>
             </div>
             <Controller
               name="userId"
               control={control}
               defaultValue=""
               render={({ field }) => (
                 <Select
                   {...field}
                   id="ClientName"
                   className="react-select__container bg-light"
                   classNamePrefix="react-select"
                   placeholder={intl.formatMessage({
                     id: "SelectClientName",
                   })}
                   options={clientsOptions || []}
                   isClearable={true}
                   isMulti={true}
                   styles={searchSelectStylesModeStyles(darkMode)}
                   onChange={(selectedOptions: any) =>
                     handleClientsChange(selectedOptions)
                   }
                   value={selectedClients}
                   noOptionsMessage={() =>
                     intl.formatMessage({
                       id: "NotAvailableUserName",
                     })
                   }
                 />
               )}
             />
           </div>
           <div className="my-4 pt-2">
             <div
               className="w-100 bg-light-primary text-primary p-3 text-center border border-primary cursor-pointer rounded-2"
               onClick={() => {
                 setShowNewClientPopup(true);
               }}
             >
               {intl.formatMessage({ id: "CreateNew" })}
             </div>
           </div>
         </Modal.Body>
  
         <Modal.Footer className="d-flex justify-content-end px-5 pb-6">
           <Button variant="secondary" className="px-15" onClick={handleClose}>
             {intl.formatMessage({ id: "Cancel" })}
           </Button>
           <Button
             variant="success"
             className="px-15"
             onClick={handleSubmitClients}
           >
             {intl.formatMessage({ id: "Add" })}
           </Button>
         </Modal.Footer>
       </div>
     </Modal>
        <div className="modal fade">
        <AddClientsPopup
          show={showNewClientPopup}
          handleCloseNewClient={() => setShowNewClientPopup(false)}
            setClientsData={setClientsData}
            setFirstClient={setFirstClient}
            setSelectedClients={setSelectedClients}
        />
      </div>
 </>
  );
};

export default EditMultiselectClientsPopup;
