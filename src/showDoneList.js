import React, { Component } from 'react';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import './style.css';

class ShowDoneList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                {   this.props.doneList.map((element, index) => {return(
                    <div style={{
                        margin: '2px',
                        color: `${this.props.searchIndexDoneList.indexOf(index) >= 0 ? `blue` : `black`}`,
                    }}>
                        - {element.title} ({element.day ? element.label : '--'}/{element.month ? element.month.label : '--'}/{element.year ? element.year.label : '--'})
                    </div>
                )})}
            </div>
        );
    }
}
export default ShowDoneList;
