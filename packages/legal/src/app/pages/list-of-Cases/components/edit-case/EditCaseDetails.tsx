import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Col, Row, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { fetchAllLKTypeJudiciary } from "../../../../features/lk-type-judiciary";

type EditCaseDetailsProps = {
  causeCategories?: any;
  causeStages?: any;
  errors?: any;
  register?: any;
  selectedClassification?:any;
  setSelectedClassification?:any;
  selectedCauseStageId?:any;
  setSelectedCauseStageId?:any;
  onNext?:any;
  causeNumber?: any;
  setCauseNumber?: any;
  causeDate?: any;
  setCauseDate?: any;
  causeDetails?:any;
  selectedSatge?:any;
  setSelectedStage?:any;
  onBack?:any;
  selectedTypeJudiciaryId?: any;
  setSelectedTypeJudiciaryId?: any;
};
const EditCaseDetails: React.FC<EditCaseDetailsProps> = ({
  causeCategories,
  causeStages,
  errors,
  register,
  selectedClassification,
  setSelectedClassification,
  selectedCauseStageId,
  setSelectedCauseStageId,
  onNext,
  causeNumber,
  setCauseNumber,
  causeDate,
  setCauseDate,
  causeDetails,
  selectedSatge,
  setSelectedStage,
  onBack,
  selectedTypeJudiciaryId,
  setSelectedTypeJudiciaryId,
}) => {
  const intl = useIntl();
  let navigate = useNavigate();
  let language = intl.locale;
  const dispatch = useAppDispatch();
  const lkTypeJudiciary = useAppSelector((state) => state.lkTypeJudiciary.lkTypeJudiciary);

  useEffect(() => {
    dispatch(fetchAllLKTypeJudiciary({}) as any);
  }, [dispatch]);

  const handleSelectClassificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassification(e.target.value);
  };

  const handleSelectTypeJudiciaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTypeJudiciaryId(e.target.value);
  };

  // Sync form value when selectedTypeJudiciaryId changes
  useEffect(() => {
    if (register && selectedTypeJudiciaryId) {
      const { onChange } = register("LK_TypeJudiciaryId");
      onChange({ target: { name: "LK_TypeJudiciaryId", value: selectedTypeJudiciaryId } });
    }
  }, [selectedTypeJudiciaryId, register]);

  // Initialize selectedTypeJudiciaryId from causeDetails when component loads
  useEffect(() => {
    if ((causeDetails?.lkTypeJudiciaryId || causeDetails?.lK_TypeJudiciary?.id) && !selectedTypeJudiciaryId) {
      setSelectedTypeJudiciaryId(causeDetails?.lkTypeJudiciaryId || causeDetails?.lK_TypeJudiciary?.id);
    }
  }, [causeDetails, selectedTypeJudiciaryId, setSelectedTypeJudiciaryId]);

  useEffect(() => {
    if (causeDetails?.causeStages?.[causeDetails.causeStages.length - 1]?.lK_Stage?.isStudy ||
      selectedSatge?.isStudy
    ) {
      setShowInput(false)
    }else{
      setShowInput(true)
    }
  }, [causeDetails]);
    const handleSelectCauseStageChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setShowInput(false);
      let selectedIdStage = event.target.value;
      setSelectedCauseStageId(selectedIdStage);
      const selectedStage = causeStages?.find(
        (stage: any) => stage.id == selectedIdStage
      );
      if (selectedStage) {
        setSelectedStage(selectedStage);
      }
    };
    const [showInput,setShowInput]=useState(false);  
  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          <div className="mb-5">
            <div className="main-container p-7">
              <p className="main-title-lawsuit">
                {intl.formatMessage({ id: "CaseDetails" })}
              </p>
              <div className="row">
                <div className="col-md-12 col-12 ">
                  <label
                    htmlFor="CaseAddress"
                    className="form-label px-2 fontSz-6 required"
                  >
                    {intl.formatMessage({ id: "CaseAddress" })}
                  </label>
                  <div className="input-group bg-white bg-fix-dark   ">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="special fas fa-layer-group"></i>
                      </span>
                    </div>
                    <input
                      id="CaseAddress"
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({
                        id: "CaseAddress",
                      })}
                      {...register("title")}
                    />
                   
                  </div>
                  {errors?.title &&
                      DisplayErrorMessage(
                        errors?.title?.message,
                        intl,
                        intl.locale
                      )}
                </div>
              </div>
              <Row>
                <Col lg={4} className="h-auto mt-5">
                  <Form.Group controlId="caseNumberInput">
                    <Form.Label className="mb-3 ">
                      {intl.formatMessage({ id: "IncidentDate" })}
                    </Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type="date"
                        className="custom-input-bg"
                        placeholder={intl.formatMessage({ id: "IncidentDate" })}
                        {...register("incidentDate")}
                        onClick={(e) => {
                          // Make the entire input clickable to open calendar
                          const target = e.currentTarget as HTMLInputElement;
                          if (target && typeof target.showPicker === 'function') {
                            target.showPicker();
                          } else {
                            // Fallback: focus the input to trigger calendar
                            target.focus();
                            target.click();
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </Form.Group>
                  {errors?.incidentDate &&
                        DisplayErrorMessage(
                          errors?.incidentDate?.message,
                          intl,
                          intl.locale
                        )}
                </Col>
                <Col lg={4} className="h-auto mt-5">
                  <Form.Group>
                    <Form.Label className="mb-3 required">
                      {intl.formatMessage({ id: "CaseClassification" })}
                    </Form.Label>
                    <div className="input-group">
                      <select
                        id="caseClassification"
                        name="caseClassification"
                        className="form-select mt-1"
                        value={selectedClassification} 
                        onChange={handleSelectClassificationChange}
                        aria-label="Case Classification"
                      >
                        <option value="" disabled>
                          {intl.formatMessage({ id: "SelectCategory" })}
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
                  </Form.Group>
                </Col>
                <Col lg={4} className="h-auto mt-5">
                  <label
                    htmlFor="IncidentLocation"
                    className="form-label px-2 fontSz-6"
                  >
                    {intl.formatMessage({ id: "IncidentLocation" })}
                  </label>
                  <div className="input-group bg-white bg-fix-dark   ">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="special fas fa-layer-group"></i>
                      </span>
                    </div>
                    <input
                      id="IncidentLocation"
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({
                        id: "EnterTheSite",
                      })}
                      {...register("incidentLocation")}
                    />
                    
                  </div>
                  {errors?.incidentLocation &&
                      DisplayErrorMessage(
                        errors.incidentLocation.message,
                        intl,
                        intl.locale
                      )}
                </Col>
              </Row>
              <div className="row">
                <div className="col-md-12 col-12 mt-8">
                  <label
                    htmlFor="Topic"
                    className="form-label px-2 fontSz-6 required"
                  >
                    {intl.formatMessage({ id: "Topic" })}
                  </label>
                  <div className="input-group bg-white bg-fix-dark   ">
                    <textarea
                      id="Topic"
                      className="form-control"
                      placeholder={intl.formatMessage({ id: "EnterTheTopic" })}
                      rows={3}
                      {...register("subject")}
                    />
                 
                  </div>
                  {errors?.subject &&
                      DisplayErrorMessage(
                        errors?.subject?.message,
                        intl,
                        intl.locale
                      )}
                </div>
              </div>
              <Row>
                 <Col lg={4} className="h-auto mt-5">
                           <Form.Group controlId="caseDaySelect">
                             <Form.Label className="mb-3">
                               {intl.formatMessage({ id: "TheLawsuit" })}
                               <span className="text-danger mx-2">*</span>
                             </Form.Label>
                             <div className="input-group">
                               <select
                                 id="caseStage"
                                 name="caseStage"
                                 className="form-select mt-1"
                                 value={selectedCauseStageId}
                                 onChange={handleSelectCauseStageChange}
                                 aria-label="The Lawsuit"
                               >
                                 <option value="" disabled>
                                   {intl.formatMessage({ id: "SelectTheLawsuit" })}
                                 </option>
                                 {Array.isArray(causeStages) &&
                                   causeStages.map((caseStage: any) => (
                                     <option key={caseStage?.id} value={caseStage?.id}>
                                       {language === "ar"
                                         ? caseStage.nameAr
                                         : caseStage.nameEn}
                                     </option>
                                   ))}
                               </select>
                             </div>
                           </Form.Group>
                         </Col>
                         <Col lg={4} className="h-auto mt-5">
                           <Form.Group controlId="typeJudiciarySelect">
                             <Form.Label className="mb-3">
                               {intl.formatMessage({ id: "TypeJudiciary" })}
                               <span className="text-danger mx-2">*</span>
                             </Form.Label>
                                                           <div className="input-group">
                                <select
                                  id="typeJudiciary"
                                  name="LK_TypeJudiciaryId"
                                  className="form-select mt-1"
                                  value={selectedTypeJudiciaryId || ""}
                                  onChange={handleSelectTypeJudiciaryChange}
                                  aria-label="Type Judiciary"
                                >
                                 <option value="" disabled>
                                   {intl.formatMessage({ id: "SelectTypeJudiciary" })}
                                 </option>
                                 {Array.isArray(lkTypeJudiciary) &&
                                   lkTypeJudiciary.map((item: any) => (
                                     <option key={item?.id} value={item?.id}>
                                       {language === "ar" ? item?.nameAr : item?.nameEn}
                                     </option>
                                   ))}
                               </select>
                             </div>
                           </Form.Group>
                         </Col>


                {(selectedSatge?.isStudy == false || showInput )? (
                  <>
                    <Col lg={4} className="h-auto mt-5">
                      <label
                        htmlFor="Casenumber"
                        className="form-label px-2 fontSz-6"
                      >
                        {intl.formatMessage({ id: "Casenumber" })}
                        <span className="text-danger mx-2">*</span>
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fas fa-layer-group"></i>
                          </span>
                        </div>
                        <input
                          id="Casenumber"
                          type="text"
                          className="form-control custom-input-bg "
                          placeholder={intl.formatMessage({
                            id: "Casenumber",
                          })}
                          value={causeNumber}
                          onChange={(e) => setCauseNumber(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col lg={4} className="h-auto mt-5">
                      <Form.Group controlId="caseNumberInput">
                        <Form.Label className="mb-3">
                          {intl.formatMessage({ id: "CaseDate" })}
                          <span className="text-danger mx-2">*</span>
                        </Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type="date"
                            className="custom-input-bg"
                            placeholder={intl.formatMessage({ id: "CaseDate" })}
                            value={causeDate}
                            onChange={(e) => setCauseDate(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </>
                  ) :null
               }
              </Row>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end px-5 pb-4 mx-5 mt-3">
        <Button
          variant="secondary"
          className="me-3"
          onClick={onBack}
        >
          {intl.formatMessage({ id: "Cancel" })}
        </Button>
        <Button
          variant="primary"
          onClick={() => onNext(["title", "incidentDate", "incidentLocation", "subject", "LK_TypeJudiciaryId"])}
        >
          {intl.formatMessage({ id: "Next" })}
        </Button>
      </div>
    </>
  );
};

export default EditCaseDetails;
