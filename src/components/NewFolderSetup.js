import React from 'react';
import ReactDOM from 'react-dom';
import { addFolder } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = ({ addingFolder, folders }) => ({
  folders,
  addingFolder
});

const mapDispatchToProps = dispatch => ({
  addFolder:   name => dispatch(addFolder(name))
});

const NewFolderSetup = React.createClass({
    render(){
      return(  <div className="col-sm-12">

        <input type="text" className="form-control input-lg" ref='addFolder' placeholder="Enter Folder Name"/>
        <button onClick={this.createFolder} data-dismiss="modal" className="btn col-xs-12 btn-lg text-center btn-primary m-b m-t">Create Folder</button>
        </div>);
    },
    createFolder(evt) {

        var name = ReactDOM.findDOMNode(this.refs.addFolder).value;
        this.props.addFolder(name);
        console.log(name);

    }
});




export default connect(mapStateToProps, mapDispatchToProps)(NewFolderSetup);
