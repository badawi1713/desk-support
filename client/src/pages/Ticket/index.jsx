import { BackButton, TicketItem } from 'components'
import { getTickets } from 'features/ticket/ticketSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Ticket = () => {
  const dispatch = useDispatch()
  const { tickets } = useSelector(state => state.ticket)
  useEffect(() => {
    const getTicketData = () => {
      dispatch(getTickets())
    }
    return getTicketData()
  }, [dispatch])

  return (
    <>
      <BackButton url={'/'} />
      <section className="heading">
        <h1>Ticket</h1>
      </section>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        {tickets?.map(item => (
          <TicketItem key={item._id} ticket={item} />
        ))}
      </div>
      <br />
    </>
  )
}

export default Ticket