import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { object, string, InferType } from "yup";
import { PostJudgementRefernce } from "../../../features/judgement-refernce";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { fetchJudgementById } from "../../../features/judgement-ground";
interface AddJudgmentInstrumentProps {
  show: boolean;
  handleClose: () => void;
  judgement?: any;
}

export const AddJudgementInstrumentSchema = object({
  JudgementInstrument: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  JudgementInstrumentNumber: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
});
export type AddJudgementInstrumentProps = InferType<
  typeof AddJudgementInstrumentSchema
>;
const AddJudgeInstrumentPopup = ({
  show,
  handleClose,
  judgement,
}: AddJudgmentInstrumentProps) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const [modalShow, setModalShow] = useState<boolean>(false);
  let language = intl.locale;

  console.log(judgement);
  const currentJudgment =
    useAppSelector((state) => state.judgementGround.judgementGroundsById) || {};
  useEffect(() => {
    if (show && judgement?.id) {
      dispatch(fetchJudgementById(judgement?.id) as any);
    }
  }, [show, judgement?.id, dispatch]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AddJudgementInstrumentProps>({
    resolver: yupResolver(AddJudgementInstrumentSchema),
    mode: "all",
  });

  const onSubmit = async (formValues: AddJudgementInstrumentProps) => {
    let formData = new FormData();
    formData.append("SessionId", currentJudgment?.sessionId || "");
    formData.append("CauseStageId", currentJudgment?.causeStageId || "");
    formData.append("CauseId", currentJudgment?.causeId || "");
    formData.append("JudgementNumber", formValues.JudgementInstrumentNumber);
    formData.append("JudgementDocument", formValues.JudgementInstrument);

    dispatch(PostJudgementRefernce(formData) as any).then((res) => {
      if (res?.payload?.statusEnum === 1) {
        showAlert(true, "AddedSuccessfully", intl);
        handleClose();
        reset();
      } else if(res?.payload?.statusEnum === 2){
        showAlert(false, "TheSessionDoesn'tContainAJudgement", intl);
      }
      
      else {
        showAlert(false, "AnErrorOccurred", intl);
      }
    });
  };


  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">
            {" "}
            {intl.formatMessage({ id: "AddJudgmentInstrument" })}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="py-5">
              <div className="row">
                <div className="col-12  col-lg-6 mb-5">
                  <div className="mb-3">
                    <label className="form-label required text-muted">
                      {" "}
                      {intl.formatMessage({ id: "JudgmentInstrument" })}{" "}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-gavel"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className={`form-control`}
                        placeholder={intl.formatMessage({
                          id: "JudgmentInstrument",
                        })}
                        {...register("JudgementInstrument")}
                      />
                    </div>
                    {errors?.JudgementInstrument &&
                      DisplayErrorMessage(
                        errors?.JudgementInstrument?.message,
                        intl,
                        intl.locale
                      )}
                  </div>
                </div>
                <div className="col-12 col-lg-6 mb-5">
                  <div className="mb-3">
                    <label className="form-label required text-muted">
                      {" "}
                      {intl.formatMessage({
                        id: "JudgmentInstrumentNumber",
                      })}{" "}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-signature"></i>
                        </span>
                      </div>
                      <input
                        type="number"
                        className={`form-control`}
                        placeholder={intl.formatMessage({
                          id: "JudgmentInstrumentNumber",
                        })}
                        {...register("JudgementInstrumentNumber")}
                      />
                    </div>

                    {errors?.JudgementInstrumentNumber &&
                      DisplayErrorMessage(
                        errors?.JudgementInstrumentNumber?.message,
                        intl,
                        intl.locale
                      )}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-end gap-2 border-0">
            <button
              type="button"
              onClick={() => {
                handleClose();
              }}
              className="btn btn-secondary px-5"
              style={{
                borderRadius: "8px",
                minWidth: "120px",
              }}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </button>
            <button
              className="btn px-5 btn btn-success text-white"
              type="submit"
              style={{
                borderRadius: "8px",
                minWidth: "120px",
              }}
            >
              {intl.formatMessage({ id: "Add" })}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      {modalShow && (
        <div className="modal fade">
          <AddPopup
            show={modalShow}
            handleClose={() => setModalShow(false)}
            handleCloseMainPopup={() => handleClose()}
          />
        </div>
      )}
    </>
  );
};
export default AddJudgeInstrumentPopup;
