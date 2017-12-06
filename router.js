import { DrawerNavigator } from 'react-navigation'
import React from 'react'

import HomeComponent from './components/home_screen'
import UserProfileContainer from './containers/user_profile/user_profile_container'
import RequestContainer from './containers/request/request_container'
import UserPreferencesComponent from './components/user_preferences/user_preferences_component'
import CreateRequestContainer from './containers/create_request/create_request_container'
import RequestCard from './components/common/request_card'
import FirstTimeComponent from './components/first_time/first_time_component'
import EditUserProfileContainer from './containers/user_profile/user_profile_edit_container'
import SideBar from './components/side_bar'
import DashboardTabs from './containers/dashboard/dashboard_tabs'

const navOptions = {
  initialRouteName: 'Dashboard',
  contentComponent: props => <SideBar {...props} />
}

// The main navigator available to the logged in user.
export default DrawerNavigator({
  Home: { screen: HomeComponent },
  UserProfile: { screen: UserProfileContainer },
  Dashboard: { screen: DashboardTabs },
  Request: { screen: RequestContainer },
  UserPreferences: { screen: UserPreferencesComponent },
  CreateRequest: { screen: CreateRequestContainer },
  FirstTime: { screen: FirstTimeComponent },
  RequestCard: { screen: RequestCard },
  EditUserProfile: {screen: EditUserProfileContainer}
}, navOptions)
