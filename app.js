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
    categoryId: 1
  },
  {
    id: 1,
    name: 'todoitem1',
    categoryId: 1
  },
  {
    id: 2,
    name: 'todoitem2',
    categoryId: 2
  },
  {
    id: 3,
    name: 'todoitem0',
    categoryId: 1
  },
  {
    id: 4,
    name: 'todoitem1',
    categoryId: 1
  },
  {
    id: 5,
    name: 'todoitem2',
    categoryId: 2
  },
  {
    id: 6,
    name: 'todoitem0',
    categoryId: 1
  },
  {
    id: 7,
    name: 'todoitem1',
    categoryId: 1
  },
  {
    id: 8,
    name: 'todoitem2',
    categoryId: 2
  },
  {
    id: 9,
    name: 'todoitem0',
    categoryId: 1
  },
  {
    id: 10,
    name: 'todoitem1',
    categoryId: 1
  },
  {
    id: 11,
    name: 'todoitem2',
    categoryId: 2
  },
  {
    id: 12,
    name: 'todoitem0',
    categoryId: 1
  },
  {
    id: 13,
    name: 'todoitem1',
    categoryId: 1
  },
  {
    id: 14,
    name: 'todoitem2',
    categoryId: 2
  }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {activeCategoryId: 0}
  }

  render() {
    return (
      <div className="container-fluid">
        <Header/>
        <div className="row">
          <Sidebar />

          <Content activeCategoryId={this.state.activeCategoryId}/>
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


class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {activeCategoryId: 0};
  }
  selectCategory(e) {
    e.preventDefault();
    this.setState({activeCategoryId: 1})
  }
  render() {
    return (
      <div className="col-lg-3 col-md-3 col-sm-3 sidebar">
        <input type="text" placeholder="Enter category title" className="inputBox"/>
        <button className="inputBtn">Add</button>
        <div className="categoryList">
          {GetCategoryList(this.state.activeCategoryId).map((elem =>
            <Category name={elem.name} key={elem.id}
                      selectCategory={this.selectCategory.bind(this)}/>))}
        </div>
      </div>
    )
  }
}

class Category extends React.Component {
  render() {
    return (
      <div className="category" onClick={this.props.selectCategory}>
        {this.props.name}
        <span className="glyphicon glyphicon-pencil btnIcon"></span>
        <div className="ctrlPanel">
          <span className="glyphicon glyphicon-trash btnIcon"></span>
          <span className="glyphicon glyphicon-plus btnIcon"></span>
        </div>
      </div>
    )
  }
}


function GetCategoryList(parentId) {
  var list = [];
  categories.forEach((category) => {
    if (category.parentId === parentId)
      list.push(category);
  });
  return list;
}


class Content extends React.Component {
  render() {
    return (
      <div className="col-lg-9 col-md-9 col-sm-9">
        <div className="ctrlPanel">
          <input type="text" placeholder="Text input with button" className="inputBox"/>
          <button className="inputBtn">Add</button>
        </div>
        <div className="taskList">
          {GetTaskList(this.props.activeCategoryId).map((task => <TaskItem name={task.name} key={task.id}/>))}
        </div>
      </div>
    )
  }
}

class TaskItem extends React.Component {
  render() {
    return (
      <div className="taskItem">
        <input type="checkbox"/>
        <span className="itemName">{this.props.name}</span>
        <div className="ctrlPanel">
          <span className="glyphicon glyphicon-pencil btnIcon"></span>
        </div>
      </div>
    )
  }
}


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
