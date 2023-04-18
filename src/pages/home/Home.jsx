import "./home.css";
import img from '../../images/Image';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useState, useEffect } from 'react';

const Home = () => {
    const [selectComany, setSelectCompany] = useState('');
    const [subMenu, setSubMenu] = useState(false);
    const [control, setControl] = useState(false);

    return(
        <div className="body-container bg-light">
            <Header/>
            <SideBar/>
            <div className="main-container bg-light">
                <h5 className="mx-4 mt-4">Trang chủ</h5>
                <div className="home">
                    <div className="bg-white dashboard content">
                        <div className="home-container">
                            <div className="count-company">
                                <div className="d-flex">
                                    Tổng số công ty
                                </div>
                                <div className="d-flex mt-2 justify-content-between">
                                    <img src={img.company} alt='logo' width="50" height="50" className='logo-img'/>
                                    <div className="count">20</div>
                                </div>                           
                            </div>
                        </div>
                        <div className="home-container">
                            <div className="count-hui">
                            <div className="d-flex">
                                    Tổng số dây hụi hoạt động
                                </div>
                                <div className="d-flex mt-2 justify-content-between">
                                    <img src={img.hui} alt='logo' width="50" height="50" className='logo-img'/>
                                    <div className="count">5</div>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className="bg-white hui content">
                        <div className="list-hui">
                            <div className="mx-1 mb-4">
                                Dây hụi đến sắp đến hạn
                            </div>
                            <div className="hui-item">
                                <div>Hụi thần tài - Kỳ 2</div>
                                <p>Khui 09/06/2023</p>
                            </div>
                            <div className="hui-item">
                                <div>Hụi thần tài - Kỳ 2</div>
                                <p>Khui 09/06/2023</p>
                            </div>
                            <div className="hui-item">
                                <div>Hụi thần tài - Kỳ 2</div>
                                <p>Khui 09/06/2023</p>
                            </div>
                            <div className="hui-item">
                                <div>Hụi thần tài - Kỳ 2</div>
                                <p>Khui 09/06/2023</p>
                            </div>
                            <div className="hui-item">
                                <div>Hụi thần tài - Kỳ 2</div>
                                <p>Khui 09/06/2023</p>
                            </div>
                            <div className="hui-item">
                                <div>Hụi thần tài - Kỳ 2</div>
                                <p>Khui 09/06/2023</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;