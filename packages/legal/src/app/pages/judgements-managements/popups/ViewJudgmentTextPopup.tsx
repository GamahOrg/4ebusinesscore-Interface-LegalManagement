import { useEffect, useState } from "react";
import { Modal, Spinner } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchJudgementById } from "../../../features/judgement-ground";

interface ViewJudgmentTextPopupProps {
    show: boolean;
    handleClose: () => void;
    judgmentId?: string; 
}

const ViewJudgmentTextPopup = ({ show, handleClose, judgmentId }: ViewJudgmentTextPopupProps) => {
    const intl = useIntl();
    const dispatch = useAppDispatch();
    const [judgmentText, setJudgmentText] = useState("");
    const [loading, setLoading] = useState(true);

    const { status, judgementGroundsById } = useAppSelector(
        (state) => state.judgementGround
    );
    
    useEffect(() => {
        if (judgmentId) {
            setLoading(true);
            dispatch(fetchJudgementById(judgmentId) as any);
        }
    }, [judgmentId, dispatch]);
    
    useEffect(() => {
        if (judgementGroundsById?.judgementStatement) {
            setJudgmentText(judgementGroundsById.judgementStatement);
            setLoading(false);
        }
    }, [judgementGroundsById]);

    return (
        <Modal size="lg" show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center position-relative">
                    {intl.formatMessage({ id: "SessionPrompts" })}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="p-1">
                    <div className="bg-light rounded p-2">
                        {loading ? (
                            <div className="text-center">
                                <Spinner animation="border" variant="primary" />
                                <p>{intl.formatMessage({ id: "Loading" })}</p>
                            </div>
                        ) : (
                            <p>
                                {judgmentText || (
                                    "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ."
                                )}
                            </p>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ViewJudgmentTextPopup;

// import { useEffect, useState } from "react";
// import { Modal} from 'react-bootstrap';
// import { useIntl } from 'react-intl';
// import { useAppDispatch, useAppSelector } from "../../../store/store";
// import { fetchJudgementById } from "../../../features/judgement-ground";
// interface ViewJudgmentTextPopupProps {
//     show: boolean;
//     handleClose: () => void;
// }

// const ViewJudgmentTextPopup = ({ show, handleClose }: ViewJudgmentTextPopupProps) => {
//     const intl = useIntl();
//     const dispatch = useAppDispatch();
//     const [judgmentText,setJudgmentText]=useState("");

//       const { loading, status, judgementGroundsById } = useAppSelector(
//         (state) => state.judgementGround
//       );
//       console.log(judgementGroundsById);
      
//     return (
//         <Modal size="lg" show={show} onHide={handleClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title className="w-100 text-center position-relative">
//                     {intl.formatMessage({ id: "JudgmentText" })}
//                 </Modal.Title>
//             </Modal.Header>

//             <Modal.Body>
//                 <div className="p-1">

//                     <div className="bg-light rounded p-2">
//                         <p>
//                             هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ.
//                             زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم.
//                             منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في.
//                             زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم.
//                         </p>
//                     </div>
//                 </div>
//             </Modal.Body>
//             {/* <Modal.Footer className="justify-content-end gap-2">
//                     <Button
//                         variant="light"
//                         onClick={handleClose}
//                         className="px-4"
//                     >
//                         {intl.formatMessage({ id: "Cancel" })}
//                     </Button>
//                     <Button
//                         type="submit"
//                         className="px-4 btn btn-primary"
//                     >
//                         {intl.formatMessage({ id: "Save" })}        </Button>
//                 </Modal.Footer> */}

//         </Modal>
//     );
// };

// export default ViewJudgmentTextPopup;