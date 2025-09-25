import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ListRenderItem,
} from 'react-native';

interface ToDoItem {
  id: string;
  text: string;
}

export default function HomeScreen() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<ToDoItem[]>([]);

  const handleAddTask = () => {
    if (task.trim().length === 0) {
      return;
    }
    const newTask: ToDoItem = {
      id: Date.now().toString(),
      text: task,
    };
    setTasks([...tasks, newTask]);
    setTask('');
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(item => item.id !== id);
    setTasks(updatedTasks);
  };

  const renderItem: ListRenderItem<ToDoItem> = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <Text style={styles.deleteButton}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ketik tugas baru..."
          value={task}
          onChangeText={setTask}
        />
        <Button title="Tambah" onPress={handleAddTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem} 
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
});