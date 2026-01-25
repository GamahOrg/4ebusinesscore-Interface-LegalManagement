import { FC } from "react";
import { Modal, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type ViewNotePopupProps = {
  id?: any;
  show: boolean;
  handleClose: any;
  text?:string
};

const ViewNotePopup: FC<ViewNotePopupProps> = ({id, show, handleClose,text }) => {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});
  useEffect(() => {
    setValue(
      "note",
      text
    );
  });
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header
        closeButton
        style={{
          alignItems: intl.locale === "ar" ? "flex-start" : "center",
          flexDirection: intl.locale === "en" ? "column-reverse" : "row",
        }}
        className="pb-0"
      >
        <div className=" d-flex justify-content-center w-100 px-4 ">
          <Row className="justify-content-center my-4">
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="text-center">
                <h2>
                  {intl.formatMessage({
                    id: "SessionNote",
                  })}
                </h2>
              </div>
            </Modal.Title>
          </Row>
        </div>
      </Modal.Header>
      <Modal.Body className="py-8 px-8 mt-5 mb-8">
        <Row>
          <textarea
            rows={14}
            className="form-control form-control-solid "
            {...register("note")}
            placeholder={intl.formatMessage({ id: "TheNote" })}
            disabled
          />
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ViewNotePopup;
