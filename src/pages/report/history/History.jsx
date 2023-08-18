import './history.css';
import img from '../../../images/Image';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import { Chart } from "react-google-charts";
import { useEffect, useState } from 'react';
import { employeeActions, selectorEmployees } from '../../../redux/slice/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUserCompanies, selectorSelectedCompany } from '../../../redux/slice/companySlice';
import ReportAPI from '../../../API/ReportAPI';
import HuiAPI from '../../../API/HuiAPI';
import { format } from 'date-fns';
// ChartJS.register(ArcElement, Tooltip, Legend);

const History = () => {
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updatePass, setUpdatePass] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectReport, setSelectReport] = useState(null);
    const [selectHui, setSelectHui] = useState(null);
    const [selectCus, setSelectCus] = useState(null);
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

    // const data = {
    //     labels: ['Red p-1 fa-solid fa-arrow-right-arrow-left', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [
    //       {
    //         label: '# of Votes',
    //         data: [18300, 18300, 27450, 850950],
    //         backgroundColor: [
    //             'rgba(243, 159, 141, 1)',
    //             'rgba(185, 219, 170, 1)',
    //             'rgba(125, 149, 232, 1)',
    //             'rgba(225 225 225, 1)',
    //         ],
    //         borderColor: [
    //             'rgba(243, 159, 141, 1)',
    //             'rgba(185, 219, 170, 1)',
    //             'rgba(125, 149, 232, 1)',
    //             'rgba(225, 225, 225, 1)',
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    //   };
    const data = [
        ["Task", "Money per Staff"],
        ["Tèo", 18300],
        ["Dương", 18300],
        ["Hải Lâm", 27450],
        ["Công ty", 850950],
      ];

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
        if (selectHui && selectCus) {
            const fetchReport = async () => {
                try {
                    setLoading(true);
                    const res = await ReportAPI.history(data);
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
                            {selectHui?.customers?.map((huiSlice, i) => (
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
            <div className="report-container">
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
                            <tr key={i}>
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