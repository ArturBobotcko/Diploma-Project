import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

const StudentHomework = () => {
  const { user } = useStateContext();
  const [homeworks, setHomeworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/api/getStudentHomeworks/${user.user_data.id}`)
      .then(response => {
        setHomeworks(response.data.homeworks);
      });
  }, [user.user_data.id]);

  const handleHomeworkClick = homeworkId => {
    navigate(`/answer-homework/${homeworkId}`);
  };

  return (
    <div className="container">
      <div className="card mb-3">
        <div className="card-body">
          <h2 className="text-dark m-0">Домашние задания</h2>
        </div>
      </div>
      <table
        className="table table-hover table-bordered"
        style={{ backgroundColor: 'white' }}
      >
        <thead>
          <tr>
            <th scope="row">№</th>
            <th scope="row">Дисциплина</th>
            <th scope="row">Задание</th>
            <th scope="row">Дата сдачи</th>
            <th scope="row">Статус</th>
          </tr>
        </thead>
        <tbody>
          {homeworks.map((homework, index) => (
            <tr key={index} onClick={() => handleHomeworkClick(homework.id)}>
              <th scope="row">{index + 1}</th>
              <td scope="row">{homework.discipline}</td>
              <td scope="row">{homework.description}</td>
              <td scope="row">{homework.deadline}</td>
              {homework.completion_status === 0 ? (
                <td scope="row">
                  <p className="m-0 text-danger fw-bold">Не выполнено</p>
                </td>
              ) : (
                <td scope="row">
                  <p className="m-0 text-success fw-bold">Выполнено</p>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentHomework;
