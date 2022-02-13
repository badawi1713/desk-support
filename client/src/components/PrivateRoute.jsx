import { useAuthStatus } from 'hooks/useAuthStatus'
import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus()
    const checkIsLoggedIn = () => toast.error('You must login first')

    useEffect(() => {

        if (!checkingStatus) {
            if (!loggedIn) {
                checkIsLoggedIn()
            }
        }
    }, [checkingStatus, loggedIn])

    if (checkingStatus) {
        return <p>Loading</p>
    }



    return loggedIn ?
        <Outlet />
        : <>
            <Navigate to='/login' /></>
}

export default PrivateRoute