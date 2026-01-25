import { useState } from "react";
import { useIntl } from "react-intl";
import { ShowMore } from "../propus/ShowMore";

export default function LawistData() {
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
        <div className="px-3 mb-1">
          <p className="fw-bolder fs-4">
            {intl.formatMessage({ id: "TheNote" })}
          </p>
        </div>
        <div className="row gy-5 p-3">
          <div className="col-lg-4 col-sm-12">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "StudyClaimNumber" })} :
              <span className="mx-1 lawsuit-text-left">12345456</span>
            </p>
          </div>
          <div className="col-lg-4 col-sm-12">
            <p className="text-gray-400">
              {" "}
              {intl.formatMessage({ id: "StudyClaimDate" })} :
              <span className="mx-2 lawsuit-text-left">
                {intl.formatMessage({ id: "DateOfTheCase3" })} :
              </span>
            </p>
          </div>
          <div className="row gy-2 p-3">
            <div className="col-12">
              <p className="text-gray-400">
                {" "}
                {intl.formatMessage({ id: "StudyClaimInfo" })}
              </p>
              <p className="mx-2 text-dark fw-bold">
                {study?.info?.slice(0, 200)}

                {study?.info?.length > 200 && (
                  <span
                    className="mx-2 text-primary fw-bold cursor-pointer"
                    onClick={() => setShowModel(true)}
                  >
                    {intl.formatMessage({ id: "ReadMore" })}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container-followLawsuits p-7">
        <h4 className="main-title-lawsuit">
          {intl.formatMessage({ id: "Lawist" })}
        </h4>

        <div className="d-flex justify-content-between w-70 mt-3">
          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "CaseNumber" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">12345678</p>
          </div>

          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "CompetentCourt" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "Alia" })}
            </p>
          </div>

          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "DateOfTheCase" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">12/9/2024</p>
          </div>
        </div>

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
          {intl.formatMessage({ id: "Defendant" })}
        </h4>

        <div className="d-flex justify-content-between w-70 mt-3">
          <div className="d-flex">
            <p className="text-gray-400">
              {intl.formatMessage({ id: "DefendantName" })}
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
              {intl.formatMessage({ id: "Defendant'sIDType" })}
            </p>
            <span className="ms-2 me-2">:</span>
            <p className="lawsuit-text-left">
              {intl.formatMessage({ id: "NationalIdentity" })}
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
