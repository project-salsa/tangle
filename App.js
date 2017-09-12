import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import HomeComponent from './components/home_screen'
import DashboardComponent from './components/dashboard/dashboard_component'
import RequestComponent from './components/request/request_component'
import UserProfileComponent from './components/user_profile/user_profile_component'
import LoginComponent from './components/login/login_component'
import UserPreferencesComponent from './components/user_preferences/user_preferences_component'

const App = StackNavigator({
  Home: { screen: HomeComponent },
  Dashboard: { screen: DashboardComponent },
  Request: { screen: RequestComponent },
  UserProfile: { screen: UserProfileComponent },
  Login: { screen: LoginComponent },
  UserPreferences: { screen: UserPreferencesComponent }
})

export default App

AppRegistry.registerComponent('App', () => App)
