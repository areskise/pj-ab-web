import "./company.css"; 
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect, useState } from 'react';
import AddCompany from "./addCompany/AddCompany";
import UpdateCompany from "./updateCompany/UpdateCompany";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import currencyFormatter from 'currency-formatter';
import Cookies from 'universal-cookie';
import { companyActions, selectorCompanies } from "../../redux/slice/companySlice";
import { applicationActions } from "../../redux/slice/applicationSlice";
import CompanyAPI from "../../API/CompanyAPI";

const Company = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [page, setPage] = useState(1);
    const [sortMoney, setSortMoney] = useState('');
    const [sortDate, setSortDate] = useState('');
    const [sortStatus, setSortStatus] = useState('');
    const [iconMoney, setIcontMoney] = useState("p-1 fa-solid fa-arrow-right-arrow-left");
    const [iconDate, setIcontDate] = useState("p-1 fa-solid fa-arrow-right-arrow-left");
    const [iconStatus, setIcontStatus] = useState("p-1 fa-solid fa-arrow-right-arrow-left");
    const limit = 5;
    const companies = useSelector(selectorCompanies)

	const cookies = new Cookies();
    const access_token = cookies.get('access_token');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(access_token) {
            const data = {
                limit: limit,
                page: page,
                money: sortMoney,
                startDate: sortDate,
                status: sortStatus,
            }
            const fetchCompany = async () => {
                const res = await CompanyAPI.getList(data)
                const result = res.ResponseResult.Result
                dispatch(companyActions.setCompanies(result))
                dispatch(applicationActions.setApplications())
            }
            fetchCompany();
        } else {
            navigate('/');
        }
    }, [page, showAdd, showUpdate, sortMoney, sortDate, sortStatus]);

    const sortByMoney = () => {
        if(sortMoney === '') {
            setSortMoney(1)
            setIcontMoney('p-1 fa-solid fa-arrow-up-short-wide')
        } else if(sortMoney === 1) {
            setSortMoney(-1)
            setIcontMoney('p-1 fa-solid fa-arrow-down-wide-short')
        } else {
            setSortMoney('')
            setIcontMoney('p-1 fa-solid fa-arrow-right-arrow-left')
        }
    }

    const sortByDate = () => {
        if(sortDate === '') {
            setSortDate(1)
            setIcontDate('p-1 fa-solid fa-arrow-up-short-wide')
        } else if(sortDate === 1) {
            setSortDate(-1)
            setIcontDate('p-1 fa-solid fa-arrow-down-wide-short')
        } else {
            setSortDate('')
            setIcontDate('p-1 fa-solid fa-arrow-right-arrow-left')
        }
    }

    const sortByStatus = () => {
        if(sortStatus === '') {
            setSortStatus(1)
            setIcontStatus('p-1 status-icon company-disable fa-solid fa-circle')
        } else if(sortStatus === 1) {
            setSortStatus(-1)
            setIcontStatus('p-1 status-icon company-active fa-solid fa-circle')
        } else {
            setSortStatus('')
            setIcontStatus('p-1 fa-solid fa-arrow-right-arrow-left')
        }
    }

    const nextPage = () => {
        if(companies.hasNextPage) {
            setPage(companies.nextPage)
        } else {
            setPage(1)
        }
    }
    
    const prevPage = () => {
        if(companies.hasPrevPage) {
            setPage(companies.prevPage)
        } else {
            setPage(companies.totalPages)
        }
    }

    return(
        <div className="company body-container bg-light">
            <Header showAdd={showAdd} showUpdate={showUpdate}/>
            <SideBar/>
            <AddCompany showAdd={showAdd} setShowAdd={setShowAdd} />
            <UpdateCompany showUpdate={showUpdate} setShowUpdate={setShowUpdate}/>
            <div className="main-container bg-light">
                <h5 className="m-4">Quản lý công ty</h5>
                <div className="bg-white content">
                    <div className="d-flex p-4 align-items-center justify-content-center"> 
                        <h3 className="title">DANH SÁCH CÔNG TY</h3>
                        <i className="fa-solid fa-circle-plus plus" onClick={() => setShowAdd(true)}></i>
                    </div>
                    <div className="sort-container"> 
                        <div className='px-2'>
                            <label htmlFor="">Sắp xếp:</label>
                        </div>
                        <div className='btn-sort-container'>
                            <button className='btn btn-sort'>
                                Vốn
                                <i 
                                    className={iconMoney} 
                                    onClick={sortByMoney}
                                ></i>
                            </button>
                            <button className='btn btn-sort'>
                                Ngày hoạt động
                                <i 
                                    className={iconDate}
                                    onClick={sortByDate}
                                ></i>
                            </button>
                            <button className='btn btn-sort'>
                                Trạng thái
                                <i 
                                    className={iconStatus}
                                    onClick={sortByStatus}
                                ></i>
                            </button>
                        </div>
                    </div>
                    <div className="company-container">
                        <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Mã CT</th>
                            <th scope="col">Tên công ty</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">
                                <div className='d-flex align-items-end'> 
                                    Số vốn 
                                    <i 
                                        className={iconMoney}
                                        onClick={sortByMoney}
                                    ></i>
                                </div>
                            </th>
                            <th scope="col">
                                <div className='d-flex align-items-end'>
                                    Ngày hoạt động 
                                    <i 
                                        className={iconDate}
                                        onClick={sortByDate}
                                    ></i>
                                </div>
                            </th>
                            <th scope="col">
                                <div className='d-flex align-items-end'>
                                    Trạng thái 
                                    <i 
                                        className={iconStatus}
                                        onClick={sortByStatus}
                                    ></i>
                                </div>
                            </th>
                            <th scope="col" className="company-center">Chức năng</th>
                        </tr>
                        </thead>
                        <tbody>
                            {companies.docs?.map((company, i) => (
                                <tr key={i}>
                                    <td scope="row" data-label="Mã CT:">{company.title}</td>
                                    <td data-label="Tên công ty:" className="company-word">{company.name}</td>
                                    <td data-label="Số điện thoại:">{company.phone}</td>
                                    <td data-label="Số vốn:">
                                        {currencyFormatter.format(company.money, {
                                        symbol: 'VND',
                                        decimal: '*',
                                        thousand: '.',
                                        precision: 0,
                                        format: '%v %s' // %s is the symbol and %v is the value
                                        })}
                                    </td>
                                    <td data-label="Ngày hoạt động:">{format(new Date(company.startDate), 'dd/MM/yyyy')}</td>
                                    <td data-label="Trạng thái:">
                                        {company.status?
                                            <div className="company-active">Hoạt động</div>
                                        :
                                            <div className="company-disable">Không hoạt động</div>
                                        }
                                    </td>
                                    <td data-label="Chức năng:" className="company-center">
                                        <i 
                                            className="fa-solid fa-pen-to-square p-1"  
                                            style={{color: '#6280EB'}}
                                            onClick={() => {
                                                setShowUpdate(company)
                                            }}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                        <div className="p-2 mb-4 d-flex justify-content-between">
                            <h6 className="mx-md-2 my-0">Tìm thấy: {companies.totalDocs?companies.totalDocs:0} công ty</h6>
                            <div className="d-flex align-items-center mx-md-4">
                                <i className="p-1 fa-solid fa-chevron-left" onClick={() => prevPage()}></i>
                                <div className="d-flex mx-md-4">
                                    <input className="input-page" value={companies.page} onChange={(e)=>setPage(e.target.value)}></input>
                                    <div>/ {companies.totalPages?companies.totalPages:1}</div>
                                </div>
                                <i className="p-1 fa-solid fa-chevron-right" onClick={() => nextPage()}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Company;