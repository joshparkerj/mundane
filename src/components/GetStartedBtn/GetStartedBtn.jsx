import React from 'react';
import './get-started-btn.scss';

function GetStartedBtn({ changeNav }) {
  return (
    <div>
      <button onClick={changeNav} className="get-started">Get Started</button>
    </div>
  );
}

export default GetStartedBtn;
