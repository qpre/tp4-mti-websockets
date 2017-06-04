import React from 'react';
import { connect } from 'react-redux';

const Button = ({ onClick, symbol, color }) => (
  <div
    style={{
      ...styles.default,
      backgroundColor: color || styles.default.backgroundColor,
    }}
    onClick={(e) => onClick && onClick(e)}
  >{symbol}</div>
);

const styles = {
  default: {
    display: 'inline-block',
    width: '19px',
    height: '18px',
    textAlign: 'center',
    backgroundColor: 'gray',
    borderRadius: '50%',
    fontSize: '12px',
    lineHeight: '18px',
    cursor: 'pointer',
  }
}

export default Button;