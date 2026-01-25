import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Col, Row, Form } from "react-bootstrap";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { fetchAllLKTypeJudiciary } from "../../../../features/lk-type-judiciary";
type CaseSectionProps = {
  causeCategories?: any;
  causeStages?: any;
  selectedCauseStageId?: any;
  register?: any;
  errors?: any;
  selectedCauseStage?: any;
  setSelectedCauseStage?: any;
  watch?: any;
};

const CaseSection: React.FC<CaseSectionProps> = ({
  causeCategories,
  causeStages,
  selectedCauseStageId,
  register,
  errors,
  selectedCauseStage,
  setSelectedCauseStage,
}) => {
  const intl = useIntl();
  const language = intl.locale;
  const dispatch = useAppDispatch();
  const [selectedCauseCategory, setSelectedCauseCategory] = useState<any>(null);
  const [caseType, setCaseType] = useState<string>("lawsuit");
  const lkTypeJudiciary = useAppSelector(
    (state) => state.lkTypeJudiciary.lkTypeJudiciary
  );

  useEffect(() => {
    if (!selectedCauseStageId) return;
    const selectedStage = causeStages?.find(
      (stage: any) => stage.id === selectedCauseStageId
    );
    if (selectedStage) {
      setSelectedCauseStage(selectedStage);
    }
  }, [selectedCauseStageId, causeStages, setSelectedCauseStage]);

  useEffect(() => {
    dispatch(fetchAllLKTypeJudiciary({}) as any);
  }, [dispatch, selectedCauseCategory]);

  // Sync caseType with form value
  useEffect(() => {
    if (register) {
      const setValue = register("caseType").onChange;
      if (setValue) {
        setValue({ target: { name: "caseType", value: caseType } });
      }
    }
  }, [caseType, register]);

  // console.log(errors);

  return (
    <>
      <div className="rounded-2  mx-10 mt-15 case-section-style-responsive">
        <div className="p-7 bg-gray-100 rounded-2 w-100">
          <p className="main-title-lawsuit fs-4 mt-1 text-gray-800">
            {intl.formatMessage({ id: "TheCase" })}
          </p>
          <div className="row">
            <div className="col-md-12 col-12">
              <label htmlFor="CaseTitle" className="form-label px-2 fontSz-6">
                {intl.formatMessage({ id: "CaseTitle" })}
                <span className="text-danger mx-2">*</span>
              </label>
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text ">
                    <i className="special fas fa-layer-group"></i>
                  </span>
                </div>
                <input
                  id="CaseTitle"
                  type="text"
                  className="form-control  custom-input-bg"
                  placeholder={intl.formatMessage({
                    id: "EnterTheAddress",
                  })}
                  {...register("title")}
                />
              </div>
              {errors?.title &&
                DisplayErrorMessage(errors?.title?.message, intl, intl.locale)}
            </div>
          </div>
          <Row>
            <Col lg={4} className="h-auto mt-5">
              <Form.Group controlId="caseNumberInput">
                <Form.Label className="mb-3">
                  {intl.formatMessage({ id: "IncidentDate" })}
                  {/* <span className="text-danger mx-2">*</span> */}
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
                      if (target && typeof target.showPicker === "function") {
                        target.showPicker();
                      } else {
                        // Fallback: focus the input to trigger calendar
                        target.focus();
                        target.click();
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                {errors?.incidentDate &&
                  DisplayErrorMessage(
                    errors?.incidentDate?.message,
                    intl,
                    intl.locale
                  )}
              </Form.Group>
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
                    aria-label="Cause Classification"
                    {...register("causeClassification")}
                    defaultValue={""}
                    onChange={(e) => {
                      setSelectedCauseCategory(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      {intl.formatMessage({ id: "SelectCategory" })}
                    </option>
                    {Array.isArray(causeCategories) &&
                      causeCategories.map((category: any) => {
                        const label =
                          language === "ar" ? category.nameAr : category.nameEn;
                        const shortLabel =
                          label && label.length > 30
                            ? `${label.slice(0, 30)}...`
                            : label;

                        return (
                          <option
                            key={category?.id}
                            value={category?.id}
                            title={label}
                          >
                            {shortLabel}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </Form.Group>
              {errors?.causeClassification &&
                DisplayErrorMessage(
                  errors?.causeClassification?.message,
                  intl,
                  intl.locale
                )}
            </Col>

            {selectedCauseCategory === "12" && (
              <>
                <Col lg={6} className="h-auto mt-5">
                  <Form.Group>
                    {/* <label htmlFor="Topic" className="form-label px-2 fontSz-6">
                {intl.formatMessage({ id: "objectArabic" })}
                <span className="text-danger mx-2">*</span>
              </label> */}
                    <div className="input-group ">
                      <textarea
                        id="Topic"
                        className="form-control  custom-input-bg"
                        placeholder={intl.formatMessage({ id: "objectArabic" })}
                        rows={3}
                        {...register("OtherCategoryNameAr")}
                      />
                    </div>
                  </Form.Group>
                  {errors?.OtherCategoryNameAr &&
                    DisplayErrorMessage(
                      errors?.OtherCategoryNameAr?.message,
                      intl,
                      intl.locale
                    )}
                </Col>

                <Col lg={6} className="h-auto mt-5">
                  <Form.Group>
                    {/* <label htmlFor="Topic" className="form-label px-2 fontSz-6">
                {intl.formatMessage({ id: "objectEnglish" })}
                <span className="text-danger mx-2">*</span>
              </label> */}
                    <div className="input-group ">
                      <textarea
                        id="Topic"
                        className="form-control  custom-input-bg"
                        placeholder={intl.formatMessage({
                          id: "objectEnglish",
                        })}
                        rows={3}
                        {...register("OtherCategoryNameEn")}
                      />
                    </div>
                  </Form.Group>
                  {errors?.OtherCategoryNameEn &&
                    DisplayErrorMessage(
                      errors?.OtherCategoryNameEn?.message,
                      intl,
                      intl.locale
                    )}
                </Col>
              </>
            )}

            <Col lg={4} className="h-auto mt-5">
              <Form.Group controlId="incidentLocationInput">
                <Form.Label className="mb-3">
                  {intl.formatMessage({ id: "IncidentLocation" })}
                </Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    placeholder={intl.formatMessage({
                      id: "EnterIncidentLocation",
                    })}
                    {...register("incidentLocation")}
                  />
                </div>
                {errors?.incidentLocation &&
                  DisplayErrorMessage(
                    errors?.incidentLocation?.message,
                    intl,
                    intl.locale
                  )}
              </Form.Group>
            </Col>
          </Row>
          <div className="row mb-3">
            <div className="col-md-12 col-12 mt-6">
              <label htmlFor="Topic" className="form-label px-2 fontSz-6">
                {intl.formatMessage({ id: "Topic" })}
                <span className="text-danger mx-2">*</span>
              </label>
              <div className="input-group ">
                <textarea
                  id="Topic"
                  className="form-control  custom-input-bg"
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
            <Col lg={12} className="h-auto mt-5">
              <Form.Group controlId="caseTypeRadio">
                <Form.Label className="mb-3">
                  {intl.formatMessage({ id: "CaseType" })}
                  <span className="text-danger mx-2">*</span>
                </Form.Label>
                <div className="d-flex gap-4">
                  <Form.Check
                    type="radio"
                    id="studyRadio"
                    name="caseType"
                    value="study"
                    checked={caseType === "study"}
                    onChange={(e) => setCaseType(e.target.value)}
                    label={intl.formatMessage({ id: "Study" })}
                    className="me-4 text-dark"
                  />
                  <Form.Check
                    type="radio"
                    id="lawsuitRadio"
                    name="caseType"
                    value="lawsuit"
                    checked={caseType === "lawsuit"}
                    onChange={(e) => setCaseType(e.target.value)}
                    label={intl.formatMessage({ id: "Lawsuit" })}
                    className="text-dark"
                  />
                  <input
                    type="hidden"
                    {...register("caseType", { required: true })}
                    value={caseType}
                  />

                  <input
                    type="hidden"
                    {...register("LK_StageId")}
                    value={caseType === "study" ? "1" : ""}
                  />
                </div>
                {errors?.caseType &&
                  DisplayErrorMessage(
                    errors?.caseType?.message,
                    intl,
                    language
                  )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {caseType === "lawsuit" && (
              <>
                <Col lg={4} className="h-auto mt-5">
                  <Form.Group controlId="caseDaySelect">
                    <Form.Label className="mb-3">
                      {intl.formatMessage({ id: "TheLawsuitCateogry" })}
                    </Form.Label>
                    <div className="">
                      <select
                        id="caseStage"
                        name="caseStage"
                        className="form-select mt-1"
                        {...register("causeStageId")}
                        defaultValue={""}
                        aria-label="The Lawsuit"
                      >
                        <option value="" disabled>
                          {intl.formatMessage({
                            id: "SelectTheLawsuitCategory",
                          })}
                        </option>
                        {Array.isArray(causeStages) &&
                          causeStages
                            .filter((caseStage: any) => !caseStage.isStudy)
                            .map((caseStage: any) => (
                              <option key={caseStage?.id} value={caseStage?.id}>
                                {language === "ar"
                                  ? caseStage.nameAr
                                  : caseStage.nameEn}
                              </option>
                            ))}
                      </select>
                    </div>
                    {DisplayErrorMessage(
                      errors?.causeStageId?.message,
                      intl,
                      language
                    )}
                  </Form.Group>
                </Col>
                <Col lg={4} className="h-auto mt-5">
                  <Form.Group controlId="caseDateInput">
                    <Form.Label className="mb-3">
                      {intl.formatMessage({ id: "CaseDate" })}
                      <span className="text-danger mx-2">*</span>
                    </Form.Label>
                    <div className="">
                      <input
                        id="caseDate"
                        name="caseDate"
                        type="date"
                        className="form-control mt-1"
                        {...register("caseDate")}
                        aria-label="Case Date"
                      />
                    </div>
                    {DisplayErrorMessage(
                      errors?.caseDate?.message,
                      intl,
                      language
                    )}
                  </Form.Group>
                </Col>
                <Col lg={4} className="h-auto mt-5">
                  <Form.Group controlId="causeStageNumberInput">
                    <Form.Label className="mb-3">
                      {intl.formatMessage({ id: "CaseNumber" })}
                      <span className="text-danger mx-2">*</span>
                    </Form.Label>
                    <div className="">
                      <input
                        id="causeStageNumber"
                        name="causeStageNumber"
                        type="text"
                        className="form-control mt-1"
                        placeholder={intl.formatMessage({
                          id: "EnterCaseNumber",
                        })}
                        {...register("causeStageNumber")}
                        aria-label="Case Number"
                      />
                    </div>
                    {DisplayErrorMessage(
                      errors?.causeStageNumber?.message,
                      intl,
                      language
                    )}
                  </Form.Group>
                </Col>
              </>
            )}
            <Col lg={4} className="h-auto mt-5">
              <Form.Group controlId="lkTypeJudiciarySelect">
                <Form.Label className="mb-3">
                  {intl.formatMessage({ id: "TypeJudiciary" })}
                  <span className="text-danger mx-2">*</span>
                </Form.Label>
                <div className="">
                  <select
                    id="lkTypeJudiciary"
                    name="lkTypeJudiciary"
                    className="form-select mt-1"
                    {...register("LK_TypeJudiciaryId")}
                    defaultValue={""}
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
                {DisplayErrorMessage(
                  errors?.LK_TypeJudiciaryId?.message,
                  intl,
                  language
                )}
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CaseSection;
