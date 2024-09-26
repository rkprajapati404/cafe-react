import React, { useState, useEffect } from 'react';
import { Button, Select, Space, Popconfirm } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { deleteCafe, getCafes } from '../../services/CafeService';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const { Option } = Select;

const Cafes = () => {
    const [cafes, setCafes] = useState([]);
    const [allcafes, setAllCafes] = useState([]);
    const navigate = useNavigate();
    const [location, setLocation] = useState();

    useEffect(() => {
        getCafes(location).then(response => {
            setCafes(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, [location]);

    useEffect(() => {
        getCafes(null).then(response => {
            setAllCafes(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const handleLocation = (value) => {
        setLocation(value);
    };

    const handleViewEmployees = (id) => {
        console.log(id);
    };

    const handleDelete = async (cafeId) => {
        deleteCafe(cafeId).then(response => {
            setCafes(cafes.filter(item => item._id !== cafeId));
        });
    };

    const columnDefs = [
        {
            headerName: 'Logo',
            field: 'logo',
            cellRenderer: (params) => {
                return (
                    <img src={params.value || 'default_logo_url'} alt="cafe-logo" width="50" />
                );
            },
            width: 100,
        },
        {
            headerName: 'Name',
            field: 'name',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            headerName: 'Description',
            field: 'description',
            width: 300,
        },
        {
            headerName: 'Location',
            field: 'location',
            width: 150,
            sortable: true,
            filter: true,
        },
        {
            headerName: 'Employees',
            field: 'employees',
            cellRenderer: (params) => {
                return (
                    <Button type="link" onClick={() => navigate(`/employees/${params.data._id}`)}>
                        {params.value.length}
                    </Button>
                );
            },
            width: 120,
        },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: (params) => (
                <Space>
                    <Button type="primary" onClick={() => navigate(`/cafe/${params.data._id}`)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure delete this cafe?"
                        onConfirm={() => handleDelete(params.data._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger">Delete</Button>
                    </Popconfirm>
                </Space>
            ),
            width: 200,
        },
    ];

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        resizable: true,
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <h1 style={{ color: 'black' }}>Cafe Management</h1>
            <div style={{ marginBottom: 16 }}>
                <Select
                    placeholder="Filter by Location"
                    value={location}
                    onChange={handleLocation}
                    allowClear
                    style={{ width: 200, marginRight: 20 }}
                >
                    {
                        [...new Map(allcafes.map(cafe => [cafe.location, cafe])).values()].map(cafe => {
                            return <Option key={cafe.location} value={cafe.location}>{cafe.location}</Option>;
                        })
                    }
                </Select>

                <Button type="primary" onClick={() => navigate('/cafe')}>
                    Add New Cafe
                </Button>
            </div>

            <AgGridReact
                rowData={cafes}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowKey="_id"
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
};

export default Cafes;
