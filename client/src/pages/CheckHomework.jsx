import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

const CheckHomework = () => {
  const { user } = useStateContext();
  const { homeworkId } = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/api/getRelatedToHomeworkStudents/${homeworkId}`)
      .then(response => {
        setStudents(response.data.students);
      });
  }, [homeworkId]);

  const handleOnStudentClick = () => {};

  return (
    <div className="container">
      <table className="table table-bordered bg-white">
        <thead>
          <tr>
            <th>№</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} onClick={handleOnStudentClick}>
              <th>{index + 1}</th>
              <td>{student.name}</td>
              <td>{student.surname}</td>
              <td>{student.patronym}</td>
              <td>{student.completion_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckHomework;
