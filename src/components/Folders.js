import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


const mapStateToProps = ({ cards, cardFilter, folders, addingFolder }) => ({
  folders,
  addingFolder
});

const mapDispatchToProps = dispatch => ({
  addFolder:   name => dispatch(addFolder(name)),
  showAddDeck: () => dispatch(showAddDeck()),
  hideAddDeck: () => dispatch(hideAddDeck()),
  modalShowDef: () => dispatch(modalShowDef())
});

const Folders = React.createClass({

    render() {
      let props = this.props;

//      console.log('params next');
//console.log(props.params);
//console.log(props.processes);
        return(
          <div className="temp contain">
              <div className="bg-light lter b-b wrapper-md">
                  <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <h1 className="m-n font-thin h3 text-black">Folders</h1>
                    <small className="text-muted">List of all folders</small>
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



                  {props.folders.map((folder, i) =>
                  <div key={i} className="row">

                <div className=" col-sm-5 list-group-lg list-group-sp">

                    <Link to={`/folder/${folder.name}`} className="list-group-item clearfix m-b">

                  <span className="clear">
                      <span>{folder.name}</span>
                      <small className="text-muted clear text-ellipsis">Click here to view folder contents</small>
                  </span>
                </Link>
                </div>
                  </div>
                )}

                  <div className="row">
                <div className=" col-sm-5 list-group-lg list-group-sp">
                    <div onClick={this.resetModal} data-toggle="modal" data-target="#myModal" className="list-group-item clearfix m-b">
                  <span className="clear">
                      <span>Add New Folder</span>
                      <small className="text-muted clear text-ellipsis">Click here to add a new folder</small>
                  </span>
                </div>
                </div>
                  </div>
              </div>
                </div>
        );
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Folders);
