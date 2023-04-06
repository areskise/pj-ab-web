import './employee.css';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect, useState } from 'react';
import AddEmployee from "../../components/employee/addEmployee/AddEmployee";
import UpdateEmployee from "../../components/employee/updateEmployee/UpdateEmployee";
import UpdatePass from '../../components/employee/updatePass/UpdatePass';
import DetailEmployee from '../../components/employee/detailEmployee/DetailEmployee';
import { useNavigate } from 'react-router-dom';
import EmployeeAPI from '../../API/EmployeeAPI';

const Employee = ({user}) => {
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updatePass, setUpdatePass] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectComany, setSelectCompany] = useState([]);
    const [empolyees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const limit = 5;

    const navigate = useNavigate();
    useEffect(() => {
        if(user) {
            try{
                const fetchData = async () => {
                    const res = await EmployeeAPI.getAll();
                    const result = res.data.ResponseResult.Result;
                    setEmployees(result)
                    setCount(result.length)
                    setTotalPage(Math.ceil(res.data.count/limit))
                }
                fetchData();
            }
            catch(err) {
                console.log(err);
            }
        } else {
            navigate('/');
        }
    }, [user, limit, page, navigate]);
    const nextPage = () => {
        if(page < totalPage) {
            setPage(page + 1)
        } else {
            setPage(1)
        }
    }
    
    const prevPage = () => {
        if(page > 1) {
            setPage(page - 1)
        } else {
            setPage(totalPage)
        }
    }

    return(
        <div className="employee body-container bg-light">
            <Header/>
            <SideBar/>
            <AddEmployee showAdd={showAdd} setShowAdd={setShowAdd} />
            <UpdateEmployee showUpdate={showUpdate} setShowUpdate={setShowUpdate}/>
            <UpdatePass updatePass={updatePass} setUpdatePass={setUpdatePass}/>
            <DetailEmployee showDetail={showDetail} setShowDetail={setShowDetail}/>
            <div className="main-container bg-light">
                <h5 className="m-4">
                    Quản lý người dùng 
                    <i class="mx-2 fa-solid fa-angles-right" style={{fontSize: '18px'}}></i> 
                    Nhân viên
                </h5>
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
                            {empolyees && empolyees.map((employee, i) => (
                                <tr key={i}>
                                    <td scope="row" data-label="Họ tên:" onClick={() => setShowDetail(true)}>
                                        {employee.fullName}
                                        <div  className="employee-word">({employee.userName})</div>
                                    </td>
                                    <td data-label="Số điện thoại:">{employee.phone}</td>
                                    <td data-label="Email:" className="employee-word">{employee.email}</td>
                                    <td data-label="Nhóm quyền:">{employee.role}</td>
                                    <td data-label="Trạng thái:">
                                        {employee.active?
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
                            ))}
                        </tbody>
                        </table>
                        <div className="p-2 mb-4 d-flex justify-content-between">
                            <h6 className="mx-md-2 my-0">Tìm thấy: {count?count:0} nhân viên</h6>
                            <div className="d-flex align-items-center mx-md-4">
                                <i class="fa-solid fa-chevron-left" onClick={() => prevPage()}></i>
                                <div className="d-flex mx-md-4">
                                    <input className="input-page" value={page}></input>
                                    <div>/ {totalPage?totalPage:1}</div>
                                </div>
                                <i class="fa-solid fa-chevron-right" onClick={() => nextPage()}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee;