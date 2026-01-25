import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import Sessions from "./components/Sessions";
import SessionsFullCalendar from "./components/SessionsFullCalendar";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import AddSessionPopup from "../list-of-Cases/popups/AddSessionPopup";

function SessionsHome() {
  let [showAddSessionPopup, setShowAddSessionPopup] = useState(false);
  let [showCalendar, setShowCalendar] = useState(false);
  let intl = useIntl();
  return (
    <>
      <div>
        <div
          id="kt_toolbar_container"
          className="container d-flex flex-stack flex-wrap p-0"
        >
          <div className="col-xs-12 col-sm-8">
            <GenericToolbar list={[{ key: "ManagingSessions", value: "" }]} />
          </div>
          <div className="">
            <div className="d-flex justify-content-sm-end align-items-center flex-wrap">
              <button
                onClick={() => {
                  setShowAddSessionPopup(true);
                }}
                className="btn btn-light text-gray-800 mb-sm-0 mb-3"
              >
                {intl.formatMessage({ id: "AddSession" })}
              </button>
              <button 
                onClick={() => setShowCalendar(!showCalendar)}
                className={`btn ${showCalendar ? 'btn-primary' : 'btn-light'} text-gray-800 mb-sm-0 mb-3 ms-3`}
                title={showCalendar ? intl.formatMessage({ id: "SwitchToListView" }) : intl.formatMessage({ id: "SwitchToCalendarView" })}
              >
                <span className="svg-icon svg-icon-2">
                  <i className="fa-solid fa-calendar-days"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
        {showCalendar ? <SessionsFullCalendar /> : <Sessions />}
      </div>

      {showAddSessionPopup && (
        <AddSessionPopup
          show={showAddSessionPopup}
          handleClose={() => {
            setShowAddSessionPopup(false);
          }}
          comeFromSessionsList={true}
        />
      )}
    </>
  );
}

export default SessionsHome;
