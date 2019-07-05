import React from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router';

import menuItems from './menu_items';

import './Page.css';

const { Header, Content } = Layout;

class Page extends React.Component {  
    state = {
        current : ''
    }

    componentDidMount() {
        let page = this.props.history.location;
        page = page.pathname.replace('/', '');
        this.setState({current : `page_${page}`});
    }

    handleMouseOver = e => {
        console.log(e.currentTarget);
    }
    
    render() {
        return (
            <Layout className="Page">
                <Header>
                    <Menu selectedKeys={[this.state.current]} mode="horizontal"
                    className="menu">
                        {menuItems.map(el => (
                            <Menu.Item key={`page_${el.slug}`} className="menu-item">
                                <a href={el.href} style={{color: 'white'}}>{el.title}</a>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Header>

                <Content>
                    {this.props.children}
                </Content>
            </Layout>
        )
    }
}

export default withRouter(Page);