import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function SplashScreen({ finishLoading }) {
    const [isMounted, setIsMounted] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);
    const [shouldFade, setShouldFade] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Check if finishLoading is a function (callback) or boolean
        const isFinished = typeof finishLoading === 'function' ? false : finishLoading;

        if (isFinished) {
            setShouldFade(true);
            const timeout = setTimeout(() => {
                setShouldRender(false);
            }, 500); // Match transition duration
            return () => clearTimeout(timeout);
        }
    }, [finishLoading]);

    // Auto-trigger after 3 seconds if callback provided
    useEffect(() => {
        if (typeof finishLoading === 'function') {
            const timeout = setTimeout(() => {
                setShouldFade(true);
                setTimeout(() => {
                    setShouldRender(false);
                    finishLoading();
                }, 500);
            }, 2000); // Show splash for 2 seconds
            return () => clearTimeout(timeout);
        }
    }, [finishLoading]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${shouldFade ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <Image src="/logo.svg" alt="Zynex logo" width={579} height={133} draggable={false} className="w-20 animate-pulse"/>
        </div>
    );
}
