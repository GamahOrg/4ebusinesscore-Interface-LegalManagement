import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModifyDiscountValidationSchema } from "../validations/ModifyDiscountValidationSchema";
import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { EditPopup } from "@4eplatform/shared/src/popups/EditPopup";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { RootState, useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { fetchLitigantId, getAllLK_IdentityTypes, getLitigantConsume, putLitigant } from "../../../features/litigant-consume";
import { LitigationStatus } from "../../../models/LegalEnums";


interface ModifyDiscountProps {
  show: boolean;
  handleClose: () => void;
  setShowAccordionEdit?: any;
  id: number;
  searchQuery?: string;
  clientType?: any;
  pageIndex?: number;
  pageSize?: number;
}

const ModifyDiscountPopup = ({ show, handleClose, id, searchQuery,
  clientType,
  pageIndex,
  pageSize }: ModifyDiscountProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [loading, setLoading] = useState(false);


  let { IdentityTypes, litigantById } = useSelector((state: RootState) => {
    return state.libability
  })
  const selectedIdentityTypes = Array.isArray(IdentityTypes) ?
    IdentityTypes.filter((item: any) => intl.locale === "en" ? item.nameEn === litigantById?.identityType :
      item.nameAr === litigantById?.identityType) : undefined;


  useEffect(() => {
    if (id) dispatch(fetchLitigantId(id));
  }, [id, dispatch]);

  const params = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    ...(searchQuery ? { name: searchQuery } : {}),
    status: LitigationStatus.Opponent,
    ClientType: clientType,
  };
  async function getData() {
    await dispatch(getLitigantConsume(params))
  }

  useEffect(() => {
    dispatch(getAllLK_IdentityTypes());
  }, [dispatch]);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset
  } = useForm({
    resolver: yupResolver(ModifyDiscountValidationSchema)
  });

  function modifyLitigant() {
    const originalValues = getValues();
    const values = {
     ...originalValues,
     litigantStatus: LitigationStatus.Opponent, 
        };
    if (!id) {
      console.error("ID is undefined or null");
      return;
    }
    setLoading(true);
    dispatch(putLitigant({ id, body: values }))
      .unwrap()
      .then((res) => {
        if (res?.message === "litigant has Cause can not edit") {
          showAlert(false, "LitigantHasCauseCannotEdit", intl);
          return;
        }
        reset();
        showAlert(true, "SavedSuccessfully", intl);
        handleClose();
        getData()
      })
      .catch((error) => {
        if (error)
          showAlert(false, "UpdateFailed", intl);
      }).finally(() => {
        setLoading(false); 

      });
  }



  useEffect(() => {
    if (litigantById) {
      setValue("name", litigantById?.name);
      // setValue("litigantStatus", litigantById?.litigantStatus);
      setValue("PhoneNumber", litigantById?.phoneNumber);
      setValue("IdentityNumber", litigantById?.identityNumber);
      setValue("lK_IdentityTypeId", litigantById?.lK_IdentityType.id);
      setSelectedOption(litigantById?.litigantStatus);
    }
  }, [litigantById, setValue]);
let language = intl.locale;
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center position-relative w-100 mt-3">
          {intl.formatMessage({ id: "ModifyDiscount" })}
        </Modal.Title>
      </Modal.Header>

      <form
        onSubmit={handleSubmit(modifyLitigant)}
      >
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
                {Array.isArray(IdentityTypes) && IdentityTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {language == "ar" ? type.nameAr : type.nameEn}
                  </option>
                ))}
              </select>



              {errors.lK_IdentityTypeId && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: errors.lK_IdentityTypeId.message })}
                </div>
              )}            </div>

            <div className="my-4">
              <label className="form-label required text-muted">
                {intl.formatMessage({ id: "ResidentIDNumber" })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fas fa-id-card"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder={intl.formatMessage({ id: "IdentityNumber" })}
                  className={`form-control`}
                  {...register("IdentityNumber")}
                />
              </div>
              {errors.IdentityNumber && (
                <div className="text-danger mt-1">
                  {intl.formatMessage({ id: errors.IdentityNumber.message })}
                </div>
              )}
            </div>

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
            className="btn btn-light px-20"
            type="button"
            onClick={handleClose}
          >
            {intl.formatMessage({ id: "Cancel" })}
          </button>
          <button
  className="btn px-20"
  type="submit"
  disabled={loading}
  style={{
    backgroundColor: loading ? "#B0C4DE" : "#0096FF",
    color: "white",
    transition: "background-color 0.3s ease",
    cursor: loading ? "not-allowed" : "pointer",
  }}
  onMouseOver={(e) => {
    if (!loading) e.currentTarget.style.backgroundColor = "#0084E0";
  }}
  onMouseOut={(e) => {
    if (!loading) e.currentTarget.style.backgroundColor = "#0096FF";
  }}
>
  {loading
    ? intl.formatMessage({ id: "Saving" }) + "..." 
    : intl.formatMessage({ id: "Save" })}
</button>

        </Modal.Footer>
      </form>
      <div className="modal fade" aria-hidden="true">
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

export default ModifyDiscountPopup;