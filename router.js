import { StackNavigator } from 'react-navigation'
import HomeComponent from './components/home_screen'
import UserProfileContainer from './containers/user_profile/user_profile_container'
import DashboardContainer from './containers/dashboard_container'
import RequestContainer from './containers/request/request_container'
import LoginComponent from './components/login/login_component'
import UserPreferencesComponent from './components/user_preferences/user_preferences_component'
import CreateRequestContainer from './containers/create_request/create_request_container'
import RequestCard from './components/common/request_card'
import FirstTimeComponent from './components/first_time/first_time_component'

export const AppNavigator = StackNavigator({
  Home: { screen: HomeComponent },
  UserProfile: { screen: UserProfileContainer },
  Dashboard: { screen: DashboardContainer },
  Request: { screen: RequestContainer },
  Login: { screen: LoginComponent },
  UserPreferences: { screen: UserPreferencesComponent },
  CreateRequest: { screen: CreateRequestContainer },
  FirstTime: { screen: FirstTimeComponent },
  RequestCard: { screen: RequestCard }
}, {
  initialRouteName: 'Dashboard'
})

/*
 Since the users shouldn't access anything until they log in, this prevents them from navigating elsewhere.
 This leaves us free to add other navigators to the other screens without having them available to users who
 haven't logged in.
*/
export const RootNavigator = StackNavigator({
  Login: { screen: LoginComponent },
  AppNavigator: { screen: AppNavigator }
}, {
  initialRouteName: 'Login'
})