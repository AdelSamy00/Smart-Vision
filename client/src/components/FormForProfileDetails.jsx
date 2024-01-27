import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/FormForProfileDetails.css'
function FormForProfileDetails() {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        event.preventDefault();
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='InputGroup'>
                <Form.Label className='FormLabel'>User Name</Form.Label>
                <Form.Control
                    className='InputField'
                    required
                    type="text"
                    defaultValue="User Name"
                    placeholder='User Name'
                />
            </Form.Group>
            <Form.Group className='InputGroup'>
                <Form.Label className='FormLabel' htmlFor="disabledSelect">Gender</Form.Label>
                <Form.Select className='InputField' id="disabledSelect" >
                    <option value='' disabled>Choose an option</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className='InputGroup'>
                <Form.Label className='FormLabel'>Address</Form.Label>
                <Form.Control className='InputField' type="text" placeholder="Address" required />
            </Form.Group>
            <div className="flex justify-center">
                <button type="submit" className="text-2xl bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-3xl w-full m-4 h-16">
                Save
                </button>
            </div>
            
        </Form>
    );
}

export default FormForProfileDetails;