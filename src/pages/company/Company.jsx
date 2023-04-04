import "./company.css"; 
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect, useState } from 'react';
import AddCompany from "../../components/company/addCompany/AddCompany";
import UpdateCompany from "../../components/company/updateCompany/UpdateCompany";

const Company = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);


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
                                <i class="p-1 fa-solid fa-arrow-down-up-across-line"></i>
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
                        <tr>
                            <td scope="row" data-label="Mã CT:">CT1</td>
                            <td data-label="Tên công ty:" className="company-word">Công ty 1 zzzzzzzzzzzz</td>
                            <td data-label="Số điện thoại:">0123456789</td>
                            <td data-label="Số vốn:"><div>100.000.000.000 VND</div></td>
                            <td data-label="Ngày tạo:">03/20/2023</td>
                            <td data-label="Trạng thái:">
                                {true?
                                    <div className="status-active">Hoạt động</div>
                                :
                                    <div className="status-disable">Không hoạt động</div>
                                }
                            </td>
                            <td data-label="Chức năng:" className="company-center">
                                <i 
                                    class="fa-solid fa-pen-to-square p-1"  
                                    style={{color: '#6280EB'}}
                                    onClick={() => setShowUpdate(true)}
                                ></i>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                        <div className="p-2 mb-4 d-flex justify-content-between">
                            <h6 className="mx-md-2 my-0">Tìm thấy: 20 công ty</h6>
                            <div className="d-flex align-items-center mx-md-4">
                                <i class="fa-solid fa-chevron-left"></i>
                                <div className="d-flex mx-md-4">
                                    <input className="input-page" defaultValue={1}></input>
                                    <div>/ 4</div>
                                </div>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Company;