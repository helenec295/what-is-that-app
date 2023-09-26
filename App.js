import { StyleSheet, View, ScrollView } from 'react-native';
import DetectObject from './src';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <DetectObject />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  scrollViewContent: {
    flexGrow: 1, // Ensure that the content can scroll
  },
});
