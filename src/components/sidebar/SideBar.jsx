import './sidebar.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import MenuAPI from '../../API/MenuAPI';
import { useDispatch, useSelector } from 'react-redux';
import { menuActions, selectorMenuDefault, selectorSelected } from '../../redux/slice/menuSlice';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const SideBar = () => {
  const menuDefault = useSelector(selectorMenuDefault)
  const {pathname} = useLocation()
  const selected = [`/${pathname.split("/")[1]}`,`/${pathname.split("/")[1]}`+`/${pathname.split("/")[2]}`]
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [opened, setOpened] = useState([`/${pathname.split("/")[1]}`])

  const items =  menuDefault.map(menu=>{
    if(!menu.sub) {
      return {
        label: menu.label,
        key: `/${menu.title}`,
        value: menu.value
      }
    } else {
      return {
        label: menu.label,
        key: `/${menu.title}`,
        value: menu.value,
        children: menu.children.map(child=>({
          label: child.label,
          key: `/${menu.title}/${child.title}`,
          value: child.value,
        }))
      }
    }
  });

  useEffect(() => {
    const fetchMenu = async () => {
        const resDefault = await MenuAPI.getDefault()
        const resultDefault = resDefault.ResponseResult.Result[0]?.menu
        dispatch(menuActions.setDefault(resultDefault))
        const resMenu = await MenuAPI.getMenu()
        console.log(resMenu);
        // const resultDefault = resDefault.ResponseResult.Result[0]?.menu
        // dispatch(menuActions.setDefault(resultDefault))
    }
    fetchMenu();
}, []);

  return(  
    <div className="sidebar flex-nowrap">
      <Sider>
        <Menu 
          onClick={({key})=>{
            navigate(key);
          }}
          openKeys={opened}
          onOpenChange={open=>{
            setOpened(open);
          }}
          items={items}
          mode="inline"
          inlineCollapsed={false}
          selectedKeys={selected}
        />
      </Sider>
    </div>
  )
}

export default SideBar;