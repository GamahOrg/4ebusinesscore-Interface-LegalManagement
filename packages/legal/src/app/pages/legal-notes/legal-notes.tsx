import { FC, useState } from "react";
import LegalNotesContent from "./components/LegalNotesContent";
import { useIntl } from "react-intl";
import AddNotePopup from "./popups/AddNotePopup";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";

const LegalNotes: FC = () => {
  let intl = useIntl();
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);
  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let cardId = location?.state?.cardId;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "LitigationNotes",
      name: cardName || serviceName,
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState<any>("");
  const [selectedDegree, setSelectedDegree] = useState<any>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);

  return (
    <>
      <div className="toolbar" id="kt_toolbar">
        <div
          id="kt_toolbar_container"
          className="container-xxl d-flex flex-stack flex-wrap p-0"
        >
          <DynamicToolbar
            defaultTitle={"LitigationNotes"}
            extraTitle={""}
            breadcrumbItems={breadcrumbItems}
            showWorkspace={true}
            cardId={cardId}
            cardOption={cardName || serviceName}
            extraState={partTitle}
          />
          <div>
            <button
              onClick={() => {
                setShowAddNotePopup(true);
              }}
              className="btn bg-body btn-active-color-primary d-flex align-items-center btn btn-flex fw-bolder w-fit-content"
            >
              {intl.formatMessage({ id: "AddANote" })}
            </button>
          </div>
        </div>
      </div>
      <LegalNotesContent
        {...{
          pageIndex,
          setPageIndex,
          pageSize,
          setPageSize,
          selectedDegree,
          selectedCase,
          setSelectedCase,
          setSelectedDegree,
          searchTerm,
          setSearchTerm,
        }}
      />

      <div className="modal fade">
        <AddNotePopup
          handleClose={() => setShowAddNotePopup(false)}
          show={showAddNotePopup}
          {...{
            pageIndex,
            pageSize,
            selectedDegree,
            selectedCase,
            searchTerm,
          }}
        />
      </div>
    </>
  );
};

export default LegalNotes;
