import { HomeFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaNetworkWired } from "react-icons/fa";
import { FaHandshakeAngle } from "react-icons/fa6";
import { IoBagSharp, IoDocumentText } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import avatarsavio from '../img/avatarsavio.jpg'
import "bootstrap/dist/css/bootstrap.min.css";
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const items: MenuProps['items'] = [
  {
    label: (
      <Link to="myprofile">
        My Profile
      </Link>
    ),
    key: '0',
  },
  {
    label: (
      <Link to="settings">
        Settings
      </Link>
    ),
    key: '1',
  },
  {
    label: (
      <Link to="myprojects">
        My Projects
      </Link>
    ),
    key: '2',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <a className='' href="#">
        Logout
      </a>
    ),
    key: '3',
  },
];

export default function Header() {
  const [current, setCurrent] = useState('h');
  const onClick = (e: any) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Menu className='flex justify-center items-center shadow-sm' onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="h" icon={<HomeFilled />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="a" icon={<FaHandshakeAngle />}>
          <Link to="auxilios">Auxilios</Link>
        </Menu.Item>
        <Menu.Item key="b" icon={<IoBagSharp />}>
          <Link to="bolsas">Bolsas</Link>
        </Menu.Item>
        <Menu.Item key="e" icon={<IoDocumentText />}>
          <Link to="editais">Editais</Link>
        </Menu.Item>
        <Menu.Item key="i" icon={<FaNetworkWired />}>
          <Link to="intranet">Intranet</Link>
        </Menu.Item>
        <Menu.Item key="s" icon={<GrServices />}>
          <Link to="servicos">Servicos</Link>
        </Menu.Item>
        <Menu.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className='avatar-savio'>
                <Avatar>
                  <AvatarImage
                    src={avatarsavio}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <DownOutlined className='icon-down' />
              </Space>
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>
      <Outlet />
    </>

  )
}
