import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import AddBookContent from "./components/add-book-content";

const AddBook = () => {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "ElectronicLibrary", value: "/electronic-library" },
          { key: "AddBook", value: "" },
        ]}
      />

      <AddBookContent />
    </>
  );
};

export default AddBook;
