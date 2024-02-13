import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Rating from '@mui/material/Rating';

function AddReview() {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("0");
    const [validated, setValidated] = useState(false);
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            console.log('f1')
        } else {
            event.preventDefault();
            console.log(rating, review)
        }
    };
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className='InputGroup'>
                    <h6>Add Review</h6>
                    <Rating
                        defaultValue={0}
                        sx={{ fontSize: 25 }}
                        onChange={(e) => {
                            setRating(e.target.value)
                            console.log(e.target.value)
                        }}
                    />
                    <Form.Control
                        className='InputField h-auto'
                        required
                        as="textarea"
                        rows={3}
                        placeholder='Add your Review her......'
                        onChange={(e) => setReview(e.target.value)}
                    />
                </Form.Group>
                <div className="flex justify-center">
                    <button type="submit" className="text-2xl bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-3xl w-full m-4 h-16">
                        Save
                    </button>
                </div>
            </Form>
        </>
    )
}

export default AddReview