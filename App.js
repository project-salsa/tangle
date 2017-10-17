import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import HomeComponent from './components/home_screen'
import DashboardComponent from './components/dashboard/dashboard_component'
import RequestComponent from './components/request/request_component'
import UserProfileContainer from './containers/user_profile/user_profile_container'
import LoginComponent from './components/login/login_component'
import UserPreferencesComponent from './components/user_preferences/user_preferences_component'
import CreateRequestComponent from './components/create_request/create_request_component'
import RequestCard from './components/common/request_card'
import FirstTimeComponent from './components/first_time/first_time_component'

const App = StackNavigator({
  Home: { screen: HomeComponent },
  Dashboard: { screen: DashboardComponent },
  Request: { screen: RequestComponent },
  UserProfile: { screen: UserProfileContainer },
  Login: { screen: LoginComponent },
  UserPreferences: { screen: UserPreferencesComponent },
  CreateRequest: { screen: CreateRequestComponent },
  FirstTime: { screen: FirstTimeComponent },
  RequestCard: { screen: RequestCard }
})

export default App

AppRegistry.registerComponent('App', () => App)