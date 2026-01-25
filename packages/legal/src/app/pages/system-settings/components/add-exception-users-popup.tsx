import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { ChangeEvent, FC, RefObject, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";

type AddExceptionUsersPopupProps = {
  show: boolean;
  handleClose: () => void;
};
const AddExceptionUsersForEditPopup: FC<AddExceptionUsersPopupProps> = ({
  show,
  handleClose,
}) => {
  const intl = useIntl();
  const selectAllRef: RefObject<HTMLInputElement> = useRef(null);
  const showAlert = (messageAddFail: boolean, text: string) => {
    Swal.fire({
      text: text,
      icon: messageAddFail ? "warning" : "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: `btn ${messageAddFail ? "btn-primary" : "btn-primary"}`,
      },
    }).then((result) => {
      handleClose();
    });
  };

  const [recordsTableData, setRecordsTableData] = useState<any>([
    {
      userId: "0DC0BAC5-478B-40DB-2C6D-08DCC23D235A",
      userName: "esraafoda",
      userFullName: "Esraa sayed mohamed  foda",
      imageUrl: "",
      email: "esraasayed400@gmail.com",
    },
    {
      userId: "252A5EAA-DCE7-44C0-2C6E-08DCC23D235A",
      userName: "Shimaa",
      userFullName: "Shimaa Ahmed Ali  Ali",
      imageUrl: "",
      email: "Shimaa@gmail.com",
    },
    {
      userId: "15904EB0-32C1-4DE7-2C6F-08DCC23D235A",
      userName: "aya",
      userFullName: "Aya Ahmed Hassan  Ahmed ",
      imageUrl: "",
      email: "aya4@gmail.com",
    },
    {
      userId: "A16E676A-DAA4-4CB6-9ED2-08DCC4CB58B8",
      userName: "SalmaElzeheiry",
      userFullName: "سلمي عادل عباس الزهيري",
      imageUrl:
        "wwwroot/Uploads/ProfilePicture/a16e676a-daa4-4cb6-9ed2-08dcc4cb58b8/9TEX95VudSOTx1L1lvk60Abqi.jpg",
      email: "salma@hotmail.com",
    },
    {
      userId: "3EB17E81-EDE8-4B02-90A1-3625E695AF03",
      userName: "SystemAdmin",
      userFullName: "Mostafa Mohamed undefined undefined",
      imageUrl: "null",
      email: "SystemAdmin@gmail.com",
    },
    {
      userId: "702CB42B-6FDF-4D15-8F9D-80D093CED898",
      userName: "amousa",
      userFullName: "adel mousa  ",
      imageUrl: "wwwroot/Uploads/DefaultImages/Users/MaleUser.jpg",
      email: "adel.mousa@example.com",
    },
  ]);
  const [allRecordsTableData, setAllRecordsTableData] = useState<any>([]);

  const [checkedUserIds, setCheckedUserIds] = useState<string[]>([]);

  function selectAllRecord(e: ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;
    const newCheckedUserIds = isChecked
      ? recordsTableData?.map((item: any) => item?.userId)
      : [];

    const items: any[] = recordsTableData?.map((item: any): any => {
      item.isChecked = isChecked;
      return item;
    });

    setRecordsTableData([...items]);
    setCheckedUserIds(newCheckedUserIds);
  }
  const handleSelectRecord = (input: any) => {
    const newCheckedUserIds = (checkedUserIds || []).includes(input?.userId)
      ? checkedUserIds?.filter((id) => id !== input?.userId)
      : [...(checkedUserIds || []), input?.userId];

    setCheckedUserIds(newCheckedUserIds);
  };

  const deepEqual = (obj1: any, obj2: any) => {
    if (obj1 === obj2) return true;

    if (
      typeof obj1 !== "object" ||
      obj1 === null ||
      typeof obj2 !== "object" ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  };
  useEffect(() => {
    const updatedRecords = recordsTableData?.map((user: any) => ({
      ...user,
      isChecked: checkedUserIds?.includes(user?.userId),
    }));
    const updatedAllRecords = allRecordsTableData?.map((user: any) => ({
      ...user,
      isChecked: checkedUserIds?.includes(user?.userId),
    }));

    if (!deepEqual(updatedRecords, recordsTableData)) {
      setRecordsTableData(updatedRecords);
      setAllRecordsTableData(updatedAllRecords);
    }
  }, [checkedUserIds, recordsTableData]);

  return (
    <div className="modal-dialog modal-xl" style={{ width: "80%" }}>
      <Modal
        centered
        show={show}
        onHide={() => {
          handleClose();
        }}
        size="xl"
      >
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="fw-bolder  pb-8">
            <h1 className="mb-3 text-center ">
              {intl.formatMessage({ id: "AddUser" })}
            </h1>
          </div>

          <div className="mb-10">
            <div className="py-3"></div>
            <div className="table-responsive fs-6 ">
              <table className="table table-borderless align-middle">
                <thead className="p-2 text-center fw-bolder border">
                  <tr>
                    <td className="p-2">
                      <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                        <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="checkbox"
                          defaultValue={0}
                          ref={selectAllRef}
                          onChange={selectAllRecord}
                          checked={
                            checkedUserIds?.length === recordsTableData?.length
                          }
                        />
                      </div>
                    </td>
                    <td className="p-5">
                      {intl.formatMessage({
                        id: "Name",
                      })}
                    </td>
                  </tr>
                </thead>
                <tbody className="p-4 border">
                  {recordsTableData?.map((user: any, index: number) => (
                    <tr key={user?.userId} className="fw-lighter">
                      <td className="p-2">
                        <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                          <input
                            className="form-check-input widget-9-check xCheckBg"
                            type="checkbox"
                            name={user?.userName}
                            checked={user?.isChecked}
                            onClick={() => handleSelectRecord(user)}
                          />
                        </div>
                      </td>
                      <td className="d-flex  py-4">
                        <div className="d-flex">
                          <div className="symbol symbol-45px symbol-circle ms-2">
                            <img
                              alt="Pic"
                              src={toAbsoluteUrl(`/media/avatars/300-3.webp`)}
                            />
                          </div>
                          <div>
                            <div className="fs-5 fw-bolder mb-2 d-flex justify-content-start">
                              {user?.userFullName}
                            </div>
                            <div className="fw-bold text-muted">
                              {user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center mt-5">
                <button
                  type="reset"
                  onClick={() => {
                    handleClose();
                  }}
                  aria-hidden="true"
                  className="btn btn-secondary px-15 me-5"
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  disabled={checkedUserIds?.length === 0}
                  onClick={() => {
                    showAlert(
                      false,
                      intl.formatMessage({ id: "AddedSuccessfully" })
                    );
                    handleClose();
                  }}
                  className="btn btn-success px-15 ms-5"
                >
                  {intl.formatMessage({ id: "Add" })}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddExceptionUsersForEditPopup;
