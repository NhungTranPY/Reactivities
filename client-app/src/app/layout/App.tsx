import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import NavBar from '../../features/Nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
  const [editMode, setEditMode] = useState(false)

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]) //click "view" cai nao thi cai do hien thi vao ActivityDetails, [0] chi lay 1 cai
    setEditMode(false)
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  //add new activity
  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]) //take all our activities and put in a new array => add new activity into that array
    setSelectedActivity(activity) //phan hien thi detail hien thi activity moi create
    setEditMode(false) //phan form ko hien thi nua
  }

  //we want to update specific activity, neu id trong mang activities khong trung voi activity.id vua tao phia tren thi up date activity
  //now it contains a new array of all of the activities that do not match the id  of the activity we're passing in
  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity) //phan hien thi detail hien thi activity moi edit
    setEditMode(false) //phan form ko hien thi nua
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)])
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response) => {
      //console.log(response)
      //xem bai 67
      let activities: IActivity[] = []
      response.data.forEach(activity => {
        activity.date = activity.date.split('.')[0] //return phan dau tien cua mang sau khi cat, phan time dau tien
        activities.push(activity)
      })
      setActivities(activities)  //tra ve list of activities
    })
  }, [])

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
        <NavBar openCreateForm={handleOpenCreateForm} />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
            activities={activities} 
            selectActivity={handleSelectedActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
            createActivity={handleCreateActivity}
            editActivity={handleEditActivity}
            deleteActivity={handleDeleteActivity}
          />
        </Container>
      </Fragment>
    )
  }


export default App

