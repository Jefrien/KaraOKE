'use client'

import { useEffect, useState } from "react";

export default function Progress({ progress, duration, setProgress }: { progress: number, duration: number, setProgress: (progress: number) => void }) {

    const [mouseDown, setMouseDown] = useState(false);

    const handleClickProgress = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = (clickX / rect.width) * 100;

        const newProgress = percent * duration / 100;

        setProgress(newProgress);
    }

    useEffect(() => {
        const handleMouseUp = () => {
            setMouseDown(false);
            console.log('mouseUp');
        };

        if (mouseDown) {
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseDown]);

    return (
        <div className="w-full bg-white/20 rounded-full cursor-pointer"
            onClick={handleClickProgress}
            onMouseDown={() => setMouseDown(true)}
            onMouseMove={(e) => {
                console.log('mouseDown', mouseDown);
                if (mouseDown) {
                    handleClickProgress(e);
                }
            }}
        >
            <div className="h-2 bg-gradient-to-r from-emerald-300 to-emerald-200 relative rounded-full transition-all cursor-pointer"
                style={{ width: `${progress}%` }}>
                <div className="h-3 w-3 bg-white rounded-full absolute top-1/2 -right-1 -translate-y-1/2"></div>
            </div>
        </div>
    )
}