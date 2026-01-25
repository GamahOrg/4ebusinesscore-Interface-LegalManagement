import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { useEffect, useState } from "react";

type HeaderToolbarAgendaProps = {
  calendarRef?: any;
};

export const HeaderToolbarAgenda = ({
  calendarRef,
}: HeaderToolbarAgendaProps) => {
  const intl = useIntl();
  const [month, setMonth] = useState("");

  useEffect(() => {
    if (calendarRef && calendarRef.current)
      setMonth(calendarRef.current.calendar.currentData.viewTitle);
  }, [calendarRef]);

  const handlePrevClick = () => {
    const calendarApi = calendarRef.current.calendar;
    calendarApi.prev();
    setMonth(calendarApi.currentData.viewTitle);
  };

  const handleNextClick = () => {
    const calendarApi = calendarRef.current.calendar;
    calendarApi.next();
    setMonth(calendarApi.currentData.viewTitle);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-5">
      <div className="d-flex gap-5 align-items-center">
        <i
          className={`fas fa-angle-${getCurrentSystemLanguage() === "ar" ? "right" : "left"} cursor-pointer fw-bolder fs-5`}
          onClick={handlePrevClick}
        ></i>
        <span className="custom-month fs-4 fw-bolder">
          {month !== ""
            ? month
            : calendarRef &&
              calendarRef.current &&
              calendarRef.current.calendar.currentData.viewTitle}
        </span>
        <i
          className={`fas fa-angle-${getCurrentSystemLanguage() === "ar" ? "left" : "right"} cursor-pointer fw-bolder fs-5`}
          onClick={handleNextClick}
        ></i>
      </div>
      <div className="d-flex gap-5">
        <div>
          <p
            className="fs-7 fw-bolder text-gray-900 d-flex gap-2 mb-0"
            style={{
              direction: getCurrentSystemLanguage() === "ar" ? "rtl" : "ltr",
            }}
          >
            <span className="px-2 py-2 circle15 bg-success border border-light rounded-circle"></span>
            {intl.formatMessage({ id: "SessionDate" })}
          </p>
        </div>
        <div>
          <p
            className="fs-7 fw-bolder text-gray-900 d-flex gap-2 mb-0"
            style={{
              direction: getCurrentSystemLanguage() === "ar" ? "rtl" : "ltr",
            }}
          >
            <span className="px-2 py-2 circle15 bg-primary border border-light rounded-circle"></span>
            {intl.formatMessage({ id: "Today" })}
          </p>
        </div>
      </div>
    </div>
  );
};
