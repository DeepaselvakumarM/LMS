import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';
import campus from "../img2.jpg";

// Library images (replace with your actual image paths)
import Library1 from "../l1.jpg";
import Library2 from  '../l2.jpg';
import Library3 from  '../l3.jpg';

const CarouselContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '700px',
  overflow: 'hidden',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  '@media (max-width: 900px)': {
    height: '400px'
  },
  '@media (max-width: 600px)': {
    height: '300px'
  }
});

const Slide = styled(Box)(({ active }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: active ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
  display: 'flex',
  alignItems: 'flex-end',
  padding: '2rem',
  boxSizing: 'border-box'
}));

const SlideContent = styled(Box)({
  backgroundColor: 'rgba(0,0,0,0.6)',
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '4px',
  maxWidth: '60%',
  '@media (max-width: 600px)': {
    maxWidth: '80%',
    padding: '0.5rem 1rem'
  }
});

const DotsContainer = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '10px'
});

const Dot = styled(Box)(({ active }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: active ? '#fff' : 'rgba(255,255,255,0.5)',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '@media (max-width: 600px)': {
    width: '10px',
    height: '10px'
  }
}));

const LibraryCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const slides = [
    {
        image:Library1,
      title: 'Reservation of books',
      description: 'Reserve your books on your own comfort'
    },
    {
        image:Library2,
      title: 'Vast Collection',
      description: 'Access thousands of books across all disciplines'
    },
    {
      image:Library3,
      title: 'Checking availiblity',
      description: 'Perfect search and checking availiblity of books'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <CarouselContainer>
      {slides.map((slide, index) => (
        <Slide
          key={index}
          active={index === currentSlide}
          sx={{
            backgroundImage: `url(${slide.image})`
          }}
        >
          <SlideContent>
            <h2 style={{ 
              margin: 0, 
              fontSize: isMobile ? '1.2rem' : '1.8rem',
              marginBottom: '0.5rem'
            }}>
              {slide.title}
            </h2>
            <p style={{ 
              margin: 0, 
              fontSize: isMobile ? '0.8rem' : '1rem'
            }}>
              {slide.description}
            </p>
          </SlideContent>
        </Slide>
      ))}
      
      <DotsContainer>
        {slides.map((_, index) => (
          <Dot 
            key={index} 
            active={index === currentSlide} 
            onClick={() => goToSlide(index)} 
          />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

export default LibraryCarousel;