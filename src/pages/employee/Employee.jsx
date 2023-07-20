import './employee.css';
import img from '../../images/Image';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect, useState } from 'react';
import AddEmployee from "./addEmployee/AddEmployee";
import UpdateEmployee from "./updateEmployee/UpdateEmployee";
import UpdatePass from './updatePass/UpdatePass';
import DetailEmployee from './detailEmployee/DetailEmployee';
import { employeeActions, selectorEmployees } from '../../redux/slice/employeeSlice';
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
    const [sortBy, setSortBy] = useState('');
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
                id: selectCompany?._id,
                status: sortStatus,
            }
            const fetchEmployee = async () => {
                try {
                    setLoading(true);
                    const res = await CompanyAPI.getUsers(data);
                    const result = res.ResponseResult.Result;
                    dispatch(employeeActions.setEmployees(result));
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error(error);
                }
            }
            fetchEmployee();
        }
    }, [page, limit, selectCompany, showAdd, showUpdate, updatePass, showDetail, sortStatus, sortBy]);

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

    const selectByStatus = (value) => {
        if(value === '') {
            setSortStatus('')
            setIcontStatus('p-1 fa-solid fa-arrow-right-arrow-left')
        } else if(value === '1') {
            setSortStatus('1')
            setIcontStatus('p-1 status-icon company-disable fa-solid fa-circle')
        } else {
            setSortStatus('-1')
            setIcontStatus('p-1 status-icon company-active fa-solid fa-circle')
        }
    }

    const changeSortBy = (value) => {
        setSortBy(value)
        selectByStatus(value)
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
            <AddEmployee selectCompany={selectCompany} showAdd={showAdd} setShowAdd={setShowAdd} setLoading={setLoading}/>
            <UpdateEmployee selectCompany={selectCompany} showUpdate={showUpdate} setShowUpdate={setShowUpdate} setLoading={setLoading}/>
            <UpdatePass updatePass={updatePass} setUpdatePass={setUpdatePass} setLoading={setLoading}/>
            <DetailEmployee showDetail={showDetail} setShowDetail={setShowDetail}/>
            <div className="main-container bg-light">
                <h5 className="m-4">
                    Quản lý người dùng 
                    <i className="mx-2 fa-solid fa-angles-right" style={{fontSize: '18px'}}></i> 
                    Nhân viên
                </h5>
                {loading && !employees.docs ?
                <div className="bg-white content">
                    <div className="d-flex p-4 align-items-center justify-content-center"> 
                        <h3 className="title">DANH SÁCH CÔNG TY</h3>
                        <i className="fa-solid fa-circle-plus plus" onClick={() => setShowAdd(true)}></i>
                    </div>
                    <div className="loading-container">
                        <div>
                            <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
                        </div>
                    </div>
                </div>
                :
                <div className="bg-white content">
                    <div className="d-flex p-4 align-items-center justify-content-center"> 
                        <h3 className="title">DANH SÁCH NHÂN VIÊN</h3>
                        <i className="fa-solid fa-circle-plus plus" onClick={() => setShowAdd(true)}></i>
                    </div>
                    
                    <div className="select-company-container"> 
                        <div className='label'>
                            <label htmlFor="">Công ty:</label>
                        </div>
                        {/* <select className='form-select select-company' onChange={changeCompany}>
                            <option value='all'>Tất cả</option>
                            {userCompanies?.map((company, i) => (
                                <option key={i} value={company._id}>{company.name}</option>
                            ))}
                        </select> */}
                        <div className="d-flex w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='selected-company p-2'>{selectCompany?.name?selectCompany?.name:'Tất cả'}</span>
                            </a>
                            <ul className="p-0 my-1 dropdown-menu text-small selected-dropdown">
                                <li key={'all'}>
                                    <button 
                                        className='p-2 px-3 btn dropdown-item'
                                        type='button'
                                        style={selectCompany==='all'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                        onClick={() => setSelectCompany('all')}
                                    >
                                        Tất cả
                                    </button>
                                </li>
                                {userCompanies?.map((company, i) => (
                                    <li key={i}>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
                                            type='button'
                                            style={selectCompany?._id===company._id?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                            onClick={() => setSelectCompany(company)}
                                        >
                                            {company.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="sort-container"> 
                        <div className='px-2'>
                            <label htmlFor="">Sắp xếp:</label>
                        </div>
                        <div className='btn-sort-container'>
                            {/* <select className='form-select btn-sort' onChange={(e)=>changeSortItem(e.target.value)}>
                                <option value='status'>Trạng thái</option>
                            </select>
                            <select className='form-select btn-sort' onChange={(e)=>changeSortBy(e.target.value)}>
                                {sortBy==='' && (<>
                                    <option value={''}>Mặc định</option>
                                    <option value={-1}>Hoạt động</option>
                                    <option value={1}>Không hoạt động</option>
                                </>)}
                                {sortBy==='-1' && (<>
                                    <option value={-1}>Hoạt động</option>
                                    <option value={''}>Mặc định</option>
                                    <option value={1}>Không hoạt động</option>
                                </>)}
                                {sortBy==='1' && (<>
                                    <option value={1}>Không hoạt động</option>
                                    <option value={''}>Mặc định</option>
                                    <option value={-1}>Hoạt động</option>
                                </>)}
                            </select> */}
                            <div className="d-flex m-2 w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                                <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select btn-sort" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='selected-company p-2'>Trạng thái</span>
                                </a>
                                <ul className="p-0 my-1 dropdown-menu text-small select-dropdown">
                                    <li>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
                                            type='button'
                                            style={{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}}
                                        >
                                            Trạng thái
                                        </button>
                                    </li>                        
                                </ul>
                            </div>
                            <div className="d-flex m-2 w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                                <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select btn-sort" data-bs-toggle="dropdown" aria-expanded="false">
                                    {sortBy==='' && (<>
                                        <span className='selected-company p-2'>Mặc định</span>
                                    </>)}
                                    {sortBy==='-1' && (<>
                                        <span className='selected-company p-2'>Hoạt động -{">"} Không hoạt động</span>
                                    </>)}
                                    {sortBy==='1' && (<>
                                        <span className='selected-company p-2'>Không hoạt động -{">"} Hoạt động</span>
                                    </>)}
                                </a>
                                <ul className="p-0 my-1 dropdown-menu text-small select-dropdown">
                                    <li>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
                                            type='button'
                                            style={sortBy===''?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                            onClick={() => changeSortBy('')}
                                        >
                                            Mặc định
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
                                            type='button'
                                            style={sortBy==='-1'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                            onClick={() => changeSortBy('-1')}
                                        >
                                            Hoạt động -{">"} Không hoạt động
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
                                            type='button'
                                            style={sortBy==='1'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                            onClick={() => changeSortBy('1')}
                                        >
                                            Không hoạt động -{">"} Hoạt động
                                        </button>
                                    </li>              
                                </ul>
                            </div>
                        </div>
                    </div>
                    {!employees.docs ? 
                        <div className="loading-container">
                            <div>
                                <img src={img.empty} alt='logo' width="200" height="170" className='empty-img'/>
                                <p>Chức năng chưa có dữ liệu</p>
                                <p>Vui lòng thêm dữ liệu</p>
                            </div>
                        </div>
                    :
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
                                        <td className='detail' scope="row" data-label="Họ tên:" onClick={() => setShowDetail(employee)}>
                                            {employee.userId?.fullName}
                                            <div>({employee.userId?.userName})</div>
                                        </td>
                                        <td data-label="Số điện thoại:">{employee.userId?.phoneNumber}</td>
                                        <td data-label="Email:">{employee.userId?.email}</td>
                                        <td data-label="Nhóm quyền:">{employee.roleId?.name}</td>
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
                            <h6 className="mx-md-2 my-0">Tìm thấy: {employees?.totalDocs?employees?.totalDocs:0} nhân viên</h6>
                            <div className="d-flex align-items-center mx-md-4">
                                <i className="fa-solid fa-chevron-left" onClick={() => prevPage()}></i>
                                <div className="d-flex mx-md-4">
                                    <input className="input-page" value={employees?.page} onChange={(e)=>setPage(e.target.value)}></input>
                                    <div>/ {employees?.totalPages?employees?.totalPages:1}</div>
                                </div>
                                <i className="fa-solid fa-chevron-right" onClick={() => nextPage()}></i>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                }
            </div>
        </div>
    )
}

export default Employee;