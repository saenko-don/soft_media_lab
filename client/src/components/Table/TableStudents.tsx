import React from "react";
import {Table, Modal} from 'antd';
import ru from 'antd/es/locale/ru_RU';
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

type PropsType = {
  students: {
    data: object[],
    totalCount: number,
  },
  pagination: {
    page: number,
    count: number,
  },
  listTypeAcademicPerformance: object[]
  setEditStudent: (student: object) => void
  delStudent: (id: number) => void
  setRequestParams: ({...pagination}) => void
}

const TableStudents = ({students, pagination, listTypeAcademicPerformance, setEditStudent, delStudent, setRequestParams}: PropsType) => {
  const {totalCount, data} = students;

  const columns: Array<Object> = [
    {
      title: '№',
      dataIndex: 'key',
      key: 'number',
    },
    {
      title: 'ФИО',
      key: 'name',
      render: (text: String, record: any) => `${record.last_name} ${record.first_name} ${record.second_name}`
    },
    {
      title: 'Дата рождения',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
    {
      title: 'Успеваемость',
      key: 'academic_performance',
      render: (text: String, record: any) => {
        const temp: any = listTypeAcademicPerformance.find((type: any) => type.id === record.academic_performance_id);
        return temp ? temp.title : '';
      }
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text: String, record: Object) => (
        <span>
          <EditOutlined style={{marginRight: 16, cursor: 'pointer', color: 'green'}}
                        onClick={() => setEditStudent(record)}/>
          <DeleteOutlined style={{cursor: 'pointer', color: 'red'}}
                          onClick={() => deleteStudent(record)}/>
      </span>
      ),
    },
  ];

  const deleteStudent = (student: object) => {
    const {last_name, first_name, second_name, id}: {last_name?: string, first_name?: string, second_name?: string, id? : any} = student;
    Modal.confirm({
      title: 'Удаление студента',
      icon: <ExclamationCircleOutlined/>,
      content: `Вы действительно хотите удалить студента ${last_name} ${first_name} ${second_name}`,
      okText: 'Да',
      cancelText: 'Нет',
      onOk: () => delStudent(id)
    });
  };

  const setParamsRequest = (page: any, count: any) => {
    setRequestParams({page, count})
  };

  return (
    <Table columns={columns}
           dataSource={data.map((record, index) => ({
             ...record,
             key: (pagination.page - 1) * (pagination.count) + index + 1,
           }))}
           locale={ru.Table}
           onChange={(p) => setParamsRequest(p.current, p.pageSize)}
           pagination={{
             defaultCurrent: 1,
             current: pagination.page,
             total: totalCount,
           }}/>
  )
};

export default TableStudents;