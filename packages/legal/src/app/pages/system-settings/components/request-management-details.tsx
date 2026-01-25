import React, { useState } from "react";
import { useIntl } from "react-intl";
import AddExceptionUsersForEditPopup from "./add-exception-users-popup";
import { EmployeeHierarchyPopup } from "@4eplatform/shared/src/popups/EmployeeHierarchyPopup";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";

const RequestManagementDetails = ({ index }: any) => {
  const intl = useIntl();
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [isCountTasks, setIsCountTasks] = useState<boolean>(false);
  const [exceptionUsersPopup, setExceptionUsersPopup] =
    useState<boolean>(false);
  const [selectedDeterminException, setSelectedDeterminException] =
    useState<any>(true);
  return (
    <div className="relative pb-5">
      <div className="timeline-item d-flex  ">
        <div className="timeline-badge pt-13">
          <span className="badge bg-primary fs-2 p-3 d-flex align-items-center justify-content-center ">
            {index + 1}
          </span>
        </div>
        <div className="timeline-content d-flex  text-muted font-weight-normal px-6">
          <div className="row pt-3 w-100 mb-4 d-flex ">
            <div className={`${"col-md-3"} col-sm-12`}>
              <div className="d-flex flex-column mb-2">
                <label className="fs-6 fw-bold mb-4 form-label">
                  {intl.formatMessage({
                    id: "DepartmentOrEmployee",
                  })}
                </label>

                <input
                  className="form-control rounded px-5 bg-gray py-3 pb-4"
                  id="name"
                  name="name"
                  placeholder={intl.formatMessage({
                    id: "Department",
                  })}
                  onClick={() => {
                    setModalHShow(true);
                  }}
                />
              </div>
            </div>

            <div className={`col-md-3 col-sm-12 d-flex flex-column`}>
              <div className="d-flex flex-column">
                <label className="fs-6 fw-bold " htmlFor="classNameification">
                  SLA
                </label>
                <div className="d-flex gap-4">
                  <div>
                    <label
                      className="fs-6 fw-bold text-gray-400 mb-1 "
                      htmlFor="slaDay"
                    >
                      {intl.formatMessage({ id: "Day" })}
                    </label>
                    <input
                      className="form-control rounded px-5 bg-gray py-2"
                      id="slaDay"
                      name="slaDay"
                    />
                  </div>
                  <div>
                    <label
                      className="fs-6 fw-bold text-gray-400 mb-1 px-2"
                      htmlFor="slaHour"
                    >
                      {intl.formatMessage({ id: "Hour" })}
                    </label>
                    <input
                      className="form-control rounded px-5 bg-gray py-2"
                      id="slaHour"
                      name="slaHour"
                    />
                  </div>
                  <div>
                    <label
                      className="fs-6 fw-bold text-gray-400 mb-1 px-2"
                      htmlFor="slaMiute"
                    >
                      {intl.formatMessage({ id: "Minute" })}
                    </label>
                    <input
                      className="form-control rounded px-5 bg-gray py-2"
                      id="slaMiute"
                      name="slaMiute"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${"col-md-2"} col-sm-12`}>
              <div className="d-flex flex-column">
                <label
                  className="fs-6 fw-bold mb-4 form-label"
                  htmlFor="classNameification"
                >
                  {intl.formatMessage({
                    id: "RoleName",
                  })}
                </label>

                <select
                  className="form-select bg-gray pt-3 py-4 text-gray-400"
                  name="RoleName"
                  id="RoleName"
                >
                  <option>
                    {intl.formatMessage({
                      id: "Role",
                    })}
                  </option>
                  <option value="daae7358-24c4-4c57-bd70-00a024c1bda6">
                    مدير ادارة
                  </option>
                  <option value="db634765-f05d-4507-c880-08dcc5a361cb">
                    مدير اداره اللجان
                  </option>
                  <option value="7cd9cbdb-961a-4811-c881-08dcc5a361cb">
                    المعرفة ادمن
                  </option>
                  <option value="27a24f11-2c57-4a0d-a058-1ccea3551a09">
                    مسئول الخدمة
                  </option>
                  <option value="93e76b35-7498-4ea0-aab9-443773a2b328">
                    موظف دعم فني
                  </option>
                  <option value="ce45b3c9-ec55-4f6c-99b8-44498d706b30">
                    الفني
                  </option>
                  <option value="edf30411-8c1f-48b1-8011-81a557735b0d">
                    أدمن الدعم الفني
                  </option>
                  <option value="edf30411-8c1f-48b1-8011-81a5577f5b0d">
                    مدير الفريق
                  </option>
                  <option value="80b0195b-fe59-43e6-90b6-b0f92e11e19e">
                    المستخدم
                  </option>
                </select>
              </div>
            </div>
            <div className={`col-md-2 col-sm-12 d-flex flex-column `}>
              <div className="d-flex flex-column">
                <label
                  className="fs-6 fw-bold mb-4 form-label"
                  htmlFor={"exception" + index}
                >
                  {intl.formatMessage({ id: "Exception" })}
                </label>

                <select
                  className="form-select bg-gray pt-3 py-4 text-gray-400"
                  name={"exception" + index}
                  id={"exception" + index}
                  defaultValue={0}
                  onChange={() =>
                    setSelectedDeterminException(!selectedDeterminException)
                  }
                >
                  <option value={1}>{intl.formatMessage({ id: "No" })}</option>
                  <option value={0}>{intl.formatMessage({ id: "Yes" })}</option>
                </select>
              </div>
            </div>
            <div className="col-md-2 col-sm-12 d-flex flex-column mt-11">
              {selectedDeterminException && (
                <>
                  <div
                    onClick={() => {
                      setExceptionUsersPopup(true);
                    }}
                    className="btn btn-primary btn-sm py-4 px-2 "
                    style={{ fontSize: "10" }}
                  >
                    {intl.formatMessage({ id: "PleaseAddTheExceptions" })}
                  </div>
                  <AddExceptionUsersForEditPopup
                    show={exceptionUsersPopup}
                    handleClose={() => {
                      setExceptionUsersPopup(false);
                    }}
                  />
                </>
              )}
            </div>

            <div className="col-md-3 col-sm-12 d-flex align-items-center -mt-20">
              <input
                type="checkbox"
                className="mx-2 form-check-input my-md-0"
                id={`CanAttribute+${index}`}
                checked={isCountTasks}
                onChange={(e) => {
                  setIsCountTasks(e.target.checked);
                }}
              />
              <label htmlFor="CanAttribute" className="fs-6 fw-bold form-label">
                {intl.formatMessage({
                  id: "CanAssign",
                })}
              </label>
            </div>
            {isCountTasks && (
              <div className="col-md-2 col-sm-12 d-flex flex-column -mt-20">
                <label
                  className="fs-6 fw-bold mb-2 form-label"
                  htmlFor="TasksNumber"
                >
                  {intl.formatMessage({
                    id: "NumberOfTasksAssigned",
                  })}
                </label>

                <input
                  className="form-control px-5 bg-gray py-1 pb-2 no-arrows"
                  name="target_details"
                  type="number"
                  min={0}
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9]/g, "");
                  }}
                  id="TasksNumber"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="Rega_modal_viewEmployee_hierarchy"
        aria-hidden="true"
      >
        <EmployeeHierarchyPopup
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
        />
      </div>
      <div
        className={`border-1 border-gray border-solid ${
          index > 0 ? "h-100" : "h-25"
        }`}
        style={{
          position: "absolute",
          top: index === 0 ? "0" : "-78%",
          [getCurrentSystemLanguage() === "ar" ? "right" : "left"]: `15px`,
        }}
      ></div>
    </div>
  );
};

export default RequestManagementDetails;
