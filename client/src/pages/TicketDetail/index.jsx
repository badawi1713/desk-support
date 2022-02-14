import { BackButton, NoteItem } from 'components'
import { getNotes } from 'features/notes/notesSlice'
import { closeTicket, getTicketDetail } from 'features/ticket/ticketSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const TicketDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { ticket } = useSelector(state => state.ticket)
    const { notes, isLoading: notesLoading } = useSelector(state => state.notes)

    useEffect(() => {
        dispatch(getTicketDetail(id))
        dispatch(getNotes(id))
    }, [id, dispatch])

    const onTicketClose = () => {
        dispatch(closeTicket(id))
        navigate('/tickets')
    }

    if (notesLoading) {
        return <p>Loading</p>
    }

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <BackButton url={'/tickets'} />
                <h2>Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <hr />

            </header>
            <section className="ticket-desc">
                <h3>Description of Issue</h3>
                <p>{ticket.description}</p>
            </section>
            {
                notes?.map(item => (
                    <NoteItem key={item._id} note={item} />
                ))
            }
            {
                ticket.status !== 'closed' && <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close</button>
            }
            <br />
        </div>
    )
}

export default TicketDetail