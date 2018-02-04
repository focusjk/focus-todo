import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './index.css';
import { copyFile } from 'fs';
class AddTodolist extends React.Component {

    state = {
        newList: {
            title: '',
            day: null,
            month: null,
            year: null,
        },   
    }

    onKeyPressed(){
        this.setState({
            newList: {
                title: this.refs.title.value,
            }
        });
    }

    handleDayChange(day) {
        this.setState({ 
            newList: {
                ...this.state.newList,
                day
            }
        });
    }

    handleMonthChange(month) {
        this.setState({
            newList: {
                ...this.state.newList,
                month
            }
        });
    }

    handleYearChange(year) {
        this.setState({
            newList: {
                ...this.state.newList,
                year
            }
        });
    }

    clearNewList() {
        this.setState({
            newList: {
                title: '',
                day: null,
                month: null,
                year: null,
            },
        });
    }

    createDayOption() {
        let dayList = [];
        for(var i = 1; i <= 31; i++){
            dayList.push(
                { value: i, label: i }
            );
        }
        return dayList;
    }

    createMonthOption() {
        return [
            {value: 1, label: 'Jan'},
            {value: 2, label: 'Feb'},
            {value: 3, label: 'Mar'},
            {value: 4, label: 'Apr'},
            {value: 5, label: 'May'},
            {value: 6, label: 'Jun'},
            {value: 7, label: 'Jul'},
            {value: 8, label: 'Aug'},
            {value: 9, label: 'Sep'},
            {value: 10, label: 'Oct'},
            {value: 11, label: 'Nov'},
            {value: 12, label: 'Dec'},
        ];
    }

    createYearOption() {
        let yearlist =[];
        for(var i = 0; i <= 20; i++){
            yearlist.push(
                { value: i+2018, label: i+2018, clearableValue: false }
            );
        }
        return yearlist;
    }
    render() {
        // const selectedOption = this.state.selectedOption;
        // const { serwes,dgfhd,dfsdt } = this.state;
        const { day, month, year } = this.state.newList;        
        const valueDay = day && day.value;        
        const valueMonth = month && month.value;
        const valueYear = year && year.value;
        
        return (
            <div>
                <div style={{ backgroundColor: 'lightgray'}}>
                    ADD TODOLIST
                </div>
                <input 
                    type="text" 
                    ref="title" 
                    placeholder="title" 
                    value={this.state.newList.title} 
                    onChange={() => this.onKeyPressed()} 
                />
                <Select 
                    name = "form-field-name" 
                    value = { valueDay } 
                    style ={{ width: '100px'}} 
                    onChange = {(day) => this.handleDayChange(day)} 
                    clearable = { false }
                    options = {this.createDayOption()} 
                />
                <Select 
                    clearable = { false } 
                    name = "form-field-name" 
                    value = { valueMonth } 
                    style ={{ width: '100px'}} 
                    onChange = {(month) => this.handleMonthChange(month)} 
                    options = {this.createMonthOption()} 
                />
                <Select 
                    clearable = { false } 
                    name = "form-field-name" 
                    value = { valueYear } 
                    style ={{ width: '100px'}} 
                    onChange = {(year) => this.handleYearChange(year)} 
                    options = {this.createYearOption()} 
                />
            <button onClick={() => {this.props.makeNewList(this.state.newList), this.clearNewList()}} >
                SAVE
            </button>
            <button onClick={() => {this.clearNewList()}} >
                CLEAR
            </button>
            </div>
        );
    }
}

export default AddTodolist;