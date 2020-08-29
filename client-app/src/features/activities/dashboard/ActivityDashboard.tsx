import React from 'react'
import { Grid} from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void
    selectedActivity: IActivity | null
    editMode: boolean
    setEditMode: (editMode: boolean) => void
    setSelectedActivity: (activity: IActivity | null) => void
    createActivity: (activity: IActivity) => void
    editActivity: (activity: IActivity) => void
    deleteActivity: (id: string) => void
}

const ActivityDashboard: React.FC<IProps> = ({
    activities, 
    selectActivity, 
    selectedActivity, 
    editMode, 
    setEditMode, 
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity
}) => {
    return (
        //trong semanthe grid chia lam 16 cot
       <Grid>
           <Grid.Column width={10}>
               <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                />     
           </Grid.Column>
           <Grid.Column width={6}>
               {selectedActivity && !editMode && (<ActivityDetails 
                    activity={selectedActivity} 
                    setEditMode={setEditMode}
                    setSelectedActivity={setSelectedActivity}/> 
                )}
                {editMode && (
                    <ActivityForm 
                        key={selectedActivity && selectedActivity.id || 0} 
                        //khi dang view edit of a selected of activity, click creativity will reset form to new empty form
                        //truyen vao key de khi key changes then it will call our component to re-initialize and it will update our state with the new state 
                        setEditMode={setEditMode} 
                        activity={selectedActivity!} 
                        createActivity={createActivity}
                        editActivity={editActivity}
                />
                )}
           </Grid.Column>
       </Grid>
    )
}

export default ActivityDashboard
