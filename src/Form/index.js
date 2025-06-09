import React, {Component, useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
 
export default function Form({route}) {
  const [id, setId] = useState(route.params?.id)
  const [newTitle, setNewTitle] = useState(route.params?.title)
  const [newDescription, setNewDescription] = useState(route.params?.description)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();

  const salvarTarefa = async () => {
    if (!newTitle?.trim()) {
      Alert.alert('Erro', 'Por favor, digite um título para a tarefa');
      return;
    }

    setLoading(true);
   
    try {
      const body = JSON.stringify({title: newTitle, description: newDescription})

      if (id !== undefined){
        const response = await api.put(`/tasks/${id}`, body, {headers: {'Content-Type': 'application/json'}});
      }
      else{
        const response = await api.post('/tasks', body, {headers: {'Content-Type': 'application/json'}});
      }

      navigation.goBack()  
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa');
    } finally {
      setLoading(false);
    }
  }

 return (
   <ScrollView style={styles.container}>
     <View style={styles.content}>
       <Text style={styles.title}>
         {id ? 'Editar Tarefa' : 'Nova Tarefa'}
       </Text>
       
       <View style={styles.inputContainer}>
         <Text style={styles.label}>Título *</Text>
         <TextInput
           style={styles.input}
           placeholder="Digite o título da tarefa"
           defaultValue={route.params?.title}
           onChangeText={(text)=> setNewTitle(text)}
           placeholderTextColor="#999"
         />
       </View>

       <View style={styles.inputContainer}>
         <Text style={styles.label}>Descrição</Text>
         <TextInput
           style={[styles.input, styles.textArea]}
           placeholder="Digite a descrição da tarefa"
           defaultValue={route.params?.description}
           onChangeText={(text)=> setNewDescription(text)}
           multiline={true}
           numberOfLines={4}
           textAlignVertical="top"
           placeholderTextColor="#999"
         />
       </View>

       <View style={styles.buttonContainer}>
         <TouchableOpacity 
           style={styles.cancelButton} 
           onPress={() => navigation.goBack()}
         >
           <Text style={styles.cancelButtonText}>Cancelar</Text>
         </TouchableOpacity>

         <TouchableOpacity 
           style={[styles.saveButton, loading && styles.disabledButton]} 
           onPress={salvarTarefa}
           disabled={loading}
         >
           <Text style={styles.saveButtonText}>
             {loading ? 'Salvando...' : 'Salvar'}
           </Text>
         </TouchableOpacity>
       </View>
     </View>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
    color: '#2c3e50',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e74c3c',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cancelButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
    shadowOpacity: 0.1,
  },
});