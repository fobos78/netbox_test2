import React, { useState } from 'react';

import './Modal.css';

function Modal({ data, setData, setModal }) {
  const [newData, setNewData] = useState({ id: 0, name: '', age: '', phone: '', email: '' });
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  function addUser() {
    const str = JSON.stringify(data);
    const arr = JSON.parse(str);
    const arrId = [];
    data.forEach((element) => {
      arrId.push(+element[0].value);
    });
    console.log('arrLength', arr.length);
    let idMax = Math.max(...arrId) + 1;
    let arr1 = [{ value: idMax }, { value: name }, { value: age }, { value: phone }, { value: email }];
    console.log('data[0]', data[0]);
    arr.push(arr1);
    setData(arr);
  }
  function addName(event) {
    setName(event.target.value);
  }
  function addAge(event) {
    setAge(event.target.value);
  }
  function addPhone(event) {
    setPhone(event.target.value);
  }
  function addEmail(event) {
    setEmail(event.target.value);
  }
  return (
    <div className="Modal">
      <div>
        Name
        <input className="el3" onChange={addName} value={name} />
        Age
        <input className="el3" onChange={addAge} value={age} />
        Phone
        <input className="el3" onChange={addPhone} value={phone} />
        Email
        <input className="el3" onChange={addEmail} value={email} />
      </div>
      <button type="button" onClick={() => { addUser(); setModal(false); }}>Add User</button>
      <button type="button" onClick={() => setModal(false)}>close</button>
    </div>
  );
}

export default Modal;
