import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import EditBookContent from "./components/edit-book-content";

const EditBook = () => {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "ElectronicLibrary", value: "/electronic-library" },
          { key: "EditBook", value: "" },
        ]}
      />

      <EditBookContent />
    </>
  );
};

export default EditBook;
