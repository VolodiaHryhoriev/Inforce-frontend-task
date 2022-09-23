import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import s from "./ProductPage.module.css";
import { Modal, Button } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import {actionsProduct} from "../redux/ActionProduct";
import productReducer from "../redux/ProductReducer";

const ProductPage = () => {
    const dispatch = useDispatch();
    localStorage.setItem("imageA", "https://s3-alpha-sig.figma.com/img/01e9/8132/33da1008ebb196b83f961eafd3a3f726?Expires=1664755200&Signature=NJzfSP~~JZtvli-B57h8ephWJM81oqmxly9WIoj1YmcFACgDrycNkBo89dcLkZtdu-gwue-ZBUL8CnffQJ6uwsa7gr3P-PdUbSPWOONemyW4tA88wXX5qqVXgs35o3JphtTFmUFn~NZZjnXP52uDDfyhKCsSdmgvxu8rkaxHisJO1mt2t0jR3dcJ4tXBnmccnllZmWhiM4D9DWXXsLFdyZ9ayL2UrjZ8pam0~7RO0xqGGt-v9iqLMP3EAsKRWPRfV6RqSnuhVLQwWmiNNJniQWf7~0sh9LxfLx~mygoLTiKt7MtaQC6ehuT3mGVA7EBX2464WPBSpNP0ecNzGOFi9g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA")
    localStorage.setItem("nameA", "productA");
    localStorage.setItem("sizeA", "M");
    localStorage.setItem("colorA", "black");
    localStorage.setItem("priceA", "50");
    localStorage.setItem("idA", "1");
    const [toggleEdit, setToggleEdit] = useState(false);
    const getObj = useSelector(state => state.productReducer.obj);
    const [arr, setArr] = useState([]);
    const [openCart, setOpenCart] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const handleOpen = () => setOpenDetails(true);
    const handleClose = () => {
        setOpenDetails(false);
        let getSize, getColor, getCount
        document.querySelector('#sendASize').value ?
            getSize = document.querySelector('#sendASize').value
        :
            getSize = document.querySelector('#sendASize').placeholder

        document.querySelector('#sendAColor').value ?
            getColor = document.querySelector('#sendAColor').value
            :
            getColor = document.querySelector('#sendAColor').placeholder

        document.querySelector("#sendACount").value ?
            getCount = document.querySelector('#sendACount').value
            :
            getCount = document.querySelector('#sendACount').placeholder

        let obj = {
            size: getSize,
            color: getColor,
            count: getCount,
            image: localStorage.getItem("imageA"),
            name: localStorage.getItem("nameA"),
            price: localStorage.getItem("priceA"),
            id: localStorage.getItem("idA")
        }
        dispatch(actionsProduct.setObj(obj))
    };

    useEffect(() => {
        setArr(getObj);
    }, [getObj])

    const handleCancel = () => {
        setOpenDetails(false);
        setOpenCart(false);
    }

    const handleOpenCart = () => {
        setOpenCart(true);
    }

    const handleCloseCart = () => {
        setOpenCart(false);
    }

    const removeItem = (e) => {
        let x = arr.filter(item => item.id !== e.target.parentNode.parentNode.id);
        setArr(x);
    }

    const editItem = () => {
        document.querySelector("#editableSize").contentEditable = true;
        document.querySelector("#editableColor").contentEditable = true;
        document.querySelector("#editableCount").contentEditable = true;
    }

    const modalDetails = <>
        <Modal open={openDetails} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>modal Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>size:</p>
                <input type="text" id="sendASize" placeholder={localStorage.getItem("sizeA")}/>
                <p>color:</p>
                <input type="text" id="sendAColor" placeholder={localStorage.getItem("colorA")}/>
                <p>count:</p>
                <input type="text" id="sendACount" placeholder="1"/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} appearance="primary">
                    Ok
                </Button>
                <Button onClick={handleCancel} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    </>

    const modalCart = <>
        <Modal open={openCart} onClose={handleCloseCart}>
            <Modal.Header>
                <Modal.Title>Set Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {arr.length === 0 && <div>Cart is empty</div>}
                {arr.map(item =>
                    <div key={item.id} id={item.id} className={s.productCart}>
                    <img src={item.image} alt="image"/>
                    <h3>{item.name}</h3>
                    <h3 id={"editableSize"}>{item.size}</h3>
                    <h3>{ parseInt(item.price) * parseInt(item.count)}$</h3>
                    <h3 id={"editableColor"}>{item.color}</h3>
                    <h3 id={"editableCount"}>{item.count}</h3>
                    <div className={s.modalButtons}>
                        <input type="button" className={s.remove} onClick={removeItem} value="Remove"/>
                        <input type="button" className={s.edit} onClick={editItem} value="Edit"/>
                    </div>
                </div>)}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseCart} appearance="primary">
                    Ok
                </Button>
                <Button onClick={handleCancel} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    </>

    const comment = () => {
        let date = new Date();
        localStorage.setItem("date", `${date}`);
        localStorage.setItem("comment", `${document.querySelector("textarea").value}`);
    }

    return(
    <>
        {modalDetails}
        {modalCart}
        <button onClick={handleOpenCart}>Open cart</button>
        <div className={s.container}>
            <div className={s.productA}>
                <img src={localStorage.getItem("imageA")} alt="image"/>
                <h3>{localStorage.getItem("nameA")}</h3>
                <h3>{localStorage.getItem("sizeA")}</h3>
                <h3>{localStorage.getItem("priceA")}</h3>
                <h3>{localStorage.getItem("colorA")}</h3>
                <input type="button" className={s.add} onClick={handleOpen} value="Add to cart"/>
            </div>
            <div className={s.productB}>
                <img src={localStorage.getItem("imageA")} alt="image"/>
                <h3>{localStorage.getItem("nameA")}</h3>
                <h3>{localStorage.getItem("sizeA")}</h3>
                <h3>{localStorage.getItem("priceA")}</h3>
                <h3>{localStorage.getItem("colorA")}</h3>
                <input type="button" className={s.add} onClick={handleOpen} value="Add to cart"/>
            </div>
        </div>
        <div className={s.comment}>
        <h2>Last comment:</h2>
        <p>{localStorage.getItem("comment")}</p>
            <h6>{localStorage.getItem("date")}</h6>
        <textarea placeholder={"Leave your comment..."} maxLength={"25"}  cols="40" rows="5"></textarea>
        <br/>
        <input type="submit" onClick={comment} value={"send comment"}/>

        </div>
    </>
    )
}

export default ProductPage;