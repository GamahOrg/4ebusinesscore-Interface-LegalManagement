import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import {
  getAllLK_IdentityTypes,
  getLitigantConsume,
  fetchLitigantId,
  putLitigant,
} from "../../../../../features/litigant-consume";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LitigantStatus, LitigationStatus } from "../../../../../models/LegalEnums";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { InferType, mixed, object, string } from "yup";
import { fetchCauseById } from "../../../../../features/cause";
import { useParams } from "react-router";

type PopupProps = {
  show: boolean;
  handleCloseNewOpponent: () => void;
  opponents?: any;
  setOpponents?: any;
  selectedOpponentId?: any;
};

export const AddDiscountValidationSchema = object({
  name: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  IdentityNumber: mixed().nullable(),
});
export type AddDiscountValidationProps = InferType<
  typeof AddDiscountValidationSchema
>;
const EditNewOpponentPopup: React.FC<PopupProps> = ({
  show,
  handleCloseNewOpponent,
  opponents,
  setOpponents,
  selectedOpponentId,
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
    const selectedIdentity = identityTypes?.find((item) => item.id == selectedId);
    setSelectedIdentityName(selectedIdentity ? selectedIdentity.nameAr : "");
  };


  useEffect(() => {
    dispatch(fetchLitigantId(selectedOpponentId));
  }, [selectedOpponentId]);

  const litigantById = useSelector((state: RootState) => {
    return state.libability?.litigantById;
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<AddDiscountValidationProps>({
    resolver: yupResolver(AddDiscountValidationSchema),
  });
  useEffect(() => {
    if (litigantById) {
      setValue("name", litigantById?.name);
      setValue("IdentityNumber", litigantById?.identityNumber);
      setSelectedIdentityId(litigantById?.lK_IdentityType?.id)
      setSelectedIdentityName(litigantById?.lK_IdentityType?.nameAr)
    }
  }, [litigantById]);
  const handleEditOpponent = async (
    data: any,
    event?: React.BaseSyntheticEvent
  ) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    let body = {
      name: data?.name,
      lK_IdentityTypeId: selectedIdentityId,
      identityNumber: data?.IdentityNumber,
      litigantStatus: LitigationStatus?.Opponent,

    };

    await dispatch(putLitigant({id :selectedOpponentId, body}) as any).then((res: any) => {
      if (
        res?.payload?.message === "Add Successfully " ||
        res?.payload?.statusEnum === 1
      ) {
        showAlert(true, "ModifiedSuccessfully", intl);
        handleCloseNewOpponent();
        reset();
        setOpponents((prevOpponents: any[]) => {
          const updatedOpponents = prevOpponents.map((opponent) =>
            opponent.litigant?.id === selectedOpponentId ? { ...opponent, litigant: { ...opponent.litigant, ...body } } : opponent
          );
          return updatedOpponents;
        });
      } else {
        showAlert(false, "AnErrorOccurred", intl);
        handleCloseNewOpponent();
      }
    });
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleCloseNewOpponent}
      className={!show ? "inert" : ""}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h1>{intl.formatMessage({ id: "ModifyDiscount" })}</h1>
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
                DisplayErrorMessage("InputFieldIsRequried", intl, intl.locale)}
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
      
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center px-5 pb-4">
          <Button
            variant="secondary"
            className="me-3"
            onClick={handleCloseNewOpponent}
          >
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button
            variant="success"
            type="button"
            onClick={handleSubmit(handleEditOpponent)}
          >
            {intl.formatMessage({ id: "Add" })}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default EditNewOpponentPopup;
