import {Request, Response} from 'express';
import ListTypeAcademicPerformance from '../../../../db/models/ListTypeAcademicPerformance';

export default (req: Request, res: Response) => {
  ListTypeAcademicPerformance.findAll().then(result => res.status(200).json(result))
    .catch((e) => {
      console.log(e);
      res.status(501).json('server error')
  });
};