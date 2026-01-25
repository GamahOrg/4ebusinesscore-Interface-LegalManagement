import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Form, Modal, Button, InputGroup, Spinner } from "react-bootstrap";
import RadioGroup from "../components/RadioGroup";
import { fetchAllLawyers, fetchLawyerById } from "../../../features/lawyer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, InferType } from "yup";
import { GetAllLawyerType, LawyerStatus, LitigantStatus } from "../../../models/LegalEnums";
import { EditEmployeeHierarchyPopup } from "./EditEmployeeHierarchyPopup";
import { putCauseLawyer } from "../../../features/cause-layer";
import { LawyerType } from "../../../models/LegalEnums";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { showAlert } from "@4eplatform/shared/services/showAlert";

type EditPopupInter = {
  showAdd: boolean;
  handleCloseAdd: () => void;
  id?: any;
  pageIndex?:number;
  pageSize ?:number;
  searchQuery?:string;
  litigantStatus?:number;
  lawyerStatus ?:number;
  lawyerType ?:number;
};
export const EditLawyerSchema = object({
  internalLawyerName: string().notRequired(),
  externalLawyerName: string().notRequired(),
  phone: string()
    .notRequired()
    .matches(
      /^(?:\+966|00966|966|0)?5\d{8}$/,
      "يجب إدخال رقم سعودي صحيح يبدأ بـ 05 أو 966"
    )
  });

export type EditLawyerProps = InferType<typeof EditLawyerSchema>;
const EditLayerManagment: React.FC<EditPopupInter> = ({
  showAdd,
  handleCloseAdd,
  id,
  pageIndex,
  pageSize,
  searchQuery,
  litigantStatus,
  lawyerStatus,
  lawyerType,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [type, setType] = useState<any>("");
  const [count, setCount] = useState<any>("");
  const [status, setStatus] = useState<any>("");
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let [loading, setLoading] = useState(false);

  let laywerDetails = useSelector((state: RootState) => {
    return state?.lawyer?.lawyerById;
  });
  let [employeeId, setEmployeeId] = useState<string>("");
  let [employeeName, setEmployeeName] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditLawyerProps>({
    resolver: yupResolver(EditLawyerSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (id && showAdd) {
      dispatch(fetchLawyerById(id) as any);
    }
  }, [id, showAdd]);

  useEffect(() => {
    
    if (laywerDetails && showAdd) {
      setType(laywerDetails?.isInternal);
      setStatus(laywerDetails?.lawyerStatus);
      setCount(laywerDetails?.lawyerType);
      setValue("externalLawyerName", laywerDetails?.lawyerName);
      setValue("phone", laywerDetails?.phone);
      setEmployeeId(laywerDetails?.userId);
      setEmployeeName(laywerDetails?.lawyerName);
    }
  }, [laywerDetails, showAdd]);

  useEffect(() => {
    if (type === false && showAdd) {
      setStatus("");
      setCount(String(LawyerType.Person));
      setValue("externalLawyerName", "");
      setValue("lawyerPhone", "");
      setEmployeeId("");
      setEmployeeName("");
    } else if (type && showAdd && laywerDetails) {
      setEmployeeId(laywerDetails?.userId);
      setEmployeeName(laywerDetails?.lawyerName);
      setStatus(laywerDetails?.lawyerStatus);
    }
  }, [type, showAdd]);


  const params = {
    pageNumber: pageIndex,
    pageSize: pageSize,
    litigantStatus: litigantStatus,
    lawyerTypeDto: GetAllLawyerType.Internal,
    lawyerStateDto: lawyerStatus,
    ...(searchQuery && { search: searchQuery }),
  };

  const handleEditLawyer = async (data: any) => {
    // داخلى
    if(type && !employeeId && !employeeName ){
      showAlert(false , "ErrorLawyerNameRequired",intl);
      return;
    } 
    else if (
      !type &&
      data?.phone &&
       !/^(?:009665|9665|05)[0-9]{8}$/.test(data.phone)
     ) {
      showAlert(false, "InvalidSudiaPhoneNumber", intl);
        return;
    }
    setLoading(true);
    let body = {
      litigantStatus: LitigantStatus?.Client,
      isInternal: type,
      //q1
      userId: type == true ? employeeId : id,
      lawyerStatus: status,
      lawyerName: type == true ? employeeName : data?.externalLawyerName,
      phone: type == true ? data?.phone : data?.phone,
      lawyerType: type == true ? LawyerType?.Person : count,
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
        setLoading(false);
        dispatch(fetchAllLawyers(params) as any);
      } else if (res?.payload?.message === "Must Enter Phone") {
        showAlert(false, "MustEnterPhone", intl);
        setLoading(false);
      } else if (res?.payload?.message === "The userId already exsit") {
        showAlert(false, "ThisPersonAlreadyExists", intl);
        setLoading(false);
      }  else if (res?.payload?.message === '[\"Invalid Saudi phone number format. It must starts with 9665, 009665, or 05, and have exactly 8 numbers after the key.\"]') {
        showAlert(false, "InvalidSudiaPhoneNumber", intl);
        setLoading(false);
      } 
      else {
        showAlert(false, "AnErrorOccurred", intl);
        setLoading(false);
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
          <Form onSubmit={handleSubmit(handleEditLawyer)}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  {intl.formatMessage({ id: "Type" })}
                </Form.Label>
                <RadioGroup
                  name="type"
                  options={[
                    {
                      value: "true",
                      label: intl.formatMessage({ id: "Internal" }),
                    },
                    // {
                    //   value: "false",
                    //   label: intl.formatMessage({ id: "External" }),
                    // },
                  ]}
                  selectedValue={String(type)}
                  onChange={(value: any) => {
                    setType(value === "true");
                    if(!type){
                      setEmployeeId("");
                      setEmployeeName("");
                    }
                  }}
                />
              </Form.Group>

              {type == true ? (
                <>
                  {" "}
                  <Form.Group className="mb-3 mt-3">
                    <Form.Label className="fw-bold">
                      {intl.formatMessage({ id: "Username" })}
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder={intl.formatMessage({ id: "Username" })}
                        value={employeeName}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        readOnly
                        className="disabled"
                      />
                      <InputGroup.Text
                        role="button"
                        onClick={() => setModalHShow(true)}
                      >
                        <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      {intl.formatMessage({ id: "PhoneNumber" })}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={intl.formatMessage({ id: "PhoneNumber" })}
                      {...register("phone")}
                    />
                    {errors?.phone && (
                      <span className="text-danger">
                        {errors?.phone?.message}
                      </span>
                    )}
                  </Form.Group>
                </>
              ) : type == false ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      {intl.formatMessage({ id: "Count" })}
                    </Form.Label>
                    <RadioGroup
                      name="count"
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
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      {intl.formatMessage({ id: "Name" })}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={intl.formatMessage({ id: "Name" })}
                      {...register("externalLawyerName")}
                    />
                  </Form.Group>
                   {DisplayErrorMessage(errors?.externalLawyerName?.message ,
                    intl ,
                    intl.locale
                   )}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      {intl.formatMessage({ id: "PhoneNumber" })}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={intl.formatMessage({ id: "PhoneNumber" })}
                      {...register("lawyerPhone")}
                    />
                  </Form.Group>
                </>
              ) : (
                <></>
              )}

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  {intl.formatMessage({ id: "Status" })}
                </Form.Label>
                <RadioGroup
                  name="status"
                  options={[
                    {
                      value: String(LawyerStatus.Active),
                      label: intl.formatMessage({ id: "Active" }),
                    },
                    {
                      value: String(LawyerStatus.Banned),
                      label: intl.formatMessage({ id: "Forbidden" }),
                    },
                  ]}
                  selectedValue={String(status)}
                  onChange={(value: any) => setStatus(Number(value))}
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer className="justify-content-center">
              <button
                type="button"
                className="btn btn-outline-primary w-25"
                onClick={handleCloseAdd}
              >
                {intl.formatMessage({ id: "Cancel" })}
              </button>

              {!loading ? (
                <button
                  type="submit"
                  className="btn btn-success w-25"
                  disabled={isSubmitting}
                >
                  {intl.formatMessage({ id: "Edit" })}
                </button>
              ) : (
                <button
                  className="btn btn-success px-20"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mx-2"
                  />
                  <span>{intl.formatMessage({ id: "Editing" })}</span>
                </button>
              )}
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <EditEmployeeHierarchyPopup
        show={modalHShow}
        handleClose={() => setModalHShow(false)}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        setEmployeeName={setEmployeeName}
      />
    </div>
  );
};

export default EditLayerManagment;
