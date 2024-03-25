import React, { useState } from 'react';
import { Input, Button, Box } from '@mui/material';

const ReviewForm = ({ park }) => {
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
    <Box sx={{
      marginTop: 6,
      margin: 'auto', // Збереження відступу зліва і справа, вирівнюючи по центру
      maxWidth: 300,
      padding: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.3)', // Прозорий фон
      borderRadius: '10px', // Заокруглені кути
      backdropFilter: 'blur(10px)', // Ефект розмиття
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' // Тінь
    }}>
      <h2>Залиште свій відгук про парк {park}</h2>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
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
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Прозорий фон
            borderRadius: '6px',
            padding: '10px',
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
          placeholder='Поділіться враженнями'
          required
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Прозорий фон
            borderRadius: '6px',
            padding: '10px',
            marginBottom: '20px',
          }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ margin: 'auto', display: 'block' }}>
          Надіслати відгук
        </Button>
      </form>
    </Box>
  );
};

export default ReviewForm;
