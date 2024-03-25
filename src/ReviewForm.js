import React, { useState } from 'react';
import { Typography, Input, Button, Box, Modal } from '@mui/material';

const ReviewForm = ({ park }) => {
  const [review, setReview] = useState('');
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);

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
        setShowModal(true); // Показуємо модальне вікно після успішного відправлення
      } else {
        console.error('Помилка надсилання відгуку');
      }
    } catch (error) {
      console.error('Помилка надсилання відгуку:', error);
    }

    setReview('');
    setUserName('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Box sx={{
        marginTop: 6,
        marginInline: 3,
        maxWidth: 400,
        padding: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}>
        <Typography variant='h5' align='center' sx={{marginBottom: '20px'}}>Залиште свій відгук про парк {park}</Typography>
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
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '6px',
              padding: '10px',
              marginBottom: '20px',
            }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ margin: 'auto', display: 'block' }}>
            Надіслати
          </Button>
        </form>
      </Box>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 400,
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: 2,
          textAlign: 'center'
        }}>
          <Typography variant='h6'>Дякуємо за ваш відгук!</Typography>
          <Button variant="contained" color="primary" onClick={handleCloseModal} sx={{ marginTop: '20px' }}>Закрити</Button>
        </Box>
      </Modal>
    </>
  );
};

export default ReviewForm;
