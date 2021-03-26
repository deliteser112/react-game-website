import React from 'react';
import PropTypes from 'prop-types';

const Close = ({size, color, opacity})=> <svg width={size || '13'} height={size|| '13'} viewBox="0 0 13 13" fill={color || 'none'} xmlns="http://www.w3.org/2000/svg">
  <g opacity={opacity || '1'}>
    <path d="M11.5708 1.25058L1.5708 11.2506" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.5708 1.25058L11.5708 11.2506" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
</svg>;

Close.propTypes={
  size: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.string
};

export default Close;