import React, { useEffect, useState } from 'react';

import Modal from '../Modal';
import './Table.css';

function Table() {
  const [data, setData] = useState([]);// можно использоват redux или useContext
  const [idDel, setIdDel] = useState(0);// для передачи id элемерта который нужно удалить
  const [idUpdete, setIdUpdete] = useState(false);// усанавливает id элемента для поиска в массиве
  const [chengeUpdete, setChengeUpdete] = useState(0);// принемает id элемента что бы сработал запрос на редактирование
  const [index, setIndex] = useState(0);// индекс элемента массива
  const [inputEl, setInputEl] = useState([]);// доступ к редактированию елемента
  const [changeName, setChangeName] = useState('');// для редактирования имени
  const [changeAge, setChangeAge] = useState(0);// для редактирования возраста
  const [changePhone, setChangePhone] = useState('');// для редактирования телефона
  const [changeEmail, setChangeEmail] = useState('');// для редактирования email
  const [modal, setModal] = useState(false); // появление модального окна

  function heandleSave(id) {
    setChengeUpdete(id);
    const newData = inputEl.map((el) => el);
    newData.splice(index, 1, !inputEl[index]);
    setInputEl(newData);
    setIndex(0);
  }
  // редактирование имени
  function changeChoiceName(event) {
    setChangeName(event.target.value);
  }
  function changeChoiceAge(event) {
    setChangeAge(event.target.value);
  }
  function changeChoicePhone(event) {
    setChangePhone(event.target.value);
  }
  function changeChoiceEmail(event) {
    setChangeEmail(event.target.value);
  }
  function chahgeInputEl(i) {
    const newData = inputEl.map((el) => el);
    newData.splice(i, 1, !inputEl[i]);
    setInputEl(newData);
    setIndex(i);
    setChangeName(data[i][1].value);
    setChangeAge(data[i][2].value);
    setChangePhone(data[i][3].value);
    setChangeEmail(data[i][4].value);
  }
  // удаление элемента
  useEffect(() => {
    async function someDel() {
      let respons;
      try {
        respons = await fetch('https://frontend-test.netbox.ru/', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: idDel }),
        });
      } catch (err) {
        console.log('deleteErr', err);
      }
      // здесь должны подгружать реальные данные
      // const result = await respons.json();
      // setData(() => result);
      const newData = data.filter((el) => el[0].value !== idDel);
      setData(newData);
    }
    // что бы первый раз не сработал
    if (idDel) {
      someDel();
    }
  }, [idDel]);
  // редактирование элемента
  useEffect(() => {
    async function somePut() {
      let respons;
      try {
        respons = await fetch('https://frontend-test.netbox.ru/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idDel, name: data[index][1].value, age: data[index][2].value, phone: data[index][3].value, email: data[index][4].value,
          }),
        });
      } catch (err) {
        console.log('deleteErr', err);
      }
      // здесь должны подгружать реальные данные
      // const result = await respons.json();
      // setData(() => result);
      const newEl = data.find((el) => el[0].value === idUpdete);
      newEl[1].value = changeName;
      newEl[2].value = changeAge;
      newEl[3].value = changePhone;
      newEl[4].value = changeEmail;
      // const newData = data.filter((el) => el[0].value !== idUpdete);
      const newData = data.map((el) => el);
      newData.splice(index, 1, newEl);
      // newData.push(newEl);
      setData(newData);
    }
    // что бы первый раз не сработал
    if (chengeUpdete) {
      somePut();
      setIdUpdete(false);
      setChangeName('');
      setChangeAge('');
      setChangePhone('');
      setChangeEmail('');
    }
  }, [chengeUpdete]);
  // начальная загрузка
  useEffect(() => {
    async function someData() {
      let respons;
      try {
        respons = await fetch('https://frontend-test.netbox.ru/');
      } catch (err) {
        console.log('startErr', err);
      }
      const result = await respons.json();
      console.log('result', result);
      setData(() => result);
    }
    someData();
    const arr = [];
    data.forEach(() => {
      arr.push(false);
    });
    setInputEl(arr);
  }, []);
  // сортировка элементов
  function sortEl(i) {
    const str = JSON.stringify(data);
    const arr = JSON.parse(str);
    const newData = arr.sort((a, b) => {
      if (a[i].value > b[i].value) {
        return 1;
      }
      if (a[i].value < b[i].value) {
        return -1;
      }
      return 0;
    });
    setData(() => newData);
    console.log('Data', data);
  }
  return (
    <>
      <div className="Table">
        <div className="head">
          <h2 className="el">
            id
            <p onClick={() => { sortEl(0); }}>&#9660;</p>
          </h2>
          <h2 className="el">
            name
            <p onClick={() => { sortEl(1); }}>&#9660;</p>
          </h2>
          <h2 className="el">
            age
            <p onClick={() => { sortEl(2); }}>&#9660;</p>
          </h2>
          <h2 className="el">
            phone
            <p onClick={() => { sortEl(3); }}>&#9660;</p>
          </h2>
          <h2 className="el">
            email
            <p onClick={() => { sortEl(4); }}>&#9660;</p>
          </h2>
          <h2 className="el">act</h2>
        </div>
        {data.map((el, i) => (
          <div key={Math.random()} className="data">
            <h5 className="el1">{el[0].value}</h5>
            {!inputEl[i] && <h5 className="el1">{el[1].value}</h5>}
            {inputEl[i] && <input className="el2" onChange={changeChoiceName} value={changeName} />}
            {!inputEl[i] && <h5 className="el1">{el[2].value}</h5>}
            {inputEl[i] && <input className="el2" onChange={changeChoiceAge} value={changeAge} />}
            {!inputEl[i] && <h5 className="el1">{el[3].value}</h5>}
            {inputEl[i] && <input className="el2" onChange={changeChoicePhone} value={changePhone} />}
            {!inputEl[i] && <h5 className="el1">{el[4].value}</h5>}
            {inputEl[i] && <input className="el2" onChange={changeChoiceEmail} value={changeEmail} />}
            <div className="el1">
              <button onClick={() => setIdDel(el[0].value)}>Del</button>
              {!inputEl[i] && <button onClick={() => { setIdUpdete(el[0].value); chahgeInputEl(i); }}>Update</button>}
              {inputEl[i] && <button onClick={() => { heandleSave(el[0].value); }}>Save</button>}
              {' '}
            </div>
          </div>
        ))}
        <h3>
          Количество строк -
          {' '}
          {data.length}
        </h3>
        <button onClick={() => { setModal(true); }}>Add User</button>
        <br />
        {modal
          && (
          <div className="mod">
            <Modal data={data} setData={setData} setModal={setModal} />
          </div>
          )}
      </div>
    </>
  );
}

export default Table;
