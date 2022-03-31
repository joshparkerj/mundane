import React from 'react';
import './carousel.scss';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import CarouselSlides from './CarouselSlides';
import slides from './slides';

function CustomArrow({ dir }) {
  return (
    <div tabIndex="-1" role="button">
      <i className={`fas fa-long-arrow-alt-${dir}`} style={{ color: '#000' }} />
    </div>
  );
}

function CustomPrevArrow() {
  return <CustomArrow dir="left" />;
}

function CustomNextArrow() {
  return <CustomArrow dir="right" />;
}

const Carousel = function Carousel({ handleChange }) {
  return (
    <Slider
      {...{
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        arrows: true,
        centerPadding: '10px',
        variableWidth: true,
        focusOnSelect: true,
        swipeToSlide: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
      }}
      afterChange={handleChange}
    >
      {slides.map(({ title, image, color }) => (
        <CarouselSlides
          color={color}
          title={title}
          image={image}
          key={title}
        />
      ))}
    </Slider>
  );
};

CustomArrow.propTypes = {
  dir: PropTypes.string.isRequired,
};

Carousel.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Carousel;
