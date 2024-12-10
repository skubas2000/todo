import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]); // Lista zadań
  const [taskText, setTaskText] = useState(''); // Tekst nowego zadania

  // Dodawanie nowego zadania
  const addTask = () => {
    if (taskText.trim().length > 0) {
      const newTask = { id: Date.now().toString(), text: taskText, completed: false };
      setTasks([...tasks, newTask]);
      setTaskText(''); // Czyści pole tekstowe
    }
  };

  // Oznaczanie zadania jako wykonane
  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    ); 
  };
  

  // Usuwanie zadania
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
 
  return (
      <View style={styles.container}>
        <Text style={styles.title}>To-Do List</Text>

        {/* Pole tekstowe i przycisk "Dodaj" */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Dodaj nowe zadanie..."
            value={taskText}
            onChangeText={(text) => setTaskText(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Dodaj</Text>
          </TouchableOpacity>
        </View>

        {/* Lista zadań */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggleCompletion={toggleTaskCompletion}
              onDelete={deleteTask}
            />
          )}
        />
      </View>
  );
};

// Komponent wyświetlający pojedyncze zadanie
const TaskItem = ({ task, onToggleCompletion, onDelete }) => {
  return (
    <View style={styles.taskItem}>
      {/* Kliknięcie na tekst oznacza jako wykonane */}
      <TouchableOpacity onPress={() => onToggleCompletion(task.id)} style={{ flex: 1 }}>
        <Text style={[styles.taskText, task.completed && styles.completedTask]}>
          {task.text}
        </Text>
      </TouchableOpacity>

      {/* Przycisk usuwania */}
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteButton}>Usuń</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteButton: {
    color: '#FF6347',
    marginLeft: 10,
  },
});


export default App;
