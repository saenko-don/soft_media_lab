import {Request, Response} from 'express';
import Students from '../../../../db/models/Students';

export default (req: Request, res: Response) => {
  const student = req.body;
  Students.update({
    first_name: student.first_name,
    last_name: student.last_name,
    second_name: student.second_name,
    date_of_birth: student.date_of_birth,
    academic_performance_id: student.academic_performance_id,
  }, {
    where: {
      id: student.id
    }
  })
    .then(() => res.status(200).json('success'))
    .catch((e) => {
      console.log(e);
      res.status(501).json('server error')
    });
};