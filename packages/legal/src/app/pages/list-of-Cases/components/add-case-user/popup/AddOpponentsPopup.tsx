import React, { useMemo, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import {
  getAllLK_IdentityTypes,
  addLitigantConsume,
  getLitigantConsume,
} from "../../../../../features/litigant-consume";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  LitigationStatus } from "../../../../../models/LegalEnums";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { InferType, mixed, number, object, string } from "yup";
type PopupProps = {
  show: boolean;
  handleCloseNewOpponent: () => void;
  setDefaultOpponent:any
 setOpponentsData?:any;
 setSelectedOpponents?:any;
};
export const AddOpponentValidationSchema = object({
  name: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
   IdentityNumber:mixed().nullable(),
    
});
export type AddOpponentValidationProps = InferType<
  typeof AddOpponentValidationSchema
>;

const AddOpponentsPopup: React.FC<PopupProps> = ({
  show,
  handleCloseNewOpponent,
  setDefaultOpponent,
 setOpponentsData,
 setSelectedOpponents,
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
  } = useForm<AddOpponentValidationProps>({
    resolver: yupResolver(AddOpponentValidationSchema),
  });
const handleAddOpponent = async (data: any, event?: React.BaseSyntheticEvent) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (!selectedIdentityId) {
    showAlert(false, "YouMustSelectIdentityType", intl);
    return;
  }

  let identityNumber = getValues("IdentityNumber");
  if (selectedIdentityId && !identityNumber) {
    showAlert(false, "YouMustSelectIdentityNumber", intl);
    return;
  }

  let body = {
    name: data?.name,
    lK_IdentityTypeId: selectedIdentityId,
    identityNumber: data?.IdentityNumber,
    litigantStatus: LitigationStatus.Opponent,
  };

  await dispatch(addLitigantConsume(body) as any).then((res: any) => {
    if (
      res?.payload?.message === "Add Successfully " ||
      res?.payload?.statusEnum === 1
    ) {
      showAlert(true, "AddedSuccessfully", intl);
      dispatch(
        getLitigantConsume({
          status: LitigationStatus.Opponent,
          PageIndex: 1,
          PageSize: 1000,
        }) as any
      ).then((response: any) => {
        setOpponentsData(response?.payload?.result);
        const opponent = response?.payload?.result?.find(
          (item: any) => item.id === res?.payload?.result
        );
        if (opponent) {
          const newOpponent = {
            value: opponent.id,
            label:  opponent.name,
          };
          setSelectedOpponents((prev: any) => [...prev, newOpponent]);
          setDefaultOpponent(newOpponent);
        }
      });
      handleCloseNewOpponent();
      reset({
        name: "",
        IdentityNumber: "",
      });
      setSelectedIdentityId("");
      setSelectedIdentityName("");
    } else if (
      res?.payload?.message === "litigant Is Found" ||
      res?.payload?.statusEnum === 6
    ) {
      showAlert(false, "LitigantIsFound", intl);
    } else {
      showAlert(false, "AnErrorOccurred", intl);
      handleCloseNewOpponent();
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
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleCloseNewOpponent}
      enforceFocus={false}
      backdrop={false}
      keyboard={false}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h1>{intl.formatMessage({ id: "AddOpponent" })}</h1>
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

            {/* <div className="mb-4 mt-3">
              <div className="d-flex align-items-center mb-2">
                <label className="form-label me-2">
                  {intl.formatMessage({ id: "Complaint" })}
                </label>
              </div>

              <div className="input-group bg-white bg-fix-dark h-150px">
                <div className="bg-gray-100 w-100 h-150px">
                  <textarea
                    id="Complaint"
                    className="form-control"
                    style={{ minHeight: "150px" }}
                    placeholder={intl.formatMessage({
                      id: "EnterTheComplaint",
                    })}
                  />
                </div>
              </div>
            </div> */}
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-center px-5 pb-4">
            <Button
              variant="secondary"
              className="me-3"
              onClick={()=>{
                handleCloseNewOpponent();
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
            <Button variant="success" type="button" onClick={handleSubmit(handleAddOpponent)}>
            {intl.formatMessage({ id: "Add" })}
          </Button>
          </Modal.Footer>

      </div>
    </Modal>
  );
};

export default AddOpponentsPopup;
