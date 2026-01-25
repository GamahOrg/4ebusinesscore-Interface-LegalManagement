import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import CustomLineChart from "./LineCharts";
import { RootState, useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { fetchIndicatorsLitigants } from "../../../features/legalIndicatorSlice";
import Spinner from "react-bootstrap/esm/Spinner";

const FifthAccordion = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { indicatorsLitigants, loading, error } = useSelector(
      (state: RootState) => state.Indicator
    );

  useEffect(() => {
  if (!indicatorsLitigants) {
    dispatch(fetchIndicatorsLitigants());
  }
  }, [dispatch, indicatorsLitigants]);


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

  const litigantsByIdentityType = indicatorsLitigants?.litigantsByIdentityType || [];
  const isArabic = intl.locale === 'ar';
  const labels = litigantsByIdentityType.map(item => {
  if (isArabic && item.identityTypeNameAr && item.identityTypeNameAr.length > 0) {
    return item.identityTypeNameAr[0];
  } else if (item.identityTypeNameEn && item.identityTypeNameEn.length > 0) {
    return item.identityTypeNameEn[0];
  }
  return '';
});

const dataValues = litigantsByIdentityType.map(item => item.count);

      
  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: dataValues,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  return <CustomLineChart chartData={data} />;
};

export default FifthAccordion;
