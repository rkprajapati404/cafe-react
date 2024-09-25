import React, { useEffect, useState } from 'react';
import { deleteEmployee, getEmployee } from '../../services/CafeService';
import { Table, Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';

const Employees = () => {

  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployee().then(response => {
      console.log(response.data);
      setEmployees(response.data);
    });
  }, []);

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email Address',
      dataIndex: 'email_address',
      key: 'email_address',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Days Worked',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (text) => {
        const daysWorked = Math.floor((new Date() - new Date(text)) / (1000 * 60 * 60 * 24));
        return <span>{daysWorked}</span>;
      }
    },
    {
      title: 'Café Name',
      dataIndex: 'cafe',
      key: 'cafe_name',
      render: (cafe) => cafe?.name || 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record._id)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this employee?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </span>
      )
    },
  ];

  const handleEdit = (id) => {
    console.log('Edit employee with id:', id);
    navigate("/employee/" + id);

  };

  const handleDelete = (id) => {
    console.log('Delete employee with id:', id);
    deleteEmployee(id).then(response => {
      setEmployees(employees.filter(emp => emp._id !== id));
    });
  };

  const handleAdd = () => {
    navigate("/employee");
  }

  return (
    <div className='container'>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 10, float: 'right' }}>Add New Employee</Button>
      <Table
        dataSource={employees}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
    </div>
  )
}

export default Employees;