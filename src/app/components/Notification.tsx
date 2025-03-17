'use client'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Notification({ message, type }: { message: string, type: 'success' | 'error' | 'warning' | 'info' }) {

    useEffect(() => {
        toast[type](message)
    }, [])

    return (
        <ToastContainer position='top-center' theme='colored' />
    )
}