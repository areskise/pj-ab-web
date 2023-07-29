import './hui.css';
import img from '../../images/Image';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect, useState } from 'react';
import AddHui from "./addHui/AddHui";
import UpdateHui from "./updateHui/UpdateHui";
import DeleteHui from './deleteHui/DeleteHui';
import DetailHui from './detailHui/DetailHui';
import { huiActions, selectorHuis } from '../../redux/slice/huiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUserCompanies } from '../../redux/slice/companySlice';
import currencyFormatter from 'currency-formatter';
import { format } from 'date-fns';
import HuiAPI from '../../API/HuiAPI';
import countKhui from '../../helpers/countKhui';

const Hui = () => {
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [deleteHui, setDeleteHui] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectCompany, setSelectCompany] = useState('all');
    const [page, setPage] = useState(1);
    const [sortItem, setSortItem] = useState('startDate');
    const [sortBy, setSortBy] = useState('');
    const [sortEnd, setSortEnd] = useState('');
    const [sortStart, setSortStart] = useState('');
    const [iconStart, setIconStart] = useState("p-1 fa-solid fa-arrow-right-arrow-left");
    const [iconEnd, setIconEnd] = useState("p-1 fa-solid fa-arrow-right-arrow-left");
    const limit = 5;
    const dispatch = useDispatch();
    const huis = useSelector(selectorHuis)
    const userCompanies = useSelector(selectorUserCompanies)

    useEffect(() => {
        const data = {
            limit: limit,
            page: page,
            organizationId: selectCompany?._id,
            sortEnd: sortEnd,
            sortStart: sortStart,
        }
        const fetchHui = async () => {
            try {
                setLoading(true);
                const res = await HuiAPI.getList(data);
                const result = res.ResponseResult.Result;
                dispatch(huiActions.setHuis(result));
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        fetchHui();
    }, [page, limit, selectCompany, showAdd, showUpdate, deleteHui, showDetail, sortStart, sortEnd, sortBy]);

    const sortByStart = () => {
        setSortItem('startDate')
        setSortEnd('')
        setIconEnd('p-1 fa-solid fa-arrow-right-arrow-left')
        if(sortStart === '') {
            setSortBy('1')
            setSortStart('1')
            setIconStart('p-1 fa-solid fa-arrow-up-short-wide')
        } else if(sortStart === '1') {
            setSortBy('-1')
            setSortStart('-1')
            setIconStart('p-1 fa-solid fa-arrow-down-wide-short')
        } else {
            setSortBy('')
            setSortStart('')
            setIconStart('p-1 fa-solid fa-arrow-right-arrow-left')
        }
    }

    const sortByEnd = () => {
        setSortItem('enđate')
        setSortStart('')
        setIconStart('p-1 fa-solid fa-arrow-right-arrow-left')
        if(sortEnd === '') {
            setSortBy('1')
            setSortEnd('1')
            setIconEnd('p-1 fa-solid fa-arrow-up-short-wide')
        } else if(sortEnd === '1') {
            setSortBy('-1')
            setSortEnd('-1')
            setIconEnd('p-1 fa-solid fa-arrow-down-wide-short')
        } else {
            setSortBy('')
            setSortEnd('')
            setIconEnd('p-1 fa-solid fa-arrow-right-arrow-left')
        }
    }

    const selectByStart = (value) => {
        setSortEnd('')
        setIconEnd('p-1 fa-solid fa-arrow-right-arrow-left')
        if(value === '') {
            setSortStart('')
            setIconStart('p-1 fa-solid fa-arrow-right-arrow-left')
        } else if(value === '1') {
            setSortStart('1')
            setIconStart('p-1 fa-solid fa-arrow-up-short-wide')
        } else {
            setSortStart('-1')
            setIconStart('p-1 fa-solid fa-arrow-down-wide-short')
        }
    }

    const selectByEnd = (value) => {
        setSortStart('')
        setIconStart('p-1 fa-solid fa-arrow-right-arrow-left')
        if(value === '') {
            setSortEnd('')
            setIconEnd('p-1 fa-solid fa-arrow-right-arrow-left')
        } else if(value === '1') {
            setSortEnd('1')
            setIconEnd('p-1 fa-solid fa-arrow-up-short-wide')
        } else {
            setSortEnd('-1')
            setIconEnd('p-1 fa-solid fa-arrow-down-wide-short')
        }
    }

    const changeSortItem = (value) => {
        setSortItem(value)
        if (value === 'startDate') {
            selectByStart(sortBy)
        } else {
            selectByEnd(sortBy)
        }
    }

    const changeSortBy = (value) => {
        setSortBy(value)
        if (sortItem === 'endDate') {
            selectByEnd(value)
        } else {
            selectByStart(value)
        }
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
                            <div className="d-flex m-2 w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                                <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select btn-sort" data-bs-toggle="dropdown" aria-expanded="false">
                                    {sortItem==='startDate' &&
                                        <span className='selected-company p-2'>Ngày bắt đầu</span>
                                    }
                                    {sortItem==='endDate' &&
                                        <span className='selected-company p-2'>Ngày kết thúc</span>
                                    }
                                </a>
                                <ul className="p-0 my-1 dropdown-menu text-small select-dropdown">
                                    <li>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
                                            type='button'
                                            style={sortItem==='startDate'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                            onClick={() => changeSortItem('startDate')}
                                        >
                                            Ngày bắt đầu
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
                                            type='button'
                                            style={sortItem==='endDate'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                            onClick={() => changeSortItem('endDate')}
                                        >
                                            Ngày kết thúc
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex m-2 w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                                <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select btn-sort" data-bs-toggle="dropdown" aria-expanded="false">
                                    {sortBy==='' && (<>
                                        <span className='selected-company p-2'>Mặc định</span>
                                    </>)}
                                    {sortBy==='1' && (<>
                                        <span className='selected-company p-2'>Mới nhất 🡪 Cũ nhất</span>
                                    </>)}
                                    {sortBy==='-1' && (<>
                                        <span className='selected-company p-2'>Cũ nhất 🡪 Mới nhất</span>
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
                                            Mới -{">"} Cũ
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
                                            type='button'
                                            style={sortBy==='1'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                            onClick={() => changeSortBy('1')}
                                        >
                                            Cũ -{">"} Mới
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
                                            className={iconStart}
                                            onClick={sortByStart}
                                        ></i>
                                    </div>
                                </th>
                                <th scope="col">
                                <div className='d-flex align-items-end'>
                                        Ngày kết thúc
                                        <i 
                                            className={iconEnd}
                                            onClick={sortByEnd}
                                        ></i>
                                    </div>
                                </th>
                                <th scope="col">Khui</th>
                                <th scope="col">Dây hụi</th>
                                <th scope="col">Số phần</th>
                                <th scope="col">Tình trạng</th>
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
                                        {hui.type.type===1 && <td data-label="Khui:">{hui.type.num} hàng {hui.type.name}</td>}
                                        {hui.type.type===2 && <td data-label="Khui:">{hui.type.num===1?"Chủ nhật":`Thứ ${hui.type.num}`} hàng {hui.type.name}</td>}
                                        {hui.type.type===3 && <td data-label="Khui:">{hui.type.num} giờ hàng {hui.type.name}</td>}
                                        <td data-label="Dây hụi:">{currencyFormatter.format(hui.money, {
                                                symbol: 'VND',
                                                decimal: '*',
                                                thousand: '.',
                                                precision: 0,
                                                format: '%v %s' // %s is the symbol and %v is the value
                                                })}</td>
                                        <td data-label="Số phần:">{hui.partNum}</td>
                                        <td data-label="Tình trạng:"  className="employee-center">{countKhui(hui.type.num, hui.type.type, hui.startDate, hui.endDate, loading)}/{hui.partNum}</td>
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
                                                    onClick={() => setDeleteHui(hui)}
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
            <AddHui selectCompany={selectCompany} showAdd={showAdd} setShowAdd={setShowAdd} setLoading={setLoading}/>
            <UpdateHui selectCompany={selectCompany} showUpdate={showUpdate} setShowUpdate={setShowUpdate} setLoading={setLoading}/>
            <DeleteHui deleteHui={deleteHui} setDeleteHui={setDeleteHui} setLoading={setLoading}/>
            <DetailHui showDetail={showDetail} setShowDetail={setShowDetail}/>
        </div>
    )
}

export default Hui;