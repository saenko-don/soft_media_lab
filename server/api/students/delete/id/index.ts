import {Request, Response} from 'express';
import Students from '../../../../db/models/Students';

export default (req: Request, res: Response) => {
  const id = Number(req.params.id);
  Students.destroy({
    where: {
      id
    }
  })
    .then(() => res.status(200).json('success'))
    .catch((e) => {
      console.log(e);
      res.status(501).json('server error')
    });
};