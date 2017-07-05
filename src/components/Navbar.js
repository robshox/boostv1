import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addDeck, showAddDeck, hideAddDeck } from '../actions';
import { Link } from 'react-router';



const Navbar = React.createClass({

  render() {
    let props = this.props;

    return (



        <header id="header" className="app-header navbar" role="menu">

  <div className="navbar-header bg-primary">

    {/* <!--brand--> */}


        <Link to={'/'} className="navbar-brand text-lt">
        <i className="fa fa-rocket"></i>
      <span className="hidden-folded m-l-xs">Boostling</span>
    </Link>
    {/*<!-- / brand -->*/}
  </div>

  <div className="collapse pos-rlt navbar-collapse bg-primary">
  </div>
</header>

    );
  },

});

export default (Navbar);
