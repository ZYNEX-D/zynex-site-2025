import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function HeaderLG() {
    const links = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/service" },
        { name: "Projects", href: "/project" },
        { name: "Contact", href: "/contact" },
    ];

    const pathname = usePathname();
    console.log(pathname);


  return (
    <div className='w-full fixed z-40 py-5 px-50 justify-around orbitron-400 hidden md:flex'>
        {links.map((link, index) => {
            return (
                <Link key={index} className='flex flex-col items-center justify-center hover:cursor-pointer hover:scale-105 transition-all duration-300' href={link.href}>{link.name} <span className={pathname === link.href ? 'w-full h-[2px] bg-white' : 'w-0 h-[2px] bg-white'}></span></Link>
            )
        })}
    </div>
  )
}
