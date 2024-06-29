import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const categories = ['Meeting', 'Review', 'Marketing', 'Design Project'];

const AddTaskComponent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSave = async () => {
    try {
      if (!selectedCategory || !title.trim()) {
        Alert.alert('Incomplete Data', 'Please select a category and enter a title.');
        return;
      }

      const newTask = {
        id: uuid.v4(),
        category: selectedCategory,
        title: title.trim(),
        description: description.trim(),
        completed: isCompleted,
      };

      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasksArray = storedTasks ? JSON.parse(storedTasks) : [];
      await AsyncStorage.setItem('tasks', JSON.stringify([...tasksArray, newTask]));

      setSelectedCategory('');
      setTitle('');
      setDescription('');
      setIsCompleted(false);

      Alert.alert('Success', 'Task saved successfully!');
      console.log('Task Saved', newTask);
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'Failed to save task. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Select Category:</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Completed:</Text>
        <Switch
          value={isCompleted}
          onValueChange={setIsCompleted}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isCompleted ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#80deea',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 5,
  },
  selectedCategory: {
    backgroundColor: '#29b6f6',
  },
  categoryButtonText: {
    color: '#fff',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#29b6f6',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddTaskComponent;
