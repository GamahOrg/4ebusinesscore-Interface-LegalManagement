import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import CaseInfo from "./CaseInfo";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Spinner from "react-bootstrap/esm/Spinner";
import { fetchAllCauseComments } from "../../../features/cause-comments";
import { LegalRootUrl } from "@4eplatform/shared/apis/legal";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import getIconSrcError from "@4eplatform/shared/functions/getIconSrcError";
import { CauseCommentsModel } from "../../../models/CauseCommentsModel";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { Actions } from "../../study-of-lawsuits/components/Actions";
import AddCauseCommentPopup from "../popups/AddCauseCommentPopup";
import { CommentsActions } from "./CommentsActions";
import moment from "moment";

const CauseComments = ({isConsultive}) => {
  const intl = useIntl();
  let { id: caseId } = useParams();

  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(10);
  useEffect(() => {
    if (caseId) {
      let params = {
        PageSize: pageSize,
        PageNumber: pageIndex,
        CauseId: caseId,
      };
      dispatch(fetchAllCauseComments(params) as any);
    }
  }, [caseId, dispatch, pageSize, pageIndex]);
  let comments: any = useSelector((state: RootState) => {
    return state?.causecomments?.comments;
  });
  const totalItems = useSelector((state: RootState) => {
    return state?.causecomments?.pagination?.totalItems;
  });
  const totalPages = useSelector((state: RootState) => {
    return state?.causecomments?.pagination?.totalPages;
  });
  const loading = useSelector((state: RootState) => {
    return state?.causecomments?.loading;
  });
  const [showAddCauseCommenrPopup, setShowAddCauseCommenrPopup] = useState(false);
   const [selectedComment, setSelectedComment] = useState<any>(null);
  return (
    <div>
      <CaseInfo />
      <Row className="bg-gray-100 p-6 rounded-2 mx-0">
        <div className="my-5 d-flex justify-content-between align-items-center">
          <h4 className="fw-bolder mb-4 px-0">
            {intl.formatMessage({ id: "CauseComments" })}
          </h4>
          {isConsultive && (
 <button
            className="btn btn-primary text-white d-flex align-items-center gap-2"
            onClick={() => {
              setShowAddCauseCommenrPopup(true);
            }}
          >
            {intl.formatMessage({ id: "AddComment2" })}
          </button>
          )}
         
        </div>

        <Row className="g-3 mx-0 px-0">
          {loading ? (
            <div className="d-flex gap-4 justify-content-center align-items-center py-4">
              {intl.formatMessage({ id: "DataIsLoaded..." })}
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              {Array.isArray(comments) && comments.length > 0 ? (
                <div>
                  <div className=" mb-3">
                    <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
                      <thead className="table-primary">
                        <tr>

                          <th
                            className="text-center"
                            style={{ color: "black" }}
                          >
                            {intl.formatMessage({ id: "SpecialistsTime" })}
                          </th>

                       
                          <th
                            className="text-center"
                            style={{ color: "black" }}
                          >
                            {intl.formatMessage({ id: "SpecialistsOwner" })}
                          </th>

                          <th
                            className="text-center"
                            style={{ color: "black" }}
                          >
                            {intl.formatMessage({ id: "Attachments" })}
                          </th>

                             <th
                            className="text-center"
                            style={{ color: "black" }}
                          >
                            {intl.formatMessage({ id: "TheComment" })}
                          </th>
                          {isConsultive && (
                               <th
                            className="text-center"
                            style={{ color: "black" }}
                          >
                            {intl.formatMessage({ id: "TheProcedures" })}
                          </th>
                          )}
                     
                        </tr>
                      </thead>
                      <tbody>
                        {comments.map(
                          (causecomment: CauseCommentsModel, index) => (
                            <tr key={index}>

                              <td className="text-center">
                                <p className="mb-0">
                                  {moment(causecomment.createdOn).format(" YYYY MMM DD")}
                                  </p>
                                <p className="mb-0">
                                  {moment(causecomment.createdOn).format("HH:mm")}
                                  </p>
                              </td>

                              <td className="text-center">
                                {causecomment.createdBy}
                              </td>

                                 {/* المرفقات */}

                                <td>
                                {Array.isArray(causecomment?.attchments) &&
                                  causecomment?.attchments?.length !== 0 &&
                                  causecomment?.attchments?.map(
                                    (file, fIndex) => (

                                      <a
                                        key={fIndex}
                                        
                                        href={
                                          LegalRootUrl +
                                          file?.filePath?.replace(
                                            "wwwroot/",
                                            ""
                                          )
                                        }
                                        download
                                        target="_blank"
                                        rel="noreferrer"
                                        className="  d-flex align-items-center justify-content-center gap-2 me-2 w-100 "
                                      >
                                        <img
                                          src={getIconSrc(
                                            file?.filePath,
                                            {
                                              filePath: file?.filePath?.replace(
                                                "wwwroot/",
                                                ""
                                              ),
                                            },
                                            LegalRootUrl
                                          )}
                                          onError={(e: any) =>
                                            (e.target.src = getIconSrcError(
                                              file?.filePath
                                            ))
                                          }
                                          className="w-20px h-20px"
                                          alt={file?.fileName}
                                        />
                                        <span className="text-primary text-truncate mw-150px">
                                          {file?.fileName}
                                        </span>
                                      </a>
                                    )
                                  )}
                              </td>

                              <td className="textWidth">
                                <p className="text-center w-100">

                                {causecomment.comment}
                                </p>
                              </td>
                             {isConsultive && (
                               <td className="text-center" onClick={()=> setSelectedComment(causecomment?.id) }>
                                <CommentsActions
                                     pageIndex={pageIndex}
                                     pageSize={pageSize}
                                    commentId = {causecomment.id}
                                    selectedComment={selectedComment}
                                   />
                              </td>
                             )}
                       
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-100">
                    <SystemPagination
                      totalPages={totalPages}
                      totalItems={totalItems}
                      pageIndex={pageIndex}
                      pageSize={pageSize}
                      setPageIndex={setPageIndex}
                      setPageSize={setPageSize}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center fw-bolder mt-8 fs-4">
                  {intl.formatMessage({ id: "ThereAreNoCauseComments" })}
                </div>
              )}
               {showAddCauseCommenrPopup &&
                   <AddCauseCommentPopup 
                   show={showAddCauseCommenrPopup}
                    handleClose={() => setShowAddCauseCommenrPopup(false)}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                    
                   />
               } 
            </>
          )}
        </Row>
      </Row>
    </div>
  );
};

export default CauseComments;
