import { useState } from "react";
import { useIntl } from "react-intl";
import { Actions } from "./Actions";
import { ShowMore } from "../popup/ShowMore";
import { Link } from "react-router-dom";
const StudyRowDetails = ({ study }: { study: any }) => {
  const intl = useIntl();
  const [showModel, setShowModel] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "InTrack":
        return "badge-light-warning";
      case "Rejected":
        return "badge-light-danger";
      case "Agreement":
        return "badge-light-success";
      case "Drafts":
        return "badge-light-primary";
      default:
        return "badge-light-secondary";
    }
  };
  return (
    <tr key={study.id}>
      <td>
        <Link to={`/study-of-lawsuits/details`}>{study.id}</Link>
      </td>
      <td>{study.creator}</td>
      <td>{study.Defendant}</td>
      <td className="text-start w-350px">
        <p
          onClick={() => setShowModel(true)}
          className="fw-bolder text-primary fs-6 cursor-pointer"
        >
          {study.info}
        </p>
      </td>

      <td>{study.created_at}</td>
      <td>
        <div className={`badge ${getStatusColor(study.status)}`}>
          {intl.formatMessage({ id: `${study.status}` })}
        </div>
      </td>
      <td>
        <Actions id={study.id} status={study.status} />
      </td>
      {showModel && (
        <div className="modal fade" aria-hidden="true">
          <ShowMore
            show={showModel}
            handleClose={() => setShowModel(false)}
            data={study?.info}
          />
        </div>
      )}
    </tr>
  );
};

export default StudyRowDetails;
