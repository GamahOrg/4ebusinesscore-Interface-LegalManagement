import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { FC, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteCauseComment,
  fetchAllCauseComments,
} from "../../../features/cause-comments";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import EditCauseCommentPopup from "../popups/EditCauseCommentPopup";
type CommentsActionsProps = {
  commentId?: string;
  pageIndex?: number;
  pageSize?: number;
  selectedComment?: string;
};

export const CommentsActions: FC<CommentsActionsProps> = ({
  commentId,
  pageIndex,
  pageSize,
  selectedComment,
}) => {
  const intl = useIntl();
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  let language = intl.locale;
  const dispatch = useDispatch();
  let { id: caseId } = useParams();
  const handleDeleteComment = () => {
    dispatch(
      deleteCauseComment({
        Id: commentId,
      }) as any
    ).then((res: any) => {
      if (
        res.payload.message === "DeletedSuccessfully" ||
        res.payload.statusEnum == 1
      ) {
        showAlert(true, "DeletedSuccessfully", intl);
      } else {
        showAlert(false, "AnErrorOccurred", intl);
      }
      dispatch(
        fetchAllCauseComments({
          PageSize: pageSize,
          PageNumber: pageIndex,
          CauseId: caseId,
        }) as any
      );
    });
  };
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
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
          <Dropdown.Item as="button" onClick={() => setShowEditPopup(true)}>
            <div
              className="menu-link p-3 text-primary "
              style={{ textAlign: language == "ar" ? "right" : "left" }}
            >
              <KTSVG
                className="svg-icon svg-icon-3 mx-2"
                path="/media/icons/duotune/general/gen087.svg"
              />
              {intl.formatMessage({ id: "Edit" })}
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => setShowDeletePopup(true)}>
            <div
              className="menu-link p-3 text-danger "
              style={{ textAlign: language == "ar" ? "right" : "left" }}
            >
              <i className="fas fa-trash  mx-2 fs-4"></i>
              {intl.formatMessage({ id: "Delete" })}
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade">
        <DeletePopup
          showDelete={showDeletePopup}
          handleCloseDelete={() => setShowDeletePopup(false)}
          id={commentId}
          handleDelete={handleDeleteComment}
        />
      </div>
      {showEditPopup && (
        <div className="modal fade">
          <EditCauseCommentPopup
            show={showEditPopup}
            handleClose={() => setShowEditPopup(false)}
            pageSize={pageSize}
            pageIndex={pageIndex}
            selectedComment={selectedComment}
          />
        </div>
      )}
    </>
  );
};
