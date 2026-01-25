import { Button, Modal, Row, Col, Collapse, Spinner } from "react-bootstrap";
import { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { fetchAssignMember } from "../../../legal/src/app/features/members";
import { AppDispatch } from "../../../legal/src/app/store/store";
import { RootState } from "../../store/store";
import { LawyerCreateValidationSchema } from "../../../shared/validations/AddLawyer";
import { addCauseAssignees, postAlternativeLawyer } from "../../../legal/src/app/features/causes";
import { showAlert } from "../../services/showAlert";
import { fetchAllLawyers, updateLawyerCauseCount } from "../../../legal/src/app/features/lawyer";
import AddLawyerPopup from "../../../legal/src/app/pages/list-of-Cases/popups/AddLawyerPopup";
import EmployeesListForGroup from "../../../legal/src/app/pages/list-of-Cases/components/EmployeesListForGroup";

interface AddSessionPopupProps {
  show: boolean;
  handleClose: () => void;
  setShowAccordionEdit?: any;
  causeId?: string;
  causeStageId?: string;
  comeFromSessionsList?: boolean;
  onSuccess?: () => void; 
  currentLawyerId?: string; 
}

interface Members {
  owner: Member[];
  supervisor: Member[];
  lawyers: Member[];
  dataEntry: Member[];
}

interface Member {
  id: string;
  userId: string;
  assignationType: number;
  fullName: string;
  stages: (
    | string
    | { lk_StageNameAr: string; lk_StageNameEn: string; sessionIds: string[] }
  )[];
}

const AddLawyersPopup = ({
  show,
  handleClose,
  causeId,
  onSuccess,
  currentLawyerId,
}: AddSessionPopupProps) => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [openSections, setOpenSections] = useState<number[]>([3]); // Default to show lawyers section
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<Members>({
    owner: [],
    supervisor: [],
    lawyers: [],
    dataEntry: [],
  });
  const [filteredMembers, setFilteredMembers] = useState<{
    owner: any[];
    supervisor: any[];
    lawyers: any[];
    dataEntry: any[];
    consultatives: any[];
  }>({ owner: [], supervisor: [], lawyers: [], dataEntry: [], consultatives: [] });
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // State variables for EmployeesListForGroup component
  const [employeeIds, setEmployeeIds] = useState<any[]>([]);
  const [membersChecked, setMembersChecked] = useState<any[]>([]);
  const [orgIds, setOrgIds] = useState<any[]>([]);
  const [employeeNames, setEmployeeNames] = useState<string>("");
  const [membersCheckedIds, setMembersCheckedIds] = useState<any[]>([]);
  
  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(LawyerCreateValidationSchema),
  });
  
  const dispatch = useDispatch<AppDispatch>();
  let theme = localStorage.getItem("Theme");

  const sections = [
    {
      id: 1,
      title: "DirectorGeneralOfAdministration",
    },
    {
      id: 2,
      title: "AdministrationManager",
    },
    {
      id: 3,
      title: "Advisors",
    },
    {
      id: 4,
      title: "dataEntry",
    },
    {
      id: 5,
      title: "Specialists",
    },
  ];

  const handleToggle = (id: number) => {
    setOpenSections((prevState) =>
      prevState.includes(id)
        ? prevState.filter((sectionId) => sectionId !== id)
        : [...prevState, id]
    );
  };

  const handleShowPopup = (title: string) => {
    setPopupTitle(intl.formatMessage({ id: title }));
    setShowPopup(true);
  };

  const fetchFilteredMembers = async (caseId: string) => {
    setLoading(true);
    const member = await dispatch(
      fetchAssignMember({
        causeId: caseId,
      }) as any
    ).unwrap();
    setFilteredMembers(member.result);
    setMembers(member.result);
    setLoading(false);
  };

  useEffect(() => {
    if (show && causeId && (searchTerm || searchTerm === "")) {
      fetchFilteredMembers(causeId);
    }
  }, [show, causeId, searchTerm]);

  // const renderTeamWorkContent = () => (
  //   // <Row className="bg-gray-100 p-6 rounded-2 mx-0">
  //   //   <h4 className="fw-bolder mb-8 px-0 text-handle">
  //   //     {intl.formatMessage({ id: "Teams" })}
  //   //   </h4>
  //   //   <Row className="w-100 align-items-center mb-5">
  //   //     <Col lg={12} sm={12} className={`mb-3`}>
  //   //       <div className="d-flex align-items-center bg-white bg-fix-dark border-fix-dark position-relative w-100">
  //   //         <span className="svg-icon svg-icon-1 position-absolute text-muted mx-3">
  //   //           <i className="fa-solid fa-search"></i>
  //   //         </span>
  //   //         <input
  //   //           type="text"
  //   //           className="form-control form-control-solid px-11 bg-white bg-fix-dark border-fix-dark"
  //   //           placeholder={intl.formatMessage({ id: "Search" })}
  //   //           onChange={(e) => {
  //   //             setSearchTerm(e.target.value);
  //   //           }}
  //   //           value={searchTerm}
  //   //         />
  //   //       </div>
  //   //     </Col>
  //   //   </Row>
  //   //   {loading ? (
  //   //     <div className="d-flex gap-4 justify-content-center align-items-center py-4">
  //   //       {intl.formatMessage({ id: "DataIsLoaded..." })}
  //   //       <Spinner animation="border" variant="primary" />
  //   //     </div>
  //   //   ) : (
  //   //     <Row className="g-3">
  //   //       {/* Show only Lawyers section (section 3) */}
  //   //       <Col xs={12}>
  //   //         <div
  //   //           className={`rounded p-3 ${
  //   //             theme == "dark" ? "bg-light" : "bg-white"
  //   //           }`}
  //   //         >
  //   //           <div className="d-flex justify-content-between align-items-center">
  //   //             <h4 className="mb-0 d-flex justify-content-center align-items-center text-handle">
  //   //               {intl.formatMessage({ id: "Advisors" })}
  //   //               {Array.isArray(filteredMembers?.lawyers) &&
  //   //               filteredMembers.lawyers.length > 0 ? (
  //   //                 <div className="me-3 px-3 bg-primary py-1 rounded-3 text-white fs-7">
  //   //                   {filteredMembers.lawyers.length}
  //   //                 </div>
  //   //               ) : null}
  //   //             </h4>
  //   //             <div>
  //   //               <Button
  //   //                 variant="link"
  //   //                 className="text-primary"
  //   //                 onClick={() => {
  //   //                   handleShowPopup("Advisors");
  //   //                 }}
  //   //               >
  //   //                 <i className="fa-solid fa-circle-plus fs-2"></i>
  //   //               </Button>
  //   //             </div>
  //   //           </div>

              
  //   //           <div className="mt-3">
  //   //             {Array.isArray(filteredMembers?.lawyers) && filteredMembers.lawyers.length > 0 ? (
  //   //               filteredMembers.lawyers.map((member, index) => {
  //   //                 const isSelected = selectedLawyerId === member.userId;
  //   //                 const isHovered = hoveredIndex === index;
  //   //                 return (
  //   //                   <div
  //   //                     key={index}
  //   //                     className={
  //   //                       `bg-white bg-fix-dark border-fix-dark p-3 rounded mb-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center selectable-item ${isSelected ? "selected" : ""}`
  //   //                     }
  //   //                     style={{ cursor: "pointer" }}
  //   //                     onClick={() => setSelectedLawyerId(member.userId)}
  //   //                     onMouseEnter={() => setHoveredIndex(index)}
  //   //                     onMouseLeave={() => setHoveredIndex(null)}
  //   //                   >
  //   //                     <Col
  //   //                       xs={12}
  //   //                       sm={6}
  //   //                       className="d-flex align-items-center mb-2 mb-sm-0"
  //   //                     >
  //   //                       <i className="fa-solid fa-circle-user fs-3 text-primary me-3"></i>
  //   //                       <div>
  //   //                         <span className="fw-bold text-handle">{member.fullName}</span>{" "}
  //   //                         <span className="text-muted">
  //   //                           ({intl.formatMessage({ id: "Internal" })})
  //   //                         </span>
  //   //                       </div>
  //   //                     </Col>
  //   //                     <div className="ms-auto d-flex align-items-center">
  //   //                       {isSelected && (
  //   //                         <i className="fa-solid fa-check-circle text-success fs-4"></i>
  //   //                       )}
  //   //                     </div>
  //   //                   </div>
  //   //                 );
  //   //               })
  //   //             ) : (
  //   //               <div className="text-center py-4">
  //   //                 <p className="text-muted mb-0">
  //   //                   {intl.formatMessage({ id: "NoLawyersFound" })}
  //   //                 </p>
  //   //               </div>
  //   //             )}
  //   //           </div>
  //   //         </div>
  //   //       </Col>
  //   //     </Row>
  //   //   )}
  //   // </Row>
  // );

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        handleClose();
        setSearchTerm("");
        setOpenSections([]);
      }}
      centered
      className={!show ? "inert" : ""}
    >
      <Modal.Header closeButton className="pb-3 border-bottom-0">
        <Modal.Title className="text-center position-relative w-100 text-handle">
          {intl.formatMessage({ id: "ChangeAdvisors" })}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
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
                membersCheckedIds={membersCheckedIds}
                setValue={setValue}
                filteredMembers={filteredMembers?.lawyers || []}
              />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between gap-2 pt-3">
        <Button
          variant="secondary"
          onClick={() => {
            handleClose();
            setSearchTerm("");
            setOpenSections([]);
            setSelectedLawyerId(null);
          }}
        >
          {intl.formatMessage({ id: "Close" })}
        </Button>
        <Button
          variant="success"
          onClick={async () => {
            // Check if any users are selected
            if (!employeeIds || employeeIds.length === 0) {
              showAlert(false, "PleaseSelectALawyer", intl);
              return;
            }

            try {
              setLoading(true);
              await dispatch(
                (postAlternativeLawyer as any)({
                  causeId,
                  userId: employeeIds,
                })
              ).unwrap().then((res: any) => {
                const key = res?.message;
                if (key === "TheLawyerIsAlreadyAssigned") {
                  showAlert(false, "TheLawyerIsAlreadyAssigned", intl);
                  return;
                }

                if (key === "CauseNotFound" || key === "causeNotFound") {
                  showAlert(false, "CauseNotFound", intl);
                  return;
                }
                showAlert(true, key || "AlternativeLawyersUpdatedSuccessfully", intl);
              });
              onSuccess && onSuccess();
              handleClose();
            } catch (error: any) {
              showAlert(false, "OperationFailed", intl);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              {intl.formatMessage({ id: "ChangingLoawyers" })}
            </>
          ) : (
            intl.formatMessage({ id: "Change" })
          )}
        </Button>
      </Modal.Footer>

      {/* Add Lawyer Popup */}
      {showPopup && (
        <AddLawyerPopup
          key={"Lawyers"}
          source=""
          show={showPopup}
          title={popupTitle}
          handleClose={() => setShowPopup(false)}
          fetchFilteredMembers={fetchFilteredMembers}
          filteredMembers={filteredMembers?.lawyers}
          searchTerm={searchTerm}
          causeStageId=""
          sessionId=""
        />
      )}
    </Modal>
  );
};

export default AddLawyersPopup;
