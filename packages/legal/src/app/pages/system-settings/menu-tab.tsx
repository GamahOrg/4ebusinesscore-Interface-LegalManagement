import { TabType } from "./TrainingSystemSettingsHome";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

interface MenuTabProps {
  tab: TabType;
  setActive: (title: string) => void;
}
const MenuTab = ({ tab, setActive }: MenuTabProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const location =  useLocation();

  const handleActive = () => {
    setActive(tab.title);
    navigate(`${location.search}#${tab.title}`, { state: { ...location.state } });
  };
  return (
    <div
      onClick={handleActive}
      className={`menu-tab pb-4 border-bottom border-3 ${
        tab.isActive ? "border-primary" : "border-transparent"
      }`}
    >
      <span
        className={`title fw-bolder cursor-pointer ${
          tab.isActive ? "text-primary" : "text-gray-500"
        }`}
      >
        {intl.formatMessage({ id: tab.title })}
      </span>
    </div>
  );
};

export default MenuTab;
