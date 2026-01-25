import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import { searchSelectStylesModeStyles } from "@4eplatform/shared/functions/searchSelectStylesModeStyles";
import AddOpponentsPopup from "../../add-case-user/popup/AddOpponentsPopup";
import { useDispatch, useSelector } from "react-redux";
import { LitigantStatus, LitigationStatus } from "../../../../../models/LegalEnums";
import { getLitigantConsume, removeLitigantId } from "../../../../../features/litigant-consume";
import { RootState } from "../../../../../store/store";

type PopupProps = {
  show: boolean;
  handleClose: () => void;
  setOpponents?: any;
  opponents?: any;
};

const OpponentPopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  setOpponents,
  opponents,
}) => {
  const intl = useIntl();
  const [selectedValues, setSelectedValues] = useState<any>({});
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [showNewOpponentPopup, setShowNewOpponentPopup] = useState(false);

  const { control } = useForm<any>({
    mode: "all",
    reValidateMode: "onChange",
  });

  let darkMode = localStorage.getItem("Theme") == "dark" ? true : false;

  let dispatch = useDispatch();
  const [opponentsData,setOpponentsData] =useState([]);
  const FetchData = () => {
    let params = { status: LitigationStatus.Opponent,
      PageIndex:1,PageSize:1000,
     };
    dispatch(getLitigantConsume(params) as any).then((res)=> setOpponentsData(res?.payload?.result));
  };
  useEffect(() => {
    if (show) {
      FetchData();
    }
  }, [show]);
   const [opponentsOptions, setOpponentsOptions] = useState<any[]>([]);
  useEffect(() => {
  if (Array.isArray(opponentsData)) {
    setOpponentsOptions(
      opponentsData.map((client: any) => ({
        value: client?.id,
        label: client?.name,
      }))
    );
  }
}, [opponentsData]); 
  const [selectedOpponents, setSelectedOpponents] = useState<any>([]);
  const [selectedOpponentsWithDetails, setSelectedOpponentsWithDetails] =
    useState<any[]>([]);
const handleopponentsChange = (selectedOptions: any) => {
  const mergedOptions = [
    ...(selectedOptions ?? []),
    opponentsOptions.find((op: any) => op.value === defaultOpponent)
  ].filter(Boolean); 

  const uniqueOptions = Array.from(
    new Map(mergedOptions.map((item: any) => [item.value, item])).values()
  );

  setSelectedOpponents(uniqueOptions);

  setSelectedOpponentsWithDetails((prev) => {
    const newOpponents = uniqueOptions.map((option: any) => {
      const existingOpponent = prev?.find((o) => o.id === option.value);
      const originalOpponent = opponentsData?.find(
        (o:any) => o.id === option.value
      );

      return {
        ...originalOpponent,
        complaintReason: existingOpponent?.complaintReason || "",
      };
    });

    return newOpponents;
  });
};
  useEffect(() => {
    if (selectedOpponents?.length) {
      setSelectedOpponentsWithDetails((prev) => {
        const updatedOpponents = selectedOpponents.map((opponent: any) => {
          const existingOpponent = prev.find((o) => o.id === opponent.value);
          const originalOpponent :any = opponentsData?.find(
            (c: any) => c.id === opponent.value
          );

          return {
            id: opponent.value,
            name: originalOpponent?.name || "",
            complaintReason: existingOpponent?.complaintReason || "",
          };
        });

        return updatedOpponents;
      });
    } else {
      setSelectedOpponentsWithDetails([]);
    }
  }, [selectedOpponents]);

  const handleComplaintReasonChange = (id: number, reason: string) => {
    setSelectedOpponentsWithDetails((prev) =>
      prev.map((opponent) =>
        opponent.id === id ? { ...opponent, complaintReason: reason } : opponent
      )
    );
  };
    const handleCanDeleteOpponent = async (opponentDeleted: any) => {
      const targetOpponent:any = opponentsData?.find(
        (item:any) => item.id === opponentDeleted.id
      );
      if (targetOpponent?.canEdit) {
        try {
          const res: any = await dispatch(removeLitigantId(opponentDeleted.id) as any);
          if (res?.payload?.message === "litigant Delete Success") {
          dispatch(getLitigantConsume({status: LitigantStatus?.Opponent ,PageIndex:1,PageSize:1000, }) as any);
            handleDeleteOpponent(opponentDeleted.id);
            showAlert(true, "DeletedSuccessfully", intl);
          } else {
            showAlert(false, res?.payload?.message, intl);
          }
        } catch (error) {
          console.log("errorAtDelete", error);
        }
      } else {
        handleDeleteOpponent(opponentDeleted.id);
        showAlert(true, "DeletedSuccessfully", intl);
      }
    };
  const handleDeleteOpponent = (id: string | number) => {
    setSelectedOpponents((prev) =>
      prev.filter((opponent: any) => opponent.value !== id)
    );

    setSelectedOpponentsWithDetails((prev) =>
      prev.filter((opponent: any) => opponent.id !== id)
    );
  };
  const handleSubmitOpponents = () => {
    const formattedOpponents = selectedOpponentsWithDetails?.map(
      (opponent: any) => {
        const opponentData:any = opponentsData.find(
          (o: any) => o.id == opponent.id
        );
        return {
          litigant: {
            id: opponentData?.id,
            identityNumber: opponentData?.identityNumber,
            name: opponentData?.name,
            canEdit:opponentData?.canEdit,
          },
          compliment: opponent.complaintReason || "",
        };
      }
    );
 
    setOpponents((prevOpponent) => {
      const uniqueOpponents = formattedOpponents.filter(
        (newOpponent) =>
          !prevOpponent.some(
            (existingOpponent) =>
              existingOpponent?.litigant?.id == newOpponent?.litigant?.id
          )
      );

      if (uniqueOpponents.length > 0) {
        showAlert(true, "AddedSuccessfully", intl);
        handleClose();
      } else {
        handleClose();
      }
      return [...prevOpponent, ...uniqueOpponents];
    });
  };
 const [defaultOpponent, setDefaultOpponent] = useState<any>(null);
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <div className="card">
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            <h2>{intl.formatMessage({ id: "AddOpponents" })}</h2>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-10 py-4">
          <div className="mb-3">
            <label className="form-label mb-3 required">
              {intl.formatMessage({ id: "Adversaries" })}
            </label>
            <Controller
              name="userId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  id="ClientName"
                  className="react-select__container  bg-light"
                  classNamePrefix="react-select"
                  placeholder={intl.formatMessage({
                    id: "ChooseRivals",
                  })}
                  options={opponentsOptions || []}
                  isClearable={true}
                  isMulti={true}
                  styles={searchSelectStylesModeStyles(darkMode)}
                  onChange={(selectedOptions: any) =>
                    handleopponentsChange(selectedOptions)
                  }
                  value={
                    selectedOpponents.length > 0 ? selectedOpponents : null
                  }
                  noOptionsMessage={() =>
                    intl.formatMessage({
                      id: "NotAvailableUserName",
                    })
                  }
                />
              )}
            />
          </div>
          <div className="mb-3 pt-2">
            <div
              className="w-100 bg-light-primary text-primary p-3 text-center border border-primary cursor-pointer rounded-2"
              onClick={() => {
                setShowNewOpponentPopup(true);
              }}
            >
              {intl.formatMessage({ id: "CreateNew" })}
            </div>
          </div>

          <div className="my-5">
            <div className="d-flex align-items-center mb-2">
              <label className="form-label mb-1 text-gray-600">
                {intl.formatMessage({ id: "Adversaries" })}
              </label>
            </div>
            <div className="max-custom-height main-container-followLawsuits2 m-0 p-7 bg-fix-dark">
              {selectedOpponentsWithDetails &&
                Array.isArray(selectedOpponentsWithDetails) &&
                selectedOpponentsWithDetails?.map((option: any) => (
                  <div key={option?.id} className="mb-6 row align-items-center">
                    <div className="my-2 col-12 col-md-3 p-0">
                      <h5>{option?.name}</h5>
                    </div>
                    <div className="col-11 col-md-8">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fas fa-user-slash"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder={intl.formatMessage({
                            id: "EnterTheReasonForTheComplaint",
                          })}
                          className="form-control"
                          value={option.complaintReason}
                          onChange={(e) =>
                            handleComplaintReasonChange(
                              option.id,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div
                      className="col-1 text-danger cursor-pointer"
                      onClick={() => handleCanDeleteOpponent(option)}
                    >
                      <i className="special far fa-trash-alt"></i>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-end px-5 pb-6">
          <Button
            variant="secondary"
            className="px-15"
            onClick={() => {
              handleClose();
            }}
          >
            {intl.formatMessage({ id: "Cancel" })}
          </Button>
          <Button
            variant="success"
            className="px-15"
            onClick={handleSubmitOpponents}
          >
            {intl.formatMessage({ id: "Add" })}
          </Button>
        </Modal.Footer>
      </div>
      <div className="modal fade">
        <DeletePopup
          showDelete={modalShow}
          handleCloseDelete={() => {
            setModalShow(false);
          }}
        />
      </div>
      <div className="modal fade">
        <AddOpponentsPopup
          show={showNewOpponentPopup}
          handleCloseNewOpponent={() => setShowNewOpponentPopup(false)}
           setDefaultOpponent={setDefaultOpponent}
          setOpponentsData={setOpponentsData}
          setSelectedOpponents={setSelectedOpponents}
        />
      </div>
    </Modal>
  );
};

export default OpponentPopup;
