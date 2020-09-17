import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/Nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {observer} from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';


const App: React.FC<RouteComponentProps> = ({location}) => {



    return (
      <Fragment>
        <ToastContainer position='bottom-right'/>
        <Route exact path='/' component={HomePage}/>
        <Route path={'/(.+)'} render={() => ( //bai 105
          <Fragment>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              {/* <ActivityDashboard /> */}
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard}/>
                <Route path='/activities/:id' component={ActivityDetails}/>
                <Route 
                  key={location.key} //bai 103: initialize when everytime key changes
                  path={['/createActivity', '/manage/:id']} 
                  component={ActivityForm}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )} />
      </Fragment>
    )
  }


export default withRouter(observer(App))

