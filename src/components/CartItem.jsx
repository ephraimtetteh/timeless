import React from 'react'
import { ChevronDown, ChevronUp } from '../constants/icons'
import { useDispatch } from 'react-redux'
import { decrease, increase, removeItem } from '../lib/features/cart/cartSlice'


const CartItem = ({ id, img, title, amount, price}) => {

  const dispatch = useDispatch()

  return (
    <div className='cart-item'>
      <img src={img} alt="image" className='mb-4' />
      <div>
        <h4>{title}</h4>
        <h4>le {price}</h4>
        <button>remove</button>
      </div>

      <div>
        <p>{amount}</p>
      </div>

      <div>
        <button onClick={() => dispatch(increase(id))}>{<ChevronUp />}</button>
        <button onClick={() => {
          if(amount === 1){
            dispatch(removeItem(id))
            return
          } else{
            dispatch(decrease(id))
          }
        }} >{<ChevronDown />}</button>
      </div>
    </div>
  )
}

export default CartItem