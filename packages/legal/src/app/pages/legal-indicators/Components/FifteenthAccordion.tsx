import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { RootState, useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { fetchIndicatorsSessionsAndSessionNotes } from "../../../features/legalIndicatorSlice";
import Spinner from "react-bootstrap/esm/Spinner";

const FifteenthAccordion = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { indicatorsSessionsAndSessionNotes, loading, error } = useSelector(
      (state: RootState) => state.Indicator
    );

  useEffect(() => {
  if (!indicatorsSessionsAndSessionNotes) {
    dispatch(fetchIndicatorsSessionsAndSessionNotes());
  }
}, [dispatch, indicatorsSessionsAndSessionNotes]);


    if (loading) {
    return (
      <div className="d-flex gap-4 justify-content-center align-items-center py-4">
        {intl.formatMessage({ id: "DataIsLoaded..." })}
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  const statisticsCards = [
    {
      icon: "fa-solid fa-table-list fa-lg text-primary",
      title: intl.formatMessage({ id: "TotalSessions" }),
      percentage: 50,
      value: indicatorsSessionsAndSessionNotes?.totalSessions,
      cardClass: "bg-primary",
    },
    {
      icon: "fas fa-check-square fa-lg text-warning",
      title: intl.formatMessage({ id: "TotalSessionNotes" }),
      percentage: 50,
      value: indicatorsSessionsAndSessionNotes?.totalSessionNotes,
      cardClass: "bg-warning",
    },
    {
      icon: "fa-solid fa-book-open fa-lg text-success",
      title: intl.formatMessage({ id: "SessionsWithNotesPercentage" }),
      percentage: 50,
      value: indicatorsSessionsAndSessionNotes?.sessionsWithNotesPercentage,
      cardClass: "bg-success",
    },
    {
      icon: "fa-solid fa-folder-open fa-lg text-info",
      title: intl.formatMessage({ id: "SessionsWithJudgementPercentage" }),
      percentage: 15,
      value: indicatorsSessionsAndSessionNotes?.sessionsWithJudgementPercentage,
      cardClass: "bg-info",
    },
    {
      icon: "fa-solid fa-chart-line  fa-lg text-orange",
      title: intl.formatMessage({ id: "AverageSessionsPerCause" }),
      percentage: 15,
      value: indicatorsSessionsAndSessionNotes?.averageSessionsPerCause,
      cardClass: "bg-orange",
    },
  ];

  return (
    <div>
      <div className="row d-flex flex-wrap">
        {statisticsCards.map((card, index) => (
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4" key={index}>
            <div
              className="p-5 rounded d-flex align-items-center shadow-sm h-100"
              key={index}
            >
              <div className="w-100">
                <div className="d-flex flex-row align-items-center">
                  <div
                    className={`${card.cardClass} bg-opacity-10 rounded-circle p-2 d-flex flex-column align-items-center justify-content-center w-30px h-30px`}
                  >
                    {card.icon.type === undefined ? (
                      <i className={card.icon}> </i>
                    ) : (
                      <span className="symbol-label bg-light-danger">
                        <span className="svg-icon svg-icon-2 svg-icon-danger">
                          {card.icon}
                        </span>
                      </span>
                    )}
                  </div>
                  <span className="ms-3 fs-3">{card.title}</span>
                </div>
                <div className="d-flex align-items-center my-4">
                  <span className="h4 mb-0 fw-bolder">{card.value}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FifteenthAccordion;
