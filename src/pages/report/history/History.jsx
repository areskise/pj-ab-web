import './history.css';
import img from '../../../images/Image';
import { useEffect, useState } from 'react';
import { selectorEmployees } from '../../../redux/slice/employeeSlice';
import { useSelector } from 'react-redux';
import { selectorSelectedCompany } from '../../../redux/slice/companySlice';
import ReportAPI from '../../../API/ReportAPI';
import HuiAPI from '../../../API/HuiAPI';
import { format } from 'date-fns';
import mapCusOne from '../../../helpers/mapCusOne';

const History = () => {
    const [loading, setLoading] = useState(false);
    const [selectHui, setSelectHui] = useState(null);
    const [selectCus, setSelectCus] = useState(null);
    const [huis, setHuis] = useState([]);
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [iconStatus, setIcontStatus] = useState("p-1 fa-solid fa-arrow-right-arrow-left");
    const employees = useSelector(selectorEmployees)
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
        setSelectCus(null)
    }, [selectHui]);

    useEffect(() => {
        const data = {
            limit: 9999,
            page: 1,
            huiId: selectHui?._id,
            cusId: selectCus?._id,
        }
        
        if (selectHui || selectCus) {
            const fetchReport = async () => {
                try {
                    setLoading(true);
                    const res = await ReportAPI.history(data);
                    const result = res.ResponseResult.Result;
                    setReports(result)
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error(error);
                }
            }
            fetchReport();
        }
    }, [selectHui, selectCus]);

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
        <div>
            <div className='row m-0'>
                <div className="col-md-6 col-12 p-2 px-3 select-company-container"> 
                    <div className='label'>
                        <label htmlFor="">Dây hụi:</label>
                    </div>
                    <div className="d-flex w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                        <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='selected-company p-2'>{selectHui?.name?selectHui?.name:'Chọn dây hụi'}</span>
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
                <div className="col-md-6 col-12 p-2 px-3 select-company-container"> 
                    <div className='label'>
                        <label htmlFor="">Hụi viên:</label>
                    </div>
                    {selectHui ?
                    <div className="d-flex w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                        <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='selected-company p-2'>{selectCus?.name?selectCus?.name:'Chọn hụi viên'}</span>
                        </a>
                        <ul className="p-0 my-1 dropdown-menu text-small select-dropdown">
                            {mapCusOne(selectHui?.customers)?.map((huiSlice, i) => (
                                <li key={i}>
                                    <button 
                                        className='p-2 px-3 btn dropdown-item'
                                        type='button'
                                        style={selectCus?._id===huiSlice._id?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                        onClick={() => setSelectCus(huiSlice)}
                                    >
                                        {huiSlice.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                        <select 
                            className='form-select select-company form-staff' name="role" 
                            disabled
                        >
                            <option value='' hidden>{'Chọn hụi viên'}</option>
                        </select>
                    }

                </div>
            </div>
            {!selectHui || !selectCus ? 
                <div className="loading-container">
                    <div>
                        <img src={img.insurance} alt='logo' width="200" height="170" className='empty-img'/>
                        <p>Vui lòng chọn dây hụi</p>
                    </div>
                </div>
            :
            <div className="report-container history-container">
                <div className='d-flex justify-content-center'>
                    <div className='d-flex p-2 align-items-center'>
                        <div className='legend-hui m-1 hui-die'></div>
                        <div>Hụi chết</div>
                    </div>
                    <div className='d-flex p-2 align-items-center'>
                        <div className='legend-hui m-1 hui-live'></div>
                        <div>Hụi sống</div>
                    </div>
                    <div className='d-flex p-2 align-items-center'>
                        <div className='legend-hui m-1 hui-get'></div>
                        <div>Hốt hụi</div>
                    </div>
                    <div className='d-flex p-2 align-items-center'>
                        <div className='legend-hui m-1 hui-close'></div>
                        <div>Bỏ đóng hụi</div>
                    </div>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Ngày thực hiện</th>
                        <th scope="col">Hụi viên</th>
                        <th scope="col">Số chân</th>
                        <th scope="col">Tiền hụi</th>
                        <th scope="col">Người thực hiện</th>
                    </tr>
                    </thead>
                    <tbody>
                        {reports.docs?.map((report, i) => (
                            <tr key={i} className={`tr-${report.type}`}>
                                <td data-label="Ngày thực hiện:">{format(report.createdAt?new Date(report.createdAt):new Date(), 'dd/MM/yyyy - hh:mm')}</td>
                                <td scope="row" data-label="Hụi viên:">
                                    {report.cusName}
                                </td>
                                <td data-label="Số chân:">{report.cusNum}</td>
                                <td data-label="Tiền hụi:">{report.money}</td>
                                <td data-label="Người thực hiện:">{report.createdBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-2 mb-4 d-flex justify-content-between">
                    <h6 className="mx-md-2 my-0">Tìm thấy: {reports?.totalDocs?reports?.totalDocs:0} kết quả</h6>
                </div>
            </div>
            }
        </div>
    )
}

export default History;