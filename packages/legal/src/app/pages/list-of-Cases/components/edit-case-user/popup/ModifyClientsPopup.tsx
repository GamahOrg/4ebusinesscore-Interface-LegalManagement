import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddClientValidationSchema } from "../../../../client-management/validations/AddClientValidationSchema";
import { searchSelectStylesModeStyles } from "@4eplatform/shared/functions/searchSelectStylesModeStyles";
import AddClientsPopup from "../../add-case-user/popup/AddClientsPopup";

type PopupProps = {
  show?: boolean;
  handleClose: () => void;
};

const ModifyClientsPopup: React.FC<PopupProps> = ({
  show = false,
  handleClose,
}) => {
  const intl = useIntl();
  const [showNewClientPopup, setShowNewClientPopup] = useState(false);
  let darkMode = localStorage.getItem("Theme") == "dark" ? true : false;
  const showAddedSuccessfully = () => {
    showAlert(true, "AddedSuccessfully", intl, () => {
      handleClose();
    });
  };
  const handleSubmit = () => {
    showAddedSuccessfully();
  };

  const {
    control,
    register,
    // handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: yupResolver(AddClientValidationSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const options = [
    { value: "عماد الدين فيصل", label: "عماد الدين فيصل" },
    { value: "عبدلله فهد", label: "عبدلله فهد" },
    { value: "فارس الشهري", label: "فارس الشهري" },
  ];

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
      className={!show ? "inert" : ""}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h1>{intl.formatMessage({ id: "EditClient" })}</h1>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-5 py-4">
          <div className="mb-4 mt-3">
            <div className="d-flex align-items-center mb-2">
              <label className="form-label me-2 required">
                {intl.formatMessage({ id: "ClientName" })}
              </label>
            </div>
            <Controller
              name="userId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  id="ClientName"
                  className="react-select__container bg-light"
                  classNamePrefix="react-select"
                  placeholder={intl.formatMessage({
                    id: "SelectClientName",
                  })}
                  options={options}
                  isClearable={true}
                  isMulti={true}
                  styles={searchSelectStylesModeStyles(darkMode)}
                  onChange={(selectedOptions) => {
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
          <div className="my-4 pt-2">
            <div
              className="w-100 bg-light-primary text-primary p-3 text-center border border-primary cursor-pointer rounded-2"
              onClick={() => {
                setShowNewClientPopup(true);
              }}
            >
              {intl.formatMessage({ id: "CreateNew" })}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-end px-5 pb-6">
          <Button variant="secondary" className="px-15" onClick={handleClose}>
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button variant="success" className="px-15" onClick={handleSubmit}>
            {intl.formatMessage({ id: "Add" })}
          </Button>
        </Modal.Footer>
      </div>
      <div className="modal fade">
        <AddClientsPopup
          show={showNewClientPopup}
          handleCloseNewClient={() => setShowNewClientPopup(false)}
        />

        <Modal.Footer className="d-flex justify-content-center px-5 pb-4">
          <Button variant="secondary" className="me-3" onClick={handleClose}>
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {intl.formatMessage({ id: "Edit" })}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ModifyClientsPopup;
