import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

const RegisterForm = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
    // Handle form submission logic here
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          maxWidth: "450px",
          width: "100%",
          padding: "30px",
          backgroundColor: "#DDB671",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "rgb(75 29 9)",
            fontSize: "30px",
            fontWeight: "700",
          }}
        >
          Register
        </h2>
        <Form
          name="register-form"
          onFinish={onFinish}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            validateStatus="error"
			style={{ color: "#fff" }}
          >
            <Input
              size="large"
              style={{
                borderRadius: "4px",
                backgroundColor: "#fafafa",
                border: "1px solid #d9d9d9",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            validateStatus="error"
          >
            <Input.Password
              size="large"
              style={{
                borderRadius: "4px",
                backgroundColor: "#fafafa",
                border: "1px solid #d9d9d9",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
            validateStatus="error"
          >
            <Input.Password
              size="large"
              style={{
                borderRadius: "4px",
                backgroundColor: "#fafafa",
                border: "1px solid #d9d9d9",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "rgb(75 29 9)",
                    borderColor: "#DDB671",
                    fontWeight: "700",
                  }}
                >
                  Register
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  block
                  size="large"
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "#b35d5d",
                    borderColor: "#b35d5d",
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
