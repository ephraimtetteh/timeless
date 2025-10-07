import React from 'react'
import { productImages } from '../assets/assets'
import { MdDeleteOutline } from "react-icons/md";

const Checkout = () => {
  return (
    <div className=' lg:grid lg:grid-cols-2 md:grid-cols-2 items-start justify-start gap-8 lg:px-20 py-40 px-6'>
        {/* left side */}
        <div className='lg:grid max-sm:mb-4 md:mb-4' >
            <h2 className='font-semibold text-4xl  lg:grid py-2 pb-12'>Your Product List</h2>
            <article className='lg:flex md:flex md:mb-4 max-sm:mb-4 gap-8 border rounded-2xl p-4'>
                <div className='flex items-center justify-center'>
                    <img src={productImages.gisade} alt="" width={100} />
                    <div className='flex gap-2'>
                        <p className='border-pink-300 border p-2 rounded-full font-bold text-xl'>+</p>
                        <p className='border-black border text-black font-bold text-2xl p-2 rounded-full'>0</p>
                        <p className='border-pink-300 border p-2 rounded-full font-bold text-xl'>-</p>
                    </div>
                </div>
                <div>
                    <h3 className='text-xl font-medium'>Gisada Tonka Cola</h3>
                    <p className='py-2 text-[18px]'>Type: <span className='font-bold'>Eau de Parfum</span></p>
                <p className='py-2 text-[18px]'>Size: <span className='font-bold'>120 Ml</span></p>
                </div>
                <div>
                    <h1 className='text-[18px] font-bold'>Price</h1>
                    <h2 className='font-medium text-xl'>GHS 1200</h2>
                </div>
                <div>
                    <h1 className='text-[18px] font-bold'>Delete</h1>
                    <MdDeleteOutline className='fill-red-400 size-8' />
                </div>
            </article>
            <article className='lg:flex md:flex md:mb-4 max-sm:mb-4 gap-8 border rounded-2xl p-4'>
                <div className='flex items-center justify-center'>
                    <img src={productImages.gisade} alt="" width={100} />
                    <div className='flex gap-2'>
                        <p className='border-pink-300 border p-2 rounded-full font-bold text-xl'>+</p>
                        <p className='border-black border text-black font-bold text-2xl p-2 rounded-full'>0</p>
                        <p className='border-pink-300 border p-2 rounded-full font-bold text-xl'>-</p>
                    </div>
                </div>
                <div>
                    <h3 className='text-xl font-medium'>Gisada Tonka Cola</h3>
                    <p className='py-2 text-[18px]'>Type: <span className='font-bold'>Eau de Parfum</span></p>
                <p className='py-2 text-[18px]'>Size: <span className='font-bold'>120 Ml</span></p>
                </div>
                <div>
                    <h1 className='text-[18px] font-bold'>Price</h1>
                    <h2 className='font-medium text-xl'>GHS 1200</h2>
                </div>
                <div>
                    <h1 className='text-[18px] font-bold'>Delete</h1>
                    <MdDeleteOutline className='fill-red-400 size-8' />
                </div>
            </article>
           
           
        </div>
        {/* middle  */}
        <div>
        <h2 className='font-semibold text-4xl py-2 pb-12'>Your Cart Summary</h2>
            <article className='border rounded-2xl '>
                <div className=' lg:flex justify-between gap-8 p-2'>
                    <div>
                        <h2 className='font-medium text-xl'>Subtotal Product</h2>
                    </div>
                    <div>
                        <h3 className='text-xl font-medium'>GHS 1200.00</h3>
                    </div>
                </div>
                <div className=' lg:flex justify-between gap-8 p-2'>
                    <div>
                        <h2 className='font-medium text-xl'>Delivery Fee:</h2>
                    </div>
                    <div>
                        <h3 className='text-xl font-medium'>GHS 0.00</h3>
                    </div>
                </div>
                <div className=' lg:flex justify-between gap-8 p-2'>
                    <div>
                        <h2 className='font-medium text-xl'>Tax</h2>
                    </div>
                    <div>
                        <h3 className='text-xl font-medium'>GHS 0.00</h3>
                    </div>
                </div>
                
                <div className='p-4 m-auto items-center flex gap-4 justify-center'>
                    <button className='py-2 px-4 bg-black text-white rounded-full cursor-pointer'>CheckOut Now</button>
                    <button className='py-2 px-4 bg-amber-300 rounded-full cursor-pointer'>Pay with Momo</button>
                </div>
                
            </article>
        </div>
        {/* right side */}
    </div>
  )
}

export default Checkout