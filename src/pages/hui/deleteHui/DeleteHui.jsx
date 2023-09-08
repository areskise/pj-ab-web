import "./deleteHui.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import HuiAPI from "../../../API/HuiAPI";
import { memo } from "react";

const DeleteHui = ({setDeleteHui, deleteHui}) => {

    const handleDelete = async() => {
        try {
            const res = await HuiAPI.delete(deleteHui._id);
            if(res.ResponseResult.ErrorCode === 0){
                setDeleteHui(false)
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Xóa dây hụi thành công!');

            } else {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error('Đã gặp sự cố! Xóa không thành công!');
            }
        }
        catch(err) {
            console.error(err);
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('Đã gặp sự cố! Xóa không thành công!');
        }
    }
    
    return (
        <Modal dialogClassName="delete" show={deleteHui} onHide={() => setDeleteHui(false)}>
            <Modal.Header className='justify-content-center'>
                <Modal.Title className='title'>CẢNH BÁO</Modal.Title>
            </Modal.Header>
            <Modal.Body className='w-100 m-auto text-center'>
                <div>Bạn đang thao tác xóa <label style={{color: 'red', fontWeight: '600'}}>{deleteHui.name}</label>. Tất cả thông tin đang ghi nhận trên dây hụi sẽ bị mất.</div>
                <div>Bạn có muốn tiếp tục?</div>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <button className='mx-3 btn btn-cancle' onClick={() => setDeleteHui(false)}>
                    Hủy
                </button>
                <button className='mx-3 btn btn-continue' onClick={handleDelete}>
                    Tiếp tục
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default memo(DeleteHui);