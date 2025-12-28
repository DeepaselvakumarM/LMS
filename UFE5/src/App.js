import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext=createContext(null)
const StoreContextProvider=(props)=>{

const[cart,setCart]=useState({})
const addTocart=(itemId)=>{
    if(!cart[itemId]){
        setCart((prev)=>({...prev,[itemId]:1}))
    }
    else{
        setCart((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
}
const removecart=(itemId)=>{
    setCart((prev)=>({...prev,[itemId]:prev[itemId]-1}))
}
const cartAmount=()=>{
    let totalAmount=0;
    for(const item in cart){
        if(cart[item]>0){
        let itemInfo=food_list.find((product)=>product.id===item);
        totalAmount+=itemInfo.price *cart[item];
    }
}
return totalAmount
}
    const contextValue={
        food_list,
        cart,
        setCart,
        addTocart,
        removecart,
        cartAmount



    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider
