import './huiPoint.css';
import img from '../../images/Image';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { huiActions, selectorHuis } from '../../redux/slice/huiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUserCompanies } from '../../redux/slice/companySlice';
import currencyFormatter from 'currency-formatter';
import { format } from 'date-fns';
import HuiAPI from '../../API/HuiAPI';
import HuiPointAPI from '../../API/HuiPointAPI';
import countKhui from '../../helpers/countKhui';
import DetailHui from './detailHui/DetailHuiPoint';

const HuiPoint = () => {
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [deleteHui, setDeleteHui] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedHui, setSelectedHui] = useState({});
    const [huiPoints, setHuiPoints] = useState([]);
    const [periodicHui, setPeriodicHui] = useState(2);
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
    const { id } = useParams();
    console.log(huiPoints);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = {
                    huiId: id,
                    periodicHui: periodicHui,
                }
                const resHui = await HuiAPI.get(id);
                const resultHui = resHui.ResponseResult.Result;
                const resHuiPoint = await HuiPointAPI.getChains(data);
                const resultHuiPoint = resHuiPoint.ResponseResult.Result;
                setHuiPoints(resultHuiPoint);
                setSelectedHui(resultHui)
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        fetchData();
    }, [id, page, limit, selectCompany, sortStart, sortEnd, sortBy]);

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
        <div className="hui-point body-container bg-light">
            <Header/>
            <SideBar/>
            <div className="main-container bg-light">
                <h5 className="m-4">
                    Quản lý hụi 
                    <i className="mx-2 fa-solid fa-angles-right" style={{fontSize: '18px'}}></i> 
                    Quản lý hụi
                    <i className="mx-2 fa-solid fa-angles-right" style={{fontSize: '18px'}}></i> 
                    Chi tiết hụi
                </h5>
                {loading || !selectedHui && !huiPoints ?
                <div className="bg-white content">
                    <div className="loading-container">
                        <div>
                            <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
                        </div>
                    </div>
                </div>
                :
                <div className="bg-white content">
                    <div className="d-flex p-4 align-items-center justify-content-center"> 
                        <h3 className="title">{selectedHui?.code?.toUpperCase()} - {selectedHui?.name?.toUpperCase()}</h3>
                        <i className="fa-solid fa-circle-plus plus" onClick={() => setShowAdd(true)}></i>
                    </div>
                    {showDetail &&
                    <div className="hui-point-container py-0">
                        <DetailHui selectedHui={selectedHui}/> 
                    </div>                 
                    }
                    <div className="select-company-container mb-4">
                        <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1" onClick={()=>setShowDetail(!showDetail)}>
                            Thông tin hụi
                            <i className={showDetail?"fa-solid fa-angle-up ml-2 mt-1":"fa-solid fa-angle-down ml-2 mt-1"}></i>
                        </a>
                        
                    </div>
                    <div className="select-company-container">
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
                    
                    {!huiPoints ? 
                        <div className="loading-container">
                            <div>
                                <img src={img.empty} alt='logo' width="200" height="170" className='empty-img'/>
                                <p>Chức năng chưa có dữ liệu</p>
                                <p>Vui lòng thêm dữ liệu</p>
                            </div>
                        </div>
                    :
                    <div className="hui-point-container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col"><input className='checkbox' type="checkbox" /></th>
                                <th scope="col">Tên hụi viên</th>
                                <th scope="col">
                                    <div className='d-flex align-items-end'>
                                        Ngày đóng
                                        <i 
                                            className={iconStart}
                                            onClick={sortByStart}
                                        ></i>
                                    </div>
                                </th>
                                <th scope="col">Số chân</th>
                                <th scope="col">Bỏ hụi</th>
                                <th scope="col">Hụi sống</th>
                                <th scope="col">Hụi chết</th>
                                <th scope="col">Hốt hụi</th>
                                <th scope="col" className="hui-point-center">Chức năng</th>
                            </tr>
                            </thead>
                            <tbody>
                                {huiPoints?.map((hui, i) => (
                                    <tr key={i}>
                                        <td scope="row" data-label="">
                                        <input className='checkbox' type="checkbox" />
                                        </td>
                                        <td scope="row" data-label="Tên hụi viên:">
                                            {hui.cusName}
                                        </td>
                                        <td data-label="Ngày đóng:">{format(new Date(hui.paymentDate), 'dd/MM/yyyy')}</td>
                                        <td data-label="Số chân:">{hui.cusNum}</td>
                                        <td data-label="Bỏ hụi:">
                                            <input type="text" name="" id="" className='form-control form-confirm' defaultValue={hui.pushHui}/>
                                        </td>
                                        <td data-label="Hụi sống:">{currencyFormatter.format(hui.liveHui, {
                                                symbol: 'VND',
                                                decimal: '*',
                                                thousand: '.',
                                                precision: 0,
                                                format: '%v %s' // %s is the symbol and %v is the value
                                                })}</td>
                                        <td data-label="Hụi chết:">{currencyFormatter.format(hui.dieHui, {
                                                symbol: 'VND',
                                                decimal: '*',
                                                thousand: '.',
                                                precision: 0,
                                                format: '%v %s' // %s is the symbol and %v is the value
                                                })}</td>
                                        <td data-label="Hốt hụi:">{currencyFormatter.format(hui.getHui, {
                                                symbol: 'VND',
                                                decimal: '*',
                                                thousand: '.',
                                                precision: 0,
                                                format: '%v %s' // %s is the symbol and %v is the value
                                                })}</td>
                                        <td data-label="Chức năng:" className="hui-point-center">
                                            <div className='func-icon'>
                                                <button className='btn btn-continue'>Chốt hụi</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-2 d-flex justify-content-between">
                            <h6 className="mx-md-2 my-0">Tổng tiền: {huiPoints?.totalDocs}</h6>
                        </div>
                        <div className="p-2 d-flex justify-content-between">
                            <h6 className="mx-md-2 my-0">Tổng tiền bảo hiểm: {huiPoints?.totalDocs}</h6>
                        </div>
                    </div>
                    }
                </div>
                }
            </div>
        </div>
    )
}

export default HuiPoint;