import './employee.css';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect, useState } from 'react';
import AddEmployee from "../../components/employee/addEmployee/AddEmployee";
import UpdateEmployee from "../../components/employee/updateEmployee/UpdateEmployee";
import UpdatePass from '../../components/employee/updatePass/UpdatePass';

const Employee = () => {
    const [selectCompany, setSelectCompany] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updatePass, setUpdatePass] = useState(false);

    return(
        <div className="employee body-container bg-light">
            <Header/>
            <SideBar/>
            <AddEmployee showAdd={showAdd} setShowAdd={setShowAdd} />
            <UpdateEmployee showUpdate={showUpdate} setShowUpdate={setShowUpdate}/>
            <UpdatePass updatePass={updatePass} setUpdatePass={setUpdatePass}/>
            <div className="main-container bg-light">
                <h5 className="m-4">Quản lý nhân viên</h5>
                <div className="bg-white content">
                    <div className="d-flex p-4 align-items-center justify-content-center"> 
                        <h3 className="title">DANH SÁCH NHÂN VIÊN</h3>
                        <i className="fa-solid fa-circle-plus plus" onClick={() => setShowAdd(true)}></i>
                    </div>
                    <div className="select-company-container"> 
                        <div className='label'>
                            <label htmlFor="">Công ty:</label>
                        </div>
                        <select className='select-company' onChange={(e) => setSelectCompany(e.target.value)}>
                            <option>Tất cả</option>
                            <option>Công ty 1</option>
                            <option>Công ty 2</option>
                            <option>Công ty 3</option>
                        </select>
                    </div>
                    <div className="sort-container"> 
                        <div className='px-2'>
                            <label htmlFor="">Sắp xếp:</label>
                        </div>
                        <div className='d-flex'>
                            <button className='btn btn-sort'>
                                Nhóm quyền
                                <i className="p-1 fa-solid fa-arrow-down-up-across-line"></i>
                            </button>
                            <button className='btn btn-sort'>
                                Trạng thái
                                <i class="status-icon fa-solid fa-circle"></i>
                            </button>
                        </div>
                    </div>
                    <div className="employee-container">
                        <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Họ tên</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Email</th>
                            <th scope="col">
                                <div className='d-flex align-items-end'>
                                    Nhóm quyền 
                                    <i className="p-1 fa-solid fa-arrow-down-up-across-line"></i>
                                </div>
                            </th>
                            <th scope="col">
                                <div className='d-flex align-items-end'>
                                    Trạng thái 
                                    <i class="p-1 status-icon fa-solid fa-circle"></i>
                                </div>
                            </th>
                            <th scope="col" className="employee-center">Chức năng</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td scope="row" data-label="Họ tên:">
                                Nguyễn Văn A
                                <div>(anguyenanguyen)</div>
                            </td>
                            <td data-label="Số điện thoại:">0123456789</td>
                            <td data-label="Email:" className="employee-word">anguyen@gmail.com</td>
                            <td data-label="Nhóm quyền:">root</td>
                            <td data-label="Trạng thái:">
                                {true?
                                    <div className="status-active">Hoạt động</div>
                                :
                                    <div className="status-disable">Không hoạt động</div>
                                }
                            </td>
                            <td data-label="Chức năng:" className="employee-center">
                                <div className='func-icon'>
                                    <i 
                                        class="fa-solid fa-pen-to-square p-1 m-1"  
                                        style={{color: '#6280EB'}}
                                        onClick={() => setShowUpdate(true)}
                                    ></i>
                                    <i 
                                        class="fa-solid fa-key p-1 m-1"  
                                        onClick={() => setUpdatePass(true)}
                                    ></i>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                        <div className="p-2 mb-4 d-flex justify-content-between">
                            <h6 className="mx-md-2 my-0">Tìm thấy: 20 nhân viên</h6>
                            <div className="d-flex align-items-center mx-md-4">
                                <i class="fa-solid fa-chevron-left"></i>
                                <div className="d-flex mx-md-4">
                                    <input className="input-page" defaultValue={1}></input>
                                    <div>/ 4</div>
                                </div>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee;