import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { useState, useEffect, lazy } from "react";
import { useIntl } from "react-intl";
const LitigationManagementView = lazy(
  () => import("./components/LitigationManagmentView")
);
const AddLitigationPopup = lazy(() => import("./popups/AddLitigationPopup"));

function LitigationManagement() {
  const intl = useIntl();
  const [addLitigationModal, setAddLitigationModal] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [selectedDegree, setSelectedDegree] = useState<any>(null);

  return (
    <>
      <div
        id="kt_toolbar_container"
        className="container d-flex flex-stack flex-wrap p-0"
      >
        <div className="">
          <GenericToolbar
            list={[
              { key: "LitigationManagement", value: "/litigation-management" },
            ]}
          />
        </div>
        <div className="">
          <div className="d-flex justify-content-sm-end align-items-center flex-wrap">
            <button
              onClick={() => {
                setAddLitigationModal(true);
              }}
              className="btn btn-light text-gray-800 mb-sm-0 mb-3"
            >
              {intl.formatMessage({ id: "AddLawsuit" })}
            </button>
          </div>
        </div>
      </div>
      <LitigationManagementView
        {...{
          pageIndex,
          setPageIndex,
          pageSize,
          setPageSize,
          searchTerm,
          setSearchTerm,
          selectedCase,
          setSelectedCase,
          selectedDegree,
          setSelectedDegree,
        }}
      />
      <AddLitigationPopup
        show={addLitigationModal}
        handleClose={() => setAddLitigationModal(false)}
        {...{
          pageIndex,
          pageSize,
          searchTerm,
          selectedCase,
          selectedDegree,
        }}
        selectedCause={selectedCase}
      />
    </>
  );
}

export default LitigationManagement;
