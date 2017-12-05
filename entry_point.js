import { StackNavigator } from 'react-navigation'
import LoginContainer from './containers/login/LoginContainer'
import Router from './router'
import RegisterContainer from './containers/register/RegisterContainer'

export default StackNavigator({
  Login: { screen: LoginContainer },
  Register: {screen: RegisterContainer},
  Router: { screen: Router }
}, {
  headerMode: 'none'
})
