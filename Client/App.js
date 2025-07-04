import { NavigationContainer } from '@react-navigation/native';
import Rootnavigation from './src/navigation/RootNavigatio.js';
import { AuthProvider } from './src/context/ApiContext';
import { StyleSheet } from 'react-native';
import { ReceipProvider } from './src/context/ReceipContext.js';

const App = () => {
  return (
    <AuthProvider>
      <ReceipProvider>
        <NavigationContainer>
          <Rootnavigation />
        </NavigationContainer>
      </ReceipProvider>
    </AuthProvider>
  );
};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
})