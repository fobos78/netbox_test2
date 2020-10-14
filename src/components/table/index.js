import React, { useEffect, useState } from 'react';

import './Table.css';

function Table() {
  const [data, setData] = useState([]);
  const [idDel, setIdDel] = useState(0);
  // удаление элемента
  useEffect(() => {
    async function someDel() {
      const respons = await fetch('https://frontend-test.netbox.ru/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: idDel }),
      });
      // здесь должны подгружать реальные данные
      // const result = await respons.json();
      //setData(() => result);
      const newData = data.filter(el => el[0].value !== idDel);
      setData(newData);
      console.log('respons', respons);
      console.log('idDel', idDel);
    }
    if (idDel) {
      someDel();
    }
  }, [idDel]);

  useEffect(() => {
    async function someData() {
      let respons;
      try {
        respons = await fetch('https://frontend-test.netbox.ru/');
      } catch (err) {
        console.log('start', err);
      }
      const result = await respons.json();
      console.log('result[0]', result[0]);
      setData(() => result);
    }
    someData();
  }, []);
  return (
    <div className="Table">
      <div className="head">
        <h2 className="el">id</h2>
        <h2 className="el">name</h2>
        <h2 className="el">age</h2>
        <h2 className="el">phone</h2>
        <h2 className="el">email</h2>
        <h2 className="el">act</h2>
      </div>
      {data.map((el) => (
        <div key={el[0].value} className="data">
          <h5 className="el1">{el[0].value}</h5>
          <h5 className="el1">{el[1].value}</h5>
          <h5 className="el1">{el[2].value}</h5>
          <h5 className="el1">{el[3].value}</h5>
          <h5 className="el1">{el[4].value}</h5>
          <div className="el1">
            <button onClick={() => setIdDel(el[0].value)}>Del</button>
            <button>Update</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;
