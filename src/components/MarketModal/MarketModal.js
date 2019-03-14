import React, { Component } from 'react';
import './market-modal.scss';
import { Motion, spring, presets } from 'react-motion';
import ModalContainer from './ModalContainer';

class MarketModal extends Component {

  state = {
    register: false,
    closeModal: false,
  }

  handleMouseDown = () => {
    this.setState({ register: !this.state.register });
  }

  renderModalContainer = ({ position, modalOpacity }) => {
    const { props: { changeState, changeToggle, handleLogin, handleRegister }, handleMouseDown } = this;
    return (
      <ModalContainer
        position={position}
        modalOpacity={modalOpacity}
        changeState={changeState}
        changeToggle={changeToggle}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        handleMouseDown={handleMouseDown}
      />
    )
  }

  render() {
    const { props: { display }, state: { register }, } = this;
    return (
      <Motion
        style={{
          position: spring(register ? 1 : 0, presets.gentle),
          modalOpacity: spring(display ? 1 : 0, presets.noWobble)
        }}
      >
        {this.renderModalContainer}
      </Motion>
    )
  }

}

export default MarketModal;
