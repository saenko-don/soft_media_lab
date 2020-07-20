import React, {useEffect, useState, useCallback, FC} from 'react';
import TableStudents from "./components/Table/TableStudents";
import ModalStudent from './components/Modal/ModalStudent';
import 'antd/dist/antd.css';
import {Spin, Card, Input, Row, Col, Button, Modal} from 'antd';

const { Search } = Input;
const api = require('./common/api.ts').default;

type RequestType = {
  status: Number,
  data?: Object | Array<Object>,
}

const App: FC = () => {
  const [students, setStudents] = useState<any>({data: []});
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const [requestParams, setRequestParams] = useState<any>({page: 1, count: 10});
  const [querySearch, setQuerySearch] = useState<String>('');
  const [isOpenModal, toggleIsOpenModal] = useState<boolean>(false);
  const [listTypeAcademicPerformance, setListTypeAcademicPerformance] = useState<object[]>([]);
  const [student, setStudent] = useState<object>({});

  const getStudents = useCallback(async (params: Object) => {
    const {data, status}: RequestType = await api(`students?${getParamsFromRequest(params)}`);
    return status === 200 ? data : [];
  }, []);

  useEffect(() => {
    toggleLoading(true);
    Promise.all([
      getStudents(requestParams),
      api('list_type_academic_performance')
    ]).then(result => {
      setStudents(result[0]);
      setListTypeAcademicPerformance(result[1].data);
      toggleLoading(false);
    }).catch(() => {
      Modal.error({
        title: 'Ошибка',
        content: 'Что то пошло не так, попробуйте позже',
      });
      toggleLoading(false)
    })
  }, [requestParams, getStudents]);

  const getParamsFromRequest = (params: any) => {
    return Object.keys(params).map(k => `${k}=${params[k]}&`).join('')
  };

  const searchStudents = async (query: String) => {
    setQuerySearch(query);
    const response = await getStudents({
      ...requestParams,
      query,
    });
    setStudents(response);
  };

  const saveStudent = async (student: object, isNew: boolean) => {
    const {status}: RequestType = await api(`students/${isNew ? 'add' : 'edit'}`, {
      method: isNew ? 'POST' : 'PUT',
      body: student,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (status === 200) {
      toggleLoading(true);
      const response = await getStudents({
        ...requestParams,
        query: querySearch,
      });
      setStudents(response);
      toggleLoading(false);
    }
    return status === 200;
  };

  const deleteStudent = async (id: number) => {
    const {status}: RequestType = await api(`students/${id}`, {
      method: 'DELETE',
    });
    if (status === 200) {
      toggleLoading(true);
      const response = await getStudents({
        ...requestParams,
        query: querySearch,
      });
      setStudents(response);
      toggleLoading(false);
    }
    return status === 200;
  };

  const setEditStudent = (student: object) => {
    setStudent(student);
    toggleIsOpenModal(true);
  };

  return (
    <Spin spinning={isLoading}
          size={'large'}>
      <Card title="Студенты"
            bordered={false}>
        <Row>
          <Col span={21}>
            <Search placeholder="Поиск по студентам"
                    enterButton="Поиск"
                    size="large"
                    onSearch={(value: String) => searchStudents(value)}/>
          </Col>
          <Col span={2} offset={1}>
            <Button size={'large'}
                    style={{width: '100%'}}
                    onClick={() => setEditStudent({})}
                    type="primary">
              Добавить
            </Button>
          </Col>
        </Row>
        <TableStudents students={students}
                       delStudent={deleteStudent}
                       setRequestParams={setRequestParams}
                       setEditStudent={setEditStudent}
                       listTypeAcademicPerformance={listTypeAcademicPerformance}
                       pagination={requestParams}/>
      </Card>
      <ModalStudent student={student}
                    createAndUpdateStudent={saveStudent}
                    listTypeAcademicPerformance={listTypeAcademicPerformance}
                    toggle={(state: boolean) => toggleIsOpenModal(state)}
                    isOpen={isOpenModal}/>
    </Spin>
  )
};

export default App;
