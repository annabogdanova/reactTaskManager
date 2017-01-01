import React from 'react';
import ReactDom from 'react-dom';

var categories = [
    {
        id: 1,
        parentId: 0,
        name: 'Category1'
    },
    {
        id: 2,
        parentId: 0,
        name: 'Category2'
    },
    {
        id: 3,
        parentId: 0,
        name: 'Category3'
    },
    {
        id: 4,
        parentId: 3,
        name: 'SubCategory1'
    },
    {
        id: 5,
        parentId: 3,
        name: 'SubCategory2'
    }
];

var taskList = [
  {
    id: 0,
    name: 'todoitem0',
    categoryId: 1,
    done: true
  },
  {
    id: 1,
    name: 'todoitem1',
    categoryId: 1,
    done: true
  },
  {
    id: 2,
    name: 'todoitem2',
    categoryId: 2,
    done: false
  },
  {
    id: 3,
    name: 'todoitem0',
    categoryId: 1,
    done: true
  },
  {
    id: 4,
    name: 'todoitem1',
    categoryId: 1,
    done: false
  },
  {
    id: 5,
    name: 'todoitem2',
    categoryId: 2,
    done: true
  },
  {
    id: 6,
    name: 'todoitem0',
    categoryId: 1,
    done: true
  },
  {
    id: 7,
    name: 'todoitem1',
    categoryId: 1,
    done: true
  },
  {
    id: 8,
    name: 'todoitem2',
    categoryId: 2,
    done: false
  },
  {
    id: 9,
    name: 'todoitem0',
    categoryId: 1,
    done: true
  },
  {
    id: 10,
    name: 'todoitem1',
    categoryId: 1,
    done: false
  },
  {
    id: 11,
    name: 'todoitem2',
    categoryId: 2,
    done: true
  },
  {
    id: 12,
    name: 'todoitem0',
    categoryId: 1,
    done: true
  },
  {
    id: 13,
    name: 'todoitem1',
    categoryId: 1,
    done: false
  },
  {
    id: 14,
    name: 'todoitem2',
    categoryId: 2,
    done: false
  }
];

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-fluid">
        <Header/>
        <div className="row">
          <Sidebar categories={GetCategoryList(0)}/>

          <Content/>
        </div>
      </div>
    )
  }
}


class Header extends React.Component {
  render() {
    return (
      <div className="navbar">
        <span className="logo">To-Do List</span>
        <div className="ctrlPanel">
          <input type="checkbox"/> <label className="cbxLabel">Show done</label>
          <input type="text" placeholder="Search" className="inputBox"/>
        </div>
      </div>
    )
  }
}


var Sidebar = React.createClass({
  getInitialState: function(){
    return { focused: 0 };
  },

  clicked: function(index){
    this.setState({focused: index});
  },

  render() {
    var self = this;
    return (
      <div className="col-lg-3 col-md-3 col-sm-3 sidebar">
        <input type="text" placeholder="Enter category title" className="inputBox"/>
        <button className="inputBtn">Add</button>

        <div className="categoryList">
          {
            this.props.categories.map((elem, index) =>
              <div key={index} className="category" onClick={self.clicked.bind(self, elem.id)}>
                {elem.name}
                <span className="glyphicon glyphicon-pencil btnIcon"></span>
                <div className="ctrlPanel">
                  <span className="glyphicon glyphicon-trash btnIcon"></span>
                  <span className="glyphicon glyphicon-plus btnIcon"></span>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
})

function GetCategoryList(parentId) {
  var list = [];
  categories.forEach((category) => {
    if (category.parentId === parentId)
      list.push(category);
  });
  return list;
}


var Content = React.createClass({
  getInitialState: function(){
    return { activeCategoryId: 0 };
  },
  render() {
    return (
      <div className="col-lg-9 col-md-9 col-sm-9">
        <div className="ctrlPanel">
          <input type="text" placeholder="Text input with button" className="inputBox"/>
          <button className="inputBtn">Add</button>
        </div>
        <div className="taskList">
          {
            GetTaskList(this.state.activeCategoryId).map((task, index) =>
              <div key={index} className="taskItem">
                <input type="checkbox"/>
                <span className="itemName">{task.name}-{task.id}</span>
                <div className="ctrlPanel">
                  <span className="glyphicon glyphicon-pencil btnIcon"></span>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
})

function GetTaskList(categoryId) {
  if (categoryId == 0) {
    return taskList;
  } else {
    var list = [];
    taskList.forEach((item) => {
      if (item.categoryId === categoryId)
        list.push(item);
    });
    return list;
  }
}


ReactDom.render(
    <App/>,
    document.getElementById('app')
);
