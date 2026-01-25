import { TabType } from "../../../models/TabTypeModel";
import MenuTab from "../../system-settings/menu-tab";
// import MenuTab from "./menu-tab";

interface MenuNavProps {
  tabs: TabType[];
  active: string;
  setActive: (title: string) => void;
}
const MenuNav = ({ tabs, active, setActive }: MenuNavProps) => {
  return (
    <div className="menu-nav my-4 mb-8 w-100 border-bottom border-gray-300 border-1 d-flex align-items-end gap-10 custom-mobile-tabs">
      {tabs.map((tab, index) => (
        <MenuTab
          key={index}
          setActive={setActive}
          tab={{ ...tab, isActive: active === tab.title }}
        />
      ))}
    </div>
  );
};

export default MenuNav;
