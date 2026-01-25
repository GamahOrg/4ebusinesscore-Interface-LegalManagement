import { useState } from "react";
import { useIntl } from "react-intl";
import { Button } from "react-bootstrap";
import ClientsSection from "./ClientsSection";
import CaseSection from "./CaseSection";
import { EditPopup } from "@4eplatform/shared/src/popups/EditPopup";

export default function EditACaseHome() {
  const intl = useIntl();
  const [edit, setEdit] = useState(false);
  return (
    <>
      <div className="card card-xl-stretch mb-xl-8">
        <CaseSection />
        <ClientsSection />
        <div className="d-flex justify-content-end px-5 pb-4 mb-10 mx-5 mt-3 add-edit-case-bottom">
          <Button variant="secondary" className="me-3">
            {intl.formatMessage({ id: "Drafts" })}
          </Button>
          <Button variant="primary" onClick={() => setEdit(true)}>
            {intl.formatMessage({ id: "Edit" })}
          </Button>
        </div>
      </div>
      <div className="modal fade" id="Rega_modal_add">
        <EditPopup showEdit={edit} handleCloseEdit={() => setEdit(false)} />
      </div>
    </>
  );
}
