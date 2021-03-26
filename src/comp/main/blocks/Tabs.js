import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './tab.css';

const Tabs = ({ orientation, onTab }) => {
  const [active, setActive] = useState(orientation);
  return (<div className="tab-row">
    <h2 className={`tab-button ${active === 'horizontal' && 'active'}`}
      id="horizontal"
      onClick={e => {
        e.preventDefault();
        onTab(e.target.id);
        setActive(e.target.id);
      }}>
            Landscape games</h2>
    <h2 className={`heading-font tab-button ${active === 'vertical' && 'active'}`} id="vertical" onClick={e => {
      onTab(e.target.id);
      setActive(e.target.id);
    }}>Portrait games</h2>
  </div>);
};

Tabs.propTypes = {
  orientation: PropTypes.string,
  onTab: PropTypes.func
};


export default Tabs;