import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import AddDocPopup from "../../list-of-cases/popups/AddDoc";

function SessionDocs() {
  let intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);
  const [addShowDoc, setAddShowDoc] = useState(false);

  let [data, setData] = useState([
    {
      id: "1234",
      source: intl.formatMessage({ id: "Principals" }),
      documents: [
        {
          id: "1233434334343",
          name: "المستند الاول",
        },
        {
          id: "12334343213232",
          name: "المستند الاول",
        },
        {
          id: "1233434311111111",
          name: "المستند الاول",
        },
      ],
    },
    {
      id: "1234345454",
      source: intl.formatMessage({ id: "Opponents" }),
      documents: [
        {
          id: "1235555",
          name: "المستند الاول",
        },
      ],
    },
    {
      id: "12323232545454",
      source: intl.formatMessage({ id: "Court" }),
      documents: [
        {
          id: "123556565",
          name: "المستند الاول",
        },
      ],
    },
  ]);
  let theme = localStorage.getItem("Theme");

  return (
    <Fragment>
      <div className="rounded me-1 ms-3 mt-5">
        <div
          className={`main-container-followLawsuits mx-auto p-7 bg-${
            theme == "dark" ? "light" : "white"
          }`}
        >
          <h4
            className={`main-title-lawsuit text-${
              theme == "dark" ? "white" : "black"
            }`}
          >
            {intl.formatMessage({ id: "SessionDocs" })}
          </h4>

          <div>
            {data.map((source) => (
              <div
                key={source.id}
                className={`mb-4 border rounded p-3 bg-${
                  theme == "dark" ? "light" : "white"
                }`}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="text-end">
                    <span className="fw-bold">
                      {intl.formatMessage({ id: "Source" })}:
                    </span>{" "}
                    {source.source}
                  </h5>
                  <button
                    onClick={() => {
                      setAddShowDoc(true);
                    }}
                    className="w-40px h-40px border-radius-50 border-none bg-primary fs-3 d-flex align-items-center justify-content-center text-white"
                  >
                    +
                  </button>
                </div>
                {source?.documents.map((doc, index) => (
                  <div
                    key={doc.id}
                    className="d-flex align-items-center justify-content-between mb-2"
                  >
                    <div className="d-flex align-items-center justify-content-between border rounded p-2 w-90 bg-gray-100">
                      <span>
                        {index + 1}# {doc.name}
                      </span>
                      <i className="fa-solid fa-download text-primary cursor-pointer"></i>
                    </div>

                    <i
                      className="fa-solid fa-trash mx-3 text-danger fs-4 cursor-pointer"
                      onClick={() => {
                        setShowDelete(true);
                      }}
                    ></i>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {addShowDoc && (
        <AddDocPopup
          show={addShowDoc}
          handleClose={() => setAddShowDoc(false)}
        />
      )}
      {showDelete && (
        <DeletePopup
          showDelete={showDelete}
          handleCloseDelete={() => setShowDelete(false)}
        />
      )}
    </Fragment>
  );
}

export default SessionDocs;
