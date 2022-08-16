import { Input, Row, Col, Form, Button } from 'antd';
const { TextArea } = Input;

const AddBlock = (props) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        props.addPost(values);
        form.resetFields();
  }
    return (
        <Row>
            <Col span={8} offset={8}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 21 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={ handleFinish }
                >
                    <Form.Item
                        label="User"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tittle"
                        name="title"
                        rules={[{ required: true, message: 'Please input title here' }]}
                    >
                        <Input />
                    </Form.Item>

                     <Form.Item
                        label="Text"
                        name="text"
                        rules={[{ required: true, message: 'Please input text here' }]}
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 3, span: 21 }}>
                        <Button block type="primary" htmlType="submit">
                            Add post
                        </Button>
                    </Form.Item>
            </Form>
        </Col>
        </Row>
    );
}

export default AddBlock;