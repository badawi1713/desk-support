import { BackButton, NoteItem } from 'components'
import { createNotes, getNotes } from 'features/notes/notesSlice'
import { closeTicket, getTicketDetail } from 'features/ticket/ticketSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FaPlus, FaTimes } from 'react-icons/fa'
import Modal from 'react-modal'

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

const TicketDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { ticket } = useSelector(state => state.ticket)
    const { notes, isLoading: notesLoading } = useSelector(state => state.notes)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')

    useEffect(() => {
        dispatch(getTicketDetail(id))
        dispatch(getNotes(id))
    }, [id, dispatch])

    const onTicketClose = () => {
        dispatch(closeTicket(id))
        navigate('/tickets')
    }

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const onNoteSubmit = async (e) => {
        e.preventDefault()
        await dispatch(createNotes({ text: noteText, id: id }))
        await dispatch(getNotes(id))
        await setNoteText('')
        await closeModal()
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
            {ticket.status !== 'closed' && (
                <button onClick={openModal} className='btn'>
                    <FaPlus /> Add Note
                </button>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Add Note'
            >
                <h2>Add Note</h2>
                <button className='btn-close' onClick={closeModal}>
                    <FaTimes />
                </button>
                <form onSubmit={onNoteSubmit}>
                    <div className='form-group'>
                        <textarea
                            name='noteText'
                            id='noteText'
                            className='form-control'
                            placeholder='Note text'
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <button className='btn' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

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