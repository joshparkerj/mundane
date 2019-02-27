import React from 'react';

function PersonalAssistantContentHeader({pwc,nwc,dv}) {
  return (
    <div className='personal-assistant-content-header'>
      <div className='weeks-navigator-container'>
        <div className='personal-assistant-weeks-navigator-component'>
          <div className='prev-week-button'>
            <span className='prev-week'>Previous week / </span>
            <span className='prevWeekCounter'> {pwc}
              <i className="material-icons" id='chevronLeft'>chevron_left</i>
            </span>
          </div>
          <div className='week-indicator-wrapper'>
            <span className='week-indicator'> {dv}</span>
          </div>
          <div className='next-week-button'>
            <i className="material-icons" id='chevronRight'>chevron_right</i>
            <span className='next-week'>Next week / </span>
            <span className='nextWeekCounter'>
              {nwc}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default PersonalAssistantContentHeader;
