import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { SystemPagination } from "@4eplatform/shared/src/popups/SystemPagination";
import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { BasicDataList } from "./BasicDataList";
import { AddBasicDataPopup } from "@4eplatform/shared/src/popups/add-basicData-popup";
import { SavePopup } from "@4eplatform/shared/src/popups/SavePopup";
const DocumentationClass: FC<{ buttonName?: string }> = ({ buttonName }) => {
  const intl = useIntl();
  const [getBasicData, setBasicData] = useState([
    {
      id: "1",
      entityName: "MyCourses",
    },
    {
      id: "2",
      entityName: "MyTests",
    },
    {
      id: "3",
      entityName: "MyCertificates",
    },
    {
      id: "4",
      entityName: "TrainingCourses1",
    },
    {
      id: "5",
      entityName: "AddNewCourse",
    },
  ]);
  const [modalAShow, setModalAShow] = useState<boolean>(false);
  const [modalSShow, setModalSShow] = useState<boolean>(false);
  const [newEntity, setnewEntity] = useState<string | null>(null);

  useEffect(() => {
    if (newEntity) {
      const maxId = Math.max(
        ...getBasicData.map((item) => parseInt(item.id, 10))
      );

      const nextId = (maxId + 1).toString();

      setBasicData((prevState) => [
        ...prevState,
        { id: nextId, entityName: newEntity },
      ]);
    }
  }, [newEntity]);
  return (
    <>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div className="d-flex flex-column flex-lg-row gap-5 w-100 ">
            <div className=" card-xl-stretch mb-xl-0 w-100">
              {" "}
              <div className="card-header px-3 pt-3 pb-2 mb-3 align-items-center ">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fs-4 my-5 fw-bolder">
                    {intl.formatMessage({
                      id: "Add/ModifyBasicDataforSettings",
                    })}
                  </span>
                  <span className="mt-1 fw-semibold fs-6 text-muted my-5">
                    محتويات الصفحة :
                    {buttonName
                      ? intl.formatMessage({ id: buttonName })
                      : intl.formatMessage({ id: "ExternalAuthorities" })}
                  </span>
                </h3>
                <div className="my-3 d-flex justify-content-start ">
                  <button
                    className="btn btn-success"
                    onClick={() => setModalAShow(true)}
                  >
                    {" "}
                    {intl.formatMessage({
                      id: "Add",
                    })}
                  </button>
                </div>
              </div>
              <div className="card-body py-3 px-3 mx-8">
                <div className="card-title w-100 ">
                  <div className="d-flex align-items-center position-relative my-1">
                    <span
                      className={`svg-icon svg-icon-1 position-absolute ${
                        getCurrentSystemLanguage() == "ar" ? "me-6" : "ms-6"
                      }`}
                    >
                      <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                    </span>
                    <input
                      type="text"
                      data-kt-filemanager-table-filter="search"
                      className={`form-control form-control-solid  ${
                        getCurrentSystemLanguage() === "ar" ? "pe-15" : "ps-15"
                      }`}
                      placeholder={intl.formatMessage({
                        id: "Search",
                      })}
                    />
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
                    id="REGA-WS-caseList"
                  >
                    <thead>
                      <tr className="fw-bolder text-muted">
                        <th className="min-w-50px">
                          {intl.formatMessage({ id: "Numbering" })}
                        </th>
                        <th className="min-w-250px">
                          {intl.formatMessage({ id: "TheRegion" })}
                        </th>
                        <th className="min-w-150px text-center">
                          {intl.formatMessage({ id: "Actions" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getBasicData.map((basicData) => (
                        <tr key={basicData.id}>
                          <BasicDataList basicData={basicData} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <SystemPagination />
                  <div className="d-flex justify-content-end my-4">
                    <button
                      className="btn btn-primary "
                      onClick={() => setModalSShow(true)}
                    >
                      {" "}
                      {intl.formatMessage({ id: "Save" })}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <AddBasicDataPopup
          handleClose={() => setModalAShow(false)}
          showAdd={modalAShow}
          setnewEntity={setnewEntity}
        />
      </div>
      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <SavePopup handleClose={() => setModalSShow(false)} show={modalSShow} />
      </div>
    </>
  );
};

export default DocumentationClass;
