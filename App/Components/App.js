import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import AccountDetailsPage from "../Pages/AccountDetailsPage";
import InventoryPage from '../Pages/InventoryPage';
import ItemDetailsPage from '../Pages/ItemDetailsPage';
import ItemRegisterPage from "../Pages/ItemRegistrationPage";

const navigator = createStackNavigator(
  {
    Login: LoginPage,
    Register: RegisterPage,
    ItemRegister: ItemRegisterPage,
    AccountDetails: AccountDetailsPage,
    Inventory: InventoryPage,
    ItemDetails: ItemDetailsPage,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Curator',
      // change the navigation bar's styling here
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
