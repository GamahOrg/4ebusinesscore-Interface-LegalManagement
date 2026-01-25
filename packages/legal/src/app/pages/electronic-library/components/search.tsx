import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";

interface SearchProps {
  type?: string;
  placeholder?: string;
  className?: string;
}
const Search = ({
  type = "search",
  placeholder,
  className = "",
}: SearchProps) => {
  const intl = useIntl();

  return (
    <div className="d-flex w-100 align-items-center position-relative">
      {type === "search" && (
        <span
          className={`svg-icon svg-icon-1 position-absolute ${
            getCurrentSystemLanguage() === "ar" ? "me-6" : "ms-6"
          }`}
        >
          <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
        </span>
      )}
      <input
        type="text"
        data-kt-filemanager-table-filter="search"
        className={`form-control  ${
          getCurrentSystemLanguage() === "ar"
            ? type === "search"
              ? "pe-15"
              : "pe-5"
            : "ps-15"
        } ${className}`}
        placeholder={intl.formatMessage({
          id: placeholder ?? "Search",
        })}
      />
    </div>
  );
};

export default Search;
