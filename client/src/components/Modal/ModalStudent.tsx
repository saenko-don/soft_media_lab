import React, {useEffect, useState} from "react";
import {Modal, Button, Form, Input, DatePicker, Select} from 'antd';
import ru from 'antd/es/locale/ru_RU';
import moment from "moment";

const {Option} = Select;

type StudentType = {
  id?: number,
  first_name?: string,
  last_name?: string,
  second_name?: string,
  date_of_birth?: string,
  academic_performance_id?: number,
}

type listTypeAcademicPerformance = {
  id?: number,
  title?: string,
}

type PropsType = {
  student: StudentType,
  listTypeAcademicPerformance: object[],
  isOpen: boolean,
  toggle: (state: boolean) => void,
  createAndUpdateStudent: (student: StudentType, isNew: boolean) => Promise<boolean>
}

const ModalStudent = ({student, isOpen, toggle, listTypeAcademicPerformance, createAndUpdateStudent} : PropsType) => {
  const [localStudent, setLocalStudents] = useState<StudentType>({});
  const [isLoading, toggleIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setLocalStudents(student)
  }, [student]);

  const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
  };

  const saveStudent = async () => {
    toggleIsLoading(true);
    const result = await createAndUpdateStudent(localStudent, !student.hasOwnProperty('id'));
    if (result) {
      toggleIsLoading(false);
      toggle(false);
    } else {
      toggleIsLoading(false);
      Modal.error({
        title: `Не удалось ${localStudent.id ? 'Обновить данные' : 'Добавить нового студента'}`,
        content: 'Что то пошло не так, попробуйте позже',
      });
    }
  };

  const setValueStudent = (key: string, value: string | number) => {
    setLocalStudents({
      ...localStudent,
      [key]: value
    });
  };

  const isActiveSaveBtn = () => {
    const requiredParams = ['first_name', 'last_name', 'second_name', 'date_of_birth', 'academic_performance_id'];
    return requiredParams.filter((key: string) => !localStudent.hasOwnProperty(key)).length !== 0
  };

  const getValueTypeAcademicPerformance = () => {
    const temp: any = listTypeAcademicPerformance.find((record: StudentType) => record.id === localStudent.academic_performance_id);
    return temp ? temp.title : 'Выбериту успеваемость';
  };

  return (
    <Modal title={localStudent.id ? 'Редактирование студента' : 'Создание студента'}
           onCancel={() => isLoading ? false : toggle(false)}
           maskClosable={false}
           footer={[
             <Button key="back"
                     disabled={isLoading}
                     onClick={() => toggle(false)}>
               Закрыть
             </Button>,
             <Button key="submit"
                     type="primary"
                     disabled={isActiveSaveBtn()}
                     loading={isLoading}
                     onClick={saveStudent}>
               {localStudent.id ? 'Редактировать' : 'Создать'}
             </Button>,
           ]}
           visible={isOpen}>
      <Form layout={'horizontal'}
            labelAlign={'left'}
            {...formItemLayout}>
        <Form.Item label="Имя"
                   required>
          <Input placeholder="Введите имя"
                 id="first_name"
                 onChange={e => setValueStudent('first_name', e.target.value)}
                 value={localStudent.first_name || ''}/>
        </Form.Item>
        <Form.Item label="Фамилия"
                   id="last_name"
                   required>
          <Input placeholder="Введите фамилию"
                 onChange={e => setValueStudent('last_name', e.target.value)}
                 value={localStudent.last_name || ''}/>
        </Form.Item>
        <Form.Item label="Отчество"
                   required>
          <Input placeholder="Введите отчество"
                 id="second_name"
                 onChange={e => setValueStudent('second_name', e.target.value)}
                 value={localStudent.second_name || ''}/>
        </Form.Item>
        <Form.Item label="Дата рождения"
                   required>
          <DatePicker style={{width: '100%'}}
                      locale={ru.DatePicker}
                      value={moment(localStudent.date_of_birth)}
                      onChange={(date, dateString) => setValueStudent('date_of_birth', dateString)}/>
        </Form.Item>
        <Form.Item label="Успеваемость"
                   required>
          <Select style={{width: '100%'}}
                  onChange={value => setValueStudent('academic_performance_id', Number(value))}
                  value={getValueTypeAcademicPerformance()}>
            {listTypeAcademicPerformance.map((record: listTypeAcademicPerformance) =>
              <Option value={String(record.id)}
                      key={record.id}>{record.title}
              </Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default ModalStudent;