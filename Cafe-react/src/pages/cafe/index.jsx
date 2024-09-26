import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { addCafe, editCafe, getCafeById } from '../../services/CafeService';

const Cafe = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isFormTouched, setIsFormTouched] = useState(false);
    const [cafe, setCafe] = useState(null);

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
        if (id) {
            getCafeById(id).then(response => {
                if (response.status === 200) {
                    const data = response.data;
                    form.setFieldsValue({
                        name: data.name,
                        description: data.description,
                        location: data.location,
                    });
                    setCafe(data);
                }
            }).catch(error => {
                message.error("Error fetching cafe data");
            });
        }
    }, [id, form]);


    const onFinish = (values) => {
        setIsFormTouched(false);
        if (!id) {
            addCafe(values).then(result => {
                if (result.status === 201) {
                    message.success('Cafe added successfully!');
                    navigate('/cafes');
                } else {
                    message.error("Error occurred");
                }
            }).catch(error => {
                message.error("Error", error);
            });
        } else {
            editCafe({ ...values, id }).then(result => {
                console.log(result);

                if (result.status === 200) {
                    message.success('Cafe updated successfully!');
                    navigate('/cafes');
                } else {
                    message.error("Error occurred");
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
                description: '',
                location: '',
            }}
            style={{ marginTop: 20 }}
        >

            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: 'Please input the caf name!' },
                    { min: 6, message: 'Name must be at least 6 characters' },
                    { max: 10, message: 'Name cannot exceed 10 characters' }
                ]}
            >
                <Input placeholder="Enter cafe name" />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[
                    { required: true, message: 'Please input the cafe description!' },
                    { max: 256, message: 'Description cannot exceed 256 characters' }
                ]}
            >
                <Input.TextArea placeholder="Enter cafe description" />
            </Form.Item>


            <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: 'Please input the cafe location!' }]}
            >
                <Input placeholder="Enter cafe location" />
            </Form.Item>


            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                    {id ? 'Edit Cafe' : 'Add Cafe'}
                </Button>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Cafe;
