import React, { useState, useEffect } from "react";
import CustomLineChart from "./LineCharts";
import { useIntl } from "react-intl";
import { RootState, useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { fetchIndicatorsTime } from "../../../features/legalIndicatorSlice";
import Spinner from "react-bootstrap/esm/Spinner";

const SeventeenthAccordion = () => {
    const intl = useIntl();
    const dispatch = useAppDispatch();
    const { indicatorsTime, loading, error } = useSelector(
        (state: RootState) => state.Indicator
    );

    useEffect(() => {
      if (!indicatorsTime) {
        dispatch(fetchIndicatorsTime());
      }
    }, [dispatch, indicatorsTime]);


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

    const monthlyCauseCreations = indicatorsTime?.monthlyCauseCreations || [];
    
    const getMonthName = (monthNumber) => {
        const isArabic = intl.locale === 'ar';
        
        const monthNames = {
            en: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            ar: [
                'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
            ]
        };
        
        const months = isArabic ? monthNames.ar : monthNames.en;
        return months[monthNumber - 1] || '';
    };

    const sortedData = [...monthlyCauseCreations].sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year;
        }
        return a.month - b.month;
    });

    const labels = sortedData.map(item => {
        const monthName = getMonthName(item.month);
        return monthName;
    });
    
    const dataValues = sortedData.map(item => item.causeCount);

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

export default SeventeenthAccordion;