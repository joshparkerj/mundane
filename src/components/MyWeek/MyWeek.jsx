import React, { useState } from 'react';
import SectionTypeContainer from './SectionTypeContainer';
import PersonalAssistantContentHeader from './PersonalAssistantContentHeader';
import stcs from './stcs.json';
import './MyWeek.scss';

const MyWeek = function MyWeek() {
  const [personFilter, setPersonFilter] = useState('');
  const [stcState, setStcState] = useState({
    prevWeekHide: false,
    earlierHide: false,
    todayHide: false,
    upcomingHide: false,
    doneHide: false,
    prevWeeksAssignments: [{ task: 'one', number: 1 }, { task: 'two', number: 2 }, { task: 'three', number: 3 }, { task: 'four', number: 4 }],
    earlierThisWeek: [{ task: 'one', number: 1 }, { task: 'two', number: 2 }],
    today: [{ task: 'one', number: 1 }, { task: 'two', number: 2 }, { task: 'three', number: 3 }],
    upcoming: [{ task: 'one', number: 1 }, { task: 'two', number: 2 }, { task: 'three', number: 3 }],
    done: [{ task: 'one', number: 1 }],
  });

  // TODO: See if we'll need a way to modify the following values:
  const prevWeek = [1];
  const nextWeek = [1, 2];
  const date = 'Feb 2 - Feb 8';
  const username = 'Mr.user';
  const upcomingAssignments = 'You Don\'t have any assignments this week';
  const assignmentCount = [1, 2];

  const stcMapper = ({ hc, bt, nav }, i) => (
    <SectionTypeContainer
      hc={() => {
        const newStcState = { ...stcState };
        newStcState[hc] = !newStcState[hc];
        setStcState(newStcState);
      }}
      bt={bt}
      ac={assignmentCount.length}
      sdd={stcState[hc]}
      nav={stcState[nav]}
      key={i}
    />
  );

  return (
    <div className="my-week-main-container">
      <PersonalAssistantContentHeader
        pwc={prevWeek.length}
        nwc={nextWeek.length}
        dv={date}
      />
      <div className="personal-assistant-content-view">
        <div className="personal-assistant-content-component">
          <div className="header-container">
            <div className="personal-assistant-header-component">
              <img src="https://cdn.monday.com/assets/deadline/coffee_team.png" className="image-title" alt="" />
              <div className="pesonal-assistant-titles">
                <div className="first-title">
                  <span className="greeting">{username}</span>
                </div>
                <div className="second-title">
                  <span className="upcoming-assignments">{upcomingAssignments}</span>
                </div>
              </div>
            </div>
            <div className="personal-assistant-filter-wrapper">
              <div className="personal-assistant-filter-component">
                <div className="person-filter-input-wrapper">
                  <div className="pure-input">
                    <input value={personFilter} name="personFilter" onChange={({ target }) => setPersonFilter(target.value)} className="input person-filter-input" placeholder="Filter by person" />
                    <div className="tooltip">
                      <i className="material-icons" id="person">person_outline</i>
                      <span className="tooltiptext">Search by person</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="deadlines-task-container">
            <div className="deadline-tasks-section-component">
              {stcs.map(stcMapper)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWeek;
