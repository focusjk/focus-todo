import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ShowList from './showList';
import ShowDoneList from './showDoneList';
import AddTodolist from './AddTodolist'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todolist: [],
      selectedSearch: -1,
      searchIndex: [],
      searchIndexDoneList: [],
      searchKeyword: "",
      sameListIndex: -1,
      doneList: [],
    }

    this.state.todolist.sort();

    this.removeList = this.removeList.bind(this);
    this.onSearchWord = this.onSearchWord.bind(this);
    this.onDoneList = this.onDoneList.bind(this);
    this.makeNewList = this.makeNewList.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  makeNewList(newList) {
    let copyList = this.state.todolist;
    console.log(newList);
    copyList.push(newList);
    this.setState({
      ...this.state,
      todolist: copyList,
    });
  }

  removeList(index){
    let copylist = this.state.todolist;
    copylist.splice(index,1);
    this.setState({
      todolist: copylist,
    });
  }

  onSearchWord(){
    this.setState({
      searchKeyword: this.refs.searchKeyword.value,
    });
  }

  onSearchList(e){
    if(e.keyCode === 13){
      let copySearchIndex = [];
      for(var i = 0; i < this.state.todolist.length; i++) {
        if(this.state.todolist[i].title.indexOf(this.state.searchKeyword) >= 0){
            copySearchIndex.push(i);
        }
      }

      let copySearchIndexDoneList = [];
      for(var i = 0; i < this.state.doneList.length; i++){
        if(this.state.doneList[i].title.indexOf(this.state.searchKeyword) >= 0){
          copySearchIndexDoneList.push(i);
        }
      }

      this.setState({
        selectedSearch: this.state.todolist.indexOf({title: this.state.searchKeyword}),
        searchIndex: copySearchIndex,
        searchIndexDoneList: copySearchIndexDoneList,
        searchKeyword: "",
      })
    }
  }

  onDoneList(element, index){
    let copyDoneList = this.state.doneList;
    copyDoneList.push(element);
    console.log(element);

    let copyList = this.state.todolist;
    copyList.splice(index, 1);

    this.setState({
      doneList: copyDoneList,
      todolist: copyList,
    });
  }

  onSort() {
    let copySort = this.state.todolist.sort(function(b, a) {
      if(b.year==null || a.year==null || b.year.value == a.year.value){
        if(b.month==null || a.month==null || b.month.value == a.month.value){
          if(b.day==null || a.day==null || b.day.value == a.day.value)return b.title - a.title;
          return b.day.value - a.day.value;
        }
        return b.month.value - a.month.value;
      }
      return b.year.value - a.year.value;
    });
    this.setState({
      todolist: copySort,
    });
  }

  render() {
    return (
      <div style={{margin: '10px', align: 'center'}}>
        <AddTodolist makeNewList={this.makeNewList} />

        <div style={{ backgroundColor: 'lightgray'}}>Search list</div>
        <input type="text" ref="searchKeyword" placeholder="keyword for search" value={this.state.searchKeyword} onChange={() => this.onSearchWord()} onKeyDown={(e) => this.onSearchList(e)}  />

        <div style={{ backgroundColor: 'lightgray'}} >
          Inbox ( {this.state.todolist.length} {this.state.todolist.length > 1 ? `tasks` : `task`} )
        </div>

        <button onClick={() => this.onSort()}>sort</button>
        <ShowList 
          todolist={this.state.todolist} 
          searchIndex={this.state.searchIndex} 
          selectedSearch={this.state.selectedSearch} 
          onDoneList={this.onDoneList}
          removeList={this.removeList}

        />
        
       

        <div style={{ backgroundColor: 'lightgray'}} >Completed tasks ( {this.state.doneList.length} {this.state.doneList.length > 1 ? `tasks` : `task`} )</div>
        <ShowDoneList doneList={this.state.doneList} searchIndexDoneList={this.state.searchIndexDoneList} />
        
        
      </div>
    );
  }
}

export default App;
