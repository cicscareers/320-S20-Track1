import React, { Component } from "react";
import Right from './matchRight.js';
import Left from './matchLeft.js';
const rightAlligned = {
  position: 'relative', left: '50%', top: '0%',
  transform: 'translate(0%, 0%)'
};
const leftAlligned = {
  position: 'relative', left: '0%', top: '0%',
  transform: 'translate(0%,0%)'
};

function Match(){
  return (
    <div>
      <div style={rightAlligned}>
        {Right()}
      </div>
      <div>
        {Left()}
      </div>
    </div>
  );
}
export default Match;