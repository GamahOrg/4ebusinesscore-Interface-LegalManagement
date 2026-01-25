import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useIntl } from "react-intl";
import { showAlert } from "@4eplatform/shared/services/showAlert";

const validationSchema = object({
  fromLevel: string().optional(),
  toLevel: string().optional(),
  supervisor: string().optional(),
  caseNumber: string().optional(),
  responsible: string().optional(),
});

interface ChangeLitigationLevelPopupProps {
  show: boolean;
  handleClose: () => void;
}

const ChangeLitigationLevelPopup = ({
  show,
  handleClose,
}: ChangeLitigationLevelPopupProps) => {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    handleClose();
    showAlert(true, "TheChangeWasMadeSuccessfully", intl);
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">
          {" "}
          {intl.formatMessage({ id: "ChangeLitigationLevel" })}
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label className="mb-2 required">
                  {intl.formatMessage({ id: "FromDegree" })}
                </label>
                <div className="bg-light rounded">
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
                    value="المرحلة الرابعة"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label className="mb-2 required">
                  {intl.formatMessage({ id: "ToDegree" })}
                </label>
                <select
                  className="form-select form-select-solid"
                  {...register("toLevel")}
                >
                  <option value="">
                    {intl.formatMessage({ id: "ChooseTheGrade" })}
                  </option>
                  <option value="1">
                    {intl.formatMessage({ id: "GradeOne" })}
                  </option>
                  <option value="2">
                    {intl.formatMessage({ id: "GradeTwo" })}
                  </option>
                </select>
                {errors.toLevel && (
                  <div className="text-danger">{errors.toLevel.message}</div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 mt-md-2">
              <div className="mb-3">
                <label className="mb-2 required">
                  {intl.formatMessage({ id: "Supervisor" })}
                </label>
                <select
                  className="form-select form-select-solid"
                  {...register("supervisor")}
                >
                  <option value="">
                    {intl.formatMessage({ id: "ChooseSupervisor" })}
                  </option>
                  <option value="1">
                    {intl.formatMessage({ id: "Supervisor" })} 1
                  </option>
                  <option value="2">
                    {intl.formatMessage({ id: "Supervisor" })} 2
                  </option>
                </select>
                {errors.supervisor && (
                  <div className="text-danger">{errors.supervisor.message}</div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 mt-md-2">
              <div className="mb-3">
                <label className="mb-2 required">
                  {intl.formatMessage({ id: "ResponsibleForCaseTransfer" })}
                </label>
                <div className="d-flex gap-4 mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      type="radio"
                      id="clients"
                      value="clients"
                      {...register("responsible")}
                      defaultChecked
                      className="form-check-input widget-9-radio xRadioBg"
                    />
                    </div>
                    <label htmlFor="clients" style={{ cursor: "pointer" }}>
                      {intl.formatMessage({ id: "Principals" })}
                    </label>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                   <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                   <input
                      type="radio"
                      id="opponents"
                      value="opponents"
                      {...register("responsible")}
                      className="form-check-input widget-9-radio xRadioBg"
                    />
                   </div>
                    <label htmlFor="opponents" style={{ cursor: "pointer" }}>
                      {intl.formatMessage({ id: "Adversaries" })}
                    </label>
                  </div>
                </div>
                {/* {errors.responsible && (
                                    <div className="text-danger small mt-1">{errors.responsible.message}</div>
                                )} */}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-2 required">
              {intl.formatMessage({ id: "Casenumber" })}
            </label>
            <input
              type="text"
              className={`form-control`}
              placeholder={intl.formatMessage({ id: "Casenumber" })}
              {...register("caseNumber")}
            />
            {errors.caseNumber && (
              <div className="text-danger">{errors.caseNumber.message}</div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end gap-2 border-0">
          <button
            type="button"
            onClick={handleClose}
            className="btn px-15 border border-1 border-dark"
          >
            {intl.formatMessage({ id: "Cancel" })}
          </button>
          <button type="submit" className="btn px-15 text-white bg-primary">
            {intl.formatMessage({ id: "Change" })}{" "}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ChangeLitigationLevelPopup;
