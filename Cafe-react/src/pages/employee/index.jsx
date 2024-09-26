import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Select, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, editEmployee, getCafes, getEmployeeById } from '../../services/CafeService';
import { formateDate, getDate } from '../../utils/Utilities';

const { Option } = Select;

const Employee = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isFormTouched, setIsFormTouched] = useState(false);
    const [cafes, setCafes] = useState([]);
    const [employee, setEmployee] = useState();

    const { id } = useParams();

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isFormTouched) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isFormTouched]);

    useEffect(() => {
        getCafes().then(repponse => {
            console.log(repponse.data);
            setCafes(repponse.data);
        });
    }, []);

    useEffect(() => {
        if (id) {
            getEmployeeById(id).then(repponse => {
                console.log(repponse);
                if (repponse.status === 200) {
                    let data = repponse.data;
                    form.setFieldsValue({
                        name: data.name,
                        email_address: data.email_address,
                        phone_number: data.phone_number,
                        gender: data.gender,
                        cafe: data.cafe._id,
                    });
                    setEmployee(data);
                }
            }).catch(error => {
                message.error("Error", error)
            });
        }
    }, [id]);


    const onFinish = (values) => {
        console.log('Editing Employee:', values);
        setIsFormTouched(false);
        if (!id) {
            values.start_date = getDate();
            addEmployee(values).then(result => {
                console.log(result);
                if (result.status === 201) {
                    message.success('Employee added successfully!');
                    navigate('/cafes');
                } else {
                    message.error("Error occured");
                }
            }).catch(error => {
                message.error("Error", error);
            });
        } else {
            values.start_date = formateDate(employee.start_date);
            values.id = employee._id;
            editEmployee(values).then(result => {
                console.log(result);
                if (result.status === 200) {
                    message.success('Employee Edited successfully!');
                    navigate('/cafes');
                } else {
                    message.error("Error occured");
                }
            }).catch(error => {
                message.error("Error", error);
            });
        }

    };

    const handleCancel = () => {
        navigate('/cafes');
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFieldsChange={() => setIsFormTouched(true)}
            initialValues={{
                name: '',
                email_address: '',
                phone_number: '',
                gender: 'male',
                cafe: undefined,
            }}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: 'Please input the name!' },
                    { min: 6, message: 'Name must be at least 6 characters' },
                    { max: 10, message: 'Name cannot exceed 10 characters' },
                ]}
            >
                <Input placeholder="Enter employee name" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email_address"
                rules={[
                    { required: true, message: 'Please input the email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                ]}
            >
                <Input placeholder="Enter employee email" />
            </Form.Item>

            <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[
                    { required: true, message: 'Please input the phone number!' },
                    { pattern: /^[89]\d{7}$/, message: 'Phone number must start with 8 or 9 and have 8 digits' },
                ]}
            >
                <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Please select a gender!' }]}
            >
                <Radio.Group>
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Assigned Café (Optional)"
                name="cafe"
            >
                <Select placeholder="Select a café">
                    {
                        [...new Map(cafes.map(cafe => [cafe.name, cafe])).values()].map(cafe => {
                            return <Option key={cafe._id} value={cafe._id}>{cafe.name}</Option>;
                        })
                    }
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                    {id ? 'Edit Employee' : 'Add Employee'}
                </Button>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Employee;
