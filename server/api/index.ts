import students from "./students";
import list_academic_performance from "./list_academic_performance";
import {Router} from 'express';

const router = Router();

router.get('/students', students.get.search);
router.post('/students/add', students.post.add);
router.put('/students/edit', students.put.edit);
router.delete('/students/:id', students.del.id);

router.get('/list_type_academic_performance', list_academic_performance.get.all);

export default router;
