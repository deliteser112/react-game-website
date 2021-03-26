import React from 'react';

const Menu = ({ size, color }) => <svg width={size || '23'} height={size - 1 || '22'} viewBox='0 0 23 22' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 11H22' stroke={color || 'white'} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' /><path d='M1 1H22' stroke={color || 'white'} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' /><path d='M1 21H22' stroke={color || 'white'} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
</svg>;

export default Menu;