import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import Header from '../components/Header'
import MainFragment from '../components/network'
import Tasks from '../components/tasks'
import Frame from '../components/tasks/frame'
import TaskDetail from '../components/tasks/TaskDetail'
import Settings from '../components/settings'
import NotFound from '../components/NotFound'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'



/**
 * { Router function to prepare component path }
 *
 * @return     {Route}
 */
const routes = (
<Route component={ App } >
    <Route path="/" component={MainFragment} /*component={ LoadingComponent(MainFragment, ['MAIN_LOADER'])[0]}*/ />
    <Route path="/tasks" component={Tasks} /*component={ LoadingComponent(Tasks, ['TASK_PANEL_LOADER'])[0]}*/ />
    <Route path="/task" component={ TaskDetail } >
        <Route path="/task/:id" component={ TaskDetail } />
    </Route>
    <Route path="/settings" component={ Settings } />
    <Route path="*" component={ NotFound } status={404} />
</Route>
);


const mapStateToProps = state => ({
    status: state.firstReducer,
    search: state.setSearch
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

/**
 * { Main Application Component. (Include Router) }
 *
 * @class      App (name)
 */
export class App extends Component {
    static propTypes = {
        actions: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {actions} = this.props
        actions.login('Muhammed')
    }


    render() {

        const {actions, status, search, history} = this.props
        return (
            <div>
                <Header actions={ actions } activeHeader={'main'}/>
                <Router history={ history } >
                    { routes }
                </Router>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)