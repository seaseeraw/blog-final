import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function Comment() {
  const [comment, setComment] = useState('');

  const handleOnChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
    console.log(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Comment:', comment);
  };

  return (
    <>
     
      <FloatingLabel controlId="floatingTextarea2" label="Comments" onSubmit={handleOnSubmit}>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          value={comment}
          onChange={handleOnChange}
        />
      </FloatingLabel>
      <Button variant="primary">Submit</Button>
    </>
  );
}

export default Comment;