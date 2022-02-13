import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (
        <>
            <section className="heading">
                <h1>Sorry, Not Found</h1>
            </section>
            <br />
            <Link to="/" className='btn'>Back to Home</Link>
        </>
    )
}

export default Page404