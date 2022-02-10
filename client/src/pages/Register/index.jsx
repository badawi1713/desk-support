import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, password, confirmPassword } = formData


    const onChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords does not match')
        } else {
            
        }
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser />
                    Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input required type="text" value={name} onChange={onChange} placeholder="Your name..." name="name" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <input required autoComplete='username' type="email" value={email} onChange={onChange} placeholder="Your email..." name="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                        <input required autoComplete='new-password' type="password" value={password} onChange={onChange} placeholder="Your password..." name="password" className="form-control" id="password" />
                    </div>
                    <div className="form-group">
                        <input required autoComplete='new-password' type="password" value={confirmPassword} onChange={onChange} placeholder="Confirm password..." name="confirmPassword" className="form-control" id="confirmPassword" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block" type='submit'>Submit</button>
                    </div>
                    <br />
                </form>
            </section>
        </>
    )
}

export default Register