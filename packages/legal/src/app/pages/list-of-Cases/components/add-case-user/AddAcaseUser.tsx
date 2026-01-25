import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import AddAcaseHome from "./AddAcaseHome";
function AddAcaseUser() {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "ListOfCases", value: "/cases-view" },
          { key: "AddCase", value: "" },
        ]}
      />
      <AddAcaseHome />
    </>
  );
}

export default AddAcaseUser;
