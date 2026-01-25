import { SavePopup } from "@4eplatform/shared/src/popups/SavePopup";
import { SendPopup } from "@4eplatform/shared/src/popups/SendPopup";
import { useState } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
const AddStudyClaimsForm = () => {
  const intl = useIntl();
  const [modalAhow, setModalAhow] = useState<boolean>(false);
  const [modalSendhow, setModalSendhow] = useState<boolean>(false);
  const navigate = useNavigate();
  const dropdownOptions2 = [
    intl.formatMessage({ id: "NationalIdentity" }),
    intl.formatMessage({ id: "ResidentID" }),
    intl.formatMessage({ id: "LicenseNumber" }),
    intl.formatMessage({ id: "CommercialRegister" }),
    intl.formatMessage({ id: "UnifiedNumber" }),
  ];

  const [selectedOption, setSelectedOption] = useState(dropdownOptions2[0]);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const handleDropdownChange = (e:any) => {
    setSelectedOption(e.target.value);
    setInputValue1("");
    setInputValue2("");
  };

  const getFirstInputLabel = () => {
    if (
      selectedOption === intl.formatMessage({ id: "Nationaldentity" }) ||
      selectedOption === intl.formatMessage({ id: "UnifiedNumber" })
    ) {
      return selectedOption;
    }
    return `${selectedOption}`;
  };

  const getSecondInputLabel = () => {
    if (
      selectedOption === intl.formatMessage({ id: "NationalIdentity" }) ||
      selectedOption === intl.formatMessage({ id: "ResidentID" })
    ) {
      return "أسم المدعي علية";
    }
    if (selectedOption === intl.formatMessage({ id: "LicenseNumber" })) {
      return "اسم الجمعية / المؤسسية";
    }
    if (
      selectedOption === intl.formatMessage({ id: "CommercialRegister" }) ||
      selectedOption === intl.formatMessage({ id: "UnifiedNumber" })
    ) {
      return "اسم الشركة";
    }
    return "";
  };

  return (
    <div
      id="kt_content_container"
      className="d-flex flex-column-fluid align-items-start container-xxl p-0"
    >
      <div className="content flex-row-fluid" id="kt_content">
        <div
          className="flex-lg-row-fluid"
          data-select2-id="select2-data-129-tmo1"
        >
          <div className="card mb-5 mb-xl-8">
            <div className="card-body py-3">
              <h2 className="text-dark mb-3 fs-2 mt-10">
                {intl.formatMessage({ id: "AddStudy" })}
              </h2>
              <span className="text-muted fs-6">
                {intl.formatMessage({
                  id: "EnterTheFollowingInformationToAddAStudy",
                })}
              </span>
              <hr className="border-gray-300 opacity-25" />
              <div className="row gy-5 pb-4 mt-3">
                <div className="col-md-6 col-12">
                  <div>
                    <label
                      htmlFor="Owner"
                      className="form-label mx-2 px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "StudyClaimNumber" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-file fs-5"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="Owner"
                        id="Owner"
                        placeholder={intl.formatMessage({
                          id: "StudyClaimNumber",
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div>
                    <label
                      htmlFor="From"
                      className="form-label mx-2 px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "StudyClaimDate" })}
                    </label>

                    <input
                      type="date"
                      className="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div className="bg-light p-10 mb-9 pb-5 rounded">
      {/* Defendant Header */}
      <div className="mb-8 me-3">
        <h3 className="fst-normal">{intl.formatMessage({ id: "Defendant" })}</h3>
      </div>

      {/* Dropdown for Defendant's ID Type */}
      <div className="row">
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="dropdownSelect" className="form-label">
              {intl.formatMessage({ id: "Defendant'sIDType" })}
            </label>
            <select
              id="dropdownSelect"
              className="form-select"
              value={selectedOption}
              onChange={handleDropdownChange}
            >
              {dropdownOptions2.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Conditional Input Fields */}
        {selectedOption && (
          <div className="col-md-8">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="inputField1" className="form-label">
                    {getFirstInputLabel()}
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-pencil"></i>
                    </span>
                    <input
                      id="inputField1"
                      type="text"
                      className="form-control bg-white"
                      value={inputValue1}
                      onChange={(e) => setInputValue1(e.target.value)}
                      placeholder={getFirstInputLabel()}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="inputField2" className="form-label">
                    {getSecondInputLabel()}
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-file-earmark-text"></i>
                    </span>
                    <input
                      id="inputField2"
                      type="text"
                      className="form-control bg-white"
                      value={inputValue2}
                      onChange={(e) => setInputValue2(e.target.value)}
                      placeholder={getSecondInputLabel()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Email Input Field */}
      <div className="col-md-12 mt-5">
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            {intl.formatMessage({ id: "Email" })}
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-envelope"></i>
            </span>
            <input
              id="emailInput"
              type="email"
              className="form-control bg-white"
              placeholder={intl.formatMessage({ id: "Email" })}
            />
          </div>
        </div>
      </div>
    </div>
                <div className="col-12">
                  <div>
                    <label
                      htmlFor="From"
                      className="form-label mx-2 px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "StudyClaimInfo" })}
                    </label>

                    <textarea
                      rows={3}
                      className="form-control form-control-solid d-flex"
                      placeholder={intl.formatMessage({
                        id: "StudyClaimInfo",
                      })}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <label className="form-label px-2  fontSz-6">
                    {intl.formatMessage({ id: "ATTACHMENTS" })}
                  </label>
                  <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-80px">
                    <label
                      htmlFor="outputAttachment"
                      className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
                    >
                      <div role="button" className="d-flex align-items-center">
                        <div className="py-auto ps-3">
                          <img
                            style={{ width: "25px" }}
                            src="/media/extensions/uploadFile.webp"
                            className="img-fluid"
                            alt="uploadFile.png"
                          />
                        </div>
                        <div className="row py-auto">
                          <span className="text-primary fw-bolder">
                            {intl.formatMessage({ id: "QuickFileUploader" })}
                          </span>
                          <span>
                            {" "}
                            {intl.formatMessage({
                              id: "DragAndDropOrChooseFilesFromComputer",
                            })}
                          </span>
                        </div>
                      </div>
                    </label>
                    <div
                      className="dropzone dropzone-queue "
                      id="kt_dropzonejs_example_3"
                    >
                      <div className="dropzone-panel">
                        <input
                          multiple
                          type="file"
                          accept="image/*"
                          id="outputAttachment"
                          name="attachments"
                          placeholder={intl.formatMessage({ id: "FileUpload" })}
                          className="dropzone-select  uploadFile-style inputAreaHeight d-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-10 gap-5 mb-10">
                <Link to="/study-of-lawsuits">
                  <div className="btn btn-secondary mx-1 text-center w-100">
                    {intl.formatMessage({ id: "Cancel" })}
                  </div>
                </Link>
                <button
                  type="button"
                  className="btn btn-primary mx-1 text-center w-150px"
                  style={{ border: "none" }}
                  onClick={() => navigate("/study-of-lawsuits")}                >
                  {intl.formatMessage({ id: "Save" })}
                </button>
                <Link to="/study-of-lawsuits" style={{ textDecoration: "none" }}>
                  <button
                    type="button"
                    className="btn btn-success mx-1 text-center w-150px"
                    style={{ border: "none" }}
                  >
                    {intl.formatMessage({ id: "Send" })}
                  </button>
                </Link>
              </div>
              <div
                className="modal fade"
                id="Rega_modal_add"
              >
                <SavePopup
                  show={modalAhow}
                  handleClose={() => setModalAhow(false)}
                />
              </div>
              <div
                className="modal fade"
                id="Rega_modal_add"
              >
                <SendPopup
                  show={modalSendhow}
                  handleClose={() => setModalSendhow(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudyClaimsForm;
