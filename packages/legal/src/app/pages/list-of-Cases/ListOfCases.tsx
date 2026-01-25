import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import ListOfCase from "./components/ListOfCase";
import { useLocation } from "react-router-dom";

function ListOfCases() {
  const location = useLocation();
  const specificClaim = location.state?.specificClaim || false;
  return (
    <>
      <GenericToolbar
        list={[
          {
            key: specificClaim ? "LitigationManagement" : "ListOfCases",
            value: specificClaim ? "/litigation-management" : "/cases-view",
          },
          { key: "CaseDetailss", value: "" },
        ]}
      />

      <ListOfCase />
    </>
  );
}

export default ListOfCases;
