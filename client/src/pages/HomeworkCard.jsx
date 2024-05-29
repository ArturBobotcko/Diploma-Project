import React from 'react';
import { ru } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

const HomeworkCard = ({ homework }) => {
  const formatDate = date => {
    try {
      const zonedDate = formatInTimeZone(
        new Date(date),
        'Europe/Moscow',
        'dd MMMM yyyy, HH:mm',
        { locale: ru },
      );
      return zonedDate;
    } catch (error) {
      console.error('Invalid date format:', date);
      return 'Некорректная дата';
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{homework.description}</h5>
        <p className="card-text">Дата сдачи: {formatDate(homework.deadline)}</p>
        {/* Другие данные о домашнем задании, которые вы хотите отобразить */}
      </div>
    </div>
  );
};

export default HomeworkCard;
