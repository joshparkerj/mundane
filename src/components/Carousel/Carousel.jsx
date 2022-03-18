import React from 'react';
import './carousel.scss';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import CarouselSlides from './CarouselSlides';
import slides from './slides';

function CustomArrow({ className, onClick, dir }) {
  return (
    <div tabIndex="-1" role="button" {...{ className, onClick }} onKeyPress={onClick}>
      <i className={`fas fa-long-arrow-alt-${dir}`} style={{ color: '#000' }} />
    </div>
  );
}

function CustomPrevArrow({ className, onClick }) {
  return <CustomArrow {...{ className, onClick }} dir="left" />;
}

function CustomNextArrow({ className, onClick }) {
  return <CustomArrow {...{ className, onClick }} dir="right" />;
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
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  dir: PropTypes.string.isRequired,
};

CustomPrevArrow.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

CustomNextArrow.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Carousel.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Carousel;
