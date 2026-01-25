import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import EditACaseHome from "./EditACaseHome";

function EditAcaseUser() {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "ListOfCases", value: "/cases-view" },
          { key: "ModifyACase", value: "" },
        ]}
      />
      <EditACaseHome />
    </>
  );
}

export default EditAcaseUser;
