import { login } from 'features/auth/authSlice'
import React, { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

  const dispatch = useDispatch()
  const { isLoading,  } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password, } = formData


  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Please login</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input disabled={isLoading} required autoComplete='username' type="email" value={email} onChange={onChange} placeholder="Your email..." name="email" className="form-control" id="email" />
          </div>
          <div className="form-group">
            <input disabled={isLoading} required autoComplete='new-password' type="password" value={password} onChange={onChange} placeholder="Your password..." name="password" className="form-control" id="password" />
          </div>
          <div className="form-group">
            <button disabled={isLoading} className="btn btn-block" type='submit'>SIgn In</button>
          </div>
          <br />
        </form>
      </section>
    </>
  )
}

export default Login