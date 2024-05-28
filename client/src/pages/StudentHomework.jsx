import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const StudentHomework = () => {
  const { user } = useStateContext();
  const [homeworks, setHomeworks] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [selectedDisciplineName, setSelectedDisciplineName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/api/getStudentDisciplines/${user.user_data.id}`)
      .then(response => {
        setDisciplines(response.data.disciplines);
      });
  }, [user.user_data.id]);

  useEffect(() => {
    if (selectedDiscipline) {
      axiosClient
        .get(
          `/api/getStudentHomeworks/${user.user_data.id}?discipline=${selectedDiscipline}`,
        )
        .then(response => {
          setHomeworks(response.data.homeworks);
        });
    }
  }, [selectedDiscipline, user.user_data.id]);

  const handleDisciplineClick = (disciplineId, disciplineName) => {
    setSelectedDiscipline(disciplineId);
    setSelectedDisciplineName(disciplineName);
  };

  const handleHomeworkClick = homeworkId => {
    navigate(`/answer-homework/${homeworkId}`);
  };

  const formatDate = date => {
    return format(date, 'dd MMMM yyyy', { locale: ru });
  };

  const renderHomeworks = (homeworks, title, filter, cardClass) => {
    const filteredHomeworks = homeworks.filter(filter);
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="text-dark">{title}</h3>
          {filteredHomeworks.length > 0 ? (
            <div className="row">
              {filteredHomeworks.map(homework => (
                <div
                  className="col-md-4"
                  key={homework.id}
                  onClick={() => handleHomeworkClick(homework.id)}
                >
                  <div
                    className={`card h-100 ${cardClass}`}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={e => {
                      e.currentTarget.querySelector(
                        '.card-title',
                      ).style.textDecoration = 'underline';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.querySelector(
                        '.card-title',
                      ).style.textDecoration = '';
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{homework.description}</h5>
                      <p className="card-text">
                        Сдать до: {formatDate(homework.deadline)}
                      </p>
                      {title === 'Скоро истекает дедлайн' && (
                        <p className="card-text">
                          Осталось{' '}
                          {Math.ceil(
                            (new Date(homework.deadline) - new Date()) / 36e5,
                          )}{' '}
                          часов
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Нет заданий</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {!selectedDiscipline ? (
        <div className="card mb-3">
          <div className="card-body">
            <h2 className="text-dark">Выберите дисциплину</h2>
            <ul className="list-group">
              {disciplines.map(discipline => (
                <li
                  key={discipline.id}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    handleDisciplineClick(discipline.id, discipline.name)
                  }
                >
                  {discipline.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="card mb-3">
            <div className="card-body">
              <h2 className="text-dark m-0">{selectedDisciplineName}</h2>
            </div>
          </div>
          {renderHomeworks(
            homeworks,
            'Не выполненные задания',
            hw => hw.completion_status === 0,
            'bg-warning text-dark',
          )}
          {renderHomeworks(
            homeworks,
            'Выполненные задания',
            hw => hw.completion_status === 1,
            'bg-success text-white',
          )}
          {renderHomeworks(
            homeworks,
            'Скоро истекает дедлайн',
            hw =>
              new Date(hw.deadline) - new Date() <= 3 * 24 * 60 * 60 * 1000 &&
              hw.completion_status === 0,
            'bg-danger text-white',
          )}
        </>
      )}
    </div>
  );
};

export default StudentHomework;
