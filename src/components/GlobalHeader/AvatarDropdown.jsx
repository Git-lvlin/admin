import { DownOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import avatar from '@/assets/avatar.png';

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    history.push(key);
  };

  render() {
    const {
      currentUser = {
        avatar,
        name: window.localStorage.getItem('nickname'),
        id: JSON.parse(window.localStorage.getItem('user'))?.id,
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="/workplace">
          {/* <UserOutlined /> */}
          首页工作台
        </Menu.Item>
        <Menu.Item key="/setting/password">
          {/* <SettingOutlined /> */}
          修改密码
        </Menu.Item>
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          {/* <LogoutOutlined /> */}
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.name}（ID: {currentUser.id}）</span>
          <DownOutlined style={{ marginLeft: 5 }} />
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  // currentUser: user.currentUser,
}))(AvatarDropdown);
