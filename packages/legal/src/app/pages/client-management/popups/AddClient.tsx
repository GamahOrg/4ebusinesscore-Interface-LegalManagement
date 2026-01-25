import { Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  addLitigantConsume,
  getAllLK_IdentityTypes,
  getLitigantConsume,
} from "../../../features/litigant-consume";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import DisplayErrorMessage from "./../../../../../../shared/functions/displayErrorMessage";
import { RequiredClientValidationSchema } from "../validations/RequiredClientValidationSchema";
import { LitigationStatus } from "../../../models/LegalEnums";

interface AddClient {
  show: boolean;
  handleClose: () => void;
  setShowAccordionEdit?: any;
  pageIndex?: any;
  pageSize?: any;
  clientType?: any;
  searchQuery?: any;
}

const AddClient = ({ show, handleClose , 
  pageIndex,
  pageSize,
  clientType,
  searchQuery,
 }: AddClient) => {
  const intl = useIntl();
  const [identityNumber, setIdentityNumber] = useState("");
  const [identityType, setIdentityType] = useState<any>();
  // const [litigantStatus, setLitigantStatus] = useState<any>(1);
  let [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const identityTypes = useAppSelector(
    (state) => state.libability?.IdentityTypes || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
     mode: "onChange",
    resolver: yupResolver(RequiredClientValidationSchema),
  });
  useEffect(() => {
    if (show) {
      dispatch(getAllLK_IdentityTypes());
    }
  }, [show]);

  const onSubmit = async (body: any) => {
    if (identityNumber === "" || identityType?.value === "") {
      showAlert(false, "PleaseCompleteTheData", intl);
      return;
    }
    setLoading(true);
    const data = {
      name: body?.name,
      phoneNumber: body?.phoneNumber,
      lK_IdentityTypeId: body?.identityType,
      identityNumber: identityNumber,
      litigantStatus: LitigationStatus.Client,
    };
    await dispatch(addLitigantConsume(data) as any).then((res: any) => {
      if (
        res?.payload?.message === "litigant Add Success" ||
        res?.payload?.statusEnum === 1
      ) {
        showAlert(true, "AddedSuccessfully", intl);
        handleClose();
        reset();
        setLoading(false);
        dispatch(
          getLitigantConsume({
           status: LitigationStatus.Client,
           PageIndex: pageIndex,
           PageSize: pageSize,
           ...(searchQuery ? { name: searchQuery } : {}),
           ClientType:clientType,
          }) as any
        );
      } else if (
        res?.payload?.message === '["Invalid Saudi phone number."]' ||
        res?.payload?.message ===
          '["Invalid Saudi phone number format. It must starts with 9665, 009665, or 05, and have exactly 8 numbers after the key."]'
      ) {
        showAlert(false, "InvalidPhoneNumber", intl);
        setLoading(false);
      } else if (res?.payload?.message === "litigant Is Found") {
        showAlert(false, "AlreadyExists", intl);
        setLoading(false);
      } else {
        showAlert(false, "AnErrorOccurred", intl);
        setLoading(false);
      }
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      enforceFocus={false}
      backdrop={false}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center position-relative w-100 mt-3">
          {intl.formatMessage({ id: "AddClient" })}
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="row px-4">
            <div className="my-4">
              <label className="form-label required text-muted">
                {intl.formatMessage({ id: "Name" })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder={intl.formatMessage({ id: "Name" })}
                  className={`form-control `}
                  {...register("name")}
                />
              </div>

              {errors.name &&
                DisplayErrorMessage(errors.name.message, intl, intl.locale)}
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
                  className={`form-control`}
                  {...register("phoneNumber")}
                />
              </div>
              {errors.phoneNumber &&
                DisplayErrorMessage(
                  errors.phoneNumber.message,
                  intl,
                  intl.locale
                )}
            </div>

            <div className="my-4">
              <label className="form-label required text-muted">
                {intl.formatMessage({ id: "IdentityType" })}
              </label>
              <div className="input-group">
                <select
                  className="form-select"
                  onChange={(e) => {
                    const selected = {
                      value: e.target?.value,
                      name: e.target?.options[e.target?.selectedIndex]?.text,
                    };
                    setIdentityType(selected);
                    setValue("identityType", selected.value, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <option value={-1}>
                    {intl.formatMessage({ id: "SelectTheType" })}
                  </option>

                  {identityTypes?.length > 0 &&
                    identityTypes.map((item: any) => {
                      const label = intl.locale === "ar" ? item.nameAr : item.nameEn;
                      const shortLabel =
                        label && label.length > 10 ? `${label.slice(0, 15)}...` : label;

                      return (
                        <option key={item.id} value={item.id} title={label}>
                          {shortLabel}
                        </option>
                      );
                    })}
                </select>

              </div>
              {errors.identityType &&
                DisplayErrorMessage(
                  errors.identityType.message,
                  intl,
                  intl.locale
                )}
            </div>
            {Number(identityType?.value) > -1 && (
              <div className="mb-4 mt-3">
                <div className="d-flex align-items-center mb-2">
                  <label className="form-label me-2">{identityType.name}</label>
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
                    placeholder={identityType?.name}
                    onChange={(e) => setIdentityNumber(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* <div className="col-12 mt-4">
              <label className="form-label required text-muted">
                {intl.formatMessage({ id: "Status" })}
              </label>
              <div className="bg-gray-200 px-6 py-4 rounded d-flex align-items-center gap-6">
                <div className="d-flex align-items-center gap-2 form-check form-check-custom form-check-solid form-check-md">
                  <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      name="status"
                      className="form-check-input widget-9-radio xRadioBg"
                      type="radio"
                      defaultChecked
                      onClick={() => setLitigantStatus(1)}
                    />
                  </div>
                  <label className="fs-6">
                    {intl.formatMessage({ id: "Plaintiff" })}
                  </label>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      name="status"
                      className="form-check-input widget-9-radio xRadioBg"
                      type="radio"
                      onClick={() => setLitigantStatus(2)}
                    />
                  </div>
                  <label className="fs-6">
                    {intl.formatMessage({ id: "Defendant" })}
                  </label>
                </div>
              </div>
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center align-items-center gap-2">
          <button
            className="btn btn-light text-gray-800 px-20"
            type="button"
            onClick={handleClose}
          >
            {intl.formatMessage({ id: "Cancel" })}
          </button>
          {!loading ? (
            <button
              className="btn btn-primary px-20"
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: "#00A3FF" }}
            >
              {intl.formatMessage({ id: "Add" })}
            </button>
          ) : (
            <button
              className="btn btn-primary px-20"
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: "#00A3FF" }}
            >
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                // aria-hidden="true"
                className="mx-2"
              />
              <span>{intl.formatMessage({ id: "Adding" })}</span>
            </button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddClient;
