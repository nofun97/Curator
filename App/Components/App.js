import {createAppContainer, createStackNavigator} from 'react-navigation';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import AccountDetailsPage from '../Pages/AccountDetailsPage';
import InventoryPage from '../Pages/InventoryPage';
import ItemDetailsPage from '../Pages/ItemDetailsPage';
import ItemRegisterPage from '../Pages/ItemRegistrationPage';
import ItemEditPage from '../Pages/ItemEditPage';

// navigator for the whole app
const navigator = createStackNavigator(
  {
    Login: LoginPage,
    Register: RegisterPage,
    ItemRegister: ItemRegisterPage,
    AccountDetails: AccountDetailsPage,
    Inventory: InventoryPage,
    ItemDetails: ItemDetailsPage,
    ItemEdit: ItemEditPage,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Curator',
      headerStyle: {
        backgroundColor: '#338c83',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff',
      },
    },
  },
);

export default createAppContainer(navigator);
