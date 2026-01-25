import { useEffect } from "react";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import LawyersManagementTable from "./components/lawyers-management-table";
import { useIntl } from "react-intl";
import { useState } from "react";
import AddLayerManagmentPopup from "./popups/add-layer-managment-popup";

function LawyersManagment() {
  const intl = useIntl();
  const [modalAccept, setModalAccept] = useState<boolean>(false);
  const [btnClass, setBtnClass] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setBtnClass("btn-sm");
      } else if (window.innerWidth <= 768) {
        setBtnClass("btn-lg");
      } else {
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return (
    <>
      <div>
        <div className="d-md-flex justify-content-between">
          <GenericToolbar list={[{ key: "LawyersManagement", value: "" }]} />
          <div className=" d-flex justify-content-md-end align-items-center flex-wrap">
            <button
              className={`btn btn-light ${btnClass}`}
              onClick={() => setModalAccept(true)}
            >
              {/* <i
                  className="fa-solid fa-plus me-2 fs-4 "
                  style={{ color: "#ffffff" }}
                ></i> */}
              {intl.formatMessage({ id: "AddLawyer" })}
            </button>
          </div>
        </div>

        <LawyersManagementTable />
      </div>

      {modalAccept ? (
        <>
          <AddLayerManagmentPopup
            handleCloseAdd={() => setModalAccept(false)}
            showAdd={modalAccept}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default LawyersManagment;
