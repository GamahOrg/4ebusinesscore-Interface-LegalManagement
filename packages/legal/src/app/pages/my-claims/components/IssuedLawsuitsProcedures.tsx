import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { ButtonGroup, Dropdown } from "react-bootstrap";

interface Action {
  id: string;
  label: string;
  icon: string;
  className: string;
  handler: ActionHandler;
  isLink?: boolean;
  linkTo?: string;
}

interface ActionHandler {
  action: () => void;
  usePopup?: boolean;
}

interface ActionProps {
  id: number;
}

export const IssuedLawsuitsProcedures: FC<ActionProps> = ({ id }) => {
  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);

  const getActions = (index: number) => {
    const actions: Action[] = [
      {
        id: "show",
        label: intl.formatMessage({ id: "Show" }),
        icon: "fa-solid fa-eye",
        className: "text-black",
        handler: {
          action: () => console.log("Show action"),
          usePopup: false,
        },
        isLink: true,
        linkTo: "/view-claims-2",
      },
      {
        id: "edit",
        label: intl.formatMessage({ id: "Edit" }),
        icon: "fas fa-pen",
        className: "text-primary",
        handler: {
          action: () => console.log("Edit action"),
          usePopup: false,
        },
        isLink: true,
        linkTo: "/add-issued-claim",
      },
      {
        id: "print",
        label: intl.formatMessage({ id: "Print" }),
        icon: "fas fa-print",
        className: "text-muted",
        handler: {
          action: () => console.log("Print action"),
          usePopup: false,
        },
        isLink: true,
        linkTo: "",
      },
      {
        id: "delete",
        label: intl.formatMessage({ id: "Delete" }),
        icon: "fas fa-trash",
        className: "text-danger",
        handler: {
          action: () => setModalDShow(true),
          usePopup: true,
        },
      },
    ];

    switch (index) {
      case 1:
      case 5:
      case 6:
        return actions.filter((action) =>
          ["show", "edit", "delete"].includes(action.id)
        );

      case 0:
      case 2:
      case 4:
        return actions.filter((action) => action.id === "show");
      case 3:
        return actions.filter((action) =>
          ["show", "print"].includes(action.id)
        );
      default:
        return actions;
    }
  };

  const actions = getActions(id);

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className="p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {actions.map((action) => (
            <Dropdown.Item as="button" className="py-3" key={action.id}>
              {action.isLink ? (
                <Link
                  to={action.linkTo || ""}
                  className={`menu-link px-3 mb-2 ${action.className}`}
                >
                  <i className={`${action.icon} mx-2 fs-4`}></i>
                  {action.label}
                </Link>
              ) : (
                <div className={`menu-link px-3 ${action.className}`}>
                  <span className="svg-icon svg-icon-3 mx-2">
                    <i className={action.icon}></i>
                  </span>
                  {action.label}
                </div>
              )}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      </div>
    </>
  );
};
