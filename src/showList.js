import React, { Component } from 'react';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import './style.css';

class ShowList extends Component {
    constructor(props){
        super(props);
    }
    
    
    render() {
        return(
            <div>
               {
                    this.props.todolist.map((element,index) => {
                        return (
                            <div style={{
                                margin: '2px',
                                color: `${this.props.selectedSearch == index ? `red` : this.props.searchIndex.indexOf(index) >= 0 ? `blue` : `black`}`,
                            }}>
                                - {element.title} ({element.day ? element.day.label :  '--'}/{element.month ? element.month.label : '--'}/{element.year ? element.year.label : '--'})
                                <span className="glyphicon glyphicon-remove mk-margin" onClick={() => this.props.removeList(index)} ></span>
                                <span className="glyphicon glyphicon-ok mk-margin" onClick={() => this.props.onDoneList(element, index)} ></span>
                            </div>
                        )}
                    )
                }
            </div>
        );
    }
}

export default ShowList;