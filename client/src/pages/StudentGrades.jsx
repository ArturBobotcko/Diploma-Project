import { useMemo, useState, useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const StudentGrades = () => {
  const { user } = useStateContext();
  const [userDisciplines, setUserDisciplines] = useState(null);

  useEffect(() => {
    setUserDisciplines(user.disciplines);
  }, [user]);

  const average = nums => {
    let sum = 0;
    nums.forEach(element => {
      sum += element.grade_value;
    });
    return sum / nums.length;
  };

  const averages = useMemo(() => {
    if (!userDisciplines) return [];
    return userDisciplines.map(element => average(element.grades));
  }, [userDisciplines]);

  return (
    <div className="container">
      {userDisciplines && (
        <div className="container-fluid p-0">
          <div className="table-responsive">
            <table
              className="table table-hover table-bordered border-muted"
              style={{ backgroundColor: 'white' }}
            >
              <thead>
                <tr>
                  <th scope="col">№</th>
                  <th scope="col">Предметы</th>
                  <th scope="col">Оценки</th>
                  <th scope="col">Пропуски</th>
                  <th scope="col">Средний балл</th>
                </tr>
              </thead>
              <tbody>
                {userDisciplines.map((element, index) => {
                  const avg = averages[index];
                  return (
                    <tr key={index}>
                      <th className="align-middle" scope="row">
                        {index + 1}
                      </th>
                      <td className="align-middle">
                        {element.discipline.name}
                      </td>
                      <td>
                        <div className="d-flex gap-1 flex-row">
                          {element.grades.map((grade, gradeIndex) => (
                            <OverlayTrigger
                              key={gradeIndex}
                              placement="bottom"
                              overlay={
                                <Tooltip>{`Тип оценки: ${grade.grade_type}, Комментарий: ${grade.comment}`}</Tooltip>
                              }
                            >
                              <button
                                type="button"
                                className={
                                  'p-1 fw-bold text-white btn ' +
                                  (grade.grade_value <= 3
                                    ? 'btn-danger'
                                    : grade.grade_value === 4
                                      ? 'btn-warning'
                                      : 'btn-success')
                                }
                              >
                                {grade.grade_value}
                              </button>
                            </OverlayTrigger>
                          ))}
                        </div>
                      </td>
                      <td></td>
                      <td>
                        <div className="d-flex gap-1 flex-row">
                          <button
                            type="button"
                            className={
                              'p-1 fw-bold text-white btn ' +
                              (avg <= 3
                                ? 'btn-danger'
                                : avg === 4
                                  ? 'btn-warning'
                                  : 'btn-success')
                            }
                          >
                            {avg}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentGrades;
