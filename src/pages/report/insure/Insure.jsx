import './insure.css';
import img from '../../../images/Image';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { selectorEmployees } from '../../../redux/slice/employeeSlice';
import { useSelector } from 'react-redux';
import { selectorSelectedCompany } from '../../../redux/slice/companySlice';
import HuiAPI from '../../../API/HuiAPI';
import currencyFormatter from 'currency-formatter';
import { format } from 'date-fns';
import { options } from '../../../helpers/optionsChart';

const Insure = () => {
    const [loading, setLoading] = useState(false);
    const [selectHui, setSelectHui] = useState(null);
    const [huis, setHuis] = useState([]);
    const [reports, setReports] = useState([]);
    const [frappe, setFrappe] = useState({
        series: [],
        options: {
            labels: [],
            legend: {
                position: 'bottom',
            },
        }
    });
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
                setSelectHui(null)
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
        if (selectHui) {
            const fetchReport = async () => {
                try {
                    setLoading(true);
                    const res = await HuiAPI.getReport(selectHui?._id);
                    const result = res.ResponseResult.Result;
                    setReports(result)
                } catch (error) {
                    setLoading(false);
                    console.error(error);
                }
            }
        fetchReport();
        }
    }, [selectHui]);

    useEffect(() => {
        if (reports) {
            setFrappe({
                series: options(reports).map(r=>r.money),
                options: {
                    labels: options(reports).map(r=>`${r.name}: ${currencyFormatter.format(r.money, {
                        symbol: 'VND',
                        decimal: '*',
                        thousand: '.',
                        precision: 0,
                        format: '%v %s' // %s is the symbol and %v is the value
                    })} (${r.insureStaff}%)`),
                    legend: {
                        position: 'bottom',
                        fontSize: 15
                    },
                    colors: ['#F39F8D', '#B9DBAA', '#7D95E8', '#D5DEFF', '#FFE2FC', ...options(reports).map(()=>{
                        const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
                        const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
                        const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
                        return `#${r}${g}${b}`;
                    })],
                }
            });
            setLoading(false);
        }
    }, [reports]);

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
            <div className="p-2 px-3 select-company-container"> 
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
            {!selectHui ? 
                <div className="loading-container">
                    <div>
                        <img src={img.insurance} alt='logo' width="200" height="170" className='empty-img'/>
                        <p>Vui lòng chọn dây hụi</p>
                    </div>
                </div>
            :
            <div className="row report-container insure-container">
                <div className="col-md-4">
                    <ReactApexChart options={frappe.options} series={frappe.series} type="pie" height={400}/>
                </div>
                <div className="col-md-8">
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
                            {reports.map((report, i) => (
                                <tr key={i}>
                                    <td scope="row" data-label="Tên nhân viên:">
                                        {report.name}
                                    </td>
                                    <td data-label="Ngày mở:">{format(report.openDate?new Date(report.openDate):new Date(), 'dd/MM/yyyy')}</td>
                                    <td data-label="Số tiền nhận:">{currencyFormatter.format(report.money, {
                                    symbol: 'VND',
                                    decimal: '*',
                                    thousand: '.',
                                    precision: 0,
                                    format: '%v %s' // %s is the symbol and %v is the value
                                    })}</td>
                                    <td data-label="% nhận:">{report.insureStaff} %</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-2 mb-4 d-flex justify-content-between">
                        <h6 className="mx-md-2 my-0">Tìm thấy: {reports?reports?.length:0} kết quả</h6>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Insure;