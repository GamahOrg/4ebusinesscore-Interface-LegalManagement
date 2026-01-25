import {
  getStyleByStatus,
  getStyleByStatusCauseStages,
} from "@4eplatform/shared/functions/getStyleByStatus";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { SessionActions } from "./SessionActions";
import AssigneeForSession from "./AssigneeForSession";
import DocsForSession from "./DocsForSession";
import { useLocation, useParams } from "react-router-dom";
import JudgementSession from "./JudgementSession";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  fetchSessionById,
  fetchSessionByIdParams,
} from "../../../features/session";
import moment from "moment";
import "moment/locale/ar";
import Spinner from "react-bootstrap/esm/Spinner";
import NewcauseStageStatusMapping from "@4eplatform/shared/functions/NewcauseStageStatusMapping";
import causeStatus, {
  causeStageStatus,
} from "@4eplatform/shared/functions/causeStatus";

function SessionDetails() {
  let intl = useIntl();
  moment.locale("en");

  let location = useLocation();
  const { id } = useParams();
  const causeId = location?.state?.causeId;
  const dispatch = useDispatch<AppDispatch>();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (id && causeId) {
      const data = {
        id: id,
        params: {
          CauseId: causeId,
        },
      };
      dispatch(fetchSessionByIdParams(data) as any).then((res) => {
        setSession(res?.payload?.result);
      });
    }
  }, [id, causeId]);

  const sessionByIdStatus = useSelector(
    (state: RootState) => state.session.statuses.sessionByIdParamsStatus
  );
  return (
    <>
      {sessionByIdStatus ? (
        <div className="container card card-xl-stretch mb-xl-8">
          {" "}
          <div
            className={`p-4 mt-3 bg-light rounded-2 mb-8 d-flex justify-content-between align-items-center flex-wrap`}
          >
            <div className="text-dark fw-bolder fs-5">
              {session?.causeNumber}{" "}
              <span className="text-primary fw-normal fs-6">
                {session?.causeTitle}
              </span>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
              <div className="bg-light-primary p-3 fw-bolder fs-6 d-flex justify-content-center align-items-center rounded-2 text-primary">
                {intl.formatMessage({ id: "TheLawsuit" })}
                {" #"}
                {intl.locale === "ar"
                  ? session?.lK_StageDto?.nameAr
                  : session?.lK_StageDto?.nameEn}
              </div>
              <div
                className={`bg-${getStyleByStatusCauseStages(
                  causeStageStatus(session?.causeStatus, intl)
                    ?.statusEnum as number
                )} p-3 fw-bolder fs-6 d-flex justify-content-center align-items-center rounded-2`}
              >
                {causeStageStatus(session?.causeStatus, intl)?.name}
              </div>
            </div>
          </div>
          <div className="d-md-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex justify-content-start align-items-center gap-3 mb-0">
              <h4 className=" mb-0">
                {intl.formatMessage({ id: "Session" })} #
                {session?.sessionNumber}{" "}
              </h4>

              <p className="text-dark mb-0" dir="ltr">
             
                {moment(session?.sessionDate).format("hh:mm A")} |{" "}
                {moment(session?.sessionDate).format("DD MMM YYYY")} |{" "}
                {/* {moment(session?.sessionDate).locale(intl.locale).format('DD MMM YYYY')} | {" "} */}
                {moment(session?.sessionDate).format("dddd")}
              </p>
              <p className="mb-0 text-dark">
                <span className="text-primary">{session?.courtName}</span>
                <span> |</span> <span>{session?.areaName} </span>
              </p>
            </div>

            <div className="d-flex align-items-center justify-conten-md-start">
              {location.pathname?.includes("add") && (
                <>
                  <SessionActions />
                </>
              )}
            </div>
          </div>
          <div className="mt-3">
            <div className="row d-flex bg-light p-5 mb-5 rounded mt-4 mx-4">
              <AssigneeForSession session={session} setSession={setSession} />
              <DocsForSession session={session} />
            </div>
            {location.pathname?.includes("add") ? (
              <></>
            ) : (
              <>
                {session?.judgementGroundDto &&
                  session?.judgementGroundDto.length !== 0 && (
                    <JudgementSession session={session} />
                  )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="container card card-xl-stretch mb-xl-8 py-5">
          <div className="d-flex gap-4 justify-content-center align-items-center py-4">
            {intl.formatMessage({ id: "DataIsLoaded..." })}
            <Spinner animation="border" variant="primary" />
          </div>
        </div>
      )}
    </>
  );
}

export default SessionDetails;
