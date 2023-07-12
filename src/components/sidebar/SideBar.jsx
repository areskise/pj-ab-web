import './sidebar.css';
import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import MenuAPI from '../../API/MenuAPI';
import { useDispatch } from 'react-redux';
import { menuActions } from '../../redux/slice/menuSlice';

const SideBar = () => {
  const [navUser, setNavUser] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenu = async () => {
        const res = await MenuAPI.getDefault()
        const result = res.ResponseResult.Result[0]?.menu
        const bb = [...result]
        dispatch(menuActions.setDefault(bb))
    }
    fetchMenu();
}, []);

  return(  
    <div className="sidebar flex-nowrap">
      <div className="h-100 d-flex flex-column flex-shrink-0 p-3 bg-light sibar-container">
        <ul className="nav nav-pills flex-column mb-auto">
          <li
            className='nav-item'
          >
            <NavLink 
              to={"/trang-chu"} 
              className="nav-link link-color"
              activeclassname="active"        
            >
              Trang chủ
            </NavLink>
          </li>
          <li
            className='nav-item'
          >
            <NavLink 
              to={"/quan-ly-cong-ty"} 
              className="nav-link link-color"
              activeclassname="active"
            >
              Quản lý công ty
            </NavLink>
          </li>
          <li
            className='nav-item'
          >
            <NavLink 
              to={"/quan-ly-phan-quyen"} 
              className="nav-link link-color"
              activeclassname="active"
            >
              Quản lý phân quyền
            </NavLink>
          </li>
          <li
            className="nav-item nav-user"
            onClick={()=>setNavUser(!navUser)}
          >
            <div className='link-color'>
              <NavLink 
                to={"/quan-ly-nguoi-dung"} 
                className="d-flex nav-link justify-content-between align-items-center disabled"
                >
                Quản lý người dùng
                <i className="fa-solid fa-angle-down mt-1"></i>
              </NavLink>
            </div>
          </li>
            {navUser &&
            <ul>
              <li 
                className='nav-sub-item'
              >
                <NavLink 
                to={"/quan-ly-nguoi-dung/nhan-vien"} 
                className="nav-link link-color"
                activeclassname="subActive"
                >
                  Nhân viên
                </NavLink>
              </li>
              <li 
                className='nav-sub-item'
              >
                <NavLink 
                to={"/quan-ly-nguoi-dung/khach-hang"} 
                className="nav-link link-color"
                activeclassname="subActive"
                >
                  Khách hàng
                </NavLink>
              </li>
            </ul>
            }
          <li
            className='nav-item'
          >
            <NavLink 
              to={"/quan-ly-hui"} 
              className="nav-link link-color"
              activeclassname="active"
            >
              Quản lý hụi
            </NavLink>
          </li>
          <li
            className='nav-item'
          >
            <NavLink 
              to={"/bao-cao"} 
              className="nav-link link-color"
              activeclassname="active"
            >
              Báo cáo
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar;