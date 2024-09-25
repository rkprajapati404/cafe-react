import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Space, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteCafe, getCafes } from '../../services/CafeService';

const { Option } = Select;

const Cafes = () => {
    const [cafes, setCafes] = useState([]);
    const [locationFilter, setLocationFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getCafes().then(response => {
            console.log(response);
            setCafes(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const handleLocationFilterChange = (value) => {
        setLocationFilter(value);
        const filtered = cafes.filter((cafe) => cafe.location.includes(value));
        setFilteredCafes(filtered);
    };

    const handleViewEmployees = (id) => {
        console.log(id);

    };

    const columns = [
        {
            title: 'Logo',
            dataIndex: 'logo',
            key: 'logo',
            render: (text) => <img src={text || 'default_logo_url'} alt="cafe-logo" width="50" />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Employees',
            dataIndex: 'employees',
            key: 'employees',
            render: (employees, record) => (
                <Button type="link" onClick={() => navigate(`/employee?cafeId=${record._id}`)}>
                    {employees.length}
                </Button>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => navigate(`/edit-cafe/${record._id}`)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure delete this cafe?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger">Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    // Handle deleting a cafe
    const handleDelete = async (cafeId) => {
        deleteCafe(cafeId).then(response => {
            setCafes(cafes.filter(item => item._id !== cafeId));
        });
    };

    return (
        <div>
            <h1>Café Management</h1>

            {/* Location filter */}
            <div style={{ marginBottom: 16 }}>
                <Select
                    placeholder="Filter by Location"
                    value={locationFilter}
                    onChange={handleLocationFilterChange}
                    style={{ width: 200 }}
                >
                    {
                        [...new Map(cafes.map(cafe => [cafe.location, cafe])).values()].map(cafe => {
                            return <Option key={cafe.location} value={cafe.location}>{cafe.location}</Option>;
                        })

                    }
                </Select>
            </div>

            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={() => navigate('/add-cafe')}>
                    Add New Café
                </Button>
            </div>

            <Table columns={columns} dataSource={cafes} rowKey="_id" />
        </div>
    );
};

export default Cafes;
