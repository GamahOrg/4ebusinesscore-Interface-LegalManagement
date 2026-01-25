/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from "react";
import { Languages } from "./Languages";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { setWorkspaceKey } from "@4eplatform/shared/index";
import { getCountRequestInstances } from "../../../features/user-profile/user-view-slice";
import { useUser } from "@npm-react/react-redux-routing";

type MenuProps = {
  show?: any;
  handleShow?: any;
};
const HeaderUserMenu: FC<MenuProps> = ({ show, handleShow }) => {
  let { logoutUser } = useUser();
  let dispatch = useDispatch();

  let userLoginInfo = useSelector((state: RootState) => {
    return state?.userLogin?.data;
  });
  const navigate = useNavigate();
  const intl = useIntl();

  const getProfileImage = () => {
    if (userLoginInfo?.imageUrl) {
      return `${UserManagmentRootUrl}${userLoginInfo?.imageUrl}`;
    }
    return `/media/avatars/300-3.jpg`;
  };

  useEffect(() => {
    dispatch(getCountRequestInstances({}) as any);
  }, []);

  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            <img
              alt="Logo"
              src={getProfileImage()}
              onError={(e: any) => (e.target.src = `/media/avatars/300-3.jpg`)}
            />
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5 text-break">
              {userLoginInfo?.userName}
            </div>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      <div className="menu-item px-5">
        <span
          onClick={() => {
            setWorkspaceKey(89);
            navigate("/user-profile");
          }}
          className="menu-link px-5"
        >
          {intl.formatMessage({ id: "MyProfile" })}
        </span>
      </div>

      <div className="menu-item px-5">
        <Link to="/user-profile/requests" className="menu-link px-5 gap-1">
          <span className="menu-text">
            {" "}
            {intl.formatMessage({ id: "MyTickets" })}
          </span>
        </Link>
      </div>

      <Languages />

      <div className="menu-item px-5 my-1">
        <Link to="/user-profile/settings" className="menu-link px-5">
          {intl.formatMessage({ id: "AccountSettings" })}
        </Link>
      </div>

      <div className="menu-item px-5">
        <a
          onClick={async () => {
            logoutUser();
            window.location.href = "/auth/login";
            localStorage.setItem("hasSeenPopup", "false");
          }}
          className="menu-link px-5"
        >
          {intl.formatMessage({ id: "SignOut" })}
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
