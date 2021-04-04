import React, { useEffect, useState } from "react";

import { db } from '.././util/firebase';

function Menu() {
    const [menuItems, setMenuItems] = useState([]);

    const getLinks = async () => {
        db.collection("menu").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
        });
        setMenuItems(docs);
        });
    };

    useEffect(() => {
        getLinks();
    }, []);

  return (
    <>
      <div className="col-md-8 p-2">
        {menuItems.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.categoria}</h4>
              </div>
              <p>{link.nombre}</p>
              <h1>{link.precio}</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Menu
