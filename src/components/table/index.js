import React, { useEffect, useState } from 'react';

import './Table.css';

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function someData() {
      const respons = await fetch('https://frontend-test.netbox.ru/');
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
        <h2 className="el">do</h2>
      </div>
      {data.map((el) => (
        <div key={el[0].value} className="data">
          <h4 className="el">{el[0].value}</h4>
          <h4 className="el">{el[1].value}</h4>
          <h4 className="el">{el[2].value}</h4>
          <h4 className="el">{el[3].value}</h4>
          <h4 className="el">{el[4].value}</h4>
          <div className="el">
            <button>Del</button>
            <button>Update</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;
