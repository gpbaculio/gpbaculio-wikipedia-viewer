import React, { Component } 
  from 'react';
import 'jquery-ui'
import $ from 'jquery';
import { Button } from 'semantic-ui-react'

class App extends Component {
 // initial state
 state = {
  currentQuote: '', 
  currentAuthor: '',
 }
 // share tweet config
 openURL = (url) => { 
   window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
 }

 inIframe = () => { 
  try { 
    return window.self !== window.top; 
  } catch (e) { 
    return true; 
  } 
 }

 getQuote = () => {  // invoke Ajax Request
 $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: (response) => {
      if (typeof response === 'string') {
       response = JSON.parse(response); 
      }
      this.setState(({currentAuthor, currentQuote}) => ({ 
        currentAuthor: response.author, 
        currentQuote: response.quote
      }));
    }
  });
}
onTweetClick = () => {
    if(!this.inIframe()) {
      this.openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.currentQuote + '" ' + this.state.currentAuthor));
    }
}
componentDidMount = () => {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: (response) => {
      if (typeof response === 'string') {
       response = JSON.parse(response); 
      }
      this.setState(({currentAuthor, currentQuote}) => ({ 
        currentAuthor: response.author, 
        currentQuote: response.quote
      }));
    }
  });
}
  render() {
    return (
      <div>
      <span className="title"> Build a Random Quote Machine - Challenge </span>
        <div className="quote-box">
            <div><span id="text">"{this.state.currentQuote}"</span>
            </div>
            <div style={{ width: '450px', height: 'auto', clear: 'both', paddingTop: '20px', fontSize: '16px', textAlign: 'right'}}>
              - <span>{this.state.currentAuthor}</span>
            </div>
            <div style={{marginTop: '15px'}} className="buttons">
              <button content="Tweet" style={{float: 'left', width: '120px', height:'30px'}}  onClick={()=>this.onTweetClick()} target="_blank" > Tweet </button>
              <button style={{float: 'right', width: '120px', height:'30px'}}  onClick={()=>this.getQuote()} >New quote</button>
              
            </div>
            <div style={{marginTop: '60px'}}>
              <span style={{float: 'left'}}> Deployed Heroku App: <a href="https://gpbaculio-random-quote.herokuapp.com/"> link </a> </span>
              <span style={{float: 'right'}}> Github Repo: <a href="https://github.com/iamglenbacs/fcc_random_quote_machine"> link </a> </span>
            </div>
          </div>
        <div className="footer"> Developed by <strong> Glendon Philipp Baculio </strong> </div>
      </div>
    )
  }
}

export default App
