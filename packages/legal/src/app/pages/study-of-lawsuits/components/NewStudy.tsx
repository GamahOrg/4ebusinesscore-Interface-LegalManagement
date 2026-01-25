import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import  { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useIntl } from "react-intl";
import { ShowMore } from "../popup/ShowMore";
import EditNote from "../popup/EditNote";

export const NewStudy = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [showModel, setShowModel] = useState(false);
  let selectedLang = localStorage.getItem("i18nConfig");
  try {
    selectedLang = JSON.parse(selectedLang as string).selectedLang;
  } catch (err) {}

  const study = {
    id: 2541851,
    info: `الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى علي الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه الموضوع: مذكرة رد على الدعوى العمالية المقدمة من المدعي (اسم المدعي) ضد المدعى عليه اسم المدعى عليه`,
    created_at: "2022-01-01",
    status: "UnderSettlement",
  };

  const intl = useIntl();
  return (
    <Accordion defaultActiveKey={`1`}>
      <Accordion.Item
        eventKey={`1`}
        className={`standards-accordion-button border-primary border-4 border-bottom-0 border-top-0 mt-5 ${
          selectedLang === "en" ? "border-right-0" : "border-left-0"
        } dark-bg-color`}
        key={1}
      >
        <Accordion.Header
          className={`border-${
            selectedLang === "en" ? "start" : "end"
          } d-flex  bg-transparent  align-items-center justify-content-between`}
        >
          <span className="text-primary h3 fw-bolder d-flex align-items-center">
            <i
              className={`fa-solid fa-angle-${
                selectedLang === "en" ? "right" : "left"
              } fs-2x mx-2`}
            ></i>
            <div className="black-text fs-5 d-flex align-items-center">
              <p className="text-gray-500 mt-2 fs-6">
                {intl.formatMessage({ id: "NoteCreator" })}
              </p>
              <span className="mx-2 fs-6">:</span>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="32"
                  height="32"
                  rx="16"
                  fill="#009EF7"
                  fillOpacity="0.1"
                />
                <path
                  d="M15.9999 6C13.3799 6 11.2499 8.13 11.2499 10.75C11.2499 13.32 13.2599 15.4 15.8799 15.49C15.9599 15.48 16.0399 15.48 16.0999 15.49C16.1199 15.49 16.1299 15.49 16.1499 15.49C16.1599 15.49 16.1599 15.49 16.1699 15.49C18.7299 15.4 20.7399 13.32 20.7499 10.75C20.7499 8.13 18.6199 6 15.9999 6Z"
                  fill="#009EF7"
                />
                <path
                  d="M21.08 18.1499C18.29 16.2899 13.74 16.2899 10.93 18.1499C9.65996 18.9999 8.95996 20.1499 8.95996 21.3799C8.95996 22.6099 9.65996 23.7499 10.92 24.5899C12.32 25.5299 14.16 25.9999 16 25.9999C17.84 25.9999 19.68 25.5299 21.08 24.5899C22.34 23.7399 23.04 22.5999 23.04 21.3599C23.03 20.1299 22.34 18.9899 21.08 18.1499Z"
                  fill="#009EF7"
                />
              </svg>
              <h3 className="lawsuit-text-left me-3 fs-6">
                {intl.formatMessage({ id: "FahdAbdullah" })}
              </h3>
            </div>
          </span>
          <div className="black-text fs-6 d-flex align-items-center">
            <p className="text-gray-500 mt-2 fs-6">
              {intl.formatMessage({ id: "AddedDate" })}
            </p>
            <span className="mx-2">:</span>
            <h3 className="lawsuit-text-left me-3 fs-6">23 أغسطس 2024</h3>
          </div>
          <div>
            <i
              className={`fa-solid fa-trash fs-5 mx-2 cursor-pointer text-danger`}
              onClick={() => setShowDelete(true)}
            ></i>
            <i
              className={`fa-solid fa-pen fs-5 mx-2 cursor-pointer text-primary`}
              onClick={() => setShowEditModel(true)}
            ></i>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <>
            <div className="toggle-content mt-3  pt-5">
              <div className="mt-8 mb-3">
                <p>
                  {intl.formatMessage({
                    id: "HonorableJudge/RespectedHeadoftheLaborAuthority",
                  })}
                </p>
                <p>
                  {intl.formatMessage({
                    id: "Maythepeace,mercy,andblessingsofGodbeuponyou.",
                  })}
                </p>

                <div className="d-flex ">
                  {" "}
                  <p className="mx-2 text-dark fw-bold">
                    {study?.info?.slice(0, 200)}

                    {study?.info?.length > 200 && (
                      <span
                        className="mx-2 text-primary fw-bold cursor-pointer"
                        onClick={() => setShowModel(true)}
                      >
                        {intl.formatMessage({ id: "ReadMore" })}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <DeletePopup
              showDelete={showDelete}
              handleCloseDelete={() => setShowDelete(false)}
            />
            {showModel && (
              <div className="modal fade" aria-hidden="true">
                <ShowMore
                  show={showModel}
                  handleClose={() => setShowModel(false)}
                  data={study?.info}
                />
              </div>
            )}
            {showEditModel && (
              <div className="modal fade" aria-hidden="true">
                <EditNote
                  editNoteModal={showEditModel}
                  setEditNoteModal={() => setShowEditModel(false)}
                />
              </div>
            )}
          </>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
