import { FC, Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { EmployeeHierarchyPopupTeamWorkTabAddMember } from "./edit-case/popups/EmployeeHierarchyPopupTeamWorkTabAddMember";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
interface Props {
  placeholder?: string;
  readOnly?: boolean;
  position?: string;
  showLabel?: string;
  viewOnly?: string;
  employeeIds?: any;
  setEmployeeIds?: any;
  orgIds?: any;
  setOrgIds?: any;
  membersChecked?: any;
  setMembersChecked?: any;
  setEmployeeNames?: any;
  employeeNames?: any;
  openSection?: any;
  register?: any;
  errors?: any;
  membersCheckedIds?: any;
  setValue?: any;
  trigger?: any;
  filteredMembers?: any;
}

const EmployeesListForGroup: FC<Props> = ({
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
  register,
  errors,
  membersCheckedIds,
  setValue,
  filteredMembers,
}) => {
  const intl = useIntl();
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let [data, setData] = useState<any>([]);
  const [owners, setOwners] = useState<any[]>([]);

  const handleRemoveUser = (userId: any) => {
    const updatedUserIds =
      employeeIds?.filter((id: any) => id !== userId) ?? [];
    setEmployeeIds(updatedUserIds);

    const updatedOrgs = (data ?? [])
      .map((item: any) => {
        const membersChecked = item?.mebmers?.some((member: any) =>
          updatedUserIds.includes(member?.userId)
        );
        return membersChecked ? item?.id : null;
      })
      .filter(Boolean);
    setOrgIds(updatedOrgs);

    setData((prevData: any) =>
      (prevData ?? []).map((item: any) => ({
        ...item,
        collapsed: false,
        checked: updatedOrgs.includes(item?.id),
        mebmers: (item?.mebmers ?? []).map((member: any) =>
          member?.userId === userId ? { ...member, checked: false } : member
        ),
      }))
    );

    setMembersChecked((prevChecked: any) =>
      (prevChecked ?? []).filter((member: any) => member?.userId !== userId)
    );
  };
  console.log("employeeNames", employeeNames);

  return (
    <>
      <div className="position-relative">
        {showLabel === "true" && (
          <>
            <label
              htmlFor="employees"
              className="form-label px-2 fontSz-6 required"
            >
              {intl.formatMessage({ id: "Employees" })}
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user-shield special"></i>
                </span>
              </div>
              <input
              disabled
                id="employees"
                type="text"
                className="form-control"
                placeholder={intl.formatMessage({
                  id: "ChooseMembers",
                })}
                value={employeeNames}
                onChange={(e) => {
                  setEmployeeNames(e.target.value);
                  setValue("member", e.target.value, {
                    shouldValidate: true,
                  });
                }}
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
            {membersChecked?.length === 0 || membersCheckedIds?.length === 0 ? (
              <div className="mt-2 p-2">
                {errors.member && (
                  <div className="text-danger mt-1">
                    {intl.formatMessage({ id: errors.member.message })}
                  </div>
                )}
              </div>
            ) : null}
          </>
        )}

        <ul
          className={` border-radius w-100 bg-light my-6 position-${
            position === "relative" ? "relative" : "absolute"
          } rounded`}
        >
          {membersChecked?.map((member: any, index: number) => (
            <Fragment key={index}>
              <div className="d-flex justify-content-between align-items-center my-4 p-2">
                <div className="d-flex align-items-center">
                  <div className="symbol symbol-35px symbol-circle me-3">
                    <img
                      src={`${(window as any)._env_?.REACT_APP_API_User_Url}/${
                        member?.imageUrl
                      }`}
                      alt="Pic"
                      onError={(e: any) =>
                        (e.target.src = toAbsoluteUrl(
                          "/media/avatars/user.jpeg"
                        ))
                      }
                    />
                  </div>

                  <p className="fw-bolder fs-6 text-gray-800 mb-0">
                    {member?.firstName}
                    {member?.secondName}
                  </p>
                </div>
                {viewOnly === "false" && (
                  <div onClick={() => handleRemoveUser(member?.userId)}>
                    <i className="fa-solid fa-xmark fs-3 text-gray-400 cursor-pointer"></i>
                  </div>
                )}
              </div>
              {index !== membersChecked.length - 1 && <hr />}
            </Fragment>
          ))}
        </ul>

        <div
          className="modal fade"
          id="Rega_modal_viewEmployee_hierarchy"
          aria-hidden="true"
        >
          <EmployeeHierarchyPopupTeamWorkTabAddMember
            show={modalHShow}
            handleClose={() => setModalHShow(false)}
            employeeIds={employeeIds}
            setEmployeeIds={setEmployeeIds}
            membersChecked={membersChecked}
            setMembersChecked={setMembersChecked}
            orgIds={orgIds}
            setOrgIds={setOrgIds}
            employeeNames={employeeNames}
            setEmployeeNames={setEmployeeNames}
            data={data}
            setData={setData}
            owners={owners}
            setOwners={setOwners}
            isOwners={true}
            filteredMembers={filteredMembers}
          />
        </div>
      </div>
    </>
  );
};

export default EmployeesListForGroup;
