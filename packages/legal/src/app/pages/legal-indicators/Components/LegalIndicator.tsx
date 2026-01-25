import { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import FourthAccordion from "./FourthAccordion";
import ThirdAccordion from "./ThirdAccordion";
import FifthAccordion from "./FifthAccordion";
import TotalStatistics from "./TotalStatistics";
import { Accordion } from "react-bootstrap";
import NinthAccordion from "./NinthAccordion";
import TenthAccordion from "./TenthAccordion";
import EleventhAccordion from "./EleventhAccordion";
import TwelfthAccordion from "./TwelfthAccordion";
import ThirteenthAccordion from "./ThirteenthAccordion";
import FourteenthAccordion from "./FourteenthAccordion";
import FifteenthAccordion from "./FifteenthAccordion";
import SixteenthAccordion from "./SixteenthAccordion";
import SeventeenthAccordion from "./SeventeenthAccordion";
import EighteenthAccordion from "./EighteenthAccordion";
import SecondAccordion from "./SecondAccordion";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { 
  fetchIndicatorsAttachments, 
  fetchIndicatorsCauseStage, 
  fetchIndicatorsELibraries,
  fetchIndicatorsJudgementGround,
  fetchIndicatorsLawyers,
  fetchIndicatorsLitigants,
  fetchIndicatorsSessionsAndSessionNotes,
  fetchIndicatorsTime,
  fetchCausesCount,
  fetchCausesDuration
} from "../../../features/legalIndicatorSlice";

const LegalIndicator: FC = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const {
     indicatorsAttachments, 
     indicatorsCauseStage, 
     indicatorsELibraries,
     indicatorsJudgementGround,
     indicatorsLawyers,
     indicatorsLitigants,
     indicatorsSessionsAndSessionNotes,
     indicatorsTime,
     causesCount,
     causesDuration
  } = useSelector(
    (state: RootState) => state.Indicator
  );

    useEffect(() => {
      dispatch(fetchIndicatorsAttachments());
      dispatch(fetchIndicatorsCauseStage());
      dispatch(fetchIndicatorsELibraries());
      dispatch(fetchIndicatorsJudgementGround());
      dispatch(fetchIndicatorsLawyers());
      dispatch(fetchIndicatorsLitigants());
      dispatch(fetchIndicatorsSessionsAndSessionNotes());
      dispatch(fetchIndicatorsTime());
      dispatch(fetchCausesCount());
      dispatch(fetchCausesDuration());
    }, [dispatch]);

  const EN_LANG = "en";
  let selectedLang = localStorage.getItem("i18nConfig");
  try {
    selectedLang = JSON.parse(selectedLang as string).selectedLang;
  } catch (err) { }

  const statisticsData = [
    {
      id: "1",
      title: `${intl.formatMessage({
        id: "IndicatorsAttachments",
        defaultMessage: "IndicatorsAttachments",
      })}`,
      content: indicatorsAttachments ? <TotalStatistics /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "2",
      title: intl.formatMessage({ id: "IndicatorsCauseStage" }),
      content: indicatorsCauseStage ? <NinthAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "3",
      title: intl.formatMessage({ id: "AttachmentsPerStage" }),
      content: indicatorsCauseStage ? <ThirdAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "4",
      title: intl.formatMessage({ id: "NotesPerStage" }),
      content: indicatorsCauseStage ? <TenthAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "5",
      title: intl.formatMessage({ id: "IndicatorsELibraries" }),
      content: indicatorsELibraries ? <EleventhAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "6",
      title: intl.formatMessage({ id: "IndicatorsJudgementGround" }),
      content: indicatorsJudgementGround ? <TwelfthAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "7",
      title: intl.formatMessage({ id: "IndicatorsLawyers" }),
      content: indicatorsLawyers ? <ThirteenthAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "8",
      title: intl.formatMessage({ id: "IndicatorsLitigants" }),
      content: indicatorsLitigants ? <FourteenthAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "9",
      title: intl.formatMessage({ id: "LitigantsPerCause" }),
      content: indicatorsLitigants ? <FifthAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "10",
      title: intl.formatMessage({ id: "LitigantsByIdentityType" }),
      content: indicatorsLitigants ? <FourthAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "11",
      title: intl.formatMessage({ id: "IndicatorsSessionsAndSessionNotes" }),
      content: indicatorsSessionsAndSessionNotes ? <FifteenthAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "12",
      title: intl.formatMessage({ id: "IndicatorsTime" }),
      content: indicatorsTime ? <SixteenthAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "13",
      title: intl.formatMessage({ id: "MonthlyCauseCreations" }),
      content: indicatorsTime ? <SeventeenthAccordion /> : null,
      cols: "mb-3 col-12",
    },
    {
      id: "14",
      title: intl.formatMessage({ id: "JudicialIndicators" }),
      content: causesCount&&causesDuration ? <EighteenthAccordion /> : null,
      cols: "mb-3 col-12",
    },
  ];

  return (
    <div className="card card-xl-stretch mb-xl-8">
      <div className="card-body pt-0 mt-8">
        <div className="row">
          {statisticsData
            .filter((item) => item.content !== null)
            .map((item, index) => (
            <div className={item.cols} key={item.id}>
              <Accordion defaultActiveKey={item.id}>
                <Accordion.Item
                  eventKey={item.id}
                  className={`standards-accordion-button ${index != 0 ? "mt-5" : "mb-3"
                    } dark-bg-color`}
                >
                  <Accordion.Header
                    className={`border-${selectedLang == EN_LANG ? "start" : "end"
                      } d-flex border-primary border-4 border-bottom-0 bg-transparent`}
                  >
                    <span className="text-primary h3 fw-bolder d-flex align-items-center">
                      <i
                        className={`fa-solid fa-angle-${selectedLang == EN_LANG ? "right" : "left"
                          } fs-2x mx-2`}
                      ></i>
                      {item.title}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>{item.content}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { LegalIndicator };
