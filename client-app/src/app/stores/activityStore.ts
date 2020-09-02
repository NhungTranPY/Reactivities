import { observable, action, computed, configure, runInAction } from "mobx"
import { createContext, SyntheticEvent } from "react"
import { IActivity } from "../models/activity"
import agent from "../api/agent"

//bai 91: enabling MobX stric mode 
configure({enforceActions: 'always'})

class ActivityStore {
    @observable activityRegistry = new Map ()  //bai 87
    @observable title = 'Hello from me'
    @observable activities: IActivity[] = []
    @observable selectedActivity: IActivity | undefined
    @observable loadingInitial = false
    @observable editMode = false
    @observable submitting = false
    @observable target = ''

    //use computed when we already have existing data, and how the data base
    @computed get activitiesByDate() {
        //return this.activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date)) tuong tu:
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        )
    }

    @action loadActivities = async () => { //async bai 84
        this.loadingInitial = true //trong mobx we can mutate state, in components we can not ma phai dung setState or useState function
        try {
            //ben duoi copied tu useEffect trong App.tsx qua
            const activities = await agent.Activities.list() 
            runInAction('loading activities', () => {
                activities.forEach((activity) => {
                    activity.date = activity.date.split('.')[0] //return phan dau tien cua mang sau khi cat, phan time dau tien
                    // ngoai sd code nay de day vao mang: this.activities.push(activity) ta con sd duoc: (xem bai 87)
                    this.activityRegistry.set(activity.id, activity)
                });
                this.loadingInitial = false
            })
        } catch (error) {
            runInAction('load activities error', () => {
                this.loadingInitial = false
            })
            console.log(error)
        }
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true
        try {
            await agent.Activities.create(activity)
            runInAction('creating activity', () => {
                // ngoai sd code nay de day vao mang: this.activities.push(activity) ta con sd duoc: (xem bai 87)
                this.activityRegistry.set(activity.id, activity)
                this.editMode = false
                this.submitting = false
            })
        } catch (error) {
            runInAction('create activity error', () =>{
                this.submitting = false
            })
            console.log(error)
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true
        try {
            await agent.Activities.update(activity)
            runInAction('editing activity', () => {
                this.activityRegistry.set(activity.id, activity) //cai activity thu 2 nay la updated activity
                this.selectedActivity = activity;
                this.editMode = false
                this.submitting = false
            })    
        } catch (error) {
            runInAction('edit activity error', () => {
                this.submitting = false
            })
            console.log(error)
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true
        this.target = event.currentTarget.name
        try {
            await agent.Activities.delete(id)
            runInAction('deleting activity', () => {
                this.activityRegistry.delete(id)
                this.submitting = false
                this.target = ''
            })  
        } catch (error) {
            runInAction('delete activity error', () => {
                this.submitting = false
                this.target = ''
            })
            console.log(error)
        }
    }

    @action openCreateForm = () => {
        this.editMode = true
        this.selectedActivity = undefined
    }

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id)
        this.editMode = true
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined
    }

    @action cancelFormOpen = () => {
        this.editMode = false
    }

    @action selectActivity = (id: string) => {
        //this.selectedActivity = this.activities.find(a => a.id === id) tuong tu voi:
        this.selectedActivity = this.activityRegistry.get(id)
        this.editMode = false
    }
}

export default createContext(new ActivityStore())