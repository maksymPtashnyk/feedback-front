import React, { useState } from 'react';
import { Input, Button, Box } from '@mui/material';

const ReviewForm = ({park}) => {
  const [review, setReview] = useState('');
  const [userName, setUserName] = useState('');

  const handleChangeFeedback = (event) => {
    setReview(event.target.value);
  };
  const handleChangeName = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      userName: userName,
      review: review,
      park,
    };

    try {
      const response = await fetch('https://feedback-back.vercel.app/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Відгук надіслано успішно');
      } else {
        console.error('Помилка надсилання відгуку');
      }
    } catch (error) {
      console.error('Помилка надсилання відгуку:', error);
    }

    setReview('');
    setUserName('');
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, backgroundColor: 'azure' }}>
      <h2>Залиште свій відгук про парк {park}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Ваше ім'я"
          multiline
          type='text'
          disableUnderline={true}
          value={userName}
          onChange={handleChangeName}
          fullWidth
          placeholder="Ваше ім'я"
          required
          sx={{
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '5px',
            marginBottom: '20px',
          }}
        />
        <Input
          label="Ваш відгук"
          multiline
          disableUnderline={true}
          value={review}
          onChange={handleChangeFeedback}
          fullWidth
          placeholder='Ваш відгук'
          required
          sx={{
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '5px',
            marginBottom: '20px',
            flexDirection: 'column'
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Надіслати відгук
        </Button>
      </form>
    </Box>
  );
};

export default ReviewForm;
