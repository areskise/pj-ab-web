import "./authority.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { permissionActions } from "../../redux/slice/permissionSlice";
import AddAuthority from "./AddAuthority";
import UpdateAuthority from "./UpdateAuthority";


const Authority = () => {
    const [control, setControl] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(permissionActions.setPermissions())
    },[])

    return(
        <div className="body-container bg-light">
            <Header/>
            <SideBar/>
            <div className="main-container bg-light">
                <h5 className="m-4">Quản lý phân quyền</h5>
                <div className="bg-white content">
                    <div className="authority-container">
                        <div className="d-flex justify-content-center align-items-center m-3">
                            <button 
                                className={control?'btn btn-control m-2':'btn btn-control m-2 selected'}
                                onClick={()=>setControl(false)}
                            >Thêm mới</button>
                            <button 
                                className={control?'btn btn-control m-2 selected':'btn btn-control m-2'}
                                onClick={()=>setControl(true)}
                            >Cập nhật</button>
                        </div>
                        {!control?
                            <AddAuthority />
                        :
                            <UpdateAuthority />                            
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authority;