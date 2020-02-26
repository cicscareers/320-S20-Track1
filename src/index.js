import React from 'react';
import ReactDOM from 'react-dom';
// Create a React element assign a name, any attributes
// and a child element like the text Hello World
var hW1 = React.createElement('h3', null, 'Hello World')
var hW2 = React.createElement('h3', null, 'Nice to Meet You')

// You can add child elements to another element
var div1 = React.createElement('div', null, hW1, hW2);

// Render element in the browser
// You can only render 1 element at a time
ReactDOM.render(
  div1,
  document.getElementById('app')
)
