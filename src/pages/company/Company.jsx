import "./company.css"; 
import img from '../../images/Image';
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
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [page, setPage] = useState(1);
    const [sortItem, setSortItem] = useState('date');
    const [sortBy, setSortBy] = useState('');
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
                try {
                    setLoading(true);
                    const res = await CompanyAPI.getList(data);
                    const result = res.ResponseResult.Result;
                    dispatch(companyActions.setCompanies(result));
                    dispatch(applicationActions.setApplications());
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error(error);
                }
            }
            fetchCompany();
        } else {
            navigate('/');
        }
    }, [page, showAdd, showUpdate, sortMoney, sortDate, sortStatus, sortItem, sortBy]);

    const sortByMoney = () => {
        setSortItem('money')
        setSortDate('')
        setSortStatus('')
        setIcontStatus('p-1 fa-solid fa-arrow-right-arrow-left')
        setIcontDate('p-1 fa-solid fa-arrow-right-arrow-left')
        if(sortMoney === '') {
            setSortBy('1')
            setSortMoney('1')
            setIcontMoney('p-1 fa-solid fa-arrow-up-short-wide')
        } else if(sortMoney === '1') {
            setSortBy('-1')
            setSortMoney('-1')
            setIcontMoney('p-1 fa-solid fa-arrow-down-wide-short')
        } else {
            setSortBy('')
            setSortMoney('')
            setIcontMoney('p-1 fa-solid fa-arrow-right-arrow-left')
        }
    }

    const sortByDate = () => {
        setSortItem('date')
        setSortMoney('')
        setSortStatus('')
        setIcontStatus('p-1 fa-solid fa-arrow-right-arrow-left')
        setIcontMoney('p-1 fa-solid fa-arrow-right-arrow-left')
        if(sortDate === '') {
            setSortBy('1')
            setSortDate('1')
            setIcontDate('p-1 fa-solid fa-arrow-up-short-wide')
        } else if(sortDate === '1') {
            setSortBy('-1')
            setSortDate('-1')
            setIcontDate('p-1 fa-solid fa-arrow-down-wide-short')
        } else {
            setSortBy('')
            setSortDate('')
            setIcontDate('p-1 fa-solid fa-arrow-right-arrow-left')
        }
    }

    const sortByStatus = () => {
        setSortItem('status')
        setSortDate('')
        setSortMoney('')
        setIcontDate('p-1 fa-solid fa-arrow-right-arrow-left')
        setIcontMoney('p-1 fa-solid fa-arrow-right-arrow-left')
        if(sortStatus === '') {
            setSortBy('1')
            setSortStatus('1')
            setIcontStatus('p-1 status-icon company-disable fa-solid fa-circle')
        } else if(sortStatus === '1') {
            setSortBy('-1')
            setSortStatus('-1')
            setIcontStatus('p-1 status-icon company-active fa-solid fa-circle')
        } else {
            setSortBy('')
            setSortStatus('')
            setIcontStatus('p-1 fa-solid fa-arrow-right-arrow-left')
        }
    }

    const selectByMoney = (value) => {
        setSortDate('')
        setSortStatus('')
        setIcontStatus('p-1 fa-solid fa-arrow-right-arrow-left')
        setIcontDate('p-1 fa-solid fa-arrow-right-arrow-left')
        if(value === '') {
            setSortMoney('')
            setIcontMoney('p-1 fa-solid fa-arrow-right-arrow-left')
        } else if(value === '1') {
            setSortMoney('1')
            setIcontMoney('p-1 fa-solid fa-arrow-up-wide-short')
        } else {
            setSortMoney('-1')
            setIcontMoney('p-1 fa-solid fa-arrow-down-wide-short')
        }
    }

    const selectByDate = (value) => {
        setSortMoney('')
        setSortStatus('')
        setIcontStatus('p-1 fa-solid fa-arrow-right-arrow-left')
        setIcontMoney('p-1 fa-solid fa-arrow-right-arrow-left')
        if(value === '') {
            setSortDate('')
            setIcontDate('p-1 fa-solid fa-arrow-right-arrow-left')
        } else if(value === '1') {
            setSortDate('1')
            setIcontDate('p-1 fa-solid fa-arrow-up-short-wide')
        } else {
            setSortDate('-1')
            setIcontDate('p-1 fa-solid fa-arrow-down-wide-short')
        }
    }

    const selectByStatus = (value) => {
        setSortDate('')
        setSortMoney('')
        setIcontDate('p-1 fa-solid fa-arrow-right-arrow-left')
        setIcontMoney('p-1 fa-solid fa-arrow-right-arrow-left')
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

    const changeSortItem = (value) => {
        setSortItem(value)
        if (value === 'date') {
            selectByDate(sortBy)
        } else if (value === 'status') {
            selectByStatus(sortBy)
        } else {
            selectByMoney(sortBy)
        }
    }

    const changeSortBy = (value) => {
        setSortBy(value)
        if (sortItem === 'date') {
            selectByDate(value)
        } else if (sortItem === 'status') {
            selectByStatus(value)
        } else {
            selectByMoney(value)
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
                {loading && !companies.docs ?
                <div className="bg-white content">
                    <div className="d-flex p-4 align-items-center justify-content-center"> 
                        <h3 className="title">DANH SÁCH CÔNG TY</h3>
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
                        <h3 className="title">DANH SÁCH CÔNG TY</h3>
                        <i className="fa-solid fa-circle-plus plus" onClick={() => setShowAdd(true)}></i>
                    </div>
                    <div className="sort-container"> 
                        <div className='px-2'>
                            <label htmlFor="">Sắp xếp:</label>
                        </div>
                        <div className='btn-sort-container'>
                            <select className='btn-sort' onChange={(e)=>changeSortItem(e.target.value)}>
                                {sortItem==='date' && (<>
                                    <option value='date'>Ngày hoạt động</option>
                                    <option value='status'>Trạng thái</option>
                                    <option value='money'>Số vốn</option>
                                </>)}
                                {sortItem==='status' && (<>
                                    <option value='status'>Trạng thái</option>
                                    <option value='date'>Ngày hoạt động</option>
                                    <option value='money'>Số vốn</option>
                                </>)}
                                {sortItem==='money' && (<>
                                    <option value='money'>Số vốn</option>
                                    <option value='date'>Ngày hoạt động</option>
                                    <option value='status'>Trạng thái</option>
                                </>)}                                
                            </select>
                            <select className='btn-sort' onChange={(e)=>changeSortBy(e.target.value)}>
                                {sortItem==='date' && (<>
                                    {sortBy==='' && (<>
                                        <option value={''}>Mặc định</option>
                                        <option value={-1}>Mới -{">"} Cũ</option>
                                        <option value={1}>Cũ -{">"} Mới</option>
                                    </>)}
                                    {sortBy==='-1' && (<>
                                        <option value={-1}>Mới -{">"} Cũ</option>
                                        <option value={''}>Mặc định</option>
                                        <option value={1}>Cũ -{">"} Mới</option>
                                    </>)}
                                    {sortBy==='1' && (<>
                                        <option value={1}>Cũ -{">"} Mới</option>
                                        <option value={''}>Mặc định</option>
                                        <option value={-1}>Mới -{">"} Cũ</option>
                                    </>)}
                                </>)}
                                {sortItem==='status' && (<>
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
                                </>)}
                                {sortItem==='money' && (<>
                                    {sortBy==='' && (<>
                                        <option value={''}>Mặc định</option>
                                        <option value={1}>Thấp -{">"} Cao</option>
                                        <option value={-1}>Cao -{">"} Thấp</option>
                                    </>)}
                                    {sortBy==='1' && (<>
                                        <option value={1}>Thấp -{">"} Cao</option>
                                        <option value={''}>Mặc định</option>
                                        <option value={-1}>Cao -{">"} Thấp</option>
                                    </>)}
                                    {sortBy==='-1' && (<>
                                        <option value={-1}>Cao -{">"} Thấp</option>
                                        <option value={''}>Mặc định</option>
                                        <option value={1}>Thấp -{">"} Cao</option>
                                    </>)}
                                </>)}
                            </select>
                        </div>
                    </div>
                    {!loading && !companies.docs ? 
                        <div className="loading-container">
                            <div>
                                <img src={img.empty} alt='logo' width="200" height="170" className='empty-img'/>
                                <p>Chức năng chưa có dữ liệu</p>
                                <p>Vui lòng thêm dữ liệu</p>
                            </div>
                        </div>
                    :
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
                                            <td scope="row" data-label="Mã CT:"><span>{company.title}</span></td>
                                            <td data-label="Tên công ty:"><span>{company.name}</span></td>
                                            <td data-label="Số điện thoại:"><span>{company.phone}</span></td>
                                            <td data-label="Số vốn:"><span>
                                                {currencyFormatter.format(company.money, {
                                                symbol: 'VND',
                                                decimal: '*',
                                                thousand: '.',
                                                precision: 0,
                                                format: '%v %s' // %s is the symbol and %v is the value
                                                })}</span>
                                            </td>
                                            <td data-label="Ngày hoạt động:"><span>{format(new Date(company.startDate), 'dd/MM/yyyy')}</span></td>
                                            <td data-label="Trạng thái:">
                                                {company.status?
                                                    <span className="company-active">Hoạt động</span>
                                                :
                                                    <span className="company-disable">Không hoạt động</span>
                                                }
                                            </td>
                                            <td data-label="Chức năng:" className="company-center">
                                                <span><i 
                                                    className="fa-solid fa-pen-to-square p-1 f"  
                                                    style={{
                                                        color: '#6280EB', 
                                                        float: 'left'
                                                    }}
                                                    onClick={() => {
                                                        setShowUpdate(company)
                                                    }}
                                                ></i></span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-2 mb-4 d-flex justify-content-between">
                                <h6 className="mx-md-2 my-0">Tìm thấy: {companies?.totalDocs} công ty</h6>
                                <div className="d-flex align-items-center mx-md-4">
                                    <i className="p-1 fa-solid fa-chevron-left" onClick={() => prevPage()}></i>
                                    <div className="d-flex mx-md-4">
                                        <input className="input-page" value={companies?.page} onChange={(e)=>setPage(e.target.value)}></input>
                                        <div>/ {companies?.totalPages}</div>
                                    </div>
                                    <i className="p-1 fa-solid fa-chevron-right" onClick={() => nextPage()}></i>
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

export default Company;