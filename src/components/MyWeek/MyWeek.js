import React, { Component } from 'react'
import SectionTypeContainer from './SectionTypeContainer';
import PersonalAssistantContentHeader from './PersonalAssistantContentHeader';
import stcs from './stcs.json';
import './MyWeek.scss'

class MyWeek extends Component {

  state = {
    prevWeek: [1,],
    nextWeek: [1, 2,],
    date: 'Feb 2 - Feb 8',
    username: 'Mr.user',
    upcomingAssignments: "You don't have any assignments this week",
    personFilter: '',
    prevWeekHide: false,
    earlierHide: false,
    todayHide: false,
    upcomingHide: false,
    doneHide: false,
    prevWeeksAssignments: [{ task: "one", number: 1 }, { task: "two", number: 2 }, { task: "three", number: 3 }, { task: "four", number: 4 }],
    earlierThisWeek: [{ task: "one", number: 1 }, { task: "two", number: 2 }],
    today: [{ task: "one", number: 1 }, { task: "two", number: 2 }, { task: "three", number: 3 }],
    upcoming: [{ task: "one", number: 1 }, { task: "two", number: 2 }, { task: "three", number: 3 }],
    done: [{ task: "one", number: 1 }],
    assignmentCount: [1, 2,]
  }

  getCount = name => {
    return this.state[name].length;
  }

  getValue = name => {
    return this.state[name];
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  toggleState = name => {
    this.setState({ [name]: !this.state[name] });
  }

  stcMapper = (e, i) => {
    return (
      <SectionTypeContainer
        hc={() => this.toggleState(e.hc)}
        bt={e.bt}
        ac={this.getCount('assignmentCount')}
        sdd={this.state[e.hc]}
        nav={this.state[e.nav]}
        key={i}
      />
    );
  }

  render() {
    return (
      <div className="my-week-main-container">
        <PersonalAssistantContentHeader
          pwc={this.getCount('prevWeek')}
          nwc={this.getCount('nextWeek')}
          dv={this.getValue('date')}
        />
        <div className='personal-assistant-content-view'>
          <div className='personal-assistant-content-component'>
            <div className='header-container'>
              <div className='personal-assistant-header-component'>
                <img src="https://cdn.monday.com/assets/deadline/coffee_team.png" className='image-title' alt="" />
                <div className='pesonal-assistant-titles'>
                  <div className='first-title'>
                    <span className='greeting'>{this.getValue('username')}</span>
                  </div>
                  <div className='second-title'>
                    <span className='upcoming-assignments'>{this.getValue('upcomingAssignments')}</span>
                  </div>
                </div>
              </div>
              <div className='personal-assistant-filter-wrapper'>
                <div className='personal-assistant-filter-component'>
                  <div className='person-filter-input-wrapper'>
                    <div className='pure-input'>
                      <input value={this.state.personFilter} name='personFilter' onChange={this.handleChange} className='input person-filter-input' placeholder='Filter by person'></input>
                      <div className='tooltip'>
                        <i className="material-icons" id='person'>person_outline</i>
                        <span className='tooltiptext'>Search by person</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='deadlines-task-container'>
              <div className='deadline-tasks-section-component'>
                {stcs.map(this.stcMapper)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default MyWeek;
