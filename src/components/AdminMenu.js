import React, { useEffect, useState } from "react";
import AddEditMenu from './AddEditMenu'

import { db } from '.././util/firebase';

function AdminMenu() {
    const [menuItems, setMenuItems] = useState([]);
    const [currentId, setCurrentId] = useState("");

    const getLinks = async () => {
        db.collection("menu").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
        });
        setMenuItems(docs);
        });
    };

    const onDeleteLink = async (id) => {
        if (window.confirm("are you sure you want to delete this link?")) {
        await db.collection("menu").doc(id).delete();
        console.log('Link removido');
        }
    };

    useEffect(() => {
        getLinks();
    }, []);

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("menu").doc().set(linkObject);
        console.log('link añadido');

      } else {
        await db.collection("menu").doc(currentId).update(linkObject);
        console.log('link actualizado');
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-md-4 p-2">
        <AddEditMenu {...{ addOrEditLink, currentId, links: menuItems }} />
      </div>
      <div className="col-md-8 p-2">
        {menuItems.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.nombre}</h4>
              </div>
              <p>{link.precio}</p>
              <a>{link.categoria}</a>
                <div>
                    <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                    >
                    Borrar
                    </i>
                    <br/>
                    <i
                    className="material-icons"
                    onClick={() => setCurrentId(link.id)}
                    >
                    Editar
                    </i>
                </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminMenu;
