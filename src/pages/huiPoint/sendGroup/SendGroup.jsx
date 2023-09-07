import "./sendGroup.css";
import Modal from 'react-bootstrap/Modal';
import alertify from 'alertifyjs';
import currencyFormatter from 'currency-formatter';
import { format } from "date-fns";

const SendGroup = ({setShowSend, showSend, periodicHui, huiPoints, selectedHui}) => {
    const pushHuis = huiPoints.filter(hui=>hui.getHui!==0)
    const confirmHuis = huiPoints.filter(hui=>hui.getHui===0)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = document.getElementById('sendGroup').outerText
        await navigator.clipboard.writeText(data)
        alertify.set('notifier', 'position', 'top-center');
        alertify.warning('Nội dung tin nhắn đã được copy!');       
    };

    const handleClose = (e) => {
        e.preventDefault();
        setShowSend(false)
    }

    const onHide = () => {
        setShowSend(false)
    }

    return (
        <Modal dialogClassName="send-group" show={showSend} onHide={onHide}>
            <form onSubmit={handleSubmit}>
                <Modal.Header className='justify-content-center'>
                    <Modal.Title className='title'>Nội dung tin nhắn</Modal.Title>
                </Modal.Header>
                <Modal.Body className='w-100 m-auto text-center'>
                    <div id='sendGroup' className='form-container'>
                        <div>
                            <div className='mx-md-3 mb-4'>
                                <div>
                                    Hụi [Bi Lai] xin phép báo số [{selectedHui?.name}]
                                </div>
                                <div>
                                    Khui ngày [{format(periodicHui?.date?new Date(periodicHui?.date):new Date(), 'dd/MM/yyyy')}]
                                    <br/>
                                </div>
                            </div>
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Bỏ hụi
                                    </label>
                                </div>
                            </div>
                            {pushHuis?.map(hui=>(
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className="mx-3">
                                    <label htmlFor="">
                                        - {hui.cusName} - {currencyFormatter.format(hui.pushHui, {
                                            symbol: 'VND',
                                            decimal: '*',
                                            thousand: ',',
                                            precision: 0,
                                            format: '%v %s' // %s is the symbol and %v is the value
                                        })}
                                        <br/>
                                    </label>
                                </div>
                            </div>
                            ))}
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-start'>
                                <div className='label'>
                                    <label htmlFor="">
                                        Đóng hụi
                                    </label>
                                </div>
                            </div>
                            {confirmHuis?.map((hui, i)=>(
                            <div className='d-flex m-md-3 my-3 align-items-center justify-content-between'>
                                <div className="mx-3">
                                    <label htmlFor="">
                                        - {hui.cusName} - {currencyFormatter.format(hui.liveHui?hui.liveHui:hui.dieHui , {
                                            symbol: 'VND',
                                            decimal: '*',
                                            thousand: ',',
                                            precision: 0,
                                            format: '%v %s' // %s is the symbol and %v is the value
                                        })}
                                        {confirmHuis?.length === i+1 && <br/>}
                                    </label>
                                </div>
                            </div>
                            ))}
                            <div className='mx-md-3 mt-4'>
                                Cảm ơn Anh Chị đã ủng hộ Bi Lai ạ!
                            </div>                           
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <button className='mx-3 btn btn-cancle' onClick={handleClose}>
                        Đóng
                    </button>
                    <button className='mx-3 btn btn-continue'  id='submitBtn'>
                        Copy
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default SendGroup;