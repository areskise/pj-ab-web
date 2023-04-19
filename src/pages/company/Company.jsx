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
import { permissionActions } from "../../redux/slice/permissionSlice";
import { applicationActions } from "../../redux/slice/applicationSlice";

const Company = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const limit = 5;
    const companies = useSelector(selectorCompanies)

	const cookies = new Cookies();
    const access_token = cookies.get('access_token');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(access_token) {
            // const data = {
                //     limit: limit,
                //     page: page
                // }
            dispatch(companyActions.setCompanies())
            dispatch(applicationActions.setApplications())
            dispatch(permissionActions.setPermissions())
        } else {
            navigate('/');
        }
    }, [showAdd, showUpdate]);

    const nextPage = () => {
        if(page < totalPage) {
            setPage(page + 1)
        } else {
            setPage(1)
        }
    }
    
    const prevPage = () => {
        if(page > 1) {
            setPage(page - 1)
        } else {
            setPage(totalPage)
        }
    }


    return(
        <div className="company body-container bg-light">
            <Header/>
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
                                <i className="p-1 fa-solid fa-arrow-down-up-across-line"></i>
                            </button>
                            <button className='btn btn-sort'>
                                Ngày tạo
                                <i className="p-1 fa-solid fa-arrow-down-up-across-line"></i>
                            </button>
                            <button className='btn btn-sort'>
                                Trạng thái
                                <i className="p-1 fa-solid fa-arrow-down-up-across-line"></i>
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
                                    <i className="p-1 fa-solid fa-arrow-down-up-across-line"></i>
                                </div>
                            </th>
                            <th scope="col">
                                <div className='d-flex align-items-end'>
                                    Ngày tạo 
                                    <i className="p-1 fa-solid fa-arrow-down-up-across-line"></i>
                                </div>
                            </th>
                            <th scope="col">
                                <div className='d-flex align-items-end'>
                                    Trạng thái 
                                    <i className="p-1 fa-solid fa-arrow-down-up-across-line"></i>
                                </div>
                            </th>
                            <th scope="col" className="company-center">Chức năng</th>
                        </tr>
                        </thead>
                        <tbody>
                            {companies && companies.map((company, i) => (
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
                                    <td data-label="Ngày tạo:">{format(new Date(company.createdAt), 'dd/MM/yyyy')}</td>
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
                            <h6 className="mx-md-2 my-0">Tìm thấy: {count?count:0} công ty</h6>
                            <div className="d-flex align-items-center mx-md-4">
                                <i className="p-1 fa-solid fa-chevron-left" onClick={() => prevPage()}></i>
                                <div className="d-flex mx-md-4">
                                    <input className="input-page" defaultValue={page}></input>
                                    <div>/ {totalPage?totalPage:1}</div>
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