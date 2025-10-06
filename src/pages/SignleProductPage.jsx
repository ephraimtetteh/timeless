import React from 'react'
import { productImages } from '../assets/assets'
import { FaArrowRight, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const SignleProductPage = () => {
  return (
    <div className=' lg:grid lg:grid-cols-3 items-start justify-start gap-4 lg:px-20 py-40 px-6'>
        {/* left side */}
        <div className='px-6'>
            <img src={productImages.gisade} alt="" />
            <div className='flex flex-3 gap-3 items-center justify-center py-6'>
                <img src={productImages.gisade} alt=""  className='w-[150px] h-[150px] border border-gray-300 rounded-2xl shadow-xl'/>
                <img src={productImages.gisade} alt=""  className='w-[150px] h-[150px] border border-gray-300 rounded-2xl shadow-xl'/>
                {/* <img src={productImages.gisade} alt=""  className='w-[150px] h-[150px] border border-gray-300 rounded-2xl shadow-xl'/> */}
            </div>
        </div>
        {/* middle */}
        <div className='lg:px-20'>
            <h2 className='font-semibold text-4xl uppercase py-2' >Gisada Tonka Cola</h2>
            <article className='py-2'>
                <p className='py-2 text-[18px]'>Gender: <span className='font-bold'>Unisex</span></p>
                <p className='py-2 text-[18px]'>Type: <span className='font-bold'>Eau de Parfum</span></p>
                <p className='py-2 text-[18px]'>Size: <span className='font-bold'>120 Ml</span></p>
            </article>
            <article className='border-t border-b border-gray-200 py-4'>
                <h3 className='text-3xl font-bold py-2'>GHS 1,6000.00</h3>
                <small className='flex gap-3 py-2'>
                    <span className='text-2xl'>4 stars</span>
                    <span className='text-2xl'>(3 Reviews)</span>
                </small>
            </article>
            <article className='grid py-8'>
                <button className='flex  items-center gap-3 bg-pink-400 py-4 px-8 text-white text-2xl justify-center'>
                <FaArrowRight />
                    Place Order
                </button>
                <div>
                <div className='py-8 flex gap-3'>
                    <FaFacebookF className='border border-pink-500 p-6 size-18 rounded-full'/>
                    <FaInstagram  className='border border-pink-500 p-6 size-18 rounded-full'/>
                    <FaTwitter className='border border-pink-500 p-6 size-18 rounded-full'/>
                </div>

                </div>
            </article>
        </div>
        {/* right side */}
        <div>
            <h3 className='text-4xl font-semibold py-2 underline'>Description</h3>
            <p className='py-4 text-xl'>Mancera Tonka Cola Eau De Parfum is a vibrant, fun, and energetic fragrance that embodies energy and charm. It features bergamot, lemon, orange, ginger, mint, cola, tonka bean, amber, and vanilla. Perfect for both daytime and evening wear, it’s presented in a stylish bottle.</p>
        </div>
    </div>
  )
}

export default SignleProductPage