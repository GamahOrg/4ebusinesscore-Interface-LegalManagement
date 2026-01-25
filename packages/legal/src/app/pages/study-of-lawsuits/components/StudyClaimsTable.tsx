import { useIntl } from "react-intl";
import StudyRowDetails from "./StudyRowDetails";

const StudyClaimsTable = () => {
  const intl = useIntl();
  const studyClaimsTableList: any[] = [
    {
      id: 2541851,
      creator: "محمد ابراهيم",
      Defendant: "سعود محمد علي الكحطاني",
      info: "التأخير او عدم دفع الاجور: عدم دفع الاجور في موعدها او الامتناع عن دفع المستحقات المالية للعامل",
      created_at: "2022-01-01",
      status: "InTrack",
    },
    {
      id: 2541853,
      creator: "محمد ابراهيم",
      Defendant: "سعود محمد علي الكحطاني",
      info: "التأخير او عدم دفع الاجور: عدم دفع الاجور في موعدها او الامتناع عن دفع المستحقات المالية للعامل",
      created_at: "2022-01-01",
      status: "Rejected",
    },
    {
      id: 2541854,
      creator: "محمد ابراهيم",
      Defendant: "سعود محمد علي الكحطاني",
      info: "التأخير او عدم دفع الاجور: عدم دفع الاجور في موعدها او الامتناع عن دفع المستحقات المالية للعامل",
      created_at: "2022-01-01",
      status: "Drafts",
    },
    {
      id: 2541854,
      creator: "محمد ابراهيم",
      Defendant: "سعود محمد علي الكحطاني",
      info: "التأخير او عدم دفع الاجور: عدم دفع الاجور في موعدها او الامتناع عن دفع المستحقات المالية للعامل",
      created_at: "2022-01-01",
      status: "Agreement",
    },
  ];

  return (
    <>
      <div className="table-responsive mb-3">
        <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
          <thead>
            <tr className="fw-bolder projectSecColor">
              <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                {intl.formatMessage({ id: "StudyClaimNumber" })}
              </th>

              <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                {intl.formatMessage({ id: "TheCreatorOfTheCall" })}
              </th>
              <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                {intl.formatMessage({ id: "Defendant" })}
              </th>

              <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                {intl.formatMessage({ id: "StudyClaimInfo" })}
              </th>

              <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                {intl.formatMessage({ id: "StudyClaimDate" })}
              </th>

              <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                {intl.formatMessage({ id: "Status" })}
              </th>

              <th className="px-2 pb-3 min-w-50px max-w-200px text-muted">
                {intl.formatMessage({ id: "Options" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {studyClaimsTableList.map((study, index) => (
              <StudyRowDetails key={index} study={study} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudyClaimsTable;
