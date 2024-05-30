import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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

  const handleOnStudentClick = (assignmentId, student) => {
    navigate(
      `/check-homework/${homeworkId}/check-assignment?assignment=${assignmentId}`,
      { state: { student } },
    );
  };

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
            <tr
              key={student.assignment.id}
              onClick={() =>
                handleOnStudentClick(student.assignment.id, student)
              }
              style={{ cursor: 'pointer' }}
            >
              <th>{index + 1}</th>
              <td>{student.student_data.name}</td>
              <td>{student.student_data.surname}</td>
              <td>{student.student_data.patronym}</td>
              {student.assignment.completion_status === 0 ? (
                <td className="bg-danger text-white">Не выполнено</td>
              ) : student.assignment.checked === 0 ? (
                <td className="bg-warning text-white">Требует проверки</td>
              ) : (
                <td className="bg-success text-white">Проверено</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckHomework;
