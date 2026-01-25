import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { SavePopup } from "@4eplatform/shared/src/popups/SavePopup";
import { RootState, useAppDispatch } from "../../../store/store";
import { fetchAllLKCauseCategories } from "../../../features/lk-cause-categories";
import { useSelector } from "react-redux";
import { fetchAllLKStage } from "../../../features/stage";
import { getLitigantConsume } from "../../../features/litigant-consume";
import { AssignationType, LitigantStatus } from "../../../models/LegalEnums";
import { searchSelectStylesModeStyles } from "@4eplatform/shared/functions/searchSelectStylesModeStyles";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { fetchAssignMember } from "../../../features/members";
import { fetchAllCauses } from "../../../features/cause";
type AddPopupProps = {
  show?: any;
  handleClose?: any;
  setFilter?: any;
  filter?: any;
  setPageIndex?: any;
  pageSize?: any;
  pageIndex?: any;
  setCauses?: any;
  searchTerm ?:string;
  clientTypiesFilter?:any;
};

const FilterCasesPopup: React.FC<AddPopupProps> = ({
  show,
  handleClose,
  setFilter,
  filter,
  setPageIndex,
  pageSize,
  pageIndex,
  setCauses,
  searchTerm,
  clientTypiesFilter,
}) => {
  const intl = useIntl();

  const [showSavePopup, setShowSavePopup] = useState(false);

  const LitigationStatusOptions = [
    {
      id: 5,
      name: `${intl.formatMessage({
        id: "CrossedOut",
      })}`,
    },
    {
      id: 4,
      name: `${intl.formatMessage({
        id: "Pending1",
      })}`,
    },
    {
      id: 3,
      name: `${intl.formatMessage({
        id: "Finished",
      })}`,
    },
    {
      id: 2,
      name: `${intl.formatMessage({
        id: "Perspective",
      })}`,
    },
    {
      id: 1,
      name: `${intl.formatMessage({
        id: "New",
      })}`,
    },
  ];
  // start integration
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (show) {
      dispatch(
        fetchAllLKCauseCategories({
          PageNumber: 1,
          pageSize: 1000,
        })
      );
      dispatch(fetchAllLKStage({}));
      dispatch(
        getLitigantConsume({
          PageIndex: 1,
          PageSize: 1000,
          status: LitigantStatus?.Client,
        })
      );
      dispatch(
        fetchAssignMember({
          NotDuplicate:true,
        }) as any
      );
    }
  }, [show]);
  const causeCategories: any = useSelector(
    (state: RootState) => state?.lkCauseCategories?.lkCauseCategories
  );
  const causeStages = useSelector(
    (state: RootState) => state?.lkSatge?.lkStages
  );
  const clientsData = useSelector((state: RootState) => {
    return state?.libability?.litigantConsume;
  });
  const assignMembersLawyers = useSelector((state: RootState) => {
    return state?.members?.members?.lawyers;
  });
  const assignMembersDataEntry = useSelector((state: RootState) => {
    return state?.members?.members?.dataEntry;
  });
  const assignMembersOwner = useSelector((state: RootState) => {
    return state?.members?.members?.owner;
  });
  const assignMembersDataSuperVisors = useSelector((state: RootState) => {
    return state?.members?.members?.supervisor;
  });
  const mergedMembers = [
    ...(assignMembersLawyers || []),
    ...(assignMembersDataEntry || []),
    ...(assignMembersOwner || []),
    ...(assignMembersDataSuperVisors || []),
  ];
const mergedMembersOptions = Array.isArray(mergedMembers)
  ? mergedMembers
      .filter((member: any) => member?.fullName?.trim())
      .map((member: any) => ({
        value: member.id,
        label: member.fullName,
        userId: member.userId,
      }))
  : [];
  const language = intl.locale;
  let darkMode = localStorage.getItem("Theme") == "dark" ? true : false;
  const clientsOptions =
    Array.isArray(clientsData) &&
    clientsData?.map((client: any) => ({
      value: client?.id,
      label: client?.name,
      id: client?.id,
      name: client?.name,
    }));
  const causeStagesOptions =
    Array.isArray(causeStages) &&
    causeStages?.map((stage: any) => ({
      value: stage?.id,
      label: language == "ar" ? stage?.nameAr : stage?.nameEn,
      id: stage.id,
      nameAr: stage.nameAr,
      nameEn: stage.nameEn,
    }));
  const { control } = useForm();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [stages, setStages] = useState<any>([]);
  const [clients, setClients] = useState<any>([]);
  const [selectedLitgationStatus, setSelectedLitgationStatus] = useState<any>(
    []
  );
  const [selectedMembers, setSelectedMembers] = useState<any>([]);
  useEffect(() => {
    setFilter((prev: any) => {
      return {
        ...prev,
        Lk_StageIds: stages?.map((item: any) => ({
          id: item.id,
          nameAr: item.nameAr,
          nameEn: item.nameEn,
        })),
      };
    });
  }, [stages]);

  useEffect(() => {
    setFilter((prev: any) => {
      return {
        ...prev,
        LitigantIds: clients?.map((item: any) => ({
          id: item.id,
          nameAr: item.nameAr,
          nameEn: item.nameEn,
        })),
      };
    });
  }, [clients]);

  useEffect(() => {
    setFilter((prev: any) => {
      return {
        ...prev,
        UserIds: selectedMembers?.map((member: any) => member?.userId),
      };
    });
  }, [selectedMembers]);
  let handleFilter = () => {
    const params = new URLSearchParams();
    if (filter?.causeNumber) {
      params.append("CauseNumber", filter?.causeNumber);
    }
    if (filter?.subject) {
      params.append("Subject", filter?.subject);
    }
    if (filter?.Lk_StageIds?.length > 0) {
      filter?.Lk_StageIds?.forEach((item: any, index: number) => {
        params.append(`Lk_StageIds[${index}]`, item?.id);
      });
    }
    if (filter?.LK_CauseCategories) {
      params.append("LK_CauseCategories", filter?.LK_CauseCategories);
    }
    if (filter?.LitigantIds?.length > 0) {
      filter?.LitigantIds?.forEach((ele: any, index: number) => {
        params.append(`LitigantIds[${index}]`, ele.id);
      });
    }
    if (filter?.CauseStatus) {
      params.append("CauseStatus", filter?.CauseStatus);
    }
    if (filter?.UserIds?.length > 0) {
      filter?.UserIds?.forEach((item: any, index: number) => {
        params.append(`UserIds[${index}]`, item);
      });
    }
    params.append("pageIndex", pageIndex);
    params.append("pageSize",pageSize);
    if (searchTerm) {
      params.append('searchWord', searchTerm);
    }
    clientTypiesFilter.forEach((type) => {
      params.append('clientTypeFilter', type.toString());
    });
    // setPageIndex(1);
    dispatch(fetchAllCauses(params) as any).then((res: any) => {
      setCauses(res?.payload?.result);
    });
  };
  let handleResetFilter = () => {
    setFilter({
      causeNumber: "",
      subject: "",
      CauseStatus: "",
      Lk_StageIds: [],
      LK_CauseCategories: "",
      UserIds: [],
      LitigantIds: [],
    });
    setStages([]);
    setClients([]);
    setSelectedCategory([]);
    setSelectedLitgationStatus([]);
    setSelectedMembers([]);
    setPageIndex(1);
    dispatch(fetchAllCauses({ pageSize, pageIndex }) as any).then(
      (res: any) => {
        setCauses(res?.payload?.result);
      }
    );
  };
  return (
    <>
      <div className="modal fade">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
          className={!show ? "inert" : ""}
        >
          <div className="card">
            <Modal.Header
              closeButton
              style={{
                alignItems: intl.locale == "ar" ? "flex-start" : "center",
                flexDirection: intl.locale == "en" ? "column-reverse" : "row",
              }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
                <Modal.Title>
                  <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                    <span className="card-label fs-4 my-5">
                      {" "}
                      {intl.formatMessage({ id: "DataFiltering" })}
                    </span>
                    <span className="mt-1 fw-semibold fs-6 text-muted my-5">
                      {intl.formatMessage({
                        id: "PleaseEnterTheFollowingData",
                      })}{" "}
                    </span>
                  </h3>
                </Modal.Title>
              </div>
            </Modal.Header>
            <Modal.Body>
              <form noValidate className="form outputForm">
                <div className="row">
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="Casenumber"
                      className="form-label px-2 fontSz-6"
                    >
                      {intl.formatMessage({ id: "Casenumber" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-signature"></i>
                        </span>
                      </div>
                      <input
                        id="Casenumber"
                        type="text"
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "Casenumber",
                        })}
                        name="Casenumber"
                        value={filter?.causeNumber}
                        onChange={(e) => {
                          setFilter({
                            ...filter,
                            causeNumber: e?.target?.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="CaseSubject"
                      className="form-label px-2 fontSz-6"
                    >
                      {intl.formatMessage({ id: "CaseSubject" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-signature"></i>
                        </span>
                      </div>
                      <input
                        id="CaseSubject"
                        type="text"
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "CaseSubject",
                        })}
                        name="CaseSubject"
                        value={filter?.subject}
                        onChange={(e) => {
                          setFilter({
                            ...filter,
                            subject: e?.target?.value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <label className="form-label px-2  fs-6 text-gray-700">
                      {intl.formatMessage({ id: "TheLawsuit" })}
                    </label>

                    <Controller
                      name="TheLawsuit"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="TheLawsuit"
                          className="react-select__container"
                          placeholder={intl.formatMessage({
                            id: "TheLawsuit",
                          })}
                          options={causeStagesOptions || []}
                          isClearable={true}
                          isMulti={true}
                          styles={searchSelectStylesModeStyles(darkMode)}
                          noOptionsMessage={() =>
                            intl.formatMessage({
                              id: "NotAvailable",
                            })
                          }
                          value={stages}
                          onChange={(selectedOptions) => {
                            field.onChange(selectedOptions);
                            setStages(selectedOptions || []);
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <div className="mb-2">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {intl.formatMessage({ id: "LitigationStatus" })}
                      </label>
                      <select
                        id="LitigationStatus"
                        className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                        data-placeholder="اختر"
                        tabIndex={-1}
                        name="LitigationStatus"
                        value={selectedLitgationStatus}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          setSelectedLitgationStatus(selectedValue);
                          setFilter((prev) => {
                            return {
                              ...prev,
                              CauseStatus: selectedValue,
                            };
                          });
                        }}
                      >
                        <option disabled value={""}>
                          {intl.formatMessage({ id: "Choose" })}
                        </option>
                        {LitigationStatusOptions?.map((status: any) => {
                          return (
                            <option key={status?.id} value={status?.id}>
                              {status?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <div className="mb-2">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {intl.formatMessage({ id: "Assignment" })}
                      </label>
                      <Controller
                        name="Assignment"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Select
                            {...field}
                            id="Assignment"
                            className="react-select__container"
                            placeholder={intl.formatMessage({
                              id: "Assignment",
                            })}
                            options={mergedMembersOptions || []}
                            isClearable={true}
                            isMulti={true}
                            styles={searchSelectStylesModeStyles(darkMode)}
                            noOptionsMessage={() =>
                              intl.formatMessage({
                                id: "NotAvailable",
                              })
                            }
                            value={selectedMembers}
                            onChange={(selectedOptions) => {
                              field.onChange(selectedOptions);
                              setSelectedMembers(selectedOptions || []);
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <div className="mb-2">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {intl.formatMessage({ id: "CaseClassification" })}
                      </label>
                      <select
                        id="CaseClassification"
                        className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                        data-placeholder="اختر"
                        name="CaseClassification"
                        value={selectedCategory}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          setSelectedCategory(selectedValue);
                          setFilter((prev) => {
                            return {
                              ...prev,
                              LK_CauseCategories: selectedValue,
                            };
                          });
                        }}
                      >
                        <option value={""}>
                          {intl.formatMessage({ id: "Choose" })}
                        </option>
                        {Array.isArray(causeCategories) &&
                          causeCategories.map((category: any) => (
                            <option key={category?.id} value={category?.id}>
                              {language === "ar"
                                ? category.nameAr
                                : category.nameEn}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <div className="mb-2">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {intl.formatMessage({ id: "Clients" })}
                      </label>
                      <Controller
                        name="userId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Select
                            {...field}
                            id="ClientName"
                            className="react-select__container"
                            placeholder={intl.formatMessage({
                              id: "SelectClientName",
                            })}
                            options={clientsOptions || []}
                            isClearable={true}
                            isMulti={true}
                            styles={searchSelectStylesModeStyles(darkMode)}
                            noOptionsMessage={() =>
                              intl.formatMessage({
                                id: "NotAvailableUserName",
                              })
                            }
                            value={clients}
                            onChange={(selectedOptions) => {
                              field.onChange(selectedOptions);
                              setClients(selectedOptions || []);
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <div className="d-flex pt-12">
                <button
                  type="reset"
                  className="btn btn-light me-3"
                  onClick={() => {
                    handleClose();
                    handleResetFilter();
                  }}
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={() => {
                    handleFilter();
                    handleClose();
                  }}
                >
                  <span className="indicator-label">
                    {" "}
                    {intl.formatMessage({ id: "Agree" })}
                  </span>
                </button>
              </div>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
      <div className="modal fade" id="Rega_modal_viewEmployee_hierarchy"></div>

      <SavePopup
        show={showSavePopup}
        handleClose={() => setShowSavePopup(false)}
      />
    </>
  );
};

export default FilterCasesPopup;
