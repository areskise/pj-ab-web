import './report.css';
import img from '../../images/Image';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useState } from 'react';
import History from './history/History';
import Insure from './insure/Insure';

const Report = () => {
    const [selectReport, setSelectReport] = useState(null);

    return(
        <div className="report body-container bg-light">
            <Header/>
            <SideBar/>
            <div className="main-container bg-light">
                <h5 className="m-4">
                    Quản lý hụi 
                    <i className="mx-2 fa-solid fa-angles-right" style={{fontSize: '18px'}}></i> 
                    Báo cáo
                </h5>
                <div className="bg-white content">             
                    <div className="p-2 px-3 pt-4 select-company-container"> 
                        <div className='label'>
                            <label htmlFor="">Báo cáo:</label>
                        </div>
                        <div className="d-flex w-100 dropdown text-end" style={{maxWidth: '218px'}}>
                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none p-1 form-select select-company" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='selected-company p-2'>{selectReport?selectReport:'Chọn loại báo cáo'}</span>
                            </a>
                            <ul className="p-0 my-1 dropdown-menu text-small select-dropdown">
                                <li>
                                    <button 
                                        className='p-2 px-3 btn dropdown-item'
                                        type='button'
                                        style={selectReport==='Tổng kết bảo hiểm'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                        onClick={() => setSelectReport('Tổng kết bảo hiểm')}
                                    >
                                        Tổng kết bảo hiểm
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className='p-2 px-3 btn dropdown-item'
                                        type='button'
                                        style={selectReport==='Lịch sử đóng hụi'?{fontWeight:'500',backgroundColor:'#B3CAD6',borderRadius: '0.375rem'}:{}} 
                                        onClick={() => setSelectReport('Lịch sử đóng hụi')}
                                    >
                                        Lịch sử đóng hụi
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {!selectReport ? 
                    <div className="loading-container">
                        <div>
                            <img src={img.report} alt='logo' width="200" height="170" className='empty-img'/>
                            <p>Vui lòng chọn báo cáo cần xem</p>
                        </div>
                    </div>
                    :
                    <div>
                        {selectReport==='Tổng kết bảo hiểm' && <Insure  />}
                        {selectReport==='Lịch sử đóng hụi' && <History />}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Report;