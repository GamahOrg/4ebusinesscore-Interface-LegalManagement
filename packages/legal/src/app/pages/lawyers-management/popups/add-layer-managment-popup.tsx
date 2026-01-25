import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Form, Modal, InputGroup, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../store/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AddLawyerValidationSchema } from "../validations/AddLawyerValidationSchema";
import {
  LawyerStatus,
  LawyerType,
  LitigantStatus,
  GetAllLawyerType,
} from "../../../models/LegalEnums";
import { postCauseLawyer } from "../../../features/cause-layer";
import { AddEmployeeHierarchyPopup } from "./AddEmployeeHierarchyPopup";
import { fetchAllLawyers } from "../../../features/lawyer";
import { showAlert } from "@4eplatform/shared/services/showAlert";

type AddPopupInter = {
  showAdd: boolean;
  handleCloseAdd: () => void;
};

const AddLayerManagmentPopup: React.FC<AddPopupInter> = ({
  showAdd,
  handleCloseAdd,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("");
  const [count, setCount] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState<string>("");
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let [loading, setLoading] = useState(false);

  const params = {
    pageNumber: 1,
    pageSize: 10,
    litigantStatus: 2,
    lawyerTypeDto: GetAllLawyerType.Internal,
    lawyerStateDto: 2,
  };

  const schema = AddLawyerValidationSchema();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // نخلي litigantStatus و type قيم افتراضية
  useEffect(() => {
    setValue("litigantStatus", Number(LitigantStatus.Client));
    setValue("isInternal", true);
  }, [setValue]);

  const handleAddLawyer = async (data: any) => {
    const errorsArr: boolean[] = [];

    if (
      status !== String(LawyerStatus?.Active) &&
      status !== String(LawyerStatus?.Banned)
    ) {
      errorsArr.push(true);
    }

    if (!employeeId) {
      errorsArr.push(true);
    }

    if (errorsArr.length) {
      showWarningAlert();
      return;
    }

    setLoading(true);
    let body = {
      litigantStatus: LitigantStatus.Client,
      isInternal: true,
      userId: employeeId,
      lawyerStatus: status === "1" ? LawyerStatus.Active : LawyerStatus.Banned,
      lawyerName: employeeName,
      phone: data?.phone,
      lawyerType: LawyerType.Person,
    };

    await dispatch(postCauseLawyer(body) as any)
      .then((res: any) => {
        if (
          res?.payload?.message === "Add Successfully " ||
          res?.payload?.statusEnum === 1
        ) {
          showAlert(true, "AddedSuccessfully", intl);
          handleCloseAdd();
          setLoading(false);
          dispatch(fetchAllLawyers(params));
        } else if (res?.payload?.message === "Must Enter Phone") {
          showAlert(false, "MustEnterPhone", intl);
          setLoading(false);
        } else if (res?.payload?.message === "The userId already exsit") {
          showAlert(false, "ThisPersonAlreadyExists", intl);
          setLoading(false);
        } else {
          showAlert(false, "AnErrorOccurred", intl);
          setLoading(false);
        }
      })
      .catch(() => {
        showAlert(false, "AnErrorOccurred", intl);
        setLoading(false);
      });
  };

  const showWarningAlert = () => {
    Swal.fire({
      timer: 2000,
      text: intl.formatMessage({ id: "PleaseEnterTheFollowingData" }),
      icon: "warning",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };

  return (
    <div className="modal-dialog modal-dialog-centered">
      <Modal centered show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">
            {intl.formatMessage({ id: "AddLawyer" })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form onSubmit={handleSubmit(handleAddLawyer)}>
            {/* ✅ الحقول المخفية */}
            <input type="hidden" {...register("litigantStatus")} />
            <input type="hidden" {...register("isInternal")} />

            <Form.Group className="mb-3 mt-3">
              <Form.Label className="fw-bold">
                {intl.formatMessage({ id: "Username" })}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder={intl.formatMessage({ id: "Username" })}
                  value={employeeName}
                  {...register("internalLawyerName")}
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
              {errors.internalLawyerName && (
                <div className="text-danger small mt-1">
                  {errors.internalLawyerName.message}
                </div>
              )}
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
              {errors.phone && (
                <div className="text-danger small mt-1">
                  {errors.phone.message}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                {intl.formatMessage({ id: "Status" })}
              </Form.Label>
              <div>
                <Form.Check
                  inline
                  label={intl.formatMessage({ id: "Active" })}
                  name="status"
                  type="radio"
                  value={String(LawyerStatus.Active)}
                  checked={status === String(LawyerStatus.Active)}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setValue("lawyerStatus", Number(e.target.value));
                  }}
                />
                <Form.Check
                  inline
                  label={intl.formatMessage({ id: "Forbidden" })}
                  name="status"
                  type="radio"
                  value={String(LawyerStatus.Banned)}
                  checked={status === String(LawyerStatus.Banned)}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setValue("lawyerStatus", Number(e.target.value));
                  }}
                />
              </div>
              {errors.lawyerStatus && (
                <div className="text-danger small mt-1">
                  {errors.lawyerStatus.message}
                </div>
              )}
            </Form.Group>

            <Modal.Footer className="justify-content-center">
              <button
                type="reset"
                className="btn btn-light px-20"
                onClick={handleCloseAdd}
              >
                {intl.formatMessage({ id: "Cancel" })}
              </button>
              {!loading ? (
                <button
                  type="submit"
                  className="btn btn-success px-20"
                  disabled={isSubmitting}
                >
                  {intl.formatMessage({ id: "Add" })}
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success px-15"
                  disabled={isSubmitting}
                >
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span>{intl.formatMessage({ id: "Adding" })}</span>
                </button>
              )}
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <AddEmployeeHierarchyPopup
        show={modalHShow}
        handleClose={() => setModalHShow(false)}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        setEmployeeName={setEmployeeName}
      />
    </div>
  );
};

export default AddLayerManagmentPopup;
