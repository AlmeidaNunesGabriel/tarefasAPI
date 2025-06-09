import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView} from 'react-native';
import api from '../services/api';
import Card from '../components/Card';
import { useNavigation } from '@react-navigation/native';

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const inicializar = async () => {
      await carregarTarefas()
      setLoading(false)
    }
    
    inicializar()
  }, [])

  const carregarTarefas = async () => {
    try {
      const response = await api.get('/tasks')
      setTarefas(response.data)
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
    }
  }

  const navigation = useNavigation();
 
  async function irFormulario(){
      navigation.navigate('Formulario', {atualizarLista: carregarTarefas});
  }

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Nenhuma tarefa encontrada</Text>
      <Text style={styles.emptySubtitle}>Que tal criar sua primeira tarefa?</Text>
      <TouchableOpacity style={styles.emptyButton} onPress={irFormulario}>
        <Text style={styles.emptyButtonText}>+ Criar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );

  if(loading){
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#3498db" size={50}/>
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </View>
    )
  } else {
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Minhas Tarefas</Text>
          <Text style={styles.headerSubtitle}>
            {tarefas.length} {tarefas.length === 1 ? 'tarefa' : 'tarefas'}
          </Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={irFormulario}>
          <Text style={styles.addButtonText}>+ Nova Tarefa</Text>
        </TouchableOpacity>

        <FlatList
          data={tarefas}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Card data={item} funcCarregarTarefas={carregarTarefas} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyList}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#3498db',
    marginHorizontal: 20,
    marginVertical: 20,
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
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  emptyButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#27ae60',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});