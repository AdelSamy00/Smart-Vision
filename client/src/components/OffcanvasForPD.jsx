import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/OffcanvasForPD.css'
import FormForProfileDetails from './FormForProfileDetails';
function OffcanvasForPD({ name, ...props }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button className='flex justify-around' variant="outline-secondary" onClick={handleShow}>
                <p className='inline text-2xl'>{name}</p>
                <EditIcon className='ml-2' />
            </Button>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header >
                    <Offcanvas.Title className='text-2xl'>Edit profile</Offcanvas.Title>
                    <button className="me-2" onClick={handleClose}>
                        <CloseIcon sx={{ fontSize: 30 }} />
                    </button>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FormForProfileDetails />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffcanvasForPD