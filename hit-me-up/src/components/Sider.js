import React from "react"
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {Redirect, BrowserRouter, Switch, Route, Link} from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends React.Component {
  state = {
    logout: false
  }

  logoutFunction = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    this.setState({
      logout: true
    })
  }


  render() {
    return (

      <Layout style={{ minHeight: '100vh' }}>
        {this.state.logout? <Redirect to="/login"/> : null}
        <Sider collapsible collapsed={true}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
            <Link to="/create-team"><Icon type="team"/></Link>
            <span>Create Team</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span>Profile</span>
            </Menu.Item>
            <Menu.Item key="9">
              <Icon type="logout" onClick={this.logoutFunction}/>
              <span onClick={this.logoutFunction}>Log-Out</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
          {this.props.children}
          </Content>
        </Layout>
      </Layout>

    );
  }
}
