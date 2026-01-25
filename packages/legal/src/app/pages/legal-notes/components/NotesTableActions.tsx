import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import EditNotePopup from "../popups/EditNotePopup";
import ViewNotePopup from "../popups/ViewNotePopup";
type ActionProps = {
  id: string | number;
  item?: any;
  pageIndex?: number;
  setPageIndex?: any;
  pageSize?: number;
  setPageSize?: any;
  selectedDegree?: any;
  selectedCase?: any;
  setSelectedCase?: any;
  setSelectedDegree?: any;
  searchTerm?: string;
  setSearchTerm?: any;
};

export const NotesTableActions: FC<ActionProps> = ({
  id,
  item,
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
}) => {
  const intl = useIntl();
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showViewPopup, setShowViewPopup] = useState<boolean>(false);
  let [selectedId, setSelectedId] = useState("");
  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className="p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2 text-gray-700"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="p-1">
          <Dropdown.Item
            as="button"
            onClick={(event: any) => {
              event.preventDefault();
              setShowViewPopup(true);
            }}
            className="menu-link px-3 py-2 my-1 text-muted mx-0"
          >
            <div>
              <div className="text-dark">
                <i className="fa-solid fa-eye mx-2 fs-4"></i>
                {intl.formatMessage({
                  id: "Show",
                })}
              </div>
            </div>
          </Dropdown.Item>
          {item?.causeStageStatus == 1 && 
           (<Dropdown.Item
            as="button"
            className="menu-link px-3 py-2 my-1 text-primary mx-0"
            onClick={(event: any) => {
              event.preventDefault();
              setShowEditPopup(true);
              setSelectedId(id as string);
            }}
          >
            <div>
              <span className="svg-icon svg-icon-3 me-2">
                <KTSVG path="/media/icons/duotune/general/gen087.svg" />
              </span>
              {intl.formatMessage({ id: "Edit" })}
            </div>
          </Dropdown.Item>)
          }
        </Dropdown.Menu>
      </Dropdown>
      {showEditPopup && id == selectedId && (
        <div className="modal fade">
          <EditNotePopup
            id={id as string}
            item={item}
            show={showEditPopup}
            handleClose={() => setShowEditPopup(false)}
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
        </div>
      )}

      <div className="modal fade">
        <ViewNotePopup
          id={id}
          text={item?.description}
          show={showViewPopup}
          handleClose={() => setShowViewPopup(false)}
        />
      </div>
    </>
  );
};
