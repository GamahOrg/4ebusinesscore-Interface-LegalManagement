import { Button, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddDiscountValidationProps,
  AddDiscountValidationSchema,
} from "../validations/AddDiscountValidationSchema";
import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import {
  addLitigantConsume,
  getAllLK_IdentityTypes,
  getLitigantConsume,
} from "../../../features/litigant-consume";
import { RootState, useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { LitigationStatus } from "../../../models/LegalEnums";

interface AddLitigantConsumeResponse {
  statusEnum: number;
  message: string;
  searchQuery?: string;
  clientType?: string;
  pageIndex?: number;
  pageSize?: number;
}

interface AddDiscount {
  show: boolean;
  handleClose: () => void;
  searchQuery?: string;
  clientType?: string;
  pageIndex?: number;
  pageSize?: number;
}

const AddDiscountPopup = ({
  show,
  handleClose,
  searchQuery,
  clientType,
  pageIndex,
  pageSize,
}: AddDiscount) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const params = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    ...(searchQuery ? { name: searchQuery } : {}),
    status: LitigationStatus.Opponent,
    ClientType: clientType,
  };
  async function getData() {
    await dispatch(getLitigantConsume(params));
  }

  const { IdentityTypes } =
    useSelector((state: RootState) => state.libability) || {};

  useEffect(() => {
    dispatch(getAllLK_IdentityTypes());
  }, [dispatch]);
  useEffect(() => {
    if (IdentityTypes?.length) {
      setValue("lK_IdentityTypeId", IdentityTypes[0]?.id || -1);
    }
  }, [IdentityTypes]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    getValues,
  } = useForm<AddDiscountValidationProps>({
    mode: "onChange",
    resolver: yupResolver(AddDiscountValidationSchema),
  });
  useEffect(() => {
    if (IdentityTypes?.length) {
      setValue("lK_IdentityTypeId", -1);
    }
  }, [IdentityTypes, setValue]);

  const selectedIdentityTypeId = watch("lK_IdentityTypeId");

  const addLiability = async () => {
    setLoading(true);
    try {
      const originalValues = getValues();
      const values = {
       ...originalValues,
       litigantStatus: LitigationStatus.Opponent, 
    };
      const result = (await dispatch(addLitigantConsume(values))) as {
        payload: AddLitigantConsumeResponse;
      };
      
      if (result.payload?.statusEnum === 1 || result.payload?.statusEnum === 3) {
        showAlert(true, "AddedSuccessfully", intl);
        await getData();
        reset();
        handleClose();
      } else {
        showAlert(false, "ThisPersonAlreadyExists", intl);
      }
    } catch (error) {
      console.error(error);
      showAlert(false, "ErrorOccurred", intl);
    } finally {
      setLoading(false); 
    }
  };
  let language = intl.locale;
  return (
    <Modal show={show} onHide={handleClose} centered 
    enforceFocus={false}
    backdrop={false}
    keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center position-relative w-100 mt-3">
          {intl.formatMessage({ id: "AddOpponent" })}
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit(addLiability)}>
        <Modal.Body>
          <div className="row px-4">
            <div className="my-4">
              <label className="form-label required text-muted">
                {intl.formatMessage({ id: "Name" })}
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="special fas fa-user"></i>
                </span>
                <input
                  type="text"
                  placeholder={intl.formatMessage({ id: "Name" })}
                  className="form-control"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: errors.name.message })}
                </div>
              )}
            </div>
            <div className="my-4">
              <label className="form-label required text-muted">
                {intl.formatMessage({ id: "PhoneNumber" })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fas fas fa-phone-alt"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder={intl.formatMessage({ id: "PhoneNumber" })}
                  className="form-control"
                  {...register("PhoneNumber")}
                />
              </div>
              {errors.PhoneNumber && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: errors.PhoneNumber.message })}
                </div>
              )}
            </div>
            <div className="my-4">
              <label className="form-label required text-muted">
                {intl.formatMessage({ id: "IdentityType" })}
              </label>

             <select
                {...register("lK_IdentityTypeId")}
                className="form-select"
              >
                <option value={-1} disabled>
                  {intl.formatMessage({ id: "SelectType" })}
                </option>
                {Array.isArray(IdentityTypes) &&
                  IdentityTypes.map((type: any) => {
                    const label = language === "ar" ? type.nameAr : type.nameEn;
                    const shortLabel =
                      label && label.length > 10 ? `${label.slice(0, 15)}...` : label;

                    return (
                      <option key={type.id} value={type.id} title={label}>
                        {shortLabel}
                      </option>
                    );
                  })}
              </select>

              {errors.lK_IdentityTypeId && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: errors.lK_IdentityTypeId.message })}
                </div>
              )}
            </div>

            {selectedIdentityTypeId > -1 ? (
              <div className="mb-4 mt-3">
                <label className="form-label required text-muted">
                {
                    Array.isArray(IdentityTypes) &&
                    IdentityTypes.find(
                      (type: any) => type.id === Number(selectedIdentityTypeId)
                    )?.[language === "ar" ? "nameAr" : "nameEn"] || ""
                  }
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={
                    Array.isArray(IdentityTypes) &&
                    IdentityTypes.find(
                      (type: any) => type.id === Number(selectedIdentityTypeId)
                    )?.[language === "ar" ? "nameAr" : "nameEn"] || ""
                  }
                  {...register("IdentityNumber", { required: true })}
                />
                {errors.IdentityNumber && (
                  <div className="text-danger mt-1">
                    {intl.formatMessage({ id: errors.IdentityNumber.message })}
                  </div>
                )}
              </div>
            ) : (
              ""
            )}

            {/* <div className="col-12 mt-4">
              <label className="form-label required text-muted">
                {intl.formatMessage({ id: "Status" })}
              </label>
              <div className="d-flex gap-3">
                {[
                  { id: 1, label: "Claimant" },
                  { id: 2, label: "Defendant" },
                ].map(({ id, label }) => (
                  <div
                    key={id}
                    className="form-check d-flex align-items-center gap-2"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      id={label}
                      value={id}
                      onChange={() => setValue("litigantStatus", id)}
                      checked={watch("litigantStatus") === id}
                    />
                    <label
                      htmlFor={label}
                      className="form-check-label mx-5 px-5"
                    >
                      {intl.formatMessage({ id: label })}
                    </label>
                  </div>
                ))}
              </div>
              {errors.litigantStatus && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: errors.litigantStatus?.message })}
                </div>
              )}
            </div> */}
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center gap-2">
        <button
          className="btn btn-light px-20"
          type="button"
          onClick={handleClose}
          disabled={loading} 
        >
          {intl.formatMessage({ id: "Cancel" })}
        </button>
        
        <Button
          variant="success"
          type="submit"
          className="px-20 mb-3 text-white"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#47BE7D" : "#50CD89",
            borderColor: loading ? "#47BE7D" : "#50CD89",
          }}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                className="mx-2"
              />
              {intl.formatMessage({ id: "Adding" })}
            </>
          ) : (
            intl.formatMessage({ id: "Add" })
          )}
        </Button>
      </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddDiscountPopup;
