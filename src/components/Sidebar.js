import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addFolder, showAddDeck, hideAddDeck, modalShowDef } from '../actions';
import { Link, browserHistory } from 'react-router';

const mapStateToProps = ({ folders, addingFolder }) => ({
  folders,
  addingFolder
});

const mapDispatchToProps = dispatch => ({
  addFolder:   name => dispatch(addFolder(name)),
  showAddDeck: () => dispatch(showAddDeck()),
  hideAddDeck: () => dispatch(hideAddDeck()),
  modalShowDef: () => dispatch(modalShowDef())
});

const Sidebar = React.createClass({
  componentDidUpdate() {
    var el = ReactDOM.findDOMNode(this.refs.add);
    if (el) el.focus();
  },
  render() {
    let props = this.props;
    //console.log(props);
    //console.log(props.folderId);
    //console.log(props.children);

    return (
      <aside id="aside" className="app-aside hidden-xs bg-white">
                  <div className="aside-wrap">
                    <div className="navi-wrap">

                      <nav className="navi clearfix">
                        <ul className="nav">
                          <li>
                            <a href="javascript:void(0)">
                              <i className="fa fa-plus-circle icon-large text-primary"></i>
                              <span onClick={this.resetModal} data-toggle="modal" data-target="#myModal" className="font-bold">New ...</span>
                          </a>
                          </li>
                          <ul>

                          </ul>
                          <li>
                            <Link to={'/folders'}href="#" className="auto" data-toggle="collapse" data-target="#demo">
                              <span className="pull-right text-muted">
                                <i className="fa fa-fw fa-angle-right text"></i>
                                <i className="fa fa-fw fa-angle-down text-active"></i>
                              </span>
                              <i className="fa fa-folder icon text-primary"></i>
                              <span className="font-bold">Folders</span>
                            </Link>
                            {/*
                            <ul>
                            {props.folders.map((folder, i) =>
                              <li key={i}>
                                <Link to={`/folder/${folder.id}`}> {folder.name} </Link>
                              </li>

                            )}
                                </ul>
                                */}
                          </li>
                            <li>
                              <Link to={'/scheduled'}>
                                <i className="fa fa-folder icon text-primary"></i>
                                <span className="font-bold">Scheduled</span>
                              </Link>
                            </li>
                            <li>
                              <Link to={'/settings'}>
                                <i className="fa fa-cog icon text-primary"></i>
                                <span className="font-bold">Settings</span>
                              </Link>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      </div>
                    </aside>

    );
  },
  createDeck(evt) {
    if (evt.which !== 13) return;
    var name = ReactDOM.findDOMNode(this.refs.add).value;
    this.props.addDeck(name);
    this.props.hideAddDeck();
  },
  resetModal(evt) {
    console.log('resetModal');
    this.props.modalShowDef();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
