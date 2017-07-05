import React from 'react';
import ReactDOM from 'react-dom';
import { addProcess, addFolder, showAddDeck, hideAddDeck, modalShowDef  } from '../actions';
import {connect} from 'react-redux';
import { Link, browserHistory } from 'react-router';
import NewModal from './NewModal';


const mapStateToProps = ( {folders, processes, addingFolder}) => ({
    folders,
    processes,
    addingFolder
});

const mapDispatchToProps = dispatch => ({
  addProcess:   (name, folderDets) => dispatch(addProcess(name, folderDets)),
  showAddDeck: () => dispatch(showAddDeck()),
  hideAddDeck: () => dispatch(hideAddDeck()),
  modalShowDef: () => dispatch(modalShowDef())
});

const NewProcSetup = React.createClass ({


  render() {
    let props = this.props;
    console.log('New Proc Folder Id');
    console.log(props);
    console.log(props.folderId);





      return(
        <div className="col-sm-12">

          <div className="form-group">

           <select ref='selectFolderDrop' className="form-control input-lg"  id="sel1">
            {/*}<option value="" disabled selected>Choose Folder</option>*/}

                {props.folders.map((folder, i) =>
                  <option key={i} ref={folder.id} >{folder.name}</option>

              )}
            </select>
          </div>
        <input type="text" ref='addProcess' className="form-control input-lg" placeholder="Enter Process Name"/>
        <button onClick={this.addProcess} className="btn col-xs-12 btn-lg text-center btn-primary m-b m-t">Create Process</button>

        </div>

      );
  },
  addProcess(evt) {

        var name = ReactDOM.findDOMNode(this.refs.addProcess).value;
        var folderDets = ReactDOM.findDOMNode(this.refs.selectFolderDrop).value;
        //var folderDets = (this.props.folderId);
         console.log( 'You Selected Folder ' + folderDets);
         console.log('You selected Process ' + name);
        this.props.addProcess(name, folderDets);

    }
});


export default connect(mapStateToProps,mapDispatchToProps)(NewProcSetup);
