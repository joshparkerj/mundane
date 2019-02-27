import React, { Component } from 'react'
import './MyWeek.scss'
import SectionTypeContainer from './SectionTypeContainer';

const stcs = [
  {
    hc: 'prevWeekHide',
    bt: 'Previous Weeks /',
    nav: 'prevWeeksAssignments'
  },
  {
    hc: 'earlierHide',
    bt: 'Earlier This Week /',
    nav: 'earlierThisWeek'
  },
  {
    hc: 'todayHide',
    bt: 'Today /',
    nav: 'today'
  },
  {
    hc: 'upcomingHide',
    bt: 'Upcoming /',
    nav: 'upcoming'
  },
  {
    hc: 'doneHide',
    bt: 'Done /',
    nav: 'done'
  }
];

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
        <div className='personal-assistant-content-header'>
          <div className='weeks-navigator-container'>
            <div className='personal-assistant-weeks-navigator-component'>
              <div className='prev-week-button'>
                <span className='prev-week'>Previous week / </span>
                <span className='prevWeekCounter'> {this.getCount('prevWeek')}
                  <i class="material-icons" id='chevronLeft'>chevron_left</i>
                </span>
              </div>
              <div className='week-indicator-wrapper'>
                <span className='week-indicator'> {this.getValue('date')}</span>
              </div>
              <div className='next-week-button'>
                <i class="material-icons" id='chevronRight'>chevron_right</i>
                <span className='next-week'>Next week / </span>
                <span className='nextWeekCounter'> {this.getCount('nextWeek')}</span>
              </div>
            </div>
          </div>
        </div>
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
                        <i class="material-icons" id='person'>person_outline</i>
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
