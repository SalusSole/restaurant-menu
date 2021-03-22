import { db } from '../util/firebase'

export const getMenuItems = async () => {

    const querySnapshot = await db.collection('menu').get();
    const menuItems = [];

    querySnapshot.forEach((doc) => {
        menuItems.push(
            {
                nombre: doc.data().nombre,
                precio: doc.data().precio,
                categoria: doc.data().categoria
            }
        );
    })

    return menuItems;
    
}

export const addOrEditMenuItem = async (linkObject, id='') => {
    try{

        if(id === ''){
            await db.collection('menu').doc().set(linkObject);
        } else {
            await db.collection('menu').doc(id).set(linkObject);
        }
    
    } catch (err) {
        console.log(err)
    }
}

export const deleteMenuItem = async (id) => {
    return await db.collection('menu').doc(id).delete();
}