import { BackButton } from 'components'
import { createNewTicket } from 'features/ticket/ticketSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const NewTicket = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { isLoading } = useSelector((state) => state.ticket)

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('iPhone')
    const [description, setDescription] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            product,
            description
        }

        dispatch(createNewTicket(data))

    }
    return (
        <>
            <BackButton url='/' />
            <section className="heading">
                <h1>Create a New Ticket</h1>
            </section>
            <section className='form'>
                <div className='form-group'>
                    <label htmlFor='name'>Customer Name</label>
                    <input type='text' className='form-control' value={name} disabled />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Customer Email</label>
                    <input type='text' className='form-control' value={email} disabled />
                </div>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='product'>Product</label>
                        <select
                            disabled={isLoading}
                            name='product'
                            id='product'
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        >
                            <option value='iPhone'>iPhone</option>
                            <option value='Macbook Pro'>Macbook Pro</option>
                            <option value='iMac'>iMac</option>
                            <option value='iPad'>iPad</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description of the issue</label>
                        <textarea
                            disabled={isLoading}
                            style={{ resize: 'none' }}
                            rows={6}
                            name='description'
                            id='description'
                            className='form-control'
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <button disabled={isLoading} className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
            <br />
        </>
    )
}

export default NewTicket