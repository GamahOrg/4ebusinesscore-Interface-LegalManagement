import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { SystemPagination } from "@4eplatform/shared/src/popups/SystemPagination";
import { NotificationsList } from "./NotificationsList";

export const SystemNotifications: FC = () => {
  const intl = useIntl();
  const [getNotification, setNotification] = useState([
    {
      id: "01",
      cardName: "MyCourses",
      note: "اشعار عند غلق الطلب",
    },
    {
      id: "02",
      cardName: "MyTests",
      note: "اشعار عند جعل الطلب ساري",
    },
    {
      id: "03",
      cardName: "MyCertificates",
      note: "اشعار عند حل الطلي",
    },
    {
      id: "04",
      cardName: "TrainingCourses1",
      note: "اشعار عند رفض الطلب",
    },
    {
      id: "05",
      cardName: "AddNewCourse",
      note: "اشعار عند تأخر الطلب",
    },
  ]);

  return (
    <>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div
            className="flex-lg-row-fluid"
            data-select2-id="select2-data-129-tmo1"
          >
            <div className=" mb-5 mb-xl-8">
              <div className="card-body py-3">
                <div className="table-responsive">
                  <table
                    className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
                    id="REGA-WS-caseList"
                  >
                    <thead>
                      <tr className="fw-bolder text-muted">
                        <th className="min-w-50px">
                          {intl.formatMessage({ id: "CommitteesID" })}
                        </th>
                        <th className="min-w-250px">
                          {intl.formatMessage({ id: "Cardname" })}
                        </th>
                        <th className="min-w-150px text-center">
                          {intl.formatMessage({ id: "Notification" })}
                        </th>
                        <th className="min-w-150px text-center">
                          {intl.formatMessage({ id: "EmailNotification" })}
                        </th>
                        <th className="min-w-100px text-center">
                          {intl.formatMessage({ id: "SystemNotifications" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getNotification.map((notification) => (
                        <tr key={notification.id}>
                          <NotificationsList notification={notification} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <SystemPagination />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
