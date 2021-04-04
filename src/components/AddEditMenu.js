import React, { useState, useEffect } from "react";

import { db } from '.././util/firebase';

function AddEditMenu(props) {
    const initialStateValues = {
        precio: "",
        nombre: "",
        categoria: "",
      };
    
      const [values, setValues] = useState(initialStateValues);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };
    
    //   const validURL = (str) => {
    //     var pattern = new RegExp(
    //       "^(https?:\\/\\/)?" + // protocol
    //       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    //       "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    //       "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    //       "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    //         "(\\#[-a-z\\d_]*)?$",
    //       "i"
    //     ); // fragment locator
    //     return !!pattern.test(str);
    //   };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        props.addOrEditLink(values);
        setValues({ ...initialStateValues });
      };
    
      const getLinkById = async (id) => {
        const doc = await db.collection("menu").doc(id).get();
        setValues({ ...doc.data() });
      };
    
      useEffect(() => {
        if (props.currentId === "") {
          setValues({ ...initialStateValues });
        } else {
          getLinkById(props.currentId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.currentId]);
    
      return (
        <form onSubmit={handleSubmit} className="card card-body border-primary">
          <div className="form-group input-group">
            <br/>
            <label>Precio</label>
            <br/>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese el precio"
              value={values.precio}
              name="precio"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group input-group">
            <br/>
            <label>Nombre</label>
            <br/>
            <input
              type="text"
              value={values.nombre}
              name="nombre"
              placeholder="Ingrese el nombre"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <br/>
            <label>Categoría</label>
            <br/>
            <input
              type="text"
              value={values.categoria}
              name="categoria"
              placeholder="Ingrese la categoría"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
    
          <button className="btn btn-primary btn-block">
            {props.currentId === "" ? "Save" : "Update"}
          </button>
        </form>
      );
}

export default AddEditMenu;