import React, { Component } 
        from 'react';
import $          from 'jquery';
import { Button } from 'semantic-ui-react'
import 'jquery-ui'

class Article extends Component {
_renderSnippet = () => {
  return { __html:this.props.article.snippet };
}

  render() {
    return (
        <a style={{ color: 'black', textDecoration: 'none'}} className="articleLink" href={"https://en.wikipedia.org/wiki/"+this.props.article.title} target="_blank">
          <div style={{ borderRadius: '3px', padding: '15px', marginTop: '15px' }} className="article"> 
            <span style={{ fontSize: '18px' }} > {this.props.article.title} </span>
            <div style={{textAlign: 'left', fontSize: '14px', marginTop: '12px'}} dangerouslySetInnerHTML={this._renderSnippet()}/>
          </div>
        </a>
      )
  }
}
class App extends Component {

  state = {
    searchText:'',
    searchResults: []
  }

  _search = (e) => {
    // Use Ajax to handle things
    e.preventDefault()
    if(this.state.searchText !== '') {
      let setState = (result) => {
        this.setState((prevState, props) => ({
            searchResults: result.query.search
        }));
      }
      $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + this.state.searchText.toString(),
        dataType: 'jsonp',
        type: 'POST',
        headers: {
          'Api-User-Agent': 'Example/1.0'
        },
        success: function(data) {
          console.log("data = ", data)
          setState(data)  
        }
      });
    }
  }

  _handleInputChange = (e) => {
    this.setState({searchText: e.target.value});
  };

  _renderArticles() {
    return this.state.searchResults.map(searchResult =>
      <Article
        article={searchResult}
      />
    );
  }
  render() {
    return (
        <div> 
          <span className="title"> Reactjs Show the Local Weather </span>
            <div className="container">
              <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">
                <button type="button">Random Article</button>
              </a>
              <div style={{fontSize: '20px', marginTop:'15px'}}> 
                <form  onSubmit={this._search}><input placeholder={'Search Wikipedia'} onChange={this._handleInputChange} /></form>
                <button onClick={(e) => this._search(e)}> Search </button></div>
              {this._renderArticles()}
            </div>
          <span className="footer"> Developed by Glendon Philipp Baculio </span>
        </div>
    )
  }
}

export default App
