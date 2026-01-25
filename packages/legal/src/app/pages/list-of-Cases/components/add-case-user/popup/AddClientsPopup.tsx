import React, { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import {
  getAllLK_IdentityTypes,
  addLitigantConsume,
  getLitigantConsume,
} from "../../../../../features/litigant-consume";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LitigationStatus } from "../../../../../models/LegalEnums";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { InferType, mixed, number, object, string } from "yup";
type PopupProps = {
  show: boolean;
  handleCloseNewClient: () => void;
  setClientsData:any;
 setFirstClient:any;
 setSelectedClients:any;
};

export const AddDiscountValidationSchema = object({
  name: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
  IdentityNumber:mixed().nullable(),
});
export type AddDiscountValidationProps = InferType<typeof AddDiscountValidationSchema>;
const AddClientsPopup: React.FC<PopupProps> = ({
  show,
  handleCloseNewClient,
 setClientsData,
 setFirstClient,
 setSelectedClients,
}) => {
  const intl = useIntl();
  let language = intl.locale;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (show) {
      dispatch(getAllLK_IdentityTypes());
    }
  }, [show]);

  const identityTypes = useSelector(
    (state: RootState) => state.libability?.IdentityTypes || []
  );
  const [selectedIdentityId, setSelectedIdentityId] = useState("");
  const [selectedIdentityName, setSelectedIdentityName] = useState("");
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedIdentityId(selectedId);
    const selectedIdentity = identityTypes?.find(
      (identityType: any) => identityType?.id == selectedId
    );
    if (selectedIdentity) {
      setSelectedIdentityName(
        language === "ar" ? selectedIdentity.nameAr : selectedIdentity.nameEn
      );
    } else {
      setSelectedIdentityName("");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AddDiscountValidationProps>({
    resolver: yupResolver(AddDiscountValidationSchema),
    mode:"all"
  });

  const handleAddClient = async (data: any, event?: React.BaseSyntheticEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation(); 
    }
    if (!selectedIdentityId) {
      showAlert(false, "YouMustSelectIdentityType", intl)
      return;
    }
      let identityNumber = getValues("IdentityNumber"); 
     if (selectedIdentityId && !identityNumber){
      showAlert(false, "YouMustSelectIdentityNumber", intl);
      return;
     }
    let body = {
      name: data?.name,
      lK_IdentityTypeId: selectedIdentityId,
      identityNumber: data?.IdentityNumber,
      litigantStatus: LitigationStatus.Client,
    };
  
  
    await dispatch(addLitigantConsume(body) as any).then((res: any) => {
      if (res?.payload?.message === "Add Successfully " || res?.payload?.statusEnum === 1) {
        showAlert(true, "AddedSuccessfully", intl);
        handleCloseNewClient();
        reset({
          name: "",
          IdentityNumber: ""
        });
        setSelectedIdentityId(""); 
        setSelectedIdentityName("");
        dispatch(
        getLitigantConsume({
          status: LitigationStatus.Client,
          PageIndex: 1,
          PageSize: 1000,
        }) as any
      ).then((response: any) => {
        setClientsData(response?.payload?.result);
        const client = response?.payload?.result?.find(
          (item: any) => item.id === res?.payload?.result
        );
        if (client) {
          const newClient = {
            value: client.id,
            label:  client.name,
          };
          setSelectedClients((prev: any) => [...prev, newClient]);
          setFirstClient(newClient);
        }
      });
      }else if (res?.payload?.message === "litigant Is Found" || res?.payload?.statusEnum === 6){
        showAlert(false, "LitigantIsFound", intl);
      }
       else {
        showAlert(false, "AnErrorOccurred", intl);
        handleCloseNewClient();
      }
    });
  };
  
  useEffect(() => {
    if (show) {
      const modals = document.querySelectorAll('.modal[aria-hidden="true"]');
      modals.forEach((modal) => {
        modal.setAttribute('aria-hidden', 'false');
      });
    }
  }, [show]);
  return (
    <Modal
      size="md"
      centered
      show={show}
      onHide={handleCloseNewClient}
      enforceFocus={false}
      backdrop={false}
      keyboard={false}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h1>{intl.formatMessage({ id: "NewClient" })}</h1>
          </Modal.Title>
        </Modal.Header>
          <Modal.Body className="px-5 py-4">
            <div className="mb-4 mt-3">
              <div className="d-flex align-items-center mb-2">
                <label className="form-label me-2">
                  {intl.formatMessage({ id: "Name" })}
                </label>
                <span className="text-danger">*</span>
              </div>

              <div className="input-group bg-white bg-fix-dark   ">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fas fa-user"></i>
                  </span>
                </div>
                <input
                  id="CaseAddress"
                  type="text"
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "EnterName" })}
                  {...register("name")}
                />
                {errors?.name &&
                  DisplayErrorMessage(
                    "InputFieldIsRequried",
                    intl,
                    intl.locale
                  )}
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex align-items-center mb-2">
                <label className="form-label me-2">
                  {intl.formatMessage({ id: "IdentityType" })}
                </label>
                <span className="text-danger">*</span>
              </div>
              <select
                id="identityTypeId"
                name="identityTypeId"
                className="form-select inputHeight form-select-solid select2-hidden-accessible mt-1"
                value={selectedIdentityId}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  {intl.formatMessage({ id: "SelectTheType" })}
                </option>
                {Array.isArray(identityTypes) &&
                  identityTypes.map((identityType: any) => (
                    <option key={identityType?.id} value={identityType?.id}>
                      {language === "ar"
                        ? identityType.nameAr
                        : identityType.nameEn}
                    </option>
                  ))}
              </select>
            </div>

            {selectedIdentityName && (
              <div className="mb-4 mt-3">
                <div className="d-flex align-items-center mb-2">
                  <label className="form-label me-2">
                    {selectedIdentityName}
                  </label>
                  <span className="text-danger">*</span>
                </div>

                <div className="input-group bg-white bg-fix-dark">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="special fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    id="CaseAddress"
                    type="text"
                    className="form-control"
                    placeholder={selectedIdentityName}
                    {...register("IdentityNumber")}
                  />
                  {errors?.IdentityNumber &&
                    DisplayErrorMessage(
                      "InputFieldIsRequried",
                      intl,
                      intl.locale
                    )}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center px-5 pb-4">
            <Button
              variant="secondary"
              className="me-3"
              onClick={()=>{
                handleCloseNewClient();
                reset({
                  name: "",
                  IdentityNumber: ""
                });
                setSelectedIdentityId(""); 
                setSelectedIdentityName("");
              }}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </Button>
            <Button
              variant="success"
              type="button"
              onClick={handleSubmit(handleAddClient)}
            >
              {intl.formatMessage({ id: "Add" })}
            </Button>
          </Modal.Footer>
      </div>
    </Modal>
  );
};

export default AddClientsPopup;
