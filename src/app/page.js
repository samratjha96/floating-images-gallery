'use client';
import { floating1, floating2, floating3, floating4, floating5, floating6, floating7, floating8 } from '@/data';
import Image from 'next/image'
import { useRef } from 'react'
import gsap from 'gsap'

export default function Home() {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if(requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate)
    }
  }

  const lerp = (start, target, amount) => start * (1 - amount) +target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}`})
    gsap.set(plane2.current, { x: `+=${xForce} * 0.5`, y: `+=${yForce} * 0.5`})
    gsap.set(plane3.current, { x: `+=${xForce} * 0.25`, y: `+=${yForce} * 0.25`})

    if(Math.abs(xForce) < 0.01) xForce = 0;
    if(Math.abs(yForce) < 0.01) yForce = 0;

    if(xForce !== 0 || yForce !== 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId)
      requestAnimationFrameId = null;
    }
  }

  return (
    <main className="flex min-h-screen w-screen overflow-hidden relative" onMouseMove={(e) => {manageMouseMove(e)}}>
      <div ref={plane1} className='absolute w-full h-full brightness-75'>
        <Image src={floating1} alt='image' width={300} className='absolute left-[90%] top-[70%]'/>
        <Image src={floating2} alt='image' width={300} className='absolute left-[5%] top-[65%]'/>
        <Image src={floating7} alt='image' width={225} className='absolute left-[35%] top-[0%]'/>
      </div>
      <div ref={plane2} className='absolute w-full h-full brightness-[0.6]'>
        <Image src={floating4} alt='image' width={250} className='absolute left-[5%] top-[10%]'/>
        <Image src={floating6} alt='image' width={200} className='absolute left-[80%] top-[5%]'/>
        <Image src={floating8} alt='image' width={225} className='absolute left-[60%] top-[60%]'/>
      </div>
      <div ref={plane3} className='absolute w-full h-full brightness-50'>
        <Image src={floating3} alt='image' width={150} className='absolute left-[65%] top-[2.5%]'/>
        <Image src={floating5} alt='image' width={200} className='absolute left-[40%] top-[75%]'/>
      </div>
      <div className='absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2'>
        <h1 className='text-xl text-white-500 text-center m-0 font-normal'>Floating Images Gallery</h1>
        <p className='text-gray-500 m-0 text-center mt-[10px]'>Next.js and GSAP</p>
      </div>
    </main>
  )
}
