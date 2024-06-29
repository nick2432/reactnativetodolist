import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const MainPage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCompleted, setShowCompleted] = useState<boolean>(false); // State for filtering completed tasks
  const navigation = useNavigation();

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  // Load tasks on initial render and on focus
  useEffect(() => {
    loadTasks();
  }, []);

  // Reload tasks when returning to MainPage from AddTask
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const handleTaskPress = (taskId: string) => {
    navigation.navigate('EditTask', { taskId });
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasksArray = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = tasksArray.filter((task: any) => task.id !== taskId);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (showCompleted ? task.completed : !task.completed)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, !showCompleted && styles.activeFilter]}
          onPress={() => setShowCompleted(false)}
        >
          <Text style={[styles.filterText, !showCompleted && styles.activeFilterText]}>Undone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, showCompleted && styles.activeFilter]}
          onPress={() => setShowCompleted(true)}
        >
          <Text style={[styles.filterText, showCompleted && styles.activeFilterText]}>Completed</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => handleTaskPress(item.id)}>
              <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskTime}>{item.time}</Text>
              </View>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskDetails}>{item.location || item.notes}</Text>
              <View style={styles.participants}>
                {item.participants &&
                  item.participants.map((participant: string, index: number) => (
                    <Image
                      key={index}
                      source={{ uri: participant }}
                      style={styles.participantImage}
                    />
                  ))}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.addButtonText}>Add new task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    marginVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 10,
  },
  filterText: {
    fontSize: 16,
    color: '#555',
  },
  activeFilter: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  activeFilterText: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  taskContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskTime: {
    fontSize: 14,
    color: '#888',
  },
  taskDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  taskDetails: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  participants: {
    flexDirection: 'row',
    marginTop: 10,
  },
  participantImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF5252',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    padding: 20,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainPage;
