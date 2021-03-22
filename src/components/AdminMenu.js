import React, { useState, useEffect } from 'react';
// import firebase from '../util/firebase';
import { getMenuItems, addOrEditMenuItem } from './../crud/firebase-crud'

function AdminMenu() {

    const item =  {
        categoria: "Hola",
        nombre: "holas",
        precio: 10 
    }
    
    const getMenu = async () => {
        const menu = await getMenuItems();
        console.log(menu);
    }
    
    const addMenuItems = () => {
        addOrEditMenuItem(item)
    }
    
    // getMenu();
    addMenuItems();

    return (
        <div className="container">

        </div>
    )
}

export default AdminMenu;
