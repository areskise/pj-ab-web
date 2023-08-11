import './report.css';
import img from '../../images/Image';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect, useState } from 'react';
import { employeeActions, selectorEmployees } from '../../redux/slice/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUserCompanies, selectorSelectedCompany } from '../../redux/slice/companySlice';
import CompanyAPI from '../../API/CompanyAPI';
import HuiAPI from '../../API/HuiAPI';

const Report = () => {
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updatePass, setUpdatePass] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectHui, setSelectHui] = useState(null);
    const [huis, setHuis] = useState([]);
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [iconStatus, setIcontStatus] = useState("p-1 fa-solid fa-arrow-right-arrow-left");
    const dispatch = useDispatch();
    const employees = useSelector(selectorEmployees)
    const userCompanies = useSelector(selectorUserCompanies)
    const selectedCompany = useSelector(selectorSelectedCompany)

    useEffect(() => {
        const data = {
            limit: 9999,
            page: 1,
            organizationId: selectedCompany?._id,
        }
        const fetchHui = async () => {
            try {
                setLoading(true);
                const res = await HuiAPI.getList(data);
                const result = res.ResponseResult.Result;
                setHuis(result)
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        fetchHui();
    }, [selectedCompany]);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true);
                const res = await HuiAPI.getReport(selectHui?._id);
                const result = res.ResponseResult.Result;
                console.log(res);

                setReports(result)
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        fetchReport();
    }, [selectHui]);

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
            <div className="main-container bg-light">
                <h5 className="m-4">
                    Quản lý hụi 
                    <i className="mx-2 fa-solid fa-angles-right" style={{fontSize: '18px'}}></i> 
                    Báo cáo
                </h5>
                {loading && !huis.docs ?
                <div className="bg-white content">
                    <div className="loading-container">
                        <div>
                            <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
                        </div>
                    </div>
                </div>
                :
                <div className="bg-white content">             
                    <div className="p-4 select-company-container"> 
                        <div className='label'>
                            <label htmlFor="">Báo cáo:</label>
                        </div>
                        <div className="d-flex w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='selected-company p-2'>{selectHui?.name}</span>
                            </a>
                            <ul className="p-0 my-1 dropdown-menu text-small select-dropdown">
                                {huis.docs?.map((hui, i) => (
                                    <li key={i}>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
                                            type='button'
                                            style={selectHui?._id===hui._id?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                            onClick={() => setSelectHui(hui)}
                                        >
                                            {hui.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="p-2 select-company-container"> 
                        <div className='label'>
                            <label htmlFor="">Dây hụi:</label>
                        </div>
                        <div className="d-flex w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='selected-company p-2'>{selectHui?.name?selectHui?.name:'Vui lòng chọn dây hụi'}</span>
                            </a>
                            <ul className="p-0 my-1 dropdown-menu text-small select-dropdown">
                                {huis.docs?.map((huiSlice, i) => (
                                    <li key={i}>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
                                            type='button'
                                            style={selectHui?._id===huiSlice._id?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                            onClick={() => setSelectHui(huiSlice)}
                                        >
                                            {huiSlice.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {!reports.docs ? 
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
                                <th scope="col">Tên nhân viên</th>
                                <th scope="col">Ngày mở</th>
                                <th scope="col">Số tiền nhận</th>
                                <th scope="col">% nhận</th>
                            </tr>
                            </thead>
                            <tbody>
                                {reports.docs?.map((employee, i) => (
                                    <tr key={i}>
                                        <td scope="row" data-label="Tên nhân viên:">
                                            {employee.userId?.fullName}
                                        </td>
                                        <td data-label="Ngày mở:">{employee.userId?.phoneNumber}</td>
                                        <td data-label="Số tiền nhận:">{employee.userId?.email}</td>
                                        <td data-label="% nhận:">{employee.roleId?.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-2 mb-4 d-flex justify-content-between">
                            <h6 className="mx-md-2 my-0">Tìm thấy: {reports?.totalDocs?reports?.totalDocs:0} kết quả</h6>
                            <div className="d-flex align-items-center mx-md-4">
                                <i className="fa-solid fa-chevron-left" onClick={() => prevPage()}></i>
                                <div className="d-flex mx-md-4">
                                    <input className="input-page" value={reports?.page} onChange={(e)=>setPage(e.target.value)}></input>
                                    <div>/ {reports?.totalPages?reports?.totalPages:1}</div>
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

export default Report;