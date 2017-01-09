import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Router, Route, IndexRoute, browserHistory, Link, IndexLink} from 'react-router';

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
    done: true,
    description: '123'
  },
  {
    id: 1,
    name: 'todoitem1',
    categoryId: 3,
    done: true,
    description: 'dfms;'
  },
  {
    id: 2,
    name: 'todoitem2',
    categoryId: 2,
    done: false,
    description: '1ssf23'
  },
  {
    id: 3,
    name: 'todoitem0',
    categoryId: 1,
    done: true,
    description: 'dfgthrtj'
  },
  {
    id: 4,
    name: 'todoitem1',
    categoryId: 1,
    done: false,
    description: '123hnmj'
  },
  {
    id: 5,
    name: 'todoitem2',
    categoryId: 2,
    done: true,
    description: '123 vvf'
  },
  {
    id: 6,
    name: 'todoitem0',
    categoryId: 1,
    done: true,
    description: '123345'
  },
  {
    id: 7,
    name: 'todoitem1',
    categoryId: 1,
    done: true,
    description: '12er53'
  },
  {
    id: 8,
    name: 'todoitem2',
    categoryId: 2,
    done: false,
    description: '123;l;;l;'
  },
  {
    id: 9,
    name: 'todoitem0',
    categoryId: 1,
    done: true,
    description: '123    oppop'
  },
  {
    id: 10,
    name: 'todoitem1',
    categoryId: 3,
    done: false,
    description: '123bnnbv'
  },
  {
    id: 11,
    name: 'todoitem2',
    categoryId: 2,
    done: true,
    description: '123zzz'
  },
  {
    id: 12,
    name: 'todoitem0',
    categoryId: 1,
    done: true,
    description: '2345'
  },
  {
    id: 13,
    name: 'todoitem1',
    categoryId: 1,
    done: false,
    description: '6679'
  },
  {
    id: 14,
    name: 'todoitem2',
    categoryId: 2,
    done: false,
    description: 'qqq'
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
        <ProgressBar/>

        <div className="row">
          <Sidebar categories={GetCategoryList(0)}/>

          {this.props.children}

        </div>
      </div>
    )
  }
}


class Header extends React.Component {
  render() {
    return (
      <div className="navbar">
        <IndexLink to="/">
          <span className="logo">To-Do List</span>
        </IndexLink>
        <div className="ctrlPanel">
          <input type="checkbox"/> <label className="cbxLabel">Show done</label>
          <input type="text" placeholder="Search" className="inputBox form-control"/>
        </div>
      </div>
    )
  }
}


class ProgressBar extends React.Component {
  render() {
    var list = taskList.filter(function(item) {
      return item.done;
    });
    var done = list.length*100/taskList.length + '%';

    return (
      <div className="progress">
        <div className="progress-bar" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"
             style={{width: done}}>
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
      <div className="col-lg-3 col-md-3 col-sm-3">

        <div className="input-group">
          <input type="text" className="form-control" placeholder="Enter category title" aria-describedby="categoryTitle"/>
          <span className="input-group-addon" id="categoryTitle">Add</span>
        </div>

        <div className="categoryList">
          {
            this.props.categories.map((elem, index) =>
              <div key={index} className="categoryBlock" onClick={self.clicked.bind(self, elem.id)}>
                <Link to={{pathname: "category", query: {categoryId: elem.id}}}
                  className="categoryName" activeClassName="activeCategoryName">
                  {elem.name}
                </Link>
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


var TaskList = React.createClass({
  getInitialState: function(){
    return {taskName: ''}
  },
  handleChange(event) {
    this.setState({taskName: event.target.value})
  },
  addTask(event) {
    taskList.unshift({
      id: taskList.length,
      name: this.state.taskName,
      categoryId: parseInt(this.props.location.query.categoryId),
      done: false,
      description: ''
    });
    this.setState({taskName: ''});
    event.preventDefault();
  },
  render() {
    var activeCategory = parseInt(this.props.location.query.categoryId) || 0;
    return (
      <div className="col-lg-9 col-md-9 col-sm-9">

        <div className="col-lg-6"/>
        <div className="col-lg-6 input-group">
          <form onSubmit={this.addTask} style={{display: 'table'}}>
            <input type="text" required className="form-control" value={this.state.taskName}
                   placeholder="Text input with button" aria-describedby="taskTitle"
                   onChange={this.handleChange}/>
            <span className="input-group-addon">
              <input type="submit" value="Add" id="taskTitle" className="input-group-submit"/>
            </span>
          </form>
        </div>

        <div className="taskList">
          {
            GetTaskList(activeCategory).map((task, index) =>
              <div key={index} className="taskItem">
                <input type="checkbox" defaultChecked={task.done}/>
                <span className="itemName">{task.name}-{task.id}</span>
                <div className="ctrlPanel">
                  <Link to={{pathname: "task", query: {taskId: task.id}}}
                        className="glyphicon glyphicon-pencil btnIcon">
                  </Link>
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
    return [];
  } else {
    var list = taskList.filter(function(item) {
      return item.categoryId === categoryId;
    });
    return list;
  }
}


var EditTask = React.createClass ({
  getInitialState: function(){
    var task = getTask(parseInt(this.props.location.query.taskId));
    return {
      id: parseInt(this.props.location.query.taskId),
      categoryId: task.categoryId,
      name: task.name,
      done: task.done,
      description: task.description
    };
  },

  changeName(event) {
    this.setState({name: event.target.value});
  },

  changeDone(event) {
    this.setState({done: event.target.checked});
  },

  changeDescription(event) {
    this.setState({description: event.target.value});
  },

  toggleAlertVisibility() {
    var div = document.getElementById('savedAlert');
    if (div.style.display == 'none') {
      div.style.display = 'inline-block';
    } else {
      div.style.display = 'none';
    }
  },

  handleSubmit(event) {
    taskList[this.state.id].name = this.state.name;
    taskList[this.state.id].done = this.state.done;
    taskList[this.state.id].description = this.state.description;

    this.toggleAlertVisibility();

    event.preventDefault();
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="pull-right">
            <input type="submit" value="Save changes" className="btn btn-default"/>
            <Link to={{pathname: "category", query: {categoryId: this.state.categoryId}}}
                  className="btn btn-default">Cancel</Link>
          </div>
          <div className="col-md-9">
            <div className="pull-left">
              <input type="text" className="form-control"
                     defaultValue={this.state.name} onChange={this.changeName}/>
            </div>
          </div>
          <div className="col-md-9">
            <input type="checkbox" defaultChecked={this.state.done} onChange={this.changeDone}/>
            <label className="cbxLabel">Done</label>
          </div>
          <div className="col-md-9">
            <textarea rows="5" placeholder="Description" className="wide-textarea"
                      defaultValue={this.state.description} onChange={this.changeDescription}/>
          </div>
        </form>

        <div id="savedAlert" className="alert alert-info alert-dismissible" role="alert" style={{display:'none'}}>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                  onClick={this.toggleAlertVisibility}>
            <span aria-hidden="true">&times;</span></button>
          This task was successfully updated!
        </div>
      </div>
    )
  }
})

function getTask(taskId) {
  var task = taskList.filter(function(item) {
    return item.id === taskId;
  });
  return task[0];
}


class NotFound extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-fluid">
        <Header/>
        <div className="row">
          <div className="notFound">
            Not found :(
          </div>
        </div>
      </div>
    )
  }
}


ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="category" component={TaskList} />
      <Route path="task" component={EditTask} />
    </Route>
    <Route path="*" component={NotFound} />
    </Router>,
  document.getElementById('app')
);
