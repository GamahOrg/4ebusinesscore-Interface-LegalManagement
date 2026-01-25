import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { showAlert } from "@4eplatform/shared/services/showAlert";

type PopupProps = {
  show: boolean;
  handleClose: () => void;
};

const DiscountPopup: React.FC<PopupProps> = ({ show, handleClose }) => {
  const intl = useIntl();
  const [selectedValues, setSelectedValues] = useState<any>({});
  const [modalShow, setModalShow] = useState<boolean>(false);

  const { control } = useForm<any>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const options = [
    { value: "عماد الدين فيصل", label: "عماد الدين فيصل" },
    { value: "عبدلله فهد", label: "عبدلله فهد" },
    { value: "فارس الشهري", label: "فارس الشهري" },
  ];

  const handleSubmit = () => {
    showAlert(true, "AddedSuccessfully", intl);
    setSelectedValues({});
    handleClose();
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
      className={!show ? "inert" : ""}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h2>{intl.formatMessage({ id: "AddOpponents" })}</h2>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-10 py-4">
          <div className="mb-3">
            <label className="form-label mb-3 required">
              {intl.formatMessage({ id: "Adversaries" })}
            </label>
            <Controller
              name="userId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  id="ClientName"
                  className="react-select__container w-50"
                  classNamePrefix="react-select"
                  placeholder={intl.formatMessage({
                    id: "ChooseRivals",
                  })}
                  options={options}
                  isClearable={true}
                  isMulti={true}
                  onChange={(selectedOptions) => {
                    setSelectedValues(selectedOptions);
                    field.onChange(
                      selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : []
                    );
                  }}
                  value={options.find((option) => option.value === field.value)}
                  noOptionsMessage={() =>
                    intl.formatMessage({
                      id: "NotAvailableUserName",
                    })
                  }
                />
              )}
            />
          </div>
          <div className="my-5">
            <div className="d-flex align-items-center mb-2">
              <label className="form-label mb-1 text-gray-600">
                {intl.formatMessage({ id: "Adversaries" })}
              </label>
            </div>
            {/* <div className="main-container-followLawsuits2 m-0 p-7 bg-fix-dark"> */}
            <div className="main-container-followLawsuits2 m-0 p-7 bg-fix-dark">
              {selectedValues &&
                Array.isArray(selectedValues) &&
                selectedValues?.map((option) => (
                  <div
                    key={option?.label}
                    className="mb-6 row align-items-center"
                  >
                    <div className="col-3 p-0">
                      <h5>{option?.value}</h5>
                    </div>
                    <div className="col-8">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fas fa-user-slash"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder={intl.formatMessage({
                            id: "EnterTheReasonForTheComplaint",
                          })}
                          className="form-control"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div
                      className="col-1 text-danger cursor-pointer"
                      onClick={() => setModalShow(true)}
                    >
                      <i className="special far fa-trash-alt"></i>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-end px-5 pb-6">
          <Button
            variant="secondary"
            className="px-15"
            onClick={() => {
              handleClose();
              setSelectedValues({});
            }}
          >
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button variant="success" className="px-15" onClick={handleSubmit}>
            {intl.formatMessage({ id: "Add" })}
          </Button>
        </Modal.Footer>
      </div>
      <div className="modal fade">
        <DeletePopup
          showDelete={modalShow}
          handleCloseDelete={() => {
            setModalShow(false);
          }}
        />
      </div>
    </Modal>
  );
};

export default DiscountPopup;
