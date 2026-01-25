import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import ViewJudgmentTextPopup from "../popups/ViewJudgmentTextPopup";
import EditJudgmentPopup from "../popups/EditJudgmentPopup";
import AddJudgeInstrumentPopup from "../popups/AddJudgeInstrumentPopup";


type ActionProps = {
    id: string ;
    status: string | number;
    handleNavigate: any;
    pageNumber:number;
    pageSize:number;
    searchTerm:string;
    selectedCause:string;
    selectedDegree:string;
    selectedJudgement?:any;
};

export const TableActions: FC<ActionProps> = ({ id, status, handleNavigate ,
    pageNumber,
    pageSize,
    searchTerm,
    selectedCause,
    selectedDegree,
    selectedJudgement,
}) => {
    const intl = useIntl();
    const [showEditJudgment, setShowEditJudgment] = useState<boolean>(false);
    const [showViewJudgmentText, setShowViewJudgmentText] = useState<boolean>(false);
    const [showAddJudgeInstrument, setShowAddJudgeInstrument] =
    useState(false);
    const sessionDate = new Date(selectedJudgement?.sessionDate);
    const plus15Days = new Date(sessionDate);
    plus15Days.setDate(sessionDate.getDate() + 15);
    const today = new Date();
    
    return (
        <>
            <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle
                    split
                    variant="none"
                    className="p-0 text-center"
                    id="dropdown-custom-2"
                    name="edit"
                      aria-label="More options"
                >
                    <i className="bi bi-three-dots fs-2 text-gray-700"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="p-1">
                    <Dropdown.Item as="button" className="menu-link px-3 py-2 my-1 text-muted mx-0">
                        <div
                            onClick={() => setShowViewJudgmentText(true)}
                        >
                            <div className="text-dark">
                                <i className="fa-solid fa-eye mx-2 fs-4"></i>
                                {intl.formatMessage({
                                    id: "ViewTheTermsOfTheSession",
                                })}
                            </div>
                        </div>
                    </Dropdown.Item>
                     {
                        status !== "منتهية" &&
                         true && (
                             <Dropdown.Item as="button" className="menu-link px-3 py-2 my-1 text-muted mx-0">
                             <div onClick={() => setShowEditJudgment(true)}>
                             <div className="text-dark">
                             <i className="fa-solid fa-pen-to-square fs-4 mx-2"></i>
                             {intl.formatMessage({
                                 id: "Edit",
                                })}
                                </div>
                                </div>
                                </Dropdown.Item>
                            )
                        }           


                    {today >= plus15Days && (
                        <Dropdown.Item as="button" className="menu-link px-3 py-2 my-1 text-muted mx-0">
                            <div onClick={() => setShowAddJudgeInstrument(true)}>
                                <div className="text-dark">
                                         <i className="fas fa-plus me-2"></i>
                                    {intl.formatMessage({
                                        id: "AddJudgmentInstrument",
                                    })}
                                </div>
                            </div>
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>

            {/* {showViewJudgmentText &&
                <ViewJudgmentTextPopup show={showViewJudgmentText} handleClose={() => setShowViewJudgmentText(false)}  />
            } */}
            {showViewJudgmentText &&
                <ViewJudgmentTextPopup show={showViewJudgmentText} handleClose={() => setShowViewJudgmentText(false)} judgmentId={id} />
            }

            {showEditJudgment &&
                <EditJudgmentPopup show={showEditJudgment} handleClose={() => setShowEditJudgment(false)} 
                judgmentId={id} 
                pageNumber={pageNumber}
                pageSize={pageSize}
                searchTerm={searchTerm}
                selectedCause ={selectedCause}
                selectedDegree ={selectedDegree} />
            }

            {showAddJudgeInstrument &&
                <AddJudgeInstrumentPopup 
                show={showAddJudgeInstrument}
                 handleClose={() => setShowAddJudgeInstrument(false)} 
                 judgement={selectedJudgement}
              />
            }
        </>
    );

};
