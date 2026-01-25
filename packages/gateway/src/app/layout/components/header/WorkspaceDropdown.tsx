import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Col, Form, Nav, Row, Tab } from "react-bootstrap";
import SystemsTab from "./SystemsTab";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { SystemPaginationDropdown } from "@4eplatform/shared/components/SystemPaginationDropdown";

const WorkspaceDropdown: FC<any> = ({ setShowDropDown, showDropDown }) => {
  const intl = useIntl();

  const [selectedSysTab, setSelectedSysTab] = useState<any>({});
  const [isChecked, setIsChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageSize, setPageSize] = useState<any>(21);
  const [pageIndex, setPageIndex] = useState<any>(1);

  const systemTree: any = useSelector(
    (state: RootState) =>
      state?.subsytemSettingsMainClassificationAggSlice?.items ?? [],
  );

  const totalPages = Math.ceil(systemTree?.[0]?.count / pageSize);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const loggedInUserId = localStorage.getItem("userId");

  const renderChildSystems = (sys: any) => {
    const allSystems =
      sys?.allSubsytemSettingsMainClassifications ??
      sys?.subSystems?.concat(sys?.mainclassiffications) ??
      [];

    const filtered =
      allSystems?.filter((childSys: any) => {
        const childNameAr = childSys?.nameAr?.toLowerCase() || "";
        const mainNameEn = childSys?.mainNameEn?.toLowerCase() || "";

        return (
          childNameAr.includes(searchTerm) || mainNameEn.includes(searchTerm)
        );
      }) ?? [];

    const systemsToRender = searchTerm ? filtered : allSystems;
    const noDataMessage = searchTerm ? "NoData" : "ComingSoon";
    const icon = searchTerm ? "fa-solid fa-database" : "fa-solid fa-rocket";

    return (
      <Tab.Content>
        <div className="row mx-0">
          {systemsToRender?.length > 0 ? (
            systemsToRender.map((childSys: any) => (
              <Tab.Pane
                className={`col-lg-${isChecked ? "3" : "4"} p-0`}
                style={{ opacity: "1" }}
                key={childSys?.id || `childSys-${Math.random()}`}
                eventKey={selectedSysTab?.id}
              >
                <SystemsTab
                  selectedSysTab={selectedSysTab}
                  childSys={childSys}
                  setShowDropDown={setShowDropDown}
                />
              </Tab.Pane>
            ))
          ) : (
            <Tab.Pane
              className={`col-lg-${isChecked ? "3" : "4"} p-0`}
              style={{ opacity: "1" }}
              key="no-data-pane"
              eventKey={selectedSysTab?.id}
            >
              <SystemsTab
                selectedSysTab={selectedSysTab}
                intlMsg={intl.formatMessage({ id: noDataMessage })}
                staticIcon={icon}
                setShowDropDown={setShowDropDown}
              />
            </Tab.Pane>
          )}
        </div>
      </Tab.Content>
    );
  };

  return (
    <Tab.Container
      id="tabs-example"
      defaultActiveKey={systemTree?.[0]?.id || ""}
    >
      <Row className="p-1 mx-0 h-100" style={{ cursor: "default" }}>
        {!isChecked && (
          <Col sm={3} style={{ height: "585px", overflowY: "auto" }}>
            <Nav
              variant="pills"
              className="flex-column flex-nowrap basic system-dropdown overflow-hidden"
            >
              {systemTree?.map((sysTree: any) => (
                <Nav.Link
                  onClick={() => setSelectedSysTab(sysTree)}
                  key={sysTree?.id}
                  className="fw-bolder pt-4 pb-4 px-2 fs-7 d-flex justify-content-between align-items-center"
                  eventKey={sysTree?.id}
                  active={selectedSysTab?.id === sysTree?.id}
                ></Nav.Link>
              ))}
            </Nav>
          </Col>
        )}

        <Col
          sm={isChecked ? 12 : 9}
          style={{ height: "600px", overflowY: "auto" }}
        >
          <div style={{ minHeight: "525px" }}>
            <div className="d-flex flex-wrap align-items-center pt-2 pb-1 ms-md-0 mx-1 gap-4">
              {loggedInUserId !== "3eb17e81-ede8-4b02-90a1-3625e695af03" &&
              ![
                "جميع ألانظمة",
                "جميع الانظمه",
                "جميع الانظمة",
                "جميع الأنظمه",
                "جميع الأنظمة",
              ].includes(systemTree?.[0]?.nameAr?.trim()) &&
              systemTree?.[0]?.nameEn?.trim().toLowerCase() !==
                "all system" ? null : (
                <div className="d-flex align-items-center gap-2">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    checked={isChecked}
                    onChange={handleSwitchChange}
                  />
                </div>
              )}
            </div>

            {renderChildSystems(selectedSysTab)}
          </div>

          {systemTree?.[0]?.id == selectedSysTab?.id &&
          (systemTree?.[0]?.nameEn?.toLowerCase().includes("all system") ||
            [
              "جميع ألانظمة",
              "جميع الانظمه",
              "جميع الانظمة",
              "جميع الأنظمه",
              "جميع الأنظمة",
            ].includes(systemTree?.[0]?.nameAr?.trim())) ? (
            <>
              {Array.isArray(systemTree) && systemTree?.[0]?.count > 0 ? (
                <SystemPaginationDropdown
                  totalItems={systemTree?.[0]?.count}
                  totalPages={totalPages}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  exceptionPageSize={isChecked ? pageSize : ""}
                  setPageIndex={setPageIndex}
                  setPageSize={setPageSize}
                />
              ) : null}
            </>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Tab.Container>
  );
};

export { WorkspaceDropdown };
