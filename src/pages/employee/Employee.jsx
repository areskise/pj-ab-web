import './employee.css';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect, useState } from 'react';
import AddEmployee from "./addEmployee/AddEmployee";
import UpdateEmployee from "./updateEmployee/UpdateEmployee";
import UpdatePass from './updatePass/UpdatePass';
import DetailEmployee from './detailEmployee/DetailEmployee';
import { employeeActions, selectorAllEmployees, selectorEmployees } from '../../redux/slice/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUserCompanies } from '../../redux/slice/companySlice';
import CompanyAPI from '../../API/CompanyAPI';

const Employee = () => {
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updatePass, setUpdatePass] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectCompany, setSelectCompany] = useState('all');
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState('');
    const [iconStatus, setIcontStatus] = useState("p-1 fa-solid fa-arrow-right-arrow-left");
    const limit = 5;
    const dispatch = useDispatch();
    const employees = useSelector(selectorEmployees)
    const userCompanies = useSelector(selectorUserCompanies)

    useEffect(() => {
        if(selectCompany === 'all') {
            const data = {
                limit: limit,
                page: page,
                status: sortStatus,
            }
            const fetchEmployee = async () => {
                try {
                    setLoading(true);
                    const res = await CompanyAPI.getAllUsers(data);
                    const result = res.ResponseResult.Result;
                    console.log(res);
                    dispatch(employeeActions.setEmployees(result));
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error(error);
                }
            }
            fetchEmployee();
        } else {
            const data = {
                limit: limit,
                page: page,
                id: selectCompany,
                status: sortStatus,
            }
            const fetchEmployee = async () => {
                try {
                    setLoading(true);
                    const res = await CompanyAPI.getUsers(data);
                    const result = res.ResponseResult.Result;
                    console.log(res);
                    dispatch(employeeActions.setEmployees(result));
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error(error);
                }
            }
            fetchEmployee();
        }
    }, [page, limit, selectCompany, showAdd, showUpdate, updatePass, showDetail, sortStatus]);

    const sortByStatus = () => {
        if(sortStatus === '') {
            setSortStatus(1)
            setIcontStatus('p-1 status-icon employee-disable fa-solid fa-circle')
        } else if(sortStatus === 1) {
            setSortStatus(-1)
            setIcontStatus('p-1 status-icon employee-active fa-solid fa-circle')
        } else {
            setSortStatus('')
            setIcontStatus('p-1 fa-solid fa-arrow-right-arrow-left')
        }
    }

    const changeCompany = (e) => {
        setSelectCompany(e.target.value)
        setPage(1)
    }

    const nextPage = () => {
        if(employees.hasNextPage) {
            setPage(employees.nextPage)
        } else {
            setPage(1)
        }
    }
    
    const prevPage = () => {
        if(employees.hasPrevPage) {
            setPage(employees.prevPage)
        } else {
            setPage(employees.totalPages)
        }
    }

    return(
        <div className="employee body-container bg-light">
            <Header/>
            <SideBar/>
            <AddEmployee selectCompany={selectCompany} showAdd={showAdd} setShowAdd={setShowAdd} />
            <UpdateEmployee selectCompany={selectCompany} showUpdate={showUpdate} setShowUpdate={setShowUpdate}/>
            <UpdatePass updatePass={updatePass} setUpdatePass={setUpdatePass}/>
            <DetailEmployee showDetail={showDetail} setShowDetail={setShowDetail}/>
            <div className="main-container bg-light">
                <h5 className="m-4">
                    Quản lý người dùng 
                    <i className="mx-2 fa-solid fa-angles-right" style={{fontSize: '18px'}}></i> 
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
                        <select className='select-company' onChange={changeCompany}>
                            <option value='all'>Tất cả</option>
                            {userCompanies?.map((company, i) => (
                                <option key={i} value={company._id}>{company.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="sort-container"> 
                        <div className='label'>
                            <label htmlFor="">Sắp xếp:</label>
                        </div>
                        <button className='btn btn-sort'>
                            Trạng thái
                            <i 
                                className={iconStatus}
                                onClick={sortByStatus}
                            ></i>
                        </button>
                    </div>
                    <div className="employee-container">
                        <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Họ tên</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Email</th>
                            <th scope="col">Nhóm quyền</th>
                            <th scope="col">
                            <div className='d-flex align-items-end'>
                                    Trạng thái 
                                    <i 
                                        className={iconStatus}
                                        onClick={sortByStatus}
                                    ></i>
                                </div>
                            </th>
                            <th scope="col" className="employee-center">Chức năng</th>
                        </tr>
                        </thead>
                        <tbody>
                            {employees.docs?.map((employee, i) => (
                                <tr key={i}>
                                    <td scope="row" data-label="Họ tên:" onClick={() => setShowDetail(true)}>
                                        {employee.userId?.fullName}
                                        <div  className="employee-word">({employee.userId?.userName})</div>
                                    </td>
                                    <td data-label="Số điện thoại:">{employee.userId?.phoneNumber}</td>
                                    <td data-label="Email:" className="employee-word">{employee.userId?.email}</td>
                                    <td data-label="Nhóm quyền:" className="employee-word">{employee.roleId?.name}</td>
                                    <td data-label="Trạng thái:">
                                        {employee.userId?.status?
                                            <div className="employee-active">Hoạt động</div>
                                        :
                                            <div className="employee-disable">Không hoạt động</div>
                                        }
                                    </td>
                                    <td data-label="Chức năng:" className="employee-center">
                                        <div className='func-icon'>
                                            <i 
                                                className="fa-solid fa-pen-to-square p-1 m-1"  
                                                style={{color: '#6280EB'}}
                                                onClick={() => setShowUpdate(employee)}
                                            ></i>
                                            <i 
                                                className="fa-solid fa-key p-1 m-1"  
                                                onClick={() => setUpdatePass(employee)}
                                            ></i>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                        <div className="p-2 mb-4 d-flex justify-content-between">
                            <h6 className="mx-md-2 my-0">Tìm thấy: {employees.totalDocs?employees.totalDocs:0} nhân viên</h6>
                            <div className="d-flex align-items-center mx-md-4">
                                <i className="fa-solid fa-chevron-left" onClick={() => prevPage()}></i>
                                <div className="d-flex mx-md-4">
                                    <input className="input-page" value={employees.page} onChange={(e)=>setPage(e.target.value)}></input>
                                    <div>/ {employees.totalPages?employees.totalPages:1}</div>
                                </div>
                                <i className="fa-solid fa-chevron-right" onClick={() => nextPage()}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee;