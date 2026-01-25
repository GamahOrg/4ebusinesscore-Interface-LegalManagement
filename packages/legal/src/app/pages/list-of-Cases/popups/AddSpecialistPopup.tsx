import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import EmployeesListForGroup from "../components/EmployeesListForGroup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddMemberProps,
  AddMemberSchema,
} from "../../judgements-managements/Validations/AddMemberSchema";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { addCauseAssignees } from "../../../features/causes";
import { Button, Spinner } from "react-bootstrap";

type AddSpecialistPopupProps = {
  show?: any;
  handleClose?: any;
  title?: any;
  source?: string;
  fetchFilteredMembers: (
    caseId: string,
    searchWord: string,
    causeStageId: string,
    sessionId: string
  ) => Promise<void>;
  filteredMembers?: any;
  causeStageId?: string;
  sessionId?: string;
  searchTerm?: string;
};

const AddSpecialistPopup: React.FC<AddSpecialistPopupProps> = ({
  show,
  handleClose,
  title,
  source,
  fetchFilteredMembers,
  filteredMembers,
  causeStageId,
  sessionId,
  searchTerm,
}) => {
  const intl = useIntl();
  let dispatch = useAppDispatch();

  const [membersChecked, setMembersChecked] = useState<string[]>([]);
  const [employeeIds, setEmployeeIds] = useState<string[]>([]);
  const [employeeNames, setEmployeeNames] = useState<string[]>([]);
  const [orgIds, setOrgIds] = useState<string[]>([]);
  const [membersCheckedIds, setMembersCheckedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);  

  const causeId = useAppSelector((state) => state.causes.causeById.id);
  useEffect(() => {
    setMembersCheckedIds(membersChecked.map((item: any) => item.userId));
  }, [membersChecked]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddMemberProps>({
    resolver: yupResolver(AddMemberSchema),
    defaultValues: {
      member: [],
    },
  });
  const addSpecialist = async () => {
    setLoading(true);
    const payload = {
      causeId,
      assignees: membersCheckedIds.map((userId) => ({
        assignationType: 5,
        userId,
      })),
    };

    try {
      await dispatch(addCauseAssignees(payload) as any);
      fetchFilteredMembers(causeId,
        searchTerm || "",
        causeStageId || "",
        sessionId || "" ); 
      setValue("member", []);
      handleClose();
      showSuccessAlert();
    } catch (error) {
      console.error("Failed to dispatch:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const showSuccessAlert = () => {
    showAlert(true, "SavedSuccessfully", intl, () => {
      handleClose();
    });
  };

  const resetSelection = () => {
    setMembersChecked([]); // Reset the selected members
  };
useEffect(()=>{
     setValue("member",membersCheckedIds)
  },[membersCheckedIds])
  return (
    <div>
      <div className="modal fade ">
        <Modal
          aria-labelledby="contained-modal-title-center"
          centered
          show={show}
          onHide={handleClose}
          size="lg"
          className={!show ? "inert" : ""}
        >
          <div className="card">
            <Modal.Header
              closeButton
              style={{
                alignItems: intl.locale === "ar" ? "flex-start" : "center",
                flexDirection: intl.locale === "en" ? "column-reverse" : "row",
              }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0">
                <Modal.Title>
                  <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                    <span className="card-label fs-4 my-5 fw-bolder">
                      {title}
                    </span>
                  </h3>
                </Modal.Title>
              </div>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={handleSubmit(addSpecialist)}
                noValidate
                className="form outputForm"
              >
                <div className="row">
                  <div className="mt-4">
                  <EmployeesListForGroup
                      position="relative"
                      employeeIds={employeeIds}
                      setEmployeeIds={setEmployeeIds}
                      membersChecked={membersChecked}
                      setMembersChecked={setMembersChecked}
                      orgIds={orgIds}
                      setOrgIds={setOrgIds}
                      employeeNames={employeeNames}
                      setEmployeeNames={setEmployeeNames}
                      register={register}
                      errors={errors}
                      // resetSelection={resetSelection}
                      membersCheckedIds={membersCheckedIds}
                      setValue={setValue}
                      filteredMembers={filteredMembers}
                    />
                  </div>
                </div>

                <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                  <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                    <div className="d-flex justify-content-center align-items-center w-50">
                      <div
                        data-bs-dismiss="modal"
                        className="btn btn-secondary mx-1 text-center w-100"
                        onClick={handleClose}
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </div>
                      {!loading ? (
                          <button
                          type="submit"
                          className="btn btn-success mx-1 text-center w-100"
                        >
                          {intl.formatMessage({ id: "Agree" })}
                        </button>
                      ):(
                        <Button variant="success" disabled className="mb-3 d-flex justify-content-center align-items-center gap-2 text-nowrap" >
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="mx-2"
                            />
                            <span>{intl.formatMessage({ id: "Adding" })}</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </div>
        </Modal>
      </div>
      <div className="modal fade" id="Rega_modal_viewEmployee_hierarchy"></div>
    </div>
  );
};

export default AddSpecialistPopup;
