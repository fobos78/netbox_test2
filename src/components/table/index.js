import React, { useEffect, useState } from 'react';

import './Table.css';

function Table() {
  const [data, setData] = useState([]);// можно использоват redux или useContext
  const [idDel, setIdDel] = useState(0);
  const [idUpdete, setIdUpdete] = useState(false);
  const [chengeUpdete, setChengeUpdete] = useState(0);
  const [inputEl, setInputEl] = useState({ 0: false, 1: false, 2: false, 3: false });
  function heandleSave(id) {
    setChengeUpdete(id);
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
      const newData = data.filter((el) => el[0].value !== idUpdete);
      newData.push(newEl);
      setData(newData);
    }
    // что бы первый раз не сработал
    if (chengeUpdete) {
      somePut();
      setIdUpdete(false);
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
          <div key={el[0].value} className="data">
            <h5 className="el1">{el[0].value}</h5>
            {!inputEl[i] && <h5 className="el1">{el[1].value}</h5>}
            {inputEl[i] && <input type="text" className="el1" />}
            {!inputEl[i] && <h5 className="el1">{el[2].value}</h5>}
            {inputEl[i] && <input type="text" className="el1" />}
            {!inputEl[i] && <h5 className="el1">{el[3].value}</h5>}
            {inputEl[i] && <input type="text" className="el1" />}
            {!inputEl[i] && <h5 className="el1">{el[4].value}</h5>}
            {inputEl[i] && <input type="text" className="el1" />}
            <div className="el1">
              <button onClick={() => setIdDel(el[0].value)}>Del</button>
              {!idUpdete && <button onClick={() => { setIdUpdete(el[0].value); setInputEl({...inputEl, i:!inputEl[i]}); console.log('inputEl', inputEl);}}>Update</button>}
              {idUpdete && <button onClick={() => { heandleSave(el[0].value); setInputEl({...inputEl, i:!inputEl[i]})}}>Save</button>}
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
