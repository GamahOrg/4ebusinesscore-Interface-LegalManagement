import React, { ReactNode, useState } from "react";
import { useIntl } from "react-intl";
import RequestManagementDetails from "./request-management-details";

interface RequestTrackProps {
  className?: string;
  actions?: ReactNode;
}
const RequestTrack = ({
  className = "my-5 px-3 card",
  actions,
}: RequestTrackProps) => {
  const [managementNumber, setManagementNumber] = useState<number>(1);
  const intl = useIntl();
  return (
    <div className={`${className}`}>
      <div className="row mb-3 mt-5">
        <div className={`col-md-6 col-12`}>
          <div className="mb-2 pt-2 pb-3 ">
            <label className="form-label px-2  fs-6 text-gray-700">
              {intl.formatMessage({ id: "RequestName" })}
            </label>
            <input
              className="form-control px-5 bg-gray"
              placeholder={intl.formatMessage({
                id: "RequestName",
              })}
            />
          </div>
        </div>
        <div className={`col-md-6 col-12`}>
          <div className="mb-2 pt-2 pb-3 ">
            <label className="form-label px-2  fs-6 text-gray-700">
              {intl.formatMessage({ id: "OrderClassification" })}
            </label>
            <select
              id="domain"
              className="form-select myform-control inputHeight bg-gray select2-hidden-accessible mt-1 bg-gray"
              data-kt-select2="true"
              data-placeholder={intl.formatMessage({
                id: "Choose",
              })}
              data-dropdown-parent="#kt_menu_62775e8642438"
              data-allow-clear="true"
              data-select2-id="select2-data-4-vqtd"
              tabIndex={-1}
              aria-hidden="true"
            >
              <option>تصنيف الطلب</option>
              <option value="ba2c15b3-d3cb-4165-98bc-01f1a887cc75">
                المنتجات الرقمية
              </option>
              <option value="d6f7cc44-0fcd-4b41-af42-643f71cf3703">
                طلب دعم فنى
              </option>
              <option value="568c5919-c1ad-4a0a-a133-65c498045bcd">
                طلب مرافق
              </option>
              <option value="7c339b41-dc30-4dfe-ac00-e6651fd77b00">
                طلب تواصل
              </option>
              <option value="7c439b41-dc30-4dfe-ac00-e6651fd77b00">
                اداره مشاريع
              </option>
              <option value="b17261f3-577c-4a05-9895-ea3f03808e84">
                إدارة اللجان
              </option>
            </select>
          </div>
        </div>
        <div className={`col-md-6 col-12`}>
          <div className="mb-2 pt-2 pb-3 ">
            <label className="form-label px-2  fs-6 text-gray-700">
              {intl.formatMessage({ id: "OrderSource" })}
            </label>
            <select
              id="domain"
              className="form-select myform-control inputHeight  select2-hidden-accessible mt-1 bg-gray"
              data-kt-select2="true"
              data-placeholder={intl.formatMessage({
                id: "Choose",
              })}
              data-dropdown-parent="#kt_menu_62775e8642438"
              data-allow-clear="true"
              data-select2-id="select2-data-4-vqtd"
              tabIndex={-1}
              aria-hidden="true"
            >
              <option>{intl.formatMessage({ id: "OrderSource" })}</option>
              <option>بلاغ خدمة حالية </option>
              <option>طلب خدمة جديدة</option>
            </select>
          </div>
        </div>
        <div className={`col-md-6 col-12`}>
          <div className="mb-2 pt-2 pb-3 ">
            <label className="form-label px-2  fs-6 text-gray-700">
              {intl.formatMessage({ id: "DepartmentsNumber" })}
            </label>

            <input
              type="number"
              className="form-control px-5 bg-gray no-arrows"
              placeholder={intl.formatMessage({
                id: "DepartmentsNumber",
              })}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.replace(/[^0-9]/g, "");
              }}
              defaultValue={1}
              onChange={(e) => setManagementNumber(e.target.value as any)}
            />
          </div>
        </div>
        <div className="timeline mb-4 timeline-1 pe-5 relative mt-4 pt-4">
          {Array.from({ length: managementNumber }).map((_, index: number) => (
            <RequestManagementDetails key={index} index={index} />
          ))}
        </div>
      </div>
     {managementNumber > 0 && <div className="d-flex gap-3 justify-content-end">{actions}</div> }
    </div>
  );
};

export default RequestTrack;
