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
import DetailHuiPoint from './detailHuiPoint/DetailHuiPoint';
import CompanyAPI from '../../API/CompanyAPI';
import partKhui from '../../helpers/partKhui';
import periodics from '../../helpers/periodics';
import alertify from 'alertifyjs';
import { InputNumber } from 'antd';
import SendGroup from './sendGroup/SendGroup';

const HuiPoint = () => {
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [showSend, setShowSend] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedHui, setSelectedHui] = useState({});
    const [huiPoints, setHuiPoints] = useState([]);
    const [huiPush, setHuiPush] = useState(null);
    const [pushed, setPushed] = useState(true);
    const [sumLive, setSumLive] = useState(0);
    const [sumDie, setSumDie] = useState(0);
    const [sumGet, setSumGet] = useState(0);
    const [sumInsure, setSumInsure] = useState(0);
    const [periodicHuis, setPeriodicHuis] = useState([]);
    const [periodicHui, setPeriodicHui] = useState({});
    const [selectCompany, setSelectCompany] = useState({});
    const [page, setPage] = useState(1);
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
                const resHui = await HuiAPI.get(id);
                const resultHui = resHui.ResponseResult.Result;
                const periodicNow = countKhui(resultHui.type.num, resultHui.type.type, resultHui.startDate, resultHui.endDate)
                const date = partKhui(resultHui.type.num, resultHui.type.type, resultHui.startDate, resultHui.endDate)
                const resCompany = await CompanyAPI.getById(resultHui.organizationId);
                const resultCompany = resCompany.ResponseResult.Result;
                setPeriodicHuis(periodics(date))
                setPeriodicHui({
                    periodic: periodicNow,
                    date: date[periodicNow-1]?new Date(date[periodicNow-1]):new Date()
                })
                setSelectCompany(resultCompany);
                setSelectedHui(resultHui)
                setHuiPush(null)
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        fetchData();
    }, [id]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (loading!==true) {
                    setLoading(true);
                }
                const resHui = await HuiAPI.get(id);
                const resultHui = resHui.ResponseResult.Result;
                const periodicNow = countKhui(resultHui.type.num, resultHui.type.type, resultHui.startDate, resultHui.endDate)
                const data = {
                    huiId: id,
                    periodicHui: periodicHui?.periodic?periodicHui?.periodic:periodicNow,
                }
                const resHuiPoint = await HuiPointAPI.getChains(data);
                const resultHuiPoint = resHuiPoint.ResponseResult.Result;
                setSumLive(0);
                setSumDie(0);
                setSumGet(0);
                setSumInsure(0);
                if(resultHuiPoint[0]) {
                    const liveHuis = resultHuiPoint?.map(huiPoint => huiPoint.liveHui)
                    const dieHuis = resultHuiPoint?.map(huiPoint => huiPoint.dieHui)
                    const getHuis = resultHuiPoint?.map(huiPoint => huiPoint.getHui)
                    const liveSum = liveHuis.reduce((a, b) => a + b)
                    const dieSum = dieHuis.reduce((a, b) => a + b)
                    const getSum = getHuis.reduce((a, b) => a + b)
                    setSumLive(liveSum);
                    setSumDie(dieSum);
                    setSumGet(getSum);
                    setSumInsure((selectedHui?.insureNum/100)*(selectedHui?.money));
                }
                setHuiPoints(resultHuiPoint);
                setHuiPush(null)
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        fetchData();
    }, [id, periodicHui, reload]);

    const push = async (huiPoint, i) => {
        try {
            if(huiPush) {
                setLoading(true);  
                const data = {
                    huiId: huiPoint.huiId,
                    _id: huiPoint._id,
                    cusId: huiPoint.cusId,
                    huiCusId: huiPoint.huiCusId,
                    periodicHui: huiPoint.periodicHui,
                    pushHui: huiPush.value
                }
                await HuiPointAPI.push(data);
                setPushed(false)
                setReload(!reload);
                
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    const unPush = async (_id) => {
        try {
            setLoading(true);  
            const data = {_id}
            await HuiPointAPI.unPush(data);
            setPushed(true)
            setReload(!reload);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    const notify = async (_id) => {
        try {
            const data = {_id}
            const res = await HuiPointAPI.notify(data);
            if(res.ResponseResult.Result.error_code === 0){
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Nhắc hụi thành công!');
            } else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error('Đã gặp sự cố! Nhắc hụi không thành công!');
            }
        } catch (error) {
            console.error(error);
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('Đã gặp sự cố! Nhắc hụi không thành công!');
        }
    }

    const checkHuiPoint = async (e, huiPoint) => {
        try {
            setLoading(true);
            const checked = e.target.checked
            if (checked) {
                await HuiPointAPI.confirm({_id: huiPoint._id});
            } else {
                await HuiPointAPI.unConfirm({_id: huiPoint._id});
            }
            setReload(!reload);
        } catch (error) {
            setLoading(false);
            console.error(error);
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
            <SendGroup showSend={showSend} setShowSend={setShowSend} periodicHui={periodicHui} huiPoints={huiPoints} selectedHui={selectedHui}/>
            <div className="main-container bg-light">
                <h5 className="m-4">
                    Quản lý hụi 
                    <i className="mx-2 fa-solid fa-angles-right" style={{fontSize: '18px'}}></i> 
                    Quản lý hụi
                    <i className="mx-2 fa-solid fa-angles-right" style={{fontSize: '18px'}}></i> 
                    Chi tiết hụi
                </h5>
                {loading ?
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
                        {/* <i className="fa-solid fa-circle-plus plus" onClick={() => setShowAdd(true)}></i> */}
                    </div>
                    {showDetail &&
                    <div className="hui-point-container py-0">
                        <DetailHuiPoint selectedHui={selectedHui} selectCompany={selectCompany}/> 
                    </div>                 
                    }
                    <div className="select-company-container mb-4">
                        <div className="d-flex align-items-center link-dark text-decoration-none p-1" onClick={()=>setShowDetail(!showDetail)}>
                            Thông tin hụi
                            <i className={showDetail?"fa-solid fa-angle-up ml-2 mt-1":"fa-solid fa-angle-down ml-2 mt-1"}></i>
                        </div>
                        
                    </div>
                    <div className="select-company-container mb-4">
                        <div className="d-flex w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='selected-company p-2'>Kỳ {periodicHui?.periodic} - {format(periodicHui?.date?new Date(periodicHui?.date):new Date(), 'dd/MM/yyyy')}</span>
                            </a>
                            <ul className="p-0 my-1 dropdown-menu text-small selected-dropdown">
                                {periodicHuis?.map((peri, i) => (
                                    <li key={i}>
                                        <button 
                                            className='p-2 px-3 btn dropdown-item'
                                            type='button'
                                            style={peri?.periodic===periodicHui.periodic?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                            onClick={() => setPeriodicHui({
                                                periodic: peri?.periodic,
                                                date: peri?.date,
                                            })}
                                        >
                                            Kỳ {peri?.periodic?peri?.periodic:1} - {format(peri.date?new Date(peri.date):new Date(), 'dd/MM/yyyy')}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="select-company-container">
                        <div className='func-icon'>
                            <button className='btn btn-continue mx-3' disabled={!sumGet}>Đóng tất cả</button>
                            <button 
                                className='btn btn-continue mx-3' 
                                onClick={()=>setShowSend(true)}
                                disabled={!sumGet}
                            >Gửi group nhắc hụi</button>
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
                                <th scope="col"><input className='form-checkbox' type="checkbox" /></th>
                                <th scope="col">Tên hụi viên</th>
                                <th scope="col">
                                    <div className='d-flex align-items-end'>
                                        Ngày đóng
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
                                {huiPoints?.map((huiPoint, i) => (
                                    <tr key={i}>
                                        <td scope="row" data-label="">
                                        <input 
                                            className='form-checkbox' 
                                            type="checkbox" 
                                            onChange={(e)=>checkHuiPoint(e, huiPoint)}
                                            defaultChecked={huiPoint?.statusConfirm}
                                        />
                                        </td>
                                        <td scope="row" data-label="Tên hụi viên:">
                                            {huiPoint.cusName}
                                        </td>
                                        <td data-label="Ngày đóng:">{format(new Date(huiPoint.paymentDate), 'dd/MM/yyyy')}</td>
                                        <td data-label="Số chân:">{huiPoint.cusNum}</td>
                                        <td data-label="Bỏ hụi:">
                                            <InputNumber
                                                defaultValue={huiPoint.pushHui?huiPoint.pushHui:null}
                                                name={`pushHui${i}`} 
                                                id={`pushHui${i}`} 
                                                className='form-control form-confirm form-number'
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                                onChange={(value)=>setHuiPush({
                                                    value: value, 
                                                    huiPoint, 
                                                    i
                                                })}
                                            />
                                        </td>
                                        <td data-label="Hụi sống:">{huiPoint.liveHui===0?'-':currencyFormatter.format(huiPoint.liveHui, {
                                                decimal: '*',
                                                thousand: ',',
                                                precision: 0,
                                                format: '%v %s' // %s is the symbol and %v is the value
                                                })}</td>
                                        <td data-label="Hụi chết:">{huiPoint.dieHui===0?'-':currencyFormatter.format(huiPoint.dieHui, {
                                        decimal: '*',
                                        thousand: ',',
                                        precision: 0,
                                        format: '%v %s' // %s is the symbol and %v is the value
                                        })}</td>
                                        <td data-label="Hốt hụi:">{huiPoint.getHui===0?'-':currencyFormatter.format(huiPoint.getHui, {
                                        decimal: '*',
                                        thousand: ',',
                                        precision: 0,
                                        format: '%v %s' // %s is the symbol and %v is the value
                                        })}</td>
                                        <td data-label="Chức năng:" className="hui-point-center">
                                            <div className='func-icon'>
                                                {huiPoint.status===0 && 
                                                    <button 
                                                        className={'btn btn-continue'}
                                                        onClick={()=>push(huiPoint, i)}
                                                        disabled={huiPush?.i===i && (huiPush?.value || huiPush?.value===0) ? false : true || huiPoint.statusConfirm}
                                                    >Chốt hụi</button>
                                                }
                                                {huiPoint.status===2 &&
                                                <button 
                                                    className={'btn btn-confirm'}
                                                    onClick={()=>unPush(huiPoint._id)}
                                                    disabled={huiPoint.statusConfirm}
                                                >Bỏ chốt</button>}
                                                {huiPoint.status===1 &&
                                                <button 
                                                    className={'btn btn-cancle'}
                                                    onClick={()=>notify(huiPoint._id)}
                                                    disabled={huiPoint.statusConfirm}
                                                >Nhắc hụi</button>}
                                                {huiPoint.status===3 && <>
                                                    {!sumGet?
                                                        <button 
                                                            className={'btn btn-continue'}
                                                            onClick={()=>push(huiPoint, i)}
                                                            disabled
                                                        >Chốt hụi</button>
                                                        :
                                                        <button 
                                                        className={'btn btn-cancle'}
                                                        onClick={()=>notify(huiPoint._id)}
                                                        disabled={huiPoint.statusConfirm}
                                                        >Nhắc hụi</button>
                                                    }
                                                </>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="5"><h6 className="mx-md-2 my-0">Tổng tiền: {huiPoints?.totalDocs}</h6></td>
                                    <td data-label="Hụi sống:"><div className='total'>
                                        {sumLive===0?'-':currencyFormatter.format(sumLive, {
                                        decimal: '*',
                                        thousand: ',',
                                        precision: 0,
                                        format: '%v %s' // %s is the symbol and %v is the value
                                    })}</div></td>
                                    <td data-label="Hụi chết:"><div className='total'>
                                        {sumDie===0?'-':currencyFormatter.format(sumDie, {
                                        decimal: '*',
                                        thousand: ',',
                                        precision: 0,
                                        format: '%v %s' // %s is the symbol and %v is the value
                                    })}</div></td>
                                    <td data-label="Hốt hụi:"><div className='total'>
                                        {sumGet===0?'-':currencyFormatter.format(sumGet, {
                                        decimal: '*',
                                        thousand: ',',
                                        precision: 0,
                                        format: '%v %s' // %s is the symbol and %v is the value
                                    })}</div></td>
                                </tr>
                                <tr>
                                    <td colSpan="6"><h6 className="mx-md-2 my-0">Tổng tiền bảo hiểm: {huiPoints?.totalDocs}</h6></td>
                                    <td data-label="Bảo hiểm:"><div className='total'>
                                        {sumInsure===0?'-':currencyFormatter.format(sumInsure, {
                                        decimal: '*',
                                        thousand: ',',
                                        precision: 0,
                                        format: '%v %s' // %s is the symbol and %v is the value
                                    })}</div></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    }
                </div>
                }
            </div>
        </div>
    )
}

export default HuiPoint;