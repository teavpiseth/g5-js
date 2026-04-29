import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  clearDashboardAuth,
  getDashboardAuth,
} from "../modules/dashboard/auth";
const { Header, Sider, Content } = Layout;
const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const dashboardUser = getDashboardAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedKey = location.pathname.startsWith("/dashboard/product")
    ? "product"
    : location.pathname.split("/")[2] || "category";

  const handleLogout = () => {
    clearDashboardAuth();
    navigate("/dashboard/login", { replace: true });
  };

  return (
    <div className="w-full h-[100vh]">
      <Layout className="w-full h-full">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => navigate("/dashboard/" + e.key)}
            items={[
              {
                key: "category",
                icon: <UserOutlined />,
                label: "Category",
              },
              {
                key: "product",
                icon: <VideoCameraOutlined />,
                label: "Product",
              },
              {
                key: "user",
                icon: <UserOutlined />,
                label: "User",
              },
              {
                key: "customer",
                icon: <UserOutlined />,
                label: "Customer",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Purchase",
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: "Order",
                disabled: true,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: 24,
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span>{dashboardUser?.email || "Dashboard User"}</span>
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
