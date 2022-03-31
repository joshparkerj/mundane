import React, { useState } from 'react';
import { Motion, spring, presets } from 'react-motion';
import PropTypes from 'prop-types';

import './market-modal.scss';

import ModalContainer from './ModalContainer';

const MarketModal = function MarketModal({
  display, changeState, changeToggle, handleLogin, handleRegister,
}) {
  const [register, setRegister] = useState(false);

  const handleMouseDown = () => {
    setRegister(!register);
  };

  const renderModalContainer = ({ position, modalOpacity }) => (
    <ModalContainer
      position={position}
      modalOpacity={modalOpacity}
      changeState={changeState}
      changeToggle={changeToggle}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      handleMouseDown={handleMouseDown}
    />
  );

  return (
    <Motion
      style={{
        position: spring(register ? 1 : 0, presets.gentle),
        modalOpacity: spring(display ? 1 : 0, presets.noWobble),
      }}
    >
      {renderModalContainer}
    </Motion>
  );
};

MarketModal.propTypes = {
  display: PropTypes.number.isRequired,
  changeState: PropTypes.func.isRequired,
  changeToggle: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
};

export default MarketModal;
