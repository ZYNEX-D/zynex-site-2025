// components/HeaderSM.js
"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/service" },
    { name: "Projects", href: "/project" },
    { name: "Contact", href: "/contact" },
];

export default function HeaderSM() {
    const pathname = usePathname();
    const router = useRouter();
    const lastNavTime = useRef(0);

    const currentIndex = links.findIndex(link => link.href === pathname) !== -1
        ? links.findIndex(link => link.href === pathname)
        : 0;

    const navigate = (direction) => {
        const now = Date.now();
        if (now - lastNavTime.current < 500) return; // Debounce 500ms

        let nextIndex = currentIndex + direction;

        // Clamp index
        if (nextIndex < 0) nextIndex = 0;
        if (nextIndex >= links.length) nextIndex = links.length - 1;

        if (nextIndex !== currentIndex) {
            lastNavTime.current = now;
            router.push(links[nextIndex].href);
        }
    };

    const handleWheel = (e) => {
        if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 20) {
            const direction = e.deltaX > 0 || e.deltaY > 0 ? 1 : -1;
            navigate(direction);
        }
    };

    const handleDragEnd = (event, info) => {
        if (info.offset.x < -50) {
            navigate(1); // Swipe Left -> Next
        } else if (info.offset.x > 50) {
            navigate(-1); // Swipe Right -> Prev
        }
    };


    return (
        <div
            className="w-full bg-white/20 backdrop-blur-[2px] fixed z-40 top-0 left-0 right-0 overflow-hidden h-16 block md:hidden"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)" }}
            onWheel={handleWheel}
        >
            <motion.div
                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -2000, right: 0 }}
                onDragEnd={handleDragEnd}
            >
                {links.map((link, index) => {
                    const offset = index - currentIndex;

                    // Determine visibility and position
                    // We only show current (0), previous (-1), and next (+1)
                    const isVisible = offset >= -1 && offset <= 1;

                    if (!isVisible) return null;

                    return (
                        <motion.div
                            key={link.href}
                            className="absolute flex items-center justify-center pointer-events-auto"
                            initial={false}
                            animate={{
                                x: offset * 120, // 120px spacing
                                scale: offset === 0 ? 1 : 0.8,
                                opacity: offset === 0 ? 1 : 0.6,
                                zIndex: offset === 0 ? 10 : 5,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <Link
                                href={link.href}
                                className={`whitespace-nowrap ${offset === 0 ? 'text-lg font-semibold' : 'text-sm'}`}
                                onClick={(e) => e.stopPropagation()} // Prevent drag from interfering with click
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
