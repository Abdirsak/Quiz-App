import {Link, useNavigate} from 'react-router-dom';
import React, {useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  MoneyCollectOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import './Layout.css';

const { Header, Sider, Content } = Layout;

const AppLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const toggle = ()=>{
    setCollapsed(!collapsed);
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"><h2 className='logo-title'>BRAVO</h2></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
            <Menu.Item key="/" icon={<HomeOutlined/>}>
                <Link to="/">Students</Link>
            </Menu.Item>
            <Menu.Item key="/exam" icon={<MoneyCollectOutlined/>}>
                <Link to="/exam">Exam</Link>
            </Menu.Item>
            <Menu.Item key="/report" icon={<UserSwitchOutlined/>}>
                <Link to="/report">Report</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined/>} onClick={()=>{localStorage.removeItem("data");}}>
                <Link to="/logout">Logout</Link>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;