import React from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import Footer from './Footer';
import Navbar from './Navbar';
import Start from './Start';
import NewModal from './NewModal';
import { loadJedis, loadJedi, login, logout } from '../actions' // This could break
import { connect } from 'react-redux';

// const mapStateToProps = (props, children, { params: { folderId } }) => ({
//   folderId
// });
const mapStateToProps = ({ folders, addingFolder }) => ({
  folders,
  addingFolder
});

const App = React.createClass({
  render() {
let props = this.props;
console.log('App Props')
//console.log(props);
console.log(props.params.folderId);
console.log(props.children);
  return(
    <div className='app'>
      <NewModal folderId={props.params.folderId} />
        <Navbar />
        {/*}<Toolbar/>*/}
        <Sidebar folderId={props.params.folderId}  />
          <div className="app-content">
          <div className="app-content-body fade-in-up">
      {props.children}
        </div>
      </div>

        <Footer/>
        </div>
  );
  }
});



export default connect(mapStateToProps)(App);
