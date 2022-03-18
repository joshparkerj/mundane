import React from 'react';
import PropTypes from 'prop-types';

function CarouselSlides({ title, image, color }) {
  return (
    <div className="test-div" style={{ borderColor: color }}>
      <h3 style={{ color }}>{title}</h3>
      <div
        className="carousel-image"
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
}

CarouselSlides.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CarouselSlides;
