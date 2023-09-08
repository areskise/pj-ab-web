import "./detailHuiPoint.css";
import { useState, useEffect, memo } from 'react';
import { format } from 'date-fns';
import { InputNumber } from 'antd';

const DetailHuiPoint = ({selectedHui, selectCompany}) => {
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
        if(selectedHui) {
            const fetchHui = async () => {
                setTypeKhui(selectedHui?.type?.type?.toString())
                setStartDate(new Date(selectedHui.startDate))
                setEndDate(new Date(selectedHui.endDate))
                setInputStaffs(selectedHui?.staffInsures)
            }
            fetchHui()
        }
    },[selectedHui]);

    return (
    <div className='detail-hui-point form-container'>
        <div className="row">
                <div className='d-flex col-lg-4 col-md-6 px-md-4 my-3 align-items-center justify-content-between'>
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
                <div className='d-flex col-lg-4 col-md-6 px-md-4 my-3 align-items-center justify-content-between'>
                    <div className='label'>
                        <label htmlFor="">Dây</label>
                    </div>
                    <div className="d-flex align-items-center select-dropdown">
                        <InputNumber
                            value={selectedHui.money}
                            className='form-control mr-2 form-number'
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            disabled
                        />
                        VND
                    </div>
                </div>
                <div className='d-flex col-lg-4 col-md-6 px-md-4 my-3 align-items-center justify-content-between'>
                    <div className='label'>
                        <label htmlFor="">Số phần</label>
                    </div>
                    <input 
                        className='form-control' 
                        value={selectedHui.partNum}
                        disabled
                    />
                </div>
                <div className='d-flex col-lg-4 col-md-6 px-md-4 my-3 align-items-center text-align-center justify-content-between'>
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
                <div className='d-flex col-lg-4 col-md-6 px-md-4 my-3 align-items-center text-align-center justify-content-between'>
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
                <div className='d-flex col-lg-4 col-md-6 px-md-4 my-3 align-items-center justify-content-between'>
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
                <div className='d-flex col-lg-4 col-md-6 px-md-4 my-3 align-items-center text-align-center justify-content-between' style={{height: '38px'}}>
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
    )
}

export default memo(DetailHuiPoint);