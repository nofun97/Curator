# Curator
A mobile app that makes managing family properties and inheritance easier.

## Setup
1. `cd <project-folder> && yarn install`
2. Make sure you have android sdk and adb installed (google it)
3. Create `local.properties` in `Curator/android`
4. Put `sdk.dir = <android sdk path>` in `local.properties`
5. Plugin your device (or use emulator, create it using android studio)
6. Type `adb devices` in terminal, ensure device is connected
7. To run, type `react-native run-android`
8. After that, app should hot reload itself after changes
9. To run again next time use `react-native log-android` to show debug messages

Additional Notes:

If there are problems relating to Android Development Environment not working properly (Windows Only),

1. Ensure all steps above are completed
2. Follow steps here: https://codeburst.io/setting-up-development-environment-using-react-native-on-windows-dd240e69f776,
especially the part for setting of environment variables
3. Try setting the format of local.properties path to use double slash instead of single slash

University Project for University of Melbourne IT Project Subject COMP30022 2019 Semester 2


