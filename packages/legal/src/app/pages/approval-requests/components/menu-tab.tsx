import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { TabType } from "../../../models/TabTypeModel";

interface MenuTabProps {
  tab: TabType;
  setActive: (title: string) => void;
}
const MenuTab = ({ tab, setActive }: MenuTabProps) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const handleActive = () => {
    setActive(tab.title);
    navigate(`#${tab.title}`);
  };
  return (
    <div
      onClick={handleActive}
      className={`menu-tab pb-4 border-bottom border-3 ${
        tab.isActive ? "border-primary" : "border-transparent"
      }`}
    >
      <span
        className={`title fw-bolder cursor-pointer d-flex gap-3 ${
          tab.isActive ? "text-primary" : "text-black"
        }`}
      >
        <span>{intl.formatMessage({ id: tab.title })} </span><span className="counter text-gray-500">{tab.count}</span>
      </span>
    </div>
  );
};

export default MenuTab;
