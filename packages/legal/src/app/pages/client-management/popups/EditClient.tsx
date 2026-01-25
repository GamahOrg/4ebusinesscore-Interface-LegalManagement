import { Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { EditPopup } from "@4eplatform/shared/src/popups/EditPopup";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchLitigantId,
  getAllLK_IdentityTypes,
  getLitigantConsume,
  putLitigant,
} from "../../../features/litigant-consume";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { EditClientValidationSchema } from "../validations/EditClientValidationSchema";
import { ClientType, LitigationStatus } from "../../../models/LegalEnums";

interface EditClientProps {
  show: boolean;
  handleClose: () => void;
  setShowAccordionEdit?: any;
  selectedClientId?: any;
  pageSize?: number;
  pageIndex?: number;
  clientType?: any;
  searchQuery?: any;
}

const EditClient = ({
  show,
  handleClose,
  selectedClientId,
  pageSize,
  pageIndex,
  clientType,
  searchQuery,
}: EditClientProps) => {
  const intl = useIntl();
  const [modalShow, setModalShow] = useState<boolean>(false);

  const [identityNumber, setIdentityNumber] = useState("");
  const [identityType, setIdentityType] = useState<any>();
  const [litigantStatus, setLitigantStatus] = useState<any>(0);
  const [selectedOption, setSelectedOption] = useState(1);

  let [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const identityTypes = useAppSelector(
    (state) => state.libability?.IdentityTypes || []
  );
  const litigantById = useAppSelector(
    (state) => state.libability?.litigantById
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(EditClientValidationSchema),
  });

  useEffect(() => {
    if (show && selectedClientId) {
      dispatch(fetchLitigantId(selectedClientId));
    }
  }, [show, selectedClientId]);

  useEffect(() => {
    if (show) {
      dispatch(getAllLK_IdentityTypes());
    }
  }, [show]);

  useEffect(() => {
    if (show && litigantById) {
      setValue("name", litigantById?.name);
      setValue("phoneNumber", litigantById?.phoneNumber);
      setValue("identityType", litigantById?.lK_IdentityType?.id);
      // setValue("litigantStatus", litigantById?.litigantStatus);
      setSelectedOption(litigantById?.litigantStatus);

      setIdentityNumber(litigantById?.identityNumber);
      const selected = {
        value: litigantById?.lK_IdentityType?.id,
        name: litigantById?.lK_IdentityType?.nameAr,
        nameEn: litigantById?.lK_IdentityType?.nameEn,
      };
      setIdentityType(selected);
    }
  }, [show, litigantById]);

  const onSubmitEdit = async (data: any) => {
    if (identityNumber === "" || identityType?.value === "") {
      showAlert(false, "PleaseCompleteTheData", intl);
      return;
    }
    setLoading(true);
    const body = {
      name: data?.name,
      phoneNumber: data?.phoneNumber,
      lK_IdentityTypeId: data?.identityType,
      identityNumber: identityNumber,
      litigantStatus: LitigationStatus.Client,
    };
    const params = {
      status: LitigationStatus.Client,
      PageIndex: pageIndex,
      PageSize: pageSize,
      ...(searchQuery ? { name: searchQuery } : {}),
      ClientType:clientType,
    };
    await dispatch(putLitigant({ id: selectedClientId, body }) as any).then(
      (res: any) => {
        if (
          res?.payload?.message === "litigant Update Success" ||
          res?.payload?.statusEnum === 1
        ) {
          showAlert(true, "EditedSuccessfully", intl);
          handleClose();
          reset();
          setLoading(false);
          dispatch(getLitigantConsume(params) as any);
        } else if (
          res?.payload?.message === '["Invalid Saudi phone number."]'
        ) {
          showAlert(false, "InvalidPhoneNumber", intl);
        } else {
          showAlert(false, "AnErrorOccurred", intl);
        }
      }
    );
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center position-relative w-100 mt-3">
          {intl.formatMessage({ id: "EditClient" })}
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmitEdit)}>
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
                    setValue("identityType", selected.value);
                  }}
                  value={identityType?.value ?? -1}
                >
                  <option value={-1} disabled>
                    {intl.formatMessage({ id: "SelectTheType" })}
                  </option>

                  {identityTypes?.length &&
                    identityTypes?.map((item: any) => (
                      <option
                        key={item.id}
                        value={item.id}
                        // selected={item.id === litigantById?.lK_IdentityType?.id}
                      >
                        {intl.locale === "ar" ? item.nameAr : item.nameEn}
                      </option>
                    ))}
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
                  <label className="form-label me-2">
                    {intl.locale === "ar"
                      ? identityType.name
                      : identityType.nameEn}
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
                    placeholder={identityType?.name}
                    onChange={(e) => setIdentityNumber(e.target.value)}
                    value={identityNumber}
                  />
                </div>
              </div>
            )}

            {/* <div className="col-12 mt-4">
              <label className="form-label required text-muted">
                {intl.formatMessage({ id: "Status" })}
              </label>
              <div className="d-flex justify-content-start gap-1">
                <div className="d-inline ms-2 form-check form-check-primary form-check-sm form-check-custom form-check-solid form-check-md">
                  <input
                    className="form-check-input widget-9-radio xRadioBg"
                    type="radio"
                    name="authority"
                    id="claimant"
                    checked={selectedOption === 1}
                    onChange={(e) => setSelectedOption(1)}
                  />
                  <label className="fs-6 ms-2" htmlFor="claimant">
                    {intl.formatMessage({ id: "Claimant" })}
                  </label>
                </div>
                <div className="d-inline ms-2 form-check form-check-primary form-check-sm form-check-custom form-check-solid form-check-md">
                  <input
                    className="form-check-input widget-9-radio xRadioBg"
                    type="radio"
                    name="authority"
                    id="defendant"
                    value="defendant"
                    checked={selectedOption === 2}
                    onChange={() => setSelectedOption(2)}
                  />
                  <label className="fs-6 ms-2" htmlFor="defendant">
                    {intl.formatMessage({ id: "Defendant" })}
                  </label>
                </div>
              </div>
              {errors.litigantStatus && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: errors.litigantStatus?.message })}
                </div>
              )}
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
              style={{ backgroundColor: "#00A3FF" }}
              disabled={isSubmitting}
            >
              {intl.formatMessage({ id: "Edit" })}
            </button>
          ) : (
            <button
              className="btn btn-primary px-20"
              type="submit"
              style={{ backgroundColor: "#00A3FF" }}
              disabled={isSubmitting}
            >
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mx-2"
              />
              <span>{intl.formatMessage({ id: "Editing" })}</span>
            </button>
          )}
        </Modal.Footer>
      </form>
      <div className="modal fade">
        <EditPopup
          showEdit={modalShow}
          handleCloseEdit={() => {
            setModalShow(false);
          }}
          handleCloseMainPopup={() => handleClose()}
        />
      </div>
    </Modal>
  );
};

export default EditClient;
