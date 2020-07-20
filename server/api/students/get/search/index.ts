import {Request, Response} from 'express';
import Students from '../../../../db/models/Students';
import {Op} from 'sequelize';

type ParamsType = {
  page: number,
  count: number,
};

export default (req: Request, res: Response) => {
  const {page, count, query} = req.query;
  Students.findAll({
    raw: true,
    ...(query ? {
      where: {
        [Op.or]: [
          {
            first_name: {
              [Op.like]: `%${query}%`
            },
          },
          {
            last_name: {
              [Op.like]: `%${query}%`
            },
          },
          {
            second_name: {
              [Op.like]: `%${query}%`
            },
          }
        ]
      }
    } : null),
    order: [['last_name', 'ASC']],
  })
    .then(result => res.status(200).json(normalizeResult(result, {page : Number(page), count: Number(count)})))
    .catch((e) => {
      console.log(e);
      res.status(501).json('server error')
    });
};

const normalizeResult = (students: Array<object>, params: ParamsType) => {
  const {page, count} = params;
  return {
    data: students.slice((page - 1) * count, (page * count)),
    totalCount: students.length,
  }
};