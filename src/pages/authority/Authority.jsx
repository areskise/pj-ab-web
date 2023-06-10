import "./authority.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { permissionActions } from "../../redux/slice/permissionSlice";
import AddAuthority from "./AddAuthority";


const Authority = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(permissionActions.setPermissions())
    },[])

    return(
        <div className="body-container bg-light">
            <Header/>
            <SideBar/>
            <AddAuthority />
        </div>
    )
}

export default Authority;