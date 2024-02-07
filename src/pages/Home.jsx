import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const Home = () => {
  const [idCardFilter, setIdCardFilter] = useState("");
  const [userFilter, setUserFilter] = useState({ idCard: null, dateOfBirth: null });
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState(false);
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    (async () => {
      const rawResponse = await fetch(`https://localhost:5001/User/GetByFilter`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userFilter)
      });
      const resp = await rawResponse.json();
      if (rawResponse.ok == false) {
        alert(resp.data);
      }
      else {
        if (resp.status) {
          setUserList(resp.data);
        }
      }
    })()
  }, [filter]);

  const handleChange = (e, type) => {
    const numericValue = e.replace(/[^0-9]/g, "");
    if (type == "idCard") {
      setIdCardFilter(numericValue);
    }
  }

  const handleSearch = async () => {
    if (!idCardFilter && !startDate) {
      alert("โปรดระบุเลขบัตรประชาชน หรือวันเดือนปีเกิด");
    }
    else {
      let dateFilter = (startDate) ? moment(startDate).format("YYYY-MM-DD") : null;
      let request = {
        idCard: idCardFilter || null,
        dateOfBirth: dateFilter || null,
      };
      setUserFilter(request);
      setFilter(prev => !prev);
    }
  }

  const handleClear = () => {
    setIdCardFilter("");
    setStartDate("");
    setUserFilter({ idCard: null, dateOfBirth: null });
    setFilter(prev => !prev);
  }

  const listItems = userList.map((item) =>
    <tr key={item.id}>
      <td>{item.idCard}</td>
      <td>{moment(item.dateOfBirth).format("DD/MM/YYYY")}</td>
      <td>{item.address}</td>
      <td className="text-center">
        <Link to={`/edit?id=${item.id}`}>
          <button type="button" className="btn btn-warning">แก้ไข</button>
        </Link>
      </td>
    </tr>
  );

  return (
    <div className="container" style={{ "maxWidth": "1200px" }}>
      <div className="row">
        <div className="col-sm text-center my-4">
          <p className="h4">รายการเลขบัตรประชาชน</p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm">
          <Link to="/edit">
            <button type="button" className="btn btn-primary">เพิ่มผู้ใช้ใหม่</button>
          </Link>
        </div>
      </div>

      <div className="row mb-3 align-items-end">
        <div className="col-sm-4">
          <div className="form-group mb-2">
            <label htmlFor="id_card_number">เลขบัตรประชาชน</label>
            <input type="text" value={idCardFilter}
              onChange={(e) => handleChange(e.target.value, "idCard")}
              className="form-control" id="id_card_number" placeholder="" />
          </div>
        </div>
        <div className="col-sm-4">
          <div className="form-group mb-2">
            <label htmlFor="date_of_birth">วันเดือนปีเกิด</label>
            <div>
              <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy" />
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="form-group mb-2">
            <button type="button" onClick={handleClear} className="btn btn-secondary w-100">ล้าง</button>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="form-group mb-2">
            <button type="button" onClick={handleSearch} className="btn btn-success w-100">ค้นหา</button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">เลขบัตรประชาชน</th>
                <th scope="col">วันเดือนปีเกิด</th>
                <th scope="col">ที่อยู่</th>
                <th scope="col" className="text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {listItems}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Home;