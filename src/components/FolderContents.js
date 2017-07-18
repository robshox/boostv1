import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import fuzzysearch from 'fuzzysearch';
import { Link } from 'react-router';
import { fetchProcessAPI, clearProcess } from '../actions';

const mapStateToProps = ({ cards, cardFilter, folders, addingFolder, processes, routing }, { params: { folderId } }) => ({
  folders,
  addingFolder,
  folderId,
  routing,
  processes: processes.filter(p => p.folder_name === folderId) // Match :folderId URL to process folder_id
  // This folder Id needs to be folder_id and from this the mongo request can be made to get the correct folders.
});

const mapDispatchToProps = dispatch => ({
  fetchProcessAPI: folderId => dispatch(fetchProcessAPI(folderId)),
  clearProcess: () => dispatch(clearProcess())
});

const Cards = React.createClass({
  componentWillMount() {
    this.props.clearProcess();
  },


  componentDidMount() {
        console.log('Component DID MOUNT!') // Request folder with folderId
        this.props.fetchProcessAPI(this.props.folderId);
        //console.log('Folder Contents');
        //console.log(this.props);
     },


  render() {
    let props = this.props;
    console.log('FoldCont Prop');
    console.log(this.props.routing.locationBeforeTransitions.pathname);
    console.log('here come the prop processes');
    console.log(props.processes);
  return(

        <div className="temp contain">
          <div className="bg-light lter b-b wrapper-md">
              <div className="row">
            <div className="col-sm-6 col-xs-12">
                <h1 onClick={this.addProcess} className="m-n font-thin h3 text-black">Folder / {props.folderId}</h1>
                <small className="text-muted">Processes assoicated with {props.folderId} listed here</small>
            </div>
              </div>
          </div>
          <div className="wrapper-md">
              <div className="row m-b">
            <div className="col-sm-5">
                <div className="input-group">
              <input type="text" className="form-control input-lg" placeholder="Enter Search Term"/>
              <span className="input-group-btn">
                  <button className="btn btn-primary btn-lg" type="button">Search</button>
              </span>
                </div>
            </div>
              </div>

              {props.processes.map((process, i) =>
              <div key={i} className="row">
            <div className=" col-sm-5 list-group-lg list-group-sp">

                <Link to={`/folder/${process.name}`} className="list-group-item clearfix m-b">

              <span className="clear">
                  <span>{process.name}</span>
                  <small className="text-muted clear text-ellipsis">{process.folderId}</small>
              </span>
            </Link>
            </div>
              </div>
            )}

          </div>
            </div>

  );
},
  addProcess() {
        //var name = ReactDOM.findDOMNode(this.refs.addProcess).value;
        //var folderDets = ReactDOM.findDOMNode(this.refs.selectFolderDrop).value;
        //var folderDets = (this.props.folderId);
        // console.log( 'You Selected FolderId ' + folderDets);
        // console.log('You selected Process ' + name);
        this.props.fetchProcessAPI();
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
