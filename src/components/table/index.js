import React, { useEffect, useState } from 'react';

import './Table.css';

function Table() {
  const [data, setData] = useState([]);// можно использоват redux или useContext
  const [idDel, setIdDel] = useState(0);// для передачи id элемерта который нужно удалить
  const [idUpdete, setIdUpdete] = useState(false);// усанавливает id элемента для поиска в массиве
  const [chengeUpdete, setChengeUpdete] = useState(0);// принемает id элемента что бы сработал запрос на редактирование
  const [index, setIndex] = useState(0);// индекс элемента массива
  const [inputEl, setInputEl] = useState([false, false, false, false, false]);// доступ к редактированию елемента
  const [changeName, setChangeName] = useState('');// для редактирования имени
  function heandleSave(id) {
    setChengeUpdete(id);
    setInputEl([false, false, false, false, false]);
    // setChangeName(changeName);
  }
  // редактирование имени
  function changeChoiceName(event) {
    setChangeName(event.target.value);
  }
  function chahgeInputEl(i) {
    const newData = inputEl.map((el) => el);
    newData.splice(i, 1, !inputEl[i]);
    setInputEl(newData);
    setIndex(i);
    setChangeName(data[i][1].value);
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
          body: JSON.stringify({ id: idDel }),
        });
      } catch (err) {
        console.log('deleteErr', err);
      }
      // здесь должны подгружать реальные данные
      // const result = await respons.json();
      // setData(() => result);
      const newEl = data.find((el) => el[0].value === idUpdete);
      newEl[1].value = changeName;
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
      setData(() => result);
    }
    someData();
  }, []);
  console.log('inputEl----', inputEl);
  return (
    <>
      <div className="Table">
        <div className="head">
          <h2 className="el">id</h2>
          <h2 className="el">name</h2>
          <h2 className="el">age</h2>
          <h2 className="el">phone</h2>
          <h2 className="el">email</h2>
          <h2 className="el">act</h2>
        </div>
        {data.map((el, i) => (
          <div key={Math.random()} className="data">
            <h5 className="el1">{el[0].value}</h5>
            {!inputEl[i] && <h5 className="el1">{el[1].value}</h5>}
            {inputEl[i] && <input className="el2" onChange={changeChoiceName} value={changeName} />}
            {!inputEl[i] && <h5 className="el1">{el[2].value}</h5>}
            {inputEl[i] && <input type="text" className="el2" value={el[2].value} />}
            {!inputEl[i] && <h5 className="el1">{el[3].value}</h5>}
            {inputEl[i] && <input type="text" className="el2" value={el[3].value} />}
            {!inputEl[i] && <h5 className="el1">{el[4].value}</h5>}
            {inputEl[i] && <input type="text" className="el2" value={el[4].value} />}
            <div className="el1">
              <button onClick={() => setIdDel(el[0].value)}>Del</button>
              {!inputEl[i] && <button onClick={() => { setIdUpdete(el[0].value); chahgeInputEl(i); }}>Update</button>}
              {inputEl[i] && <button onClick={() => { heandleSave(el[0].value); }}>Save</button>} {/* idUpdete */}
            </div>
          </div>
        ))}
        <h3>
          Количество строк -
          {' '}
          {data.length}
        </h3>
      </div>
    </>
  );
}

export default Table;
