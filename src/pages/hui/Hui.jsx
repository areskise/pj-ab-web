import './hui.css';
import img from '../../images/Image';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect, useState } from 'react';
import AddHui from "./addHui/AddHui";
import UpdateHui from "./updateHui/UpdateHui";
import UpdatePass from './updatePass/UpdatePass';
import DetailHui from './detailHui/DetailHui';
import { huiActions, selectorHuis } from '../../redux/slice/huiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUserCompanies } from '../../redux/slice/companySlice';
import { format } from 'date-fns';
import HuiAPI from '../../API/HuiAPI';

const Hui = () => {
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
    const huis = useSelector(selectorHuis)
    const userCompanies = useSelector(selectorUserCompanies)

    useEffect(() => {
        const data = {
            limit: limit,
            page: page,
            organizationId: selectCompany?._id,
            status: sortStatus,
        }
        const fetchHui = async () => {
            try {
                setLoading(true);
                const res = await HuiAPI.getList(data);
                const result = res.ResponseResult.Result;
                console.log(result);
                dispatch(huiActions.setHuis(result));
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        fetchHui();
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
        if(huis.hasNextPage) {
            setPage(huis.nextPage)
        } else {
            setPage(1)
        }
    }
    
    const prevPage = () => {
        if(huis.hasPrevPage) {
            setPage(huis.prevPage)
        } else {
            setPage(huis.totalPages)
        }
    }

    return(
        <div className="employee body-container bg-light">
            <Header/>
            <SideBar/>
            <AddHui selectCompany={selectCompany} showAdd={showAdd} setShowAdd={setShowAdd} setLoading={setLoading}/>
            <UpdateHui selectCompany={selectCompany} showUpdate={showUpdate} setShowUpdate={setShowUpdate} setLoading={setLoading}/>
            <UpdatePass updatePass={updatePass} setUpdatePass={setUpdatePass} setLoading={setLoading}/>
            <DetailHui showDetail={showDetail} setShowDetail={setShowDetail}/>
            <div className="main-container bg-light">
                <h5 className="m-4">
                    Quản lý hụi 
                    <i className="mx-2 fa-solid fa-angles-right" style={{fontSize: '18px'}}></i> 
                    Quản lý hụi
                </h5>
                {loading && !huis.docs ?
                <div className="bg-white content">
                    <div className="d-flex p-4 align-items-center justify-content-center"> 
                        <h3 className="title">DANH SÁCH HỤI</h3>
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
                        <h3 className="title">DANH SÁCH HỤI</h3>
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
                            <ul className="p-0 my-1 dropdown-menu text-small select-dropdown">
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
                    {!huis.docs ? 
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
                                <th scope="col">Mã hụi</th>
                                <th scope="col">Tên hụi</th>
                                <th scope="col">
                                    <div className='d-flex align-items-end'>
                                        Ngày mở
                                        <i 
                                            className={iconStatus}
                                            onClick={sortByStatus}
                                        ></i>
                                    </div>
                                </th>
                                <th scope="col">
                                <div className='d-flex align-items-end'>
                                        Ngày kết thúc
                                        <i 
                                            className={iconStatus}
                                            onClick={sortByStatus}
                                        ></i>
                                    </div>
                                </th>
                                <th scope="col">Khui</th>
                                <th scope="col">Dây hụi</th>
                                <th scope="col">Số phần</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col" className="employee-center">Chức năng</th>
                            </tr>
                            </thead>
                            <tbody>
                                {huis.docs?.map((hui, i) => (
                                    <tr key={i}>
                                        <td scope="row" data-label="Mã hụi:">
                                            {hui.code}
                                        </td>
                                        <td scope="row" data-label="Tên hụi:">
                                            {hui.name}
                                        </td>
                                        <td data-label="Ngày mở:">{format(new Date(hui.startDate), 'dd/MM/yyyy')}</td>
                                        <td data-label="Ngày kết thúc:">{format(new Date(hui.endDate), 'dd/MM/yyyy')}</td>
                                        <td data-label="Khui:">{hui.khui}</td>
                                        <td data-label="Dây hụi:">{hui.money}</td>
                                        <td data-label="Số phần:">{hui.partNum}</td>
                                        <td data-label="Trạng thái:">{hui.status}</td>
                                        <td data-label="Chức năng:" className="employee-center">
                                            <div className='func-icon'>
                                                <i 
                                                    className="fa-solid fa-pen-to-square p-1 m-1"  
                                                    style={{color: '#6280EB'}}
                                                    onClick={() => setShowUpdate(hui)}
                                                ></i>
                                                <i 
                                                    className="fa-regular fa-rectangle-xmark p-1 m-1" 
                                                    style={{color: '#FF5F5F'}}
                                                    onClick={() => setUpdatePass(hui)}
                                                ></i>
                                                <i 
                                                    className="fa-regular fa-file-zipper p-1 m-1"  
                                                    onClick={() => setShowDetail(hui)}
                                                ></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-2 mb-4 d-flex justify-content-between">
                            <h6 className="mx-md-2 my-0">Tìm thấy: {huis?.totalDocs?huis?.totalDocs:0} dây hụi</h6>
                            <div className="d-flex align-items-center mx-md-4">
                                <i className="fa-solid fa-chevron-left" onClick={() => prevPage()}></i>
                                <div className="d-flex mx-md-4">
                                    <input className="input-page" value={huis?.page} onChange={(e)=>setPage(e.target.value)}></input>
                                    <div>/ {huis?.totalPages?huis?.totalPages:1}</div>
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

export default Hui;