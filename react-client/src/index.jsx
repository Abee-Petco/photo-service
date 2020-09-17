import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery.jsx';
import $ from 'jquery';
import config from '../../config.js'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemImages: null
    }
  }

  componentDidMount () {
    // console.log('Item id', this.props.itemId)
    axios.get(`/images/urls/${this.props.itemId}`)
    .then((data) => {
      let picture = data.data.data[0]
      console.log('data: ', picture)
      this.setState({
      itemImages: [{
        "small": picture.pic1Small,
        "medium": picture.pic1Med,
        "large": picture.pic1Large
      },
      {
        "small": picture.pic2Small,
        "medium": picture.pic2Med,
        "large": picture.pic2Large
      }]
    })})
    .catch(err => console.log('error with axios get: ', err))
    // $.ajax ({
    //   url: config.itemImages + this.props.itemId,
    //   type: "get",
    //   success: (data) => {
    //     console.log('Data returned form the server', data.itemImages);
    //     this.setState({
    //       itemImages: data.itemImages
    //     })
    //   },
    //   error: (error) => {
    //     console.log('Error with componentDidMount: ', error);
    //   }
    // })
  }

  render() {
    return (
      <div>
        {this.state.itemImages && <Gallery itemImages={this.state.itemImages}/>}
      </div>
    );
  }
}

// let itemId = '100';
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('itemID');
ReactDOM.render(<App itemId={itemId}/>, document.getElementById('gallery'));
