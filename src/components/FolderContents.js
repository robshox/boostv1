import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import fuzzysearch from 'fuzzysearch';
import { Link } from 'react-router';

const matches = (filter, processes) =>
  fuzzysearch(filter, card.front) ||
  fuzzysearch(filter, card.back);

{/*
const mapStateToProps = ({ cards, cardFilter, folders }, { params: { folderId } }) => ({
  cards: cards.filter(c => c.deckId === deckId && matches(cardFilter, c))
});
*/}

const mapStateToProps = ({ cards, cardFilter, folders, addingFolder, processes }, { params: { folderId } }) => ({
  folders,
  addingFolder,
  folderId,
  processes: processes.filter(p => p.folderId === folderId )
});

const Cards = React.createClass({
  render() {
    let props = this.props;
console.log('here come the prop processes');
console.log(props.processes);
  return(

        <div className="temp contain">
          <div className="bg-light lter b-b wrapper-md">
              <div className="row">
            <div className="col-sm-6 col-xs-12">
                <h1 className="m-n font-thin h3 text-black">Folder / {props.folderId}</h1>
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
                  <span>{process.processName}</span>
                  <small className="text-muted clear text-ellipsis">Description</small>
              </span>
            </Link>
            </div>
              </div>
            )}

          </div>
            </div>

  );
  }
});

{/*
const Cards = ({ cards, children, folderId, folders, folder }) => {
  return (

    <div className="temp contain">
      <div className="bg-light lter b-b wrapper-md">
          <div className="row">
        <div className="col-sm-6 col-xs-12">
            <h1 className="m-n font-thin h3 text-black">Folder Contents{}</h1>
            <small className="text-muted">All processes listed here</small>
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





      </div>
        </div>);
};

*/}
export default connect(mapStateToProps)(Cards);
