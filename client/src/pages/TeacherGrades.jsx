import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

const TeacherGrades = () => {
  const { user } = useStateContext();
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [studentsInClass, setStudentsInClass] = useState([]);
  const navigate = useNavigate();

  const handleDisciplineChange = event => {
    const disciplineId = parseInt(event.target.value, 10);
    setSelectedDiscipline(disciplineId);

    // Фильтруем классы в зависимости от выбранной дисциплины
    const selectedClasses = user.classes.find(
      element => element.discipline.id === disciplineId,
    );
    if (selectedClasses) {
      setFilteredClasses(selectedClasses.classes);
    } else {
      setFilteredClasses([]);
    }
  };

  const handleClassChange = event => {
    const studentClassId = event.target.value;
    setSelectedClassId(studentClassId);
    if (studentClassId != null) {
      axiosClient
        .get(`/getStudentsFromClass/${studentClassId}`)
        .then(response => {
          setStudentsInClass(response.data.students);
        });
    }
  };

  const handleStudentClick = studentId => {
    navigate(`/grade-student/${studentId}`, {
      state: { disciplineId: selectedDiscipline },
    });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Выставление оценок ученикам</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="disciplineSelect" className="form-label">
                Выберите дисциплину
              </label>
              <select
                id="disciplineSelect"
                className="form-select"
                value={selectedDiscipline}
                onChange={handleDisciplineChange}
              >
                <option value="">Выберите дисциплину</option>
                {user.classes.map((element, index) => (
                  <option key={index} value={element.discipline.id}>
                    {element.discipline.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedDiscipline && (
              <div className="col-md-6 mb-3">
                <label htmlFor="classSelect" className="form-label">
                  Выберите класс
                </label>
                <select
                  id="classSelect"
                  className="form-select"
                  value={selectedClassId}
                  onChange={handleClassChange}
                >
                  <option value="">Выберите класс</option>
                  {filteredClasses.map((classItem, index) => (
                    <option key={index} value={classItem.id}>
                      {classItem.number} &quot;{classItem.letter}&quot;
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {selectedClassId && (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Отчество</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsInClass.map((student, index) => (
                    <tr
                      key={index}
                      onClick={() => handleStudentClick(student.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <th scope="row">{index + 1}</th>
                      <td>{student.surname}</td>
                      <td>{student.name}</td>
                      <td>{student.patronym}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherGrades;
