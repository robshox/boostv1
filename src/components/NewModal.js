import React from 'react';
import ReactDOM from 'react-dom';
import NewFolderSetup from './NewFolderSetup';
import NewProcSetup from './NewProcSetup';
import NewDefaultSetup from './NewDefaultSetup';
import { addDeck, showAddDeck, hideAddDeck, addModalFolder, modalShowFold, modalShowProc } from '../actions';
import { connect } from 'react-redux';
// Copy state from store to props.
const mapStateToProps = ({ decks, addingDeck, addingFolder, addingFromModal }) => ({
  decks,
  addingDeck,
  addingFolder,
  addingFromModal

});
// Dispatch from props to the state
const mapDispatchToProps = dispatch => ({
  addDeck:   name => dispatch(addDeck(name)),
  showAddDeck: () => dispatch(showAddDeck()),
  hideAddDeck: () => dispatch(hideAddDeck()),
  addModalFolder: () => dispatch(addModalFolder(), console.log('folder added dispatch')),
  modalShowFold: () => dispatch(modalShowFold()),
  modalShowProc: () => dispatch(modalShowProc())
});

const Arse = React.createClass({

  render() {
    // Props are made available by Connect

    //console.log(props);
    let props = this.props;
    console.log('New Modal Folderid')
  console.log(props.folderId);


  return (
  <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Create New</h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                                { props.addingFromModal == 'defaultAdd' &&   <NewDefaultSetup folderId={props.folderId}/>}
                                { props.addingFromModal == 'folderShow' &&   <NewFolderSetup folderId={props.folderId}/>}
                                { props.addingFromModal == 'processShow' && <NewProcSetup folderId={props.folderId}/>}
                      </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Arse);
