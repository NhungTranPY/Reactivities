import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/Nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite'


const App = () => {

  const activityStore = useContext(ActivityStore)


  useEffect(() => {
    activityStore.loadActivities()

    // agent.Activities.list()
    // .then((response) => {
    //   //xem bai 67, 72
    //   let activities: IActivity[] = []
    //   response.forEach((activity) => {
    //     activity.date = activity.date.split('.')[0] //return phan dau tien cua mang sau khi cat, phan time dau tien
    //     activities.push(activity)
    //   })
    //   setActivities(activities)  //tra ve list of activities
    // }).then(() => setLoading(false))
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  // componentDidMount() {
  //   axios.get<IActivity[]>('http://localhost:5000/api/activities')
  //   .then((response) => {
  //     //console.log(response)
  //     this.setState({
  //       activities: response.data
  //     })
  //   })
  // }

    return (
      <Fragment>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <h1>{activityStore.title}</h1>
          <ActivityDashboard/>
        </Container>
      </Fragment>
    )
  }


export default observer(App)

