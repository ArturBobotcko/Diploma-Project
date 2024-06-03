import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import ruLocale from '@fullcalendar/core/locales/ru';
import { DateTime } from 'luxon';
import '../StudentSchedule.css';

const ParentSchedule = () => {
  const { user } = useStateContext();
  const [selectedChild, setSelectedChild] = useState(null);
  const [childSchedule, setChildSchedule] = useState([]);

  const handleStudentSelect = event => {
    const childId = user.children[event.target.value].id;
    setSelectedChild(user.children[event.target.value]);
    axiosClient
      .get(`/api/getStudentSchedule/${childId}`)
      .then(response => {
        setChildSchedule(response.data.schedule);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const dayOfWeekToDate = dayOfWeek => {
    const daysOfWeek = {
      Понедельник: 1,
      Вторник: 2,
      Среда: 3,
      Четверг: 4,
      Пятница: 5,
      Суббота: 6,
      Воскресенье: 7,
    };
    return daysOfWeek[dayOfWeek];
  };

  const events = childSchedule.flatMap(({ discipline, teacher, schedules }) =>
    schedules.map(schedule => {
      const date = DateTime.fromISO(schedule.day_of_week);
      const start = date
        .set({
          hour: parseInt(schedule.start_time.split(':')[0], 10),
          minute: parseInt(schedule.start_time.split(':')[1], 10),
        })
        .toJSDate();
      const end = date
        .set({
          hour: parseInt(schedule.end_time.split(':')[0], 10),
          minute: parseInt(schedule.end_time.split(':')[1], 10),
        })
        .toJSDate();
      const teacherFullName = teacher.user.patronym
        ? `${teacher.user.surname} ${teacher.user.name} ${teacher.user.patronym}`
        : `${teacher.user.surname} ${teacher.user.name}`;
      return {
        title: `${teacherFullName}`,
        start,
        end,
        allDay: false,
        extendedProps: {
          fullTitle: `${discipline} (${teacher.user.surname} ${teacher.user.name} ${teacher.user.patronym})`,
        },
      };
    }),
  );

  const renderEventContent = eventInfo => {
    const startTime = DateTime.fromJSDate(eventInfo.event.start).toFormat(
      'HH:mm',
    );
    const endTime = DateTime.fromJSDate(eventInfo.event.end).toFormat('HH:mm');
    return (
      <div className="event-content p-1">
        <b>{`${startTime} - ${endTime}`}</b>
        <i>{` ${eventInfo.event.title}`}</i>
        <div className="tooltip">{eventInfo.event.extendedProps.fullTitle}</div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="col-md-6 mb-3">
        <select className="form-select" onChange={e => handleStudentSelect(e)}>
          <option value="" selected>
            Выберите ученика
          </option>
          {user.children.map((child, index) => (
            <option key={index} value={index}>
              {child.surname} {child.name} {child.patronym}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="container mt-4"> */}
      {childSchedule.length > 0 ? (
        <>
          <h2 className="mb-4">
            Расписание занятий ученика: {selectedChild.surname}{' '}
            {selectedChild.name} {selectedChild.patronym}
          </h2>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            locale={ruLocale}
            events={events}
            eventContent={renderEventContent}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }}
            nowIndicator
            allDaySlot={false}
            firstDay={1}
            height="auto"
          />
        </>
      ) : (
        <></>
      )}

      {/* </div> */}
    </div>
  );
};

export default ParentSchedule;
