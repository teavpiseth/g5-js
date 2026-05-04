import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../../helper/const";
import HttpRequest from "../../../service/HttpRequest";
import { setDashboardAuth } from "../auth";
import "./login.css";

const { Title, Paragraph } = Typography;

function DashboardLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);

    try {
      const response = await HttpRequest.post(
        `${apiUrl}api/auth/login`,
        values,
      );
      setDashboardAuth(response.data);
      message.success("Login successful");
      // navigate("/dashboard/category", { replace: true });
      window.location.href = "/dashboard/category";
      window.location.reload();
    } catch (error) {
      message.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-login-page">
      <div className="dashboard-login-overlay" />
      <Card className="dashboard-login-card" variant="borderless">
        <div className="dashboard-login-header">
          <Title level={2}>Dashboard Login</Title>
          <Paragraph>
            Sign in with your email and password to access the dashboard.
          </Paragraph>
        </div>

        <Form layout="vertical" onFinish={handleFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="admin@example.com"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default DashboardLogin;
