import { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";

function RequestsOfBothPartiesToeDisputeForSession({
  clientRequests,
  setClientRequests,
  setLiabilityRequests,
  liabilityRequests,
}: any) {
  let intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);

  let [clientRequest, setClientRequest] = useState("");
  let [libailityRequest, setLiabilityRequest] = useState("");
  let addClientRequest = () => {
    if (clientRequest) {
      setClientRequests((prev: any) => {
        return [...prev, { id: Math.random(), value: clientRequest }];
      });
      setClientRequest("");
    }
  };
  let addLiabilityRequest = () => {
    if (libailityRequest) {
      setLiabilityRequests((prev: any) => {
        return [...prev, { id: Math.random(), value: libailityRequest }];
      });
      setLiabilityRequest("");
    }
  };
  let [type, setType] = useState("");
  let [selectedId, setSelectedId] = useState("");

  let handleDelete = (id: any, type: string) => {
    if (type == "clientRequests") {
      setClientRequests((prev: any) => {
        return prev?.filter((request: any) => {
          return request?.id != id;
        });
      });
    } else if (type == "liabilityRequests") {
      setLiabilityRequests((prev: any) => {
        return prev?.filter((request: any) => {
          return request?.id != id;
        });
      });
    }
  };
  let theme = localStorage.getItem("Theme");
  return (
    <>
      <div className="rounded mt-5">
        <div
          className={`main-container-followLawsuits p-7 bg-${
            theme == "dark" ? "light" : ""
          }`}
        >
          <h4
            className={`main-title-lawsuit text-${
              theme == "dark" ? "white" : "black"
            }`}
          >
            {intl.formatMessage({ id: "ClientRequests" })}
          </h4>
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <input
                id="clientRequest"
                type="text"
                value={clientRequest}
                onChange={(e) => {
                  setClientRequest(e?.target?.value);
                }}
                className="form-control"
                placeholder={intl.formatMessage({ id: "EnterRequests" })}
              />
              <button
                onClick={() => {
                  addClientRequest();
                }}
                className="w-40px h-40px fs-3 d-flex align-items-center justify-content-center btn btn-primary"
                style={{ borderRadius: "5px" }}
              >
                +
              </button>
            </div>
            <div className="mt-4">
              {clientRequests?.map((request: any, index: number) => {
                return (
                  <Fragment key={request?.id}>
                    <div className="d-flex mt-2 align-items-center justify-content-between">
                      <div className="w-50 d-flex">
                        <span className="mx-2">{index + 1} : </span>
                        <span>{request?.value}</span>
                      </div>
                      <i
                        className="fa-solid fa-trash mx-3 text-danger fs-4 cursor-pointer"
                        onClick={() => {
                          setShowDelete(true);
                          setType("liabilityRequests");
                          setSelectedId(request?.id);
                        }}
                      ></i>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded mt-5">
        <div
          className={`main-container-followLawsuits p-7 bg-${
            theme == "dark" ? "light" : ""
          }`}
        >
          <h4
            className={`main-title-lawsuit text-${
              theme == "dark" ? "white" : "black"
            }`}
          >
            {intl.formatMessage({ id: "LiabilityRequests" })}
          </h4>
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <input
                id="liabilityRequest"
                type="text"
                value={libailityRequest}
                onChange={(e) => {
                  setLiabilityRequest(e?.target?.value);
                }}
                className="form-control"
                placeholder={intl.formatMessage({ id: "EnterRequests" })}
              />
              <button
                onClick={() => {
                  addLiabilityRequest();
                }}
                className="w-40px h-40px  fs-3 d-flex align-items-center justify-content-center btn btn-primary"
                style={{ borderRadius: "5px" }}
              >
                +
              </button>
            </div>
            <div className="mt-4">
              {liabilityRequests?.map((request: any, index: number) => {
                return (
                  <Fragment key={request?.id}>
                    <div className="d-flex mt-2 align-items-center justify-content-between">
                      <div className="w-50 d-flex">
                        <span className="mx-2">{index + 1} : </span>
                        <span>{request?.value}</span>
                      </div>
                      <i
                        className="fa-solid fa-trash mx-3 text-danger fs-4 cursor-pointer"
                        onClick={() => {
                          setShowDelete(true);
                          setType("liabilityRequests");
                          setSelectedId(request?.id);
                        }}
                      ></i>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {showDelete && (
        <DeletePopup
          showDelete={showDelete}
          handleCloseDelete={() => setShowDelete(false)}
          handleDelete={() => {
            handleDelete(selectedId, type);
          }}
        />
      )}
    </>
  );
}

export default RequestsOfBothPartiesToeDisputeForSession;
