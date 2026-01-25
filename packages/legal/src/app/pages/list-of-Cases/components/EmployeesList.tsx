import { EmployeeHierarchyPopup } from "@4eplatform/shared/src/popups/EmployeeHierarchyPopup";
import { FC, Fragment, useState } from "react";
import { useIntl } from "react-intl";

interface Props {
  selectedOptions: any;
  setSelectedOptions: any;
  options: any;
  title: string; 
  placeholder?: string;
  readOnly?: boolean;
  position?: string;
  showLabel?: string;
  viewOnly?: string;
  source?:string
  employeeIds?: any;
  setEmployeeIds?: any;
  orgIds?: any;
  setOrgIds?: any;
  membersChecked?: any;
  setMembersChecked?: any;
  setEmployeeNames?: any;
  employeeNames?: any;
}

const EmployeesList: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
  options,
  title, 
  placeholder = "Choose",
  readOnly = false,
  position = "absolute",
  showLabel = "true",
  viewOnly = "false",
  employeeIds,
  setEmployeeIds,
  membersChecked,
  setMembersChecked,
  orgIds,
  setOrgIds,
  setEmployeeNames,
  employeeNames,
  source
}) => {
  const intl = useIntl();
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  return (
    <>
      <div className="position-relative">
        {showLabel === "true" && (
          <>
           <div className="row">
            <div className="col-12">
            <label htmlFor="employees" className="form-label px-2 fontSz-6">
              {intl.formatMessage({ id: "Users" })}
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user-shield special"></i>
                </span>
              </div>
              <input
                id="employees"
                type="text"
                className="form-control"
                placeholder={intl.formatMessage({
                  id: "Choose",
                })}
                value={employeeNames}
                onChange={(e) => setEmployeeNames(e.target.value)}
              />
              
              <div className="h-110 d-flex" role="button">
                <span
                  className="input-group-text"
                  onClick={() => setModalHShow(true)}
                >
                  <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                </span>
              </div>
            </div>
            </div>
           </div>
          </>
        )}

        <div className="d-flex row">
          <div className="col-md-6 col-sm-12">
          <ul
            className={`border border-1px border-radius w-100 px-2 bg-light mt-4 position-${
              position === "relative" ? "relative" : "absolute"
            } rounded`}
          >
            {options?.map((member: any, index: number) => (
              <Fragment key={member.id}>
                <div className="d-flex justify-content-between align-items-center my-4">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle me-3">
                      <img src={member.avatar} alt="Pic" />
                    </div>
                    <p className="fw-bolder fs-6 text-gray-800 mb-0">
                      {member.name}
                    </p>
                  </div>
                  {viewOnly === "false" && (
                    <i className="fa-solid mx-2 fa-xmark fs-3 text-gray-400 cursor-pointer"></i>
                  )}
                </div>
                {index !== options.length - 1 && <hr />}
              </Fragment>
            ))}
          </ul>

        </div>
        {source == "CaseViewTable"?"":  
        <div className="col-md-5 col-sm-12">
          <ul
            className={`border border-1px border-radius me-2 w-100 bg-light mt-4 position-${

              position === "relative" ? "relative" : "absolute"
            } rounded`}
          >
            {options?.map((member: any, index: number) => (
              <Fragment key={member.id}>
                <div className="d-flex justify-content-between align-items-center my-4">
                  <div className="d-flex align-items-center mt-5">
                    <input
          type={title === "محامين" || title === "مدخل البيانات" ? "checkbox" : "radio"}                       name="selectedMembers"
                      className={`me-2 mt-3 ${title === "محامين" || title === "مدخل البيانات"?"":"form-check-input widget-9-radio xRadioBg"}`}
                    />
                    <label className="mb-0">
                      <p className="fw-bolder fs-6 text-gray-800 mb-0 d-inline-block">
                        {intl.formatMessage({
                          id: `${title}`, 
                        })}
                           {intl.formatMessage({
                          id: `TheStudyStage`, 
                        })}
                        
                      </p>
                    </label>
                  </div>
                </div>
                {index !== options.length - 1 && <hr />}
              </Fragment>
            ))}
          </ul>
        </div>        
        }
      </div>
      <EmployeeHierarchyPopup source={source} show={modalHShow} handleClose={() => setModalHShow(false)} title={title}/>
    </div>
    </>
  );
};

export default EmployeesList;
