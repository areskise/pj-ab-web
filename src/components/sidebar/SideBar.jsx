import './sidebar.css';
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [navUser, setNavUser] = useState(false);

  return(  
    <sidebar className="flex-nowrap">
      <div className="h-100 d-flex flex-column flex-shrink-0 p-3 bg-light sibar-container">
        <ul className="nav nav-pills flex-column mb-auto">
          <li
            className='nav-item'
          >
            <NavLink 
              to={"/trang-chu"} 
              className="nav-link link-color"
              activeClassName="active"        
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
              activeClassName="active"
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
              activeClassName="active"
            >
              Quảng lý phân quyền
            </NavLink>
          </li>
          <li
            className="nav-item nav-user"
            onClick={()=>setNavUser(!navUser)}
          >
            <NavLink 
              to={"/quan-ly-nguoi-dung"} 
              className="d-flex nav-link link-color justify-content-between align-items-center disabled"
              >
              Quản lý người dùng
              <i className="fa-solid fa-chevron-down"></i>
            </NavLink>
          </li>
            {navUser &&
            <ul>
              <li 
                className='nav-sub-item'
              >
                <NavLink 
                to={"/quan-ly-nguoi-dung/nhan-vien"} 
                className="nav-link link-color"
                activeClassName="subActive"
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
                activeClassName="subActive"
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
              activeClassName="active"
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
              activeClassName="active"
            >
              Báo cáo
            </NavLink>
          </li>
        </ul>
      </div>
    </sidebar>
  )
}

export default SideBar;