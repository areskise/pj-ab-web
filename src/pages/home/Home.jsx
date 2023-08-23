import "./home.css";
import img from '../../images/Image';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useState, useEffect } from 'react';
import HuiAPI from "../../API/HuiAPI";
import CompanyAPI from "../../API/CompanyAPI";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorSelectedCompany, selectorUserCompanies } from "../../redux/slice/companySlice";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [countCompany, setCountCompany] = useState(0);
    const [countHui, setCountHui] = useState(0);
    const [huiList, setHuiList] = useState([]);

    const userCompanies = useSelector(selectorUserCompanies)
    const selectedCompany = useSelector(selectorSelectedCompany)


    const cookies = new Cookies();
    const access_token = cookies.get('access_token');
    const navigate = useNavigate();

    useEffect(() => {
        if(access_token) {
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
                    setHuiList(result);
                    setCountHui(result.totalDocs);
                    setCountCompany(userCompanies.length);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error(error);
                }
            }
            fetchHui();
        } else {
            navigate('/');
        }
    }, [selectedCompany]);

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
                                    <div className="count">{countCompany}</div>
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
                                    <div className="count">{countHui}</div>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className="bg-white hui content">
                        <div className="list-hui">
                            <div className="mx-1 mb-4">
                                Dây hụi đến sắp đến hạn
                            </div>
                            {huiList.docs?.map((hui, i) => (
                                <div key={i} className="hui-item">
                                    <div>Hụi thần tài - Kỳ 2</div>
                                    <p>Khui 09/06/2023</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;