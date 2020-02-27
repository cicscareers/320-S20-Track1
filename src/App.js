import React from 'react';
import logo from './logo.svg';
import './App.css';
import stepper from './stepper.js';
import appbar from './appbar.js';
import select from './select.js';
import scroll from './scroll.js'
import check from './check.js'
import field from './field.js';
import imgrid from './imgrid.js';
var m1=require('./mockup2.PNG');
var m2=require('./mockup.PNG');
var m3=require('./mockup3.PNG');
function App(){
  return (
    <div className="App">

      <div>
          {scroll()}
        </div>
        <div>
          {appbar()}
        </div>
      <div>
          {stepper()}
        </div>
        <div>
          {select()}
        </div>
        <div>
          {check()}
        </div>
        <div>
          {field()}
        </div>
        <div>
          {imgrid()}
        </div>
    </div>
  );
}

export default App;
