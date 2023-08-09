import "./detailHuiPoint.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import CompanyAPI from "../../../API/CompanyAPI";
import CustomerAPI from "../../../API/CustomerAPI";
import HuiAPI from "../../../API/HuiAPI";

const DetailHui = ({setShowDetail, showDetail}) => {
    const [selectCompany, setSelectCompany] = useState(null);
    const [selectCustomer, setSelectCustomer] = useState([]);
    const [selectedHui, setSelectedHui] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [typeKhui, setTypeKhui] = useState('1');
    const [inputStaffs, setInputStaffs] = useState([
        {
            userId: '',
            name: '',
            insureNum: '',
        },
    ]);

    useEffect(() => {
        const fetchHui = async () => {
            if(showDetail) {
                const resHui = await HuiAPI.get(showDetail._id);
                const resultHui = resHui.ResponseResult.Result;
                setSelectedHui(resultHui)
                setTypeKhui(resultHui.type.type.toString())
                setStartDate(new Date(resultHui.startDate))
                setEndDate(new Date(resultHui.endDate))
                setInputStaffs(resultHui.staffInsures)
                setSelectCustomer(resultHui.customers)
                const resCompany = await CompanyAPI.getById(showDetail.organizationId);
                const resultCompany = resCompany.ResponseResult.Result;
                setSelectCompany(resultCompany);
            }
        }
        fetchHui()
    },[showDetail]);

    const handleClose = (e) => {
        e.preventDefault();
        setShowDetail(false)
        setSelectCompany(null)
        setSelectCustomer([])
        setSelectedHui([])
        setStartDate(new Date());
        setEndDate(new Date());
        setInputStaffs([{
            userId: '',
            name: '',
            insureNum: '',
        },])
    }

    const onHide = () => {
        setShowDetail(false)
        setSelectCompany(null)
        setSelectCustomer([])
        setSelectedHui([])
        setStartDate(new Date());
        setEndDate(new Date());
        setInputStaffs([{
            userId: '',
            name: '',
            insureNum: '',
        },])
    }

    return (
    <div className='detail-hui-point form-container'>
        <div>
            <div className="row">
                <div className='d-flex col-md-4 px-md-4 my-3 align-items-center justify-content-between'>
                    <div className='label'>
                        <label htmlFor="">
                            Công ty
                        </label>
                    </div>
                    <div className="d-flex dropdown select-dropdown text-end">
                        <input 
                        className='form-control'
                        value={selectCompany?.name}
                        disabled
                    />
                    </div>
                </div>
                <div className='d-flex col-md-4 px-md-4 my-3 align-items-center justify-content-between'>
                    <div className='label'>
                        <label htmlFor="">Dây</label>
                    </div>
                    <div className="d-flex align-items-center select-dropdown">
                        <input 
                            className='form-control mr-2 form-money' 
                            value={selectedHui.money}
                            disabled
                        />
                        VND
                    </div>
                </div>
                <div className='d-flex col-md-4 px-md-4 my-3 align-items-center justify-content-between'>
                    <div className='label'>
                        <label htmlFor="">Số phần</label>
                    </div>
                    <input 
                        className='form-control' 
                        value={selectedHui.partNum}
                        disabled
                    />
                </div>
            </div>
            <div className="row">
                <div className='d-flex col-md-4 px-md-4 my-3 align-items-center text-align-center justify-content-between'>
                    <div className='label'>
                        <label htmlFor="">Ngày mở</label>
                    </div>
                    <input 
                        type="date" 
                        className='form-control' 
                        value={format(new Date(startDate), 'yyyy-MM-dd')}
                        disabled
                    />
                </div>
                <div className='d-flex col-md-4 px-md-4 my-3 align-items-center text-align-center justify-content-between'>
                    <div className='label'>
                        <label htmlFor="">Ngày kết thúc</label>
                    </div>
                    <input 
                        type="date" 
                        className='form-control' 
                        value={format(new Date(endDate), 'yyyy-MM-dd')}
                        disabled
                    />
                </div>
                <div className='d-flex col-md-4 px-md-4 my-3 align-items-center justify-content-between'>
                <div className='label'>
                    <label htmlFor="">
                        Khui
                    </label>
                </div>
                <div className="d-flex select-dropdown">
                    <div className="d-flex mr-2 select-dropdown dropdown text-end form-khui">
                    {typeKhui==='1' &&
                        <input 
                            className='form-control form-khui'
                            value={'Tháng'}
                            disabled
                        />
                    }
                    {typeKhui==='2' &&
                        <input 
                        className='form-control form-khui'
                        value={'Tuần'}
                        disabled
                    />
                    }
                    {typeKhui==='3' &&
                        <input 
                        className='form-control form-khui'
                        value={'Ngày'}
                        disabled
                    />
                    }
                    </div>
                    <input 
                        className='form-control form-khui'
                        value={selectedHui.type?.num}
                        disabled
                    />
                </div>
            </div>
            </div>
            <div className="row">
                <div className='d-flex col-md-4 px-md-4 my-3 align-items-center text-align-center justify-content-between' style={{height: '38px'}}>
                    <div className='label'>
                        <label htmlFor="">Bảo hiểm</label>
                    </div>
                    <div className="d-flex align-items-center select-dropdown">
                        <input 
                            className='form-control mr-2 form-sure' 
                            value={selectedHui.insureNum}
                            disabled
                        />
                        %
                    </div>
                </div>
                <div className='d-flex col-md-8 px-md-4 my-2'>
                    <div className='label d-flex align-items-center my-2' style={{height: '38px'}}>
                        <label htmlFor="">Nhân viên</label>
                    </div>
                    <div className="d-block w-100">
                        {inputStaffs?.map((inputStaff, iInput) => (
                                <div className="d-flex w-100 align-items-center my-2">
                                    <input 
                                        className='form-control mr-2 form-staff' 
                                        value={inputStaff.name}
                                        disabled
                                    />
                                    <input 
                                        className='form-control mr-2 form-staff' 
                                        value={inputStaff.insureNum}
                                        disabled
                                    />
                                    %
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default DetailHui;