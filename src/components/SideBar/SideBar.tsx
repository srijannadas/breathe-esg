import { Button, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'
import {
    LogoutOutlined,
    AppstoreOutlined,
    PieChartOutlined,
    BarChartOutlined,
    SnippetsOutlined,
    GroupOutlined,
    SolutionOutlined,
    LineChartOutlined,
    RadarChartOutlined,
    LeftOutlined,
    RightOutlined,
  } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import Logo from "../../assets/logo.svg";
import LogoLogo from "../../assets/logo_logo.png";

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
      };
  return (
    <div>
      <Sider
        style={{ background: "#181818",minHeight: "100vh" }}
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <div className="logo p-4 flex justify-center items-center" />
        <img
          src={collapsed ? LogoLogo : Logo}
          alt=""
          className={`ml-4 ${collapsed ? "w-6" : "w-40"}`}
        />
        <Menu theme="dark" mode="inline" className="bg-[#181818] mt-20">
          <Menu.Item key="1" icon={<BarChartOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link to="/">Entitiy Manager</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <Link to="/">Data Manager</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SnippetsOutlined />}>
            <Link to="/">Reporting</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<GroupOutlined />}>
            <Link to="/">Materiality</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SolutionOutlined />}>
            <Link to="/">Suppliers</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<LineChartOutlined />}>
            <Link to="/">Analytics</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<RadarChartOutlined />}>
            <Link to="/">Targets</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<LogoutOutlined />}>
            <Link to="/" className="text-red-500">
              Logout
            </Link>
          </Menu.Item>
          {!collapsed ? (
            <Button
              type="primary"
              className="absolute top-[5rem] left-[11.5rem] shadow-xl w-8 rounded-full bg-[#000] text-white hover:text-white hover:bg-black"
              onClick={toggleCollapsed}
            >
              <LeftOutlined />
            </Button>
          ) : (
            <Button
              type="primary"
              className="absolute top-[5rem] left-[4rem] shadow-xl w-8 rounded-full bg-[#000] text-white hover:text-white hover:bg-black"
              onClick={toggleCollapsed}
            >
              <RightOutlined />
            </Button>
          )}
          {/* Add more menu items as needed */}
        </Menu>
      </Sider>
    </div>
  )
}

export default SideBar
