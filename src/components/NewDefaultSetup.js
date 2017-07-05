import React from 'react';
import { modalShowFold, modalShowProc } from '../actions';
import { connect } from 'react-redux'
const mapStateToProps = ({ addingFromModal }) => ({
  addingFromModal
});
// Dispatch from props to the state
const mapDispatchToProps = dispatch => ({
  modalShowFold: () => dispatch(modalShowFold()),
  modalShowProc: () => dispatch(modalShowProc())
});

const NewDefaultSetup = React.createClass({
  render() {
    // Props are made available by Connect
  
    return(
      <div>
        <button onClick={this.showFolderSetup} className="btn col-xs-6 col-xs-offset-3  btn-lg text-center btn-primary m-b">Folder</button>
        <button onClick={this.showProcSetup} className="btn col-xs-6 col-xs-offset-3  btn-lg text-center btn-primary m-b">Process</button>
      </div>
    );
  },
  showFolderSetup(evt) {
     this.props.modalShowFold();
  },
  showProcSetup(evt) {
     this.props.modalShowProc();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDefaultSetup);
