import { FC } from "react";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
export const SystemPagination: FC = () => {
  const intl = useIntl();

  return (
    <div className="d-flex flex-stack flex-wrap  flex-sm-nowrap  pt-5 ">
      <div className="d-flex flex-wrap w-100 align-items-center justify-content-center justify-content-sm-start ">
        <label>{intl.formatMessage({ id: "TheNumberOfRows" })}</label>
        <select
          name="t"
          className="form-select form-select-sm form-select-solid w-75px ms-3"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <ul
        className={`pagination pagination-outline mt-5 mt-sm-0 w-100 justify-content-center ${
          getCurrentSystemLanguage() === "ar"
            ? "justify-content-sm-start"
            : "justify-content-sm-end"
        }`}
      >
        <li className="page-item previous disabled m-1">
          <span className="page-link">
            <i className="previous"></i>
          </span>
        </li>
        <li className="page-item active m-1">
          <span className="page-link">1</span>
        </li>
        <li className="page-item m-1">
          <span className="page-link">2</span>
        </li>
        <li className="page-item m-1">
          <span className="page-link">3</span>
        </li>
        <li className="page-item next m-1">
          <span className="page-link">
            <i className="next"></i>
          </span>
        </li>
      </ul>
    </div>
  );
};
