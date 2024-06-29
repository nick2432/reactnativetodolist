import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditTaskComponent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);
  const [tasks, setTasks] = useState<string[]>([
    'Meeting',
    'Review',
    'Marketing',
    'Design Project',
  ]);

  const navigation = useNavigation();
  const route = useRoute();
  const { taskId } = route.params as { taskId: string };

  useEffect(() => {
    const loadTask = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          const tasksArray = JSON.parse(storedTasks);
          const taskToEdit = tasksArray.find((task: any) => task.id === taskId);
          if (taskToEdit) {
            setSelectedCategory(taskToEdit.category);
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setCompleted(taskToEdit.completed);
          }
        }
      } catch (error) {
        console.error('Error loading task:', error);
      }
    };

    loadTask();
  }, [taskId]);

  const handleSave = async () => {
    try {
      const newTask = {
        id: taskId,
        category: selectedCategory,
        title,
        description,
        completed
      };
      // Retrieve existing tasks
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasksArray = storedTasks ? JSON.parse(storedTasks) : [];
      // Update the edited task
      const updatedTasks = tasksArray.map((task: any) =>
        task.id === taskId ? newTask : task
      );
      // Save updated tasks to AsyncStorage
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

      // Optionally, navigate back to the main page
      navigation.goBack();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Select Category:</Text>
      <View style={styles.categoryContainer}>
        {tasks.map((task, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === task && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(task)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === task && styles.selectedCategoryText,
              ]}
            >
              {task}
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
      <TouchableOpacity
        style={[
          styles.completionButton,
          completed ? styles.completedButton : styles.notCompletedButton,
        ]}
        onPress={() => setCompleted(!completed)}
      >
        <Text
          style={[
            styles.completionButtonText,
            completed ? styles.completedButtonText : styles.notCompletedButtonText,
          ]}
        >
          {completed ? 'Mark as Undone' : 'Mark as Completed'}
        </Text>
      </TouchableOpacity>
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
  },
  categoryButton: {
    backgroundColor: '#80deea',
    padding: 10,
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
    marginVertical: 10,
    borderRadius: 5,
  },
  completionButton: {
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#4caf50',
  },
  notCompletedButton: {
    backgroundColor: '#f44336',
  },
  completionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completedButtonText: {
    color: '#fff',
  },
  notCompletedButtonText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#29b6f6',
    padding: 15,
    borderRadius: 5,
    marginTop: 50,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditTaskComponent;
