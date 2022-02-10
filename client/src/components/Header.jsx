import { logout, reset } from 'features/auth/authSlice'
import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Header = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(reset())
        dispatch(logout())
    }

    return (
        <header className="header">
            <div className="logo">
                <Link to='/'>
                    Support Desk
                </Link>
            </div>
            <ul>
                <li>
                    {user ?
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt />
                            Logout</button>
                        : <Link to='/login'>
                            <FaSignInAlt />
                            Login</Link>}
                </li>
                {
                    !user && <li>
                        <Link to='/register'>
                            <FaUser />
                            Register</Link>
                    </li>
                }
            </ul>
        </header>
    )
}

export default Header