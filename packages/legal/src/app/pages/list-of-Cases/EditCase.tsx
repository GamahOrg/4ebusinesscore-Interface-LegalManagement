import React from "react";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import EditCaseTabs from "./components/edit-case/EditCaseTabs";

function EditCase() {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "ListOfCases", value: "/cases-view" },
          { key: "EditCase", value: "" },
        ]}
      />
      {/* <RightToolbar /> */}
      <EditCaseTabs />
    </>
  );
}

export default EditCase;
