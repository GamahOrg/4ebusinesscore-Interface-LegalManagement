import { useState } from "react";
import { useIntl } from "react-intl";
import { ShowMore } from "../propus/ShowMore";

export default function LawistData2() {
  const intl = useIntl();
  const [showModel, setShowModel] = useState(false);

  const study = {
    id: 2541851,
    info: `هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء.`,
    created_at: "2022-01-01",
  };
  const handleClose = () => {
    setShowModel(false);
  };
  return (
    <div>
      <div className="main-container-followLawsuits p-7">
  {/* Title */}
  <h4 className="main-title-lawsuit">
    {intl.formatMessage({ id: "Lawist" })}
  </h4>

  {/* Row 1 */}
  <div className="row mt-3">
    {/* Case Number */}
    <div className="col-md-4 col-12">
      <p className="text-gray-400 d-inline">
        {intl.formatMessage({ id: "CaseNumber" })}
      </p>
      <span className="ms-2 me-2">:</span>
      <p className="lawsuit-text-left d-inline">12345678</p>
    </div>

    {/* Competent Court */}
    <div className="col-md-4 col-12">
      <p className="text-gray-400 d-inline">
        {intl.formatMessage({ id: "CompetentCourt" })}
      </p>
      <span className="ms-2 me-2">:</span>
      <p className="lawsuit-text-left d-inline">
        {intl.formatMessage({ id: "Alia" })}
      </p>
    </div>

    {/* Date of the Case */}
    <div className="col-md-4 col-12">
      <p className="text-gray-400 d-inline">
        {intl.formatMessage({ id: "DateOfTheCase" })}
      </p>
      <span className="ms-2 me-2">:</span>
      <p className="lawsuit-text-left d-inline">12/9/2024</p>
    </div>
  </div>

  {/* Row 2 */}
  <div className="row mt-3">
    {/* The Court */}
    <div className="col-md-4 col-12">
      <p className="text-gray-400 d-inline">
        {intl.formatMessage({ id: "TheCourt" })}
      </p>
      <span className="ms-2 me-2">:</span>
      <p className="lawsuit-text-left d-inline">
        {intl.formatMessage({ id: "Fifteen" })}
      </p>
    </div>

    {/* Role Type */}
    <div className="col-md-4 col-12">
      <p className="text-gray-400 d-inline">
        {intl.formatMessage({ id: "RoleType" })}
      </p>
      <span className="ms-2 me-2">:</span>
      <p className="lawsuit-text-left d-inline">
        {intl.formatMessage({ id: "ObjectionToAnAdministrativeDecision" })}
      </p>
    </div>

    {/* Gender */}
    <div className="col-md-4 col-12">
      <p className="text-gray-400 d-inline">
        {intl.formatMessage({ id: "Gender" })}
      </p>
      <span className="ms-2 me-2">:</span>
      <p className="lawsuit-text-left d-inline">
        {intl.formatMessage({ id: "managment" })}
      </p>
    </div>
  </div>

  {/* Subject of the Lawsuit */}




        <div className="mt-4 mb-9">
          <p className="text-gray-400">
            {intl.formatMessage({ id: "SubjectOfTheLawsuit" })}
          </p>
          <p className="lawsuit-text-left">
            {intl.formatMessage({ id: "paragraphOfLawsuit" })}
          </p>
        </div>
      </div>

      <div className="main-container-followLawsuits mb-9 mt-6 p-7">
        <h4 className="main-title-lawsuit">
          {intl.formatMessage({ id: "Defendant2" })}
        </h4>

        <div className="d-flex justify-content-between w-70 mt-3">
          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "Name" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "AbdullahbinMohammedbinIbrahim" })}
            </p>
          </div>

          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "IDNumber" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "12345678" })}
            </p>
          </div>

          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "IdentityType" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "One" })}
            </p>
          </div>
        </div>

        <div className="d-flex mb-6 mt-3">
          <p className="text-gray-400">{intl.formatMessage({ id: "Email" })}</p>
          <span className="ms-2 me-2">:</span>
          <p className="lawsuit-text-left">abd.fasal@gmail.com</p>
        </div>
      </div>
      <ShowMore show={showModel} handleClose={handleClose} data={study.info} />
    </div>
  );
}
