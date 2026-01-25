import React from "react";
import { Fragment, useEffect, useState } from "react";
import RequestTrack from "./components/request-track";
import { BtnsActions } from "./components/btn-actions";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import NotificationsSettingsComponent from "./components/NotificationsSettingsComponent";
import { ServicesSettings } from "./components/ServicesSettings";
import { OrganizationalChart } from "./components/OrganizationalChart";
import { SystemNotifications } from "./components/SystemNotifications";
import MenuNav from "./menu-nav";
export interface TabType {
  title: string;
  isActive: boolean;
  render: JSX.Element;
}
const SystemSettingsContent = () => {
  const intl = useIntl();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState("");
  const tabs = [
    {
      title: "SpecialSettings",
      isActive: false,
      render: (
        <RequestTrack actions={<BtnsActions />} className="px-10 py-5 card" />
      ),
    },
    {
      title: "SystemCharacteristics",
      isActive: false,
      render: <NotificationsSettingsComponent />,
    },
    {
      title: "ServicesSettings",
      isActive: false,
      render: <ServicesSettings />,
    },
    {
      title: "BasicDataSettings",
      isActive: false,
      render: <OrganizationalChart />,
    },
    {
      title: "NotificationsSettings",
      isActive: false,
      render: <SystemNotifications />,
    },
  ];
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!location.hash) {
      setCurrentTab(`#${tabs[0].title}`);
      setActive(tabs[0].title);
    } else {
      setCurrentTab(location.hash);
      setActive(location.hash.replace("#", ""));
    }
  }, [location.hash]);
  return (
    <div className="container card p-10">
      <div className="head-title">
        <h3 className="title fw-bolder mb-2">
          {intl.formatMessage({ id: "Settings" })}
        </h3>
        <p className="slogen text-gray-400 my-3">
          {intl.formatMessage({ id: "showAllCourses" })}
        </p>
      </div>

      <MenuNav tabs={tabs} active={active} setActive={setActive} />

      {currentTab &&
        tabs
          .filter((tab) => `#${tab.title}` === currentTab)
          ?.map((tab, index: number) => (
            <Fragment key={index}>{tab.render}</Fragment>
          ))}
    </div>
  );
};

export default SystemSettingsContent;
