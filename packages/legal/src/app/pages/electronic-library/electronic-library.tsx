// ElectronicLibrary.tsx - Main workspace page
import ActionBtn from "@4eplatform/shared/src/components/action-btn";
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import LibraryContent from "./components/library-content";
import { useNavigate } from "react-router-dom";

const ElectronicLibrary = () => {
  const navigate = useNavigate();

  return (
    <>
      <GenericToolbar
        list={[{ key: "ElectronicLibrary", value: "" }]}
        actions={
          <ActionBtn
            label="AddBook"
            className="btn btn-light text-gray-800 btn-active-color-primary"
            onClick={() => navigate("/electronic-library/add-book")}
          />
        }
      />
      <LibraryContent />
    </>
  );
};
export default ElectronicLibrary;
