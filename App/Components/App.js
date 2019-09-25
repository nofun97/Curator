import {createAppContainer, createStackNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AccountDetailScreen from './screens/AccountDetailScreen';
import InventoryScreen from './screens/InventoryScreen';
import ItemDescriptionScreen from './screens/ItemDescriptionScreen';

const navigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Account: AccountDetailScreen,
    Inventory: InventoryScreen,
    Item: ItemDescriptionScreen,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Curator',
      // change the navigation bar's styling here
      headerStyle: {
        backgroundColor: '#509682',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default createAppContainer(navigator);
