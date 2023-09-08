import "./home.css";
import img from '../../images/Image';
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useState, useEffect } from 'react';
import HuiAPI from "../../API/HuiAPI";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorSelectedCompany, selectorUserCompanies } from "../../redux/slice/companySlice";
import { format } from "date-fns";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [countCompany, setCountCompany] = useState(0);
    const [countHui, setCountHui] = useState(0);
    const [huiSoons, setHuiSoons] = useState([]);

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
                    const resSoon = await HuiAPI.getListComingSoon();
                    const resultHuis = resSoon.ResponseResult.Result;
                    let resultSoon = []
                    resultHuis.map(resultHui=> {
                        resultHui.periodicHuis.map(res=>{
                            res.name = resultHui.name
                            resultSoon.push(res) 
                        })                     
                    })
                    setHuiSoons(resultSoon.sort((a,b)=>new Date(a.openDate)-new Date(b.openDate)));
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
                            {huiSoons?.map((hui, i) => (
                                <div key={i} className="hui-item">
                                    <div>{hui.name} - Kỳ {hui.periodicHui}</div>
                                    <p>Khui {format(hui.openDate?new Date(hui.openDate):new Date(), 'dd/MM/yyyy')}</p>
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