/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { useAppSelector } from "@4eplatform/connect/src/app/store/store";
import { SystemLang } from "@4eplatform/shared/assets/Lang";
import moment from "moment-timezone";

const HeaderNotificationsMenu: FC = () => {
  const intl = useIntl();

  let notifications = useAppSelector((state) => {
    return state?.notifications?.notificationsInNav;
  });

  const [pendingNav, setPendingNav] = useState<{
    url: string;
    id: string;
    isReaded: boolean;
    workspaceKeyTo: number;
    cardTitle?: string;
    subsystemId?: string;
    mainClassificationId?: string;
    cardName?: string;
  } | null>(null);

  const navigationHandler = (
    url: string,
    id: string,
    isReaded: boolean,
    workspaceKeyTo: number,
    cardTitle?: string,
    subsystemId?: string,
    mainClassificationId?: string,
    cardName?: string,
  ) => {
    setPendingNav({
      url,
      id,
      isReaded,
      workspaceKeyTo,
      cardTitle,
      subsystemId,
      mainClassificationId,
      cardName,
    });
  };

  return (
    <div
      className="menu menu-sub-dropdown menu-column w-350px w-lg-375px"
      data-kt-menu="true"
      id="mainNotificationDev"
    >
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="kt_topbar_notifications_1"
          role="tabpanel"
        >
          <div className="scroll-y mh-325px my-5 px-8">
            {notifications?.length ? (
              notifications?.map((notification: any, index: number) => (
                <div
                  key={`alert${index}`}
                  onClick={() =>
                    navigationHandler(
                      notification?.actionUrl,
                      notification?.id,
                      notification?.readed,
                      notification?.workspaceKeyTo,
                      notification?.cardname,
                      notification?.subsystemid || notification?.substsemid,
                      notification?.mainclassificationId,
                      notification?.cardname,
                    )
                  }
                  className={`d-flex flex-stack py-4 rounded mb-1 bg-hover-light-primary cursor-pointer ${
                    notification?.readed ? "" : "bg-light-dark "
                  }`}
                >
                  <div className="d-flex align-items-center">
                    <div className="mb-0 me-2">
                      <span
                        className={`fs-6 cursor-pointer fw-bolder text-gray-${
                          notification?.readed ? "500" : "800"
                        }`}
                      >
                        {SystemLang() === "ar"
                          ? notification?.title
                          : notification?.titleEn}
                      </span>
                      <div className="text-gray-400 fs-7">
                        {SystemLang() === "ar"
                          ? notification?.messageAr
                          : notification?.messageEn}
                      </div>
                    </div>
                  </div>

                  <span className="badge badge-light fs-8 mx-2">
                    <div>
                      {notification?.createdOn && (
                        <>
                          <p>
                            {moment
                              .tz(notification?.createdOn, "UTC")
                              .tz(
                                Intl.DateTimeFormat().resolvedOptions()
                                  .timeZone,
                              )
                              .format("YYYY-MM-DD")}
                          </p>
                          <p>
                            {moment
                              .tz(notification?.createdOn, "UTC")
                              .tz(
                                Intl.DateTimeFormat().resolvedOptions()
                                  .timeZone,
                              )
                              .format("LT")}
                          </p>
                        </>
                      )}
                    </div>
                  </span>
                </div>
              ))
            ) : (
              <span className="d-flex justify-content-center py-10 text-muted">
                {intl.formatMessage({ id: "NotExist" })}{" "}
                <i className="fa-solid fa-ban px-3 fs-4"></i>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeaderNotificationsMenu };
