import MenuTab from "./menu-tab";
import { TabType } from "../../../models/TabTypeModel";

interface MenuNavProps {
  tabs: TabType[];
  active: string;
  setActive: (title: string) => void;
}
const MenuNav = ({ tabs, active, setActive }: MenuNavProps) => {
  return (
    <div className="menu-nav my-4 mb-8 w-100 border-bottom border-gray-300 border-1 d-flex align-items-end gap-10">
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
