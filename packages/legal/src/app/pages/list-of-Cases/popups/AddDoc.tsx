import React,{useState,useEffect} from "react";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { useIntl } from "react-intl";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useViewTransitionState } from "react-router-dom";
import { useForm } from "react-hook-form";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { fetchAllLkAttachmentSources } from "../../../features/attachment-source";

type AddDocPopupProps = {
  show?: any;
  handleClose?: any;
  title?: any;
  type?: string;
};

const AddDocPopup: React.FC<AddDocPopupProps> = ({
  show,
  handleClose,
  title,
  type
}) => {
  const intl = useIntl();
  let language = intl.locale;
  let dispatch = useDispatch();

  let lkAttachmentSources = useSelector((state: RootState) => {
    return state?.attachmentSource?.lkAttachmentSources;
  });
  console.log("lkAttachmentSources", lkAttachmentSources);
   const [attachments, setAttachments] = useState<
      { fileAsBinary: File; fileAsBase64: string; id: string }[]
    >([]);
    let [selectedLKSource, setSelectedLKSource] = useState<any>({});
  
  const showSuccessAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "SavedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  const sessions = ["Court", "Opponents", "Principals"];
  let theme = localStorage.getItem("Theme");
  useEffect(() => {
    dispatch(
      fetchAllLkAttachmentSources({
        pageSize: "10000",
      }) as any
    );
  }, []);
  const litigationData = [
    {
      id: 0,
      name: "دعوى #5",
    },
    {
      id: 1,
      name: "دعوى #6",
    },
    {
      id: 2,
      name: "دعوى #7",
    },
    {
      id: 3,
      name: "دعوى #8",
    },
  ];
    const {
      handleSubmit,
      trigger,
      watch,
      setValue,
      formState: { errors },
    } = useForm<any>({
     
      mode: "all",
      reValidateMode: "onSubmit",
    });
      useEffect(() => {
        setValue(
          "attachments",
          attachments?.map((attachment) => {
            return attachment?.fileAsBinary;
          })
        );
        if (attachments?.length) {
          trigger("attachments");
        }
      }, [attachments]);
  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-center"
        centered
        show={show}
        className={!show ? "inert" : ""}
        onHide={handleClose}
      >
        <div className="card w-600px">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale === "ar" ? "flex-start" : "center",
              flexDirection: intl.locale === "en" ? "column-reverse" : "row",
            }}
          >
            <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0">
              <Modal.Title>
                <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                  <span className="card-label fs-4 my-5 fw-bolder">
                    {intl.formatMessage({
                      id: "Add",
                    })}{" "}
                    {intl.formatMessage({
                      id: "Doc",
                    })}
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            <form noValidate className="form outputForm">
              <div className="row">
                <h5 className="mb-5 mx-1 mt-2">
                  {intl.formatMessage({
                    id: "Documents",
                  })}
                </h5>

                <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-80px">
                  <label
                    htmlFor="outputAttachment"
                    className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
                  >
                    <div role="button" className="d-flex align-items-center">
                      <div className="py-auto ps-3">
                        <i className="fa-solid fa-link fs-1 text-primary"></i>
                      </div>
                      <div className="row py-auto">
                        <span className="text-primary fw-bolder">
                          {intl.formatMessage({
                            id: "DragAndDropOrChooseFilesFromComputer",
                          })}
                        </span>
                        <span className="pt-3 pb-2">
                          {" "}
                          {intl.formatMessage({
                            id: "SupportFollowingFormats",
                          })}{" "}
                          pdf , png , jpeg
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
            </form>
            <Row className="mt-4">
              {type === "case" && (<>
                <Col xs={12} md={12} className="mb-5">
                  <div className="mb-3">
                    <label className="mb-2 required">
                      {intl.formatMessage({ id: "LitigationLevel" })}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                    />
                  </div>
                </Col>

                <Col xs={12} md={12} className="mb-5">
                  <div className="mb-3">
                    <label className="mb-2 required">
                      {intl.formatMessage({ id: "Session" })}
                    </label>
                    <select
                      // value={selectedLitigation}
                      // onChange={(e) => setSelectedLitigation(e.target.value)}
                      className="form-select"
                    >
                      <option value="" disabled>
                        إختر الجلسة
                      </option>
                      {litigationData?.map((item: any, index: number) => (
                        <option value={item?.id} key={index}>
                          {intl.formatMessage({ id: "Session" }) + (index + 1) + "#"}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
              </>)}

              <Col xs={12} md={12} lg={12} className="mt-5 mb-lg-0">
                  <h5 className="mb-5 mx-1 mt-2 required">
                    {intl.formatMessage({
                      id: "Sources",
                    })}
                  </h5>
                  <div
                    className={`d-flex  bg-${
                      theme == "dark" ? "light" : "white"
                    } p-3 rounded border flex-wrap  searchBorder align-items-center`}
                  >
                    {lkAttachmentSources?.map((lkAttachmentSource, index) => (
                      <div
                        key={lkAttachmentSource?.id}
                        className="form-check d-flex align-items-center me-1 mb-3"
                      >
                        <input
                          type="radio"
                          onChange={() => {
                            setSelectedLKSource(lkAttachmentSource?.id);
                            setValue(
                              "lK_AttachmentSourceId",
                              lkAttachmentSource?.id
                            );
                            trigger("lK_AttachmentSourceId");
                          }}
                          id={`lkAttachmentSource-${lkAttachmentSource?.id}`}
                          name="lkAttachmentSource"
                          className="form-check-input me-2"
                        />
                        <label
                          htmlFor={`lkAttachmentSource-${lkAttachmentSource?.id}`}
                          className="form-check-label"
                        >
                          {intl.locale == "ar"
                            ? lkAttachmentSource?.nameAr
                            : lkAttachmentSource?.nameEn}
                        </label>
                      </div>
                    ))}
                  </div>
                  {DisplayErrorMessage(
                    errors?.lK_AttachmentSourceId?.message,
                    intl,
                    language
                  )}
                </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="justify-content-center py-2">
            <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
              <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                <div className="d-flex gap-3 justify-content-center align-items-center w-50">
                  <div
                    data-bs-dismiss="modal"
                    className="btn btn-secondary text-center px-15"
                    onClick={handleClose}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </div>
                  <div
                    onClick={() => {
                      handleClose();
                      showSuccessAlert();
                    }}
                    className="btn btn-success text-center px-15"
                  >
                    {intl.formatMessage({ id: "Agree" })}
                  </div>
                  
                </div>
              </div>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default AddDocPopup;
