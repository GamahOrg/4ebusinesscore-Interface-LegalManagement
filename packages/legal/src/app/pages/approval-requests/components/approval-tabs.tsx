import React, { Fragment, useEffect, useState } from "react";
import MenuNav from "./menu-nav";
import { useLocation } from "react-router-dom";
import SupportingDocumentsTable from "./supporting-documents-table2";
import OutgoingClaims from "./OutgoingClaims";
import IncomingClaims from "./IncomingClaims";
import StudyClaims from "./study-claims";

const ApprovalTabs = () => {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState("");

  const tabs = [
    {
      title: "StudyClaims",
      isActive: true,
      render: <StudyClaims />,
      count: 3,
    },
    {
      title: "IssuedClaims",
      isActive: false,
      render: <OutgoingClaims />,
      count: 3,
    },
    {
      title: "ClaimsIncoming",
      isActive: false,
      render: <IncomingClaims />,
      count: 3,
    },
    {
      title: "SupportingDocuments",
      isActive: false,
      render: <SupportingDocumentsTable />,
      count: 3,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  return (
    <div>
      {" "}
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

export default ApprovalTabs;
