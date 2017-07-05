import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addDeck, showAddDeck, hideAddDeck } from '../actions';
import { Link } from 'react-router';



const Footer = React.createClass({

  render() {
    let props = this.props;

    return (



        <footer id="footer" className="app-footer" role="footer">
        <div className="wrapper b-t bg-light">
          <span className="pull-right">2.2.0 <a href  className="m-l-sm text-muted"><i className="fa fa-long-arrow-up"></i></a></span>
          &copy; 2016 Copyright.
        </div>
      </footer>

    );
  },

});

export default (Footer);
