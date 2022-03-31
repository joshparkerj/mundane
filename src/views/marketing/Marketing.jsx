import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import WhyUs from './MarketWhyUs/MarketWhyUs';
import MarketingLanding from './MarketingLanding/MarketingLanding';
import MarketTopNav from '../../components/MarketTopNav/MarketTopNav';
import MarketFooter from '../../components/MarketFooter/MarketFooter';

const Marketing = function Marketing() {
  const [displayModal, setDisplayModal] = useState(false);

  const handleClick = () => setDisplayModal(!displayModal);

  return (
    <div>
      <MarketTopNav display={displayModal} toggle={handleClick} />
      <Switch>
        <Route path="/why-us" render={() => <WhyUs toggle={handleClick} />} />
        <Route path="*" render={() => <MarketingLanding toggle={handleClick} />} />
      </Switch>
      <MarketFooter />
    </div>
  );
};

export default Marketing;
