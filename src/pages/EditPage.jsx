import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import { Link } from "react-router-dom";

const EditPage = () => {
    const [idCard, setIdCard] = useState("");
    const [startDate, setStartDate] = useState("");
    const [address, setAddress] = useState("");
    const [titlePage, setTitlePage] = useState("");

    const queryParameters = new URLSearchParams(window.location.search)
    const queryId = queryParameters.get("id");

    useEffect(() => {
        (async () => {
            if (queryId) {
                let bodyData = {
                    id: queryId
                };
                const rawResponse = await fetch('https://localhost:5001/User/GetByFilter', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                });
                const resp = await rawResponse.json();
                if (resp.status) {
                    setIdCard(resp.data[0].idCard);
                    setStartDate(resp.data[0].dateOfBirth);
                    setAddress(resp.data[0].address);
                }
                setTitlePage("แก้ไขรายการ");
            }
            else {
                setTitlePage("เพิ่มรายการ");
            }
        })()
    }, []);

    const handleChange = (e, type) => {
        if (type == "idCard") {
            const numericValue = e.replace(/[^0-9]/g, "");
            setIdCard(numericValue);
        }
        else if (type == "dateOfBirth") {
            setStartDate(e);
        }
        else if (type == "address") {
            setAddress(e);
        }
    }

    const handleUpdateUser = async () => {
        let dateOfBirth = "";
        if (startDate) {
            dateOfBirth = moment(startDate).format("YYYY-MM-DD")
        }
        let endpoint = "Create";
        let userDetail = {
            idCard
            , dateOfBirth
            , address
        }
        if (queryId) {
            endpoint = "Update";
            userDetail.id = queryId;
        }

        if (!userDetail.idCard.trim()) {
            alert("โปรดระบุเลขบัตรประชาชน");
            return;
        }
        if (userDetail.idCard.trim().length < 13) {
            alert("โปรดระบุเลขบัตรประชาชนให้ครบ 13 หลัก");
            return;
        }

        if (!userDetail.dateOfBirth.trim()) {
            alert("โปรดเลือกวันเดือนปีเกิด");
            return;
        }
        if (!userDetail.address.trim()) {
            alert("โปรดระบุที่อยู่");
            return;
        }

        const rawResponse = await fetch(`https://localhost:5001/User/${endpoint}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetail)
        });
        const resp = await rawResponse.json();
        if (rawResponse.ok == false) {
            alert(resp.data);
        }
        else {
            if (resp.status) {
                window.location.href = "/";
            }
        }
    }

    return (
        <div className="container" style={{ "maxWidth": "800px" }}>
            <div className="row">
                <div className="col-sm text-center my-4">
                    <p className="h4">{titlePage}</p>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm">
                    <div className="form-group mb-2">
                        <label htmlFor="id_card_number" className="mb-2">เลขบัตรประชาชน</label>
                        <input type="text" maxLength="13" value={idCard} onChange={(e) => handleChange(e.target.value, "idCard")} className="form-control" id="id_card_number" placeholder="" />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group mb-2">
                        <label htmlFor="date_of_birth" className="mb-2">วันเดือนปีเกิด</label>
                        <div className="date-picker-wrap">
                            <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm">
                    <div className="form-group mb-2">
                        <label htmlFor="address" className="mb-2">ที่อยู่</label>
                        <textarea value={address} onChange={(e) => handleChange(e.target.value, "address")} className="form-control" id="address" rows="3"></textarea>
                    </div>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-sm">
                    <Link to="/" className="mx-1">
                        <button type="button" className="btn btn-secondary">ย้อนกลับ</button>
                    </Link>
                    <button onClick={handleUpdateUser} type="button" className="btn btn-primary">บันทึก</button>
                </div>
            </div>
        </div>
    );
};
export default EditPage;