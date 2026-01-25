import React, { useRef, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { fetchAllSessionsNew } from '../../../features/session';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { HeaderToolbarAgenda } from './HeaderToolbarAgenda';
import SessionDetailsPopup from './SessionDetailsPopup';

interface SessionsFullCalendarProps {
  onToggleView?: () => void;
}

const SessionsFullCalendar: React.FC<SessionsFullCalendarProps> = ({ onToggleView }) => {
  const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const calendarRef = useRef<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const { sessionsNew } = useSelector((state: RootState) => state.session);


  useEffect(() => {
    dispatch(fetchAllSessionsNew({
      PageSize: 10000, 
      PageNumber: 1
    }));
  }, [dispatch]);

  
  useEffect(() => {
    if (sessionsNew && sessionsNew.length > 0) {
      const calendarEvents = sessionsNew.map((session: any) => ({
        id: session.sessionId,
        title: `${session.causeTitle} #${session.sessionNumber}`,
        date: session.sessionDate,
        backgroundColor: session.causeStatus === 2 ? '#e8f5e8' : '#ffe8e8',
        borderColor: session.causeStatus === 2 ? '#2d5a2d' : '#5a2d2d',
        textColor: session.causeStatus === 2 ? '#2d5a2d' : '#5a2d2d',
        extendedProps: {
          sessionId: session.sessionId,
          causeId: session.causeId,
          causeTitle: session.causeTitle,
          sessionNumber: session.sessionNumber,
          causeStatus: session.causeStatus
        }
      }));
      setEvents(calendarEvents);
    }
  }, [sessionsNew]);

  const renderEventContent = (eventInfo: any) => {
    return (
      <div className="session-event-content">
        <div className="session-title">{eventInfo.event.title}</div>
      </div>
    );
  };

  const handleEventClick = (e: any) => {
    const session = sessionsNew?.find((session: any) => session.sessionId === e.event.id);
    if (session) {
      console.log('Session clicked:', session);
      setSelectedSession(session);
      setIsPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedSession(null);
  };

  return (
    <div className="container card card-xl-stretch mb-xl-8">
      <style>
        {`
          .session-event-content {
            padding: 2px 4px;
            font-size: 11px;
            line-height: 1.2;
            width: 100%;
            min-width: 0;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          .session-title {
            font-weight: 600;
            word-break: break-word;
            white-space: normal;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .fc-event {
            cursor: pointer;
            margin: 1px 0;
            width: 100%;
            min-width: 0;
          }
          .fc-daygrid-event {
            width: 100%;
            min-width: 0;
          }
          .fc-daygrid-day-events {
            width: 100%;
            min-width: 0;
          }
          
          /* Popup styles */
          .modal-backdrop {
            backdrop-filter: blur(2px);
          }
          
          .modal-content {
            border: none;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          }
          
          .modal-header {
            border-bottom: 1px solid #e9ecef;
            background-color: #f8f9fa;
          }
          
          .modal-footer {
            border-top: 1px solid #e9ecef;
            background-color: #f8f9fa;
          }
        `}
      </style>
      <div className="d-flex align-items-center mt-8 mb-6 row">
        <div className="d-flex flex-column col-12 col-sm-12 col-md-3 col-lg-3">
          <h1 className="">
            <span className="fs-2 mt-3 mb-1">
              {intl.formatMessage({ id: "SessionsCalendar" })}
            </span>
          </h1>
          <h1 className="card-title">
            <span className="fw-semibold fs-6 text-muted">
              {intl.formatMessage({
                id: "ViewSessionsInCalendar",
              })}
            </span>
          </h1>
        </div>
      </div>
      <div className="card-body">
        <HeaderToolbarAgenda calendarRef={calendarRef} />
        <div className="custom-full-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={renderEventContent}
            locale={intl.locale === "ar" ? "ar" : "en"}
            direction={intl.locale === "ar" ? "rtl" : "ltr"}
            headerToolbar={false}
            dayHeaderClassNames={"rounded text-dark"}
            eventClick={handleEventClick}
            editable
            eventDidMount={(info) => {
              if (info.el) {
                let theWholeEvent =
                  info.el.parentElement?.parentElement?.parentElement;
                if (theWholeEvent)
                  theWholeEvent.style.background = "#fff";
              }
            }}
            dayMaxEventRows={3}
          />
        </div>
      </div>
      
      {/* Session Details Popup */}
      <SessionDetailsPopup
        session={selectedSession}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default SessionsFullCalendar;
