import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { RootState, useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { fetchCausesCount, fetchCausesDuration } from "../../../features/legalIndicatorSlice";
import Spinner from "react-bootstrap/esm/Spinner";

const EighteenthAccordion = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { causesCount, loading, error } = useSelector(
      (state: RootState) => state.Indicator
    );

  const { causesDuration } = useSelector(
      (state: RootState) => state.Indicator
    );

  useEffect(() => {
  if (!causesCount) {
    dispatch(fetchCausesCount());
  }
  }, [dispatch, causesCount]);

    useEffect(() => {
  if (!causesDuration) {
    dispatch(fetchCausesDuration());
  }
  }, [dispatch, causesDuration]);

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
      title: intl.formatMessage({ id: "CausesCount" }),
      percentage: 50,
      value: causesCount,
      cardClass: "bg-primary",
    },
    {
      icon: "fa-solid fa-chart-line  fa-lg text-orange",
      title: intl.formatMessage({ id: "CausesDuration" }),
      percentage: 50,
      value: causesDuration,
      cardClass: "bg-orange",
    }
  ];

  return (
    <div>
      <div className="row d-flex flex-wrap">
        {statisticsCards.map((card, index) => (
          <div className="col-sm-6 col-12 col-sm-4 col-lg" key={index}>
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

export default EighteenthAccordion;
