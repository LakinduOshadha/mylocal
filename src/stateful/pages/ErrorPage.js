import {Component} from 'react';

export default class ErrorPage extends Component {
  render() {
    return JSON.stringify({
        page: 'ErrorPage',
        'process.env':  process.env,
    });
  }
}
