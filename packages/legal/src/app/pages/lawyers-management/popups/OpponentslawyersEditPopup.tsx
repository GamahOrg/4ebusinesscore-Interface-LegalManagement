import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Form, Modal, Button, InputGroup } from "react-bootstrap";
import RadioGroup from "../components/RadioGroup";
import { EmployeeHierarchyPopup } from "@4eplatform/shared/src/popups/EmployeeHierarchyPopup";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLawyers, fetchLawyerById } from "../../../features/lawyer";
import { RootState } from "../../../store/store";
import { useForm } from "react-hook-form";
import { object, string, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { putCauseLawyer } from "../../../features/cause-layer";
import { GetAllLawyerType, LawyerType, LitigantStatus } from "../../../models/LegalEnums";
import { showAlert } from "@4eplatform/shared/services/showAlert";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type EditPopupInter = {
  showAdd: boolean;
  handleCloseAdd: () => void;
  id?: any;
};

export const EditOppenentsLawyerSchema = object({
  lawyerName: string().notRequired(),
  lawyerPhone: string().notRequired()
      .matches(/^(?:009665|9665|05)[0-9]{8}$/, 
        "InvalidSudiaPhoneNumber"),
});
export type EditOppenentsLawyerProps = InferType<
  typeof EditOppenentsLawyerSchema
>;

export const OpponentslawyersEditPopup: React.FC<EditPopupInter> = ({
  showAdd,
  handleCloseAdd,
  id,
}) => {
  const intl = useIntl();

  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [count, setCount] = useState<any>("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (id && showAdd) {
      dispatch(fetchLawyerById(id) as any);
    }
  }, [id, showAdd]);
  let laywerDetails = useSelector((state: RootState) => {
    return state?.lawyer?.lawyerById;
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditOppenentsLawyerProps>({
    resolver: yupResolver(EditOppenentsLawyerSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  useEffect(() => {
    if (laywerDetails) {
      setCount(laywerDetails?.lawyerType);
      setValue("lawyerName", laywerDetails?.lawyerName);
      setValue("lawyerPhone", laywerDetails?.phone);
    }
  }, [laywerDetails]);
  const params = {
    pageNumber: 1,
    pageSize: 10,
    litigantStatus: LitigantStatus?.Opponent,
    lawyerTypeDto: GetAllLawyerType.Internal,
    lawyerStateDto: 2,
  };

  const handleEditOppenentLawyer = async (data: any) => {
    let body = {
      lawyerName: data?.lawyerName,
      phone: data?.lawyerPhone,
      lawyerType: count,
    };
    await dispatch(
      putCauseLawyer({
        id: id,
        putCauseLawyerDto: body,
      }) as any
    ).then((res: any) => {
      if (
        res?.payload?.message == "Add Successfully " &&
        res?.payload?.statusEnum == 1
      ) {
        showAlert(true, "EditSuccessfully", intl);
        handleCloseAdd();
        dispatch(fetchAllLawyers(params) as any);
      }
       else if (res?.payload?.message === '[\"Invalid Saudi phone number format. It must starts with 9665, 009665, or 05, and have exactly 8 numbers after the key.\"]') {
        showAlert(false, "InvalidSudiaPhoneNumber", intl);
      } 
      else {
        showAlert(false, res?.payload?.message, intl);
        handleCloseAdd();
      }
    });
  };
  return (
    <div>
      <div className="modal-dialog modal-dialog-centered">
        <Modal centered show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header className="d-flex justify-content-between align-items-center">
            <Button
              variant="close"
              className="position-absolute start-0"
              onClick={handleCloseAdd}
            />
            <Modal.Title className="mx-auto">
              {intl.formatMessage({ id: "LawyersModification" })}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(handleEditOppenentLawyer)}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  {intl.formatMessage({ id: "Count" })}
                </Form.Label>
                <RadioGroup
                  name="status"
                  options={[
                    {
                      value: String(LawyerType.Person),
                      label: intl.formatMessage({ id: "One" }),
                    },
                    {
                      value: String(LawyerType.Office),
                      label: intl.formatMessage({ id: "Office" }),
                    },
                  ]}
                  selectedValue={String(count)}
                  onChange={(value: any) => setCount(Number(value))}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-3">
                <Form.Label className="fw-bold">
                  {intl.formatMessage({ id: "Username" })}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder={intl.formatMessage({ id: "Username" })}
                    {...register("lawyerName")}
                  />
                </InputGroup>
              </Form.Group>
              {DisplayErrorMessage(errors?.lawyerName?.message ,
                intl ,
                intl.locale
                )}

              <Form.Group className="mb-3 mt-3">
                <Form.Label className="fw-bold">
                  {intl.formatMessage({ id: "PhoneNumber" })}
                </Form.Label>
                <InputGroup>
                  <Form.Control type="text" {...register("lawyerPhone")} />
                </InputGroup>
              </Form.Group>
                {DisplayErrorMessage(errors?.lawyerPhone?.message ,
                 intl ,
                  intl.locale
                )}
            </Modal.Body>

            <Modal.Footer className="justify-content-center">
              <button
                type="button"
                className="btn btn-outline-primary w-25"
                onClick={handleCloseAdd}
              >
                {intl.formatMessage({ id: "Cancel" })}
              </button>
              <button type="submit" className="btn btn-success w-25">
                {intl.formatMessage({ id: "Edit" })}
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <EmployeeHierarchyPopup
        show={modalHShow}
        handleClose={() => setModalHShow(false)}
        title=""
      />
    </div>
  );
};

export default OpponentslawyersEditPopup;
