import { createContext, useContext, useEffect, useState } from "react";
import { productData } from "../assets/assets";

export const StoreContext = createContext(null)
export const useStoreContext = () => useContext(StoreContext)

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({})


    const addToCart = (itemId) => {
        if(!cartItem[itemId]){
            setCartItem((prev) => ({...prev,[itemId]:1}))
        } else {
            setCartItem((prev) => ({...prev, [itemId]:prev[itemId] + 1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItem((prev) => ({...prev, [itemId]:prev[itemId] - 1}))
    }

    const getTotalCartAmount = () => {
        let TotalAmount = 0

        for (const item in cartItem){
            if(cartItem[item] > 0){
                let itemInfo = productData.find((product) => product.id === item)
                TotalAmount = itemInfo.price * cartItem[item]
            }
        }

        return TotalAmount
    }

    useEffect(() => {
        console.log(cartItem);
        
    }, cartItem)




    const contextValue = {
        productData,
        addToCart,
        removeFromCart,
        cartItem,
        setCartItem,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;