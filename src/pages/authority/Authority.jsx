import "./authority.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useState, useEffect } from 'react';

const Authority = () => {
    const [selectComany, setSelectCompany] = useState('');
    const [subMenu, setSubMenu] = useState(false);
    const [control, setControl] = useState(false);

    return(
        <div className="body-container bg-light">
            <Header/>
            <SideBar/>
            <div className="main-container bg-light">
                <h5 className="m-4">Quản lý phân quyền</h5>
                <div className="bg-white content">
                    <div className="authority-container">
                        <div className="d-flex justify-content-center align-items-center m-3">
                            <button 
                                className={control?'btn btn-control m-2':'btn btn-control m-2 selected'}
                                onClick={()=>setControl(false)}
                            >Thêm mới</button>
                            <button 
                                className={control?'btn btn-control m-2 selected':'btn btn-control m-2'}
                                onClick={()=>setControl(true)}
                            >Cập nhật</button>
                        </div>
                        {!control?
                            <form>
                                <div className='form-container'>
                                    <div className="w-100">
                                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                                <div className='label'>
                                                    <label htmlFor="">Công ty:</label>
                                                </div>
                                                <select className='select-company' onChange={(e) => setSelectCompany(e.target.value)}>
                                                    <option>Công ty 1</option>
                                                    <option>Công ty 2</option>
                                                    <option>Công ty 3</option>
                                                </select>
                                            </div>
                                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                                <div className='label'>
                                                    <label htmlFor="">Tên nhóm quyền:</label>
                                                </div>
                                                <input type="text" className='form-control' placeholder='Nhập tên nhóm quyền'/>
                                            </div>
                                    </div>
                                    <div className="w-100">
                                        <div className='title'>
                                            Danh sách chức năng
                                        </div>
                                        <div className='form-check'>
                                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                                <input type="select" className='form-control' placeholder='Nhập từ khóa tìm kiếm' />
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Tất cả</label>
                                                </div>
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Trang chủ</label>
                                                </div>
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Quản lý công ty</label>
                                                </div>
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div onClick={()=>setSubMenu(!subMenu)}>
                                                    <label htmlFor="">
                                                        Quản lý người dùng
                                                        <i className="mx-3 fa-solid fa-chevron-down"></i>
                                                    </label>
                                                </div>
                                            </div>
                                            {subMenu &&
                                                <ul>
                                                    <li className='nav-sub-item p-2'>
                                                        <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                            <input type="checkbox" className='form-checkbox' />
                                                            <div>
                                                                <label htmlFor="">Nhân viên</label>
                                                            </div>
                                                        </div>
                                                        <ul className='mt-2'>
                                                            <li className='nav-sub-item p-2'>
                                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                                    <input type="checkbox" className='form-checkbox' />
                                                                    <div>
                                                                        <label htmlFor="">Thêm</label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className='nav-sub-item p-2'>
                                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                                    <input type="checkbox" className='form-checkbox' />
                                                                    <div>
                                                                        <label htmlFor="">Cập nhập</label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className='nav-sub-item px-2'>
                                                        <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                            <input type="checkbox" className='form-checkbox' />
                                                            <div>
                                                                <label htmlFor="">Khách hàng</label>
                                                            </div>
                                                        </div>
                                                        <ul className='mt-2'>
                                                            <li className='nav-sub-item p-2'>
                                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                                    <input type="checkbox" className='form-checkbox' />
                                                                    <div>
                                                                        <label htmlFor="">Thêm</label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className='nav-sub-item p-2'>
                                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                                    <input type="checkbox" className='form-checkbox' />
                                                                    <div>
                                                                        <label htmlFor="">Cập nhật</label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            }
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Quản lý hụi</label>
                                                </div>
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Báo cáo</label>
                                                </div>
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Ngày hoạt động</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center m-4">
                                <button className="btn btn-continue">Thêm mới</button>
                                </div>
                            </form>
                        :
                            <form>
                                <div className='form-container'>
                                    <div className="w-100">
                                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                                <div className='label'>
                                                    <label htmlFor="">Công ty:</label>
                                                </div>
                                                <select className='select-company' onChange={(e) => setSelectCompany(e.target.value)}>
                                                    <option>Công ty 1</option>
                                                    <option>Công ty 2</option>
                                                    <option>Công ty 3</option>
                                                </select>
                                            </div>
                                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                                <div className='label'>
                                                    <label htmlFor="">Tên nhóm quyền:</label>
                                                </div>
                                                <select className='select-company' onChange={(e) => setSelectCompany(e.target.value)}>
                                                    <option>Nhóm quyền 1</option>
                                                    <option>Nhóm quyền 2</option>
                                                    <option>Nhóm quyền 3</option>
                                                </select>
                                            </div>
                                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                                <div className='label'>
                                                    <label htmlFor="">Tên mới:</label>
                                                </div>
                                                <input type="text" className='form-control' placeholder='Nhập tên mới'/>
                                            </div>
                                    </div>
                                    <div className="w-100">
                                        <div className='title'>
                                            Danh sách chức năng
                                        </div>
                                        <div className='form-check'>
                                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                                <input type="select" className='form-control' placeholder='Nhập từ khóa tìm kiếm' />
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Tất cả</label>
                                                </div>
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Trang chủ</label>
                                                </div>
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Quản lý công ty</label>
                                                </div>
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div onClick={()=>setSubMenu(!subMenu)}>
                                                    <label htmlFor="">
                                                        Quản lý người dùng
                                                        <i className="mx-3 fa-solid fa-chevron-down"></i>
                                                    </label>
                                                </div>
                                            </div>
                                            {subMenu &&
                                                <ul>
                                                    <li className='nav-sub-item p-2'>
                                                        <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                            <input type="checkbox" className='form-checkbox' />
                                                            <div>
                                                                <label htmlFor="">Nhân viên</label>
                                                            </div>
                                                        </div>
                                                        <ul className='mt-2'>
                                                            <li className='nav-sub-item p-2'>
                                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                                    <input type="checkbox" className='form-checkbox' />
                                                                    <div>
                                                                        <label htmlFor="">Thêm</label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className='nav-sub-item p-2'>
                                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                                    <input type="checkbox" className='form-checkbox' />
                                                                    <div>
                                                                        <label htmlFor="">Cập nhập</label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className='nav-sub-item px-2'>
                                                        <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                            <input type="checkbox" className='form-checkbox' />
                                                            <div>
                                                                <label htmlFor="">Khách hàng</label>
                                                            </div>
                                                        </div>
                                                        <ul className='mt-2'>
                                                            <li className='nav-sub-item p-2'>
                                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                                    <input type="checkbox" className='form-checkbox' />
                                                                    <div>
                                                                        <label htmlFor="">Thêm</label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li className='nav-sub-item p-2'>
                                                                <div className='d-flex mx-4 align-items-center justify-content-start'>
                                                                    <input type="checkbox" className='form-checkbox' />
                                                                    <div>
                                                                        <label htmlFor="">Cập nhật</label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            }
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Quản lý hụi</label>
                                                </div>
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Báo cáo</label>
                                                </div>
                                            </div>
                                            <div className='d-flex m-2 mx-4 align-items-center justify-content-start'>
                                                <input type="checkbox" className='form-checkbox' />
                                                <div>
                                                    <label htmlFor="">Ngày hoạt động</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center m-4">
                                <button className="btn btn-continue">Cập nhật</button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authority;