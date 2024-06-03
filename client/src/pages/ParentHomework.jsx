import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const ParentHomework = () => {
  const { user } = useStateContext();
  const [selectedChild, setSelectedChild] = useState(null);
  const [childHomeworks, setChildHomeworks] = useState([]);
  const [filters, setFilters] = useState({
    discipline: '',
    status: '',
    deadline: '',
  });

  const handleChildSelect = event => {
    const childId = user.children[event.target.value].id;
    setSelectedChild(user.children[event.target.value]);
    axiosClient
      .get(`/api/getStudentHomeworks/${childId}`)
      .then(response => {
        setChildHomeworks(response.data.homeworks);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleFilterChange = event => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredHomeworks = childHomeworks.filter(homework => {
    return (
      (filters.discipline === '' ||
        homework.discipline.includes(filters.discipline)) &&
      (filters.status === '' ||
        (filters.status === 'completed'
          ? homework.completion_status === 1
          : homework.completion_status === 0)) &&
      (filters.deadline === '' ||
        format(new Date(homework.deadline), 'yyyy-MM-dd') === filters.deadline)
    );
  });

  const formatDate = date => {
    return format(new Date(date), 'dd MMMM yyyy, HH:mm', { locale: ru });
  };

  return (
    <div className="container">
      <div className="col-md-6 mb-3">
        <select className="form-select" onChange={e => handleChildSelect(e)}>
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
      {selectedChild && (
        <div>
          <div className="card mb-3">
            <div className="card-body bg-white text-dark">
              <h4 className="mb-0">
                Домашние задания ученика: {selectedChild.surname}{' '}
                {selectedChild.name} {selectedChild.patronym}
              </h4>
            </div>
          </div>
          <div className="mb-3">
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Фильтр по дисциплине"
                  name="discipline"
                  value={filters.discipline}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">Фильтр по статусу</option>
                  <option value="completed">Выполнено</option>
                  <option value="not_completed">Не выполнено</option>
                </select>
              </div>
              <div className="col-md-4">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Фильтр по сроку сдачи</Tooltip>}
                >
                  <input
                    type="date"
                    className="form-control"
                    name="deadline"
                    value={filters.deadline}
                    onChange={handleFilterChange}
                  />
                </OverlayTrigger>
              </div>
            </div>
          </div>
          {filteredHomeworks.length > 0 ? (
            <div className="table-responsive">
              <table
                className="table table-hover table-bordered border-muted"
                style={{ backgroundColor: 'white' }}
              >
                <thead>
                  <tr>
                    <th scope="col">Дисциплина</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Дата ответа</th>
                    <th scope="col">Срок сдачи</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Замечания учителя</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Дата проверки</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHomeworks.map(homework => (
                    <tr key={homework.id}>
                      <td className="align-middle">{homework.discipline}</td>
                      <td className="align-middle">{homework.description}</td>
                      <td className="align-middle">
                        {homework.done_at !== null
                          ? formatDate(homework.done_at)
                          : 'Нет ответа'}
                      </td>
                      <td className="align-middle">
                        {formatDate(homework.deadline)}
                      </td>
                      <td className="align-middle">
                        {homework.completion_status === 1 ? (
                          <span className="badge bg-success">Выполнено</span>
                        ) : (
                          <span className="badge bg-danger">Не выполнено</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {homework.teacher_note || 'Нет'}
                      </td>
                      <td className="align-middle">
                        {homework.grade !== null ? (
                          <span
                            className={`badge ${homework.grade <= 3 ? 'bg-danger' : homework.grade === 4 ? 'bg-warning' : 'bg-success'}`}
                          >
                            {homework.grade}
                          </span>
                        ) : (
                          'Не оценено'
                        )}
                      </td>
                      <td className="align-middle">
                        {homework.checked_at
                          ? formatDate(homework.checked_at)
                          : 'Не проверено'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Нет заданий</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentHomework;
