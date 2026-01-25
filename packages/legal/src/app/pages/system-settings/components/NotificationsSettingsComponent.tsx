import React, { FC, useState } from "react";
import { useIntl } from "react-intl";
import { ManagementHierarchyPopup } from "@4eplatform/shared/src/popups/ManagementHierarchyPopup";
import { EditPopup } from "@4eplatform/shared/src/popups/EditPopup";
import { useNavigate } from "react-router-dom";

const NotificationsSettingsComponent: FC = () => {
  const intl = useIntl();
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const navigate = useNavigate();

  return (
    <>
      <div className="card shadow p-6 mb-7">
        <div className="px-3 mb-1">
          <p className="fw-bolder fs-4 text-primary">
            {intl.formatMessage({ id: "GeneralSettings" })}
          </p>
        </div>
        <hr />
        <div className="mt-2 px-3">
          <div className="card-body d-flex flex-center flex-column">
            <div className="symbol symbol-75px mb-2 toolsIcon">
              <span className="symbol-label bg-light-info">
                <span className="svg-icon svg-icon-4x svg-icon-info">
                  <i className="bi bi-graph-up-arrow fs-3x"></i>
                </span>
                <span className="top-icon">
                  <i className="bi bi-tools"></i>
                </span>
              </span>
            </div>

            <span className="fs-5 text-gray-800 fw-bolder">اسم النظام</span>

            <div className="fw-bold text-gray-400 mb-6">وصف النظام</div>
          </div>
        </div>
        <div className="row gy-5 p-3">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="mb-4">
              <label htmlFor="SystemName" className="mb-2 required">
                {intl.formatMessage({ id: "SystemNameInArabic" })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fa-solid fa-gear"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="SystemName"
                  placeholder={intl.formatMessage({ id: "SystemName" })}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="mb-4">
              <label htmlFor="SystemName" className="mb-2 required">
                {intl.formatMessage({ id: "SystemNameInEnglish" })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fa-solid fa-gear"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="SystemName"
                  placeholder={intl.formatMessage({ id: "SystemName" })}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="mb-4">
              <label htmlFor="ManagementName" className="mb-2 required">
                {intl.formatMessage({ id: "FollowingManagementName" })}
              </label>
              <div className="position-relative">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="special fas fa-user-shield"></i>
                    </span>
                  </div>
                  <input
                    style={{
                      paddingLeft: intl.locale == "ar" ? "2.75rem" : "",
                      paddingRight: intl.locale == "en" ? "2.75rem" : "",
                    }}
                    type="text"
                    className="form-control"
                    id="ManagementName"
                    placeholder={intl.formatMessage({
                      id: "FollowingManagementName",
                    })}
                  />
                  <div
                    className="position-absolute translate-middle-y"
                    style={{
                      top: "50%",
                      left: intl.locale == "ar" ? "15px" : "",
                      right: intl.locale == "en" ? "15px" : "",
                    }}
                  >
                    <i
                      className="bi bi-diagram-3 cursor-pointer fs-1 text-muted"
                      onClick={() => setModalHShow(true)}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="mb-4">
              <label htmlFor="CardDescription" className="mb-2 required">
                {intl.formatMessage({ id: "Description" })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fa-solid fa-circle-info"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="CardDescription"
                  placeholder={intl.formatMessage({
                    id: "Description",
                  })}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="mb-4">
              <label htmlFor="Icon" className="mb-2 required">
                {intl.formatMessage({ id: "Icon" })}
              </label>
              <div className="position-relative">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="special fa-solid fa-icons"></i>
                    </span>
                  </div>
                  <input
                    style={{
                      paddingLeft: intl.locale == "ar" ? "2.75rem" : "",
                      paddingRight: intl.locale == "en" ? "2.75rem" : "",
                    }}
                    type="text"
                    className="form-control"
                    id="Icon"
                    placeholder={intl.formatMessage({ id: "Icon" })}
                  />
                  <div
                    style={{
                      top: "50%",
                      left: intl.locale == "ar" ? "15px" : "",
                      right: intl.locale == "en" ? "15px" : "",
                    }}
                    className="position-absolute translate-middle-y"
                  >
                    <i className="fa-solid fa-link fs-5 text-muted"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="mb-4">
              <label htmlFor="Color" className="mb-2 required">
                {intl.formatMessage({ id: "Color" })}
              </label>
              <select
                id="Color"
                className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                data-placeholder="اختر"
                tabIndex={-1}
                aria-hidden="true"
                defaultValue="0"
              >
                <option disabled value="0">
                  {intl.formatMessage({ id: "Color" })}
                </option>
                <option value="1">احمر</option>
                <option value="2">اخضر</option>
                <option value="3">اصفر</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="mb-4">
              <label htmlFor="CardLink" className="mb-2 required">
                {intl.formatMessage({ id: "SystemLink" })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="special fa-solid fa-link"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="CardLink"
                  placeholder={intl.formatMessage({ id: "SystemLink" })}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="mb-4">
              <label htmlFor="CardLink" className="mb-2 required">
                {intl.formatMessage({ id: "MainSystem" })}
              </label>
              <select
                id="MainSystem"
                className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                data-placeholder="اختر"
                tabIndex={-1}
                aria-hidden="true"
                defaultValue="0"
              >
                <option disabled value="0">
                  {intl.formatMessage({ id: "MainSystem" })}
                </option>
                <option value="1">نظام 1</option>
                <option value="2">نظام 2</option>
                <option value="3">نظام 3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center my-5">
        <button
          type="reset"
          className="btn btn-secondary px-15 me-5"
          onClick={() => navigate(-1)}
        >
          {intl.formatMessage({ id: "Cancel" })}
        </button>

        <div
          onClick={() => handleShowEdit()}
          className="btn btn-primary px-15 ms-5"
        >
          {intl.formatMessage({ id: "Save" })}
        </div>
      </div>
      <ManagementHierarchyPopup
        show={modalHShow}
        handleClose={() => setModalHShow(false)}
      />
      <EditPopup handleCloseEdit={handleCloseEdit} showEdit={showEdit} />
    </>
  );
};

export default NotificationsSettingsComponent;
