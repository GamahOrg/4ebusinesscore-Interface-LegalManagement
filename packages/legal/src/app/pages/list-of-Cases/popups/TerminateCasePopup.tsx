import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
interface TerminateCaseProps {
  show: boolean;
  handleClose: () => void;
  handleTerminate?: () => void;
}

const TerminateCasePopup = ({
  show,
  handleClose,
  handleTerminate,
}: TerminateCaseProps) => {
  const intl = useIntl();
  return (
    <Modal show={show} onHide={handleClose} centered className={!show ? "inert" : ""}>
      <Modal.Header className="border-bottom-0" closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center px-4 pb-5 m-0 pt-0">
        <div className="mb-4">
          <div className="d-flex justify-content-center">
            <div className="rounded-circle w-100px h-100px bg-danger bg-opacity-10 d-flex align-items-center justify-content-center">
              <i
                className="fas fa-power-off text-danger"
                style={{ fontSize: "40px" }}
              ></i>
            </div>
          </div>
        </div>
        <h5 className="mb-2"> {intl.formatMessage({ id: "CaseClosure?" })} </h5>
        <p className="text-muted mb-8">
          {intl.formatMessage({ id: "IfTheCaseIsTerminatedYouCannotAmendIt" })}
        </p>
        <div className="d-flex gap-2 justify-content-center mt-6 mb-8">
          <button
            onClick={handleClose}
            className="btn px-15 border border-1 border-dark"
          >
            {intl.formatMessage({ id: "Cancel" })}
          </button>
          <button
            onClick={() => {
              if (handleTerminate) handleTerminate();
              handleClose();
            }}
            className="btn px-15 text-white bg-danger"
          >
            {intl.formatMessage({ id: "Ending" })}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TerminateCasePopup;
