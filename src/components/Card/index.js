import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

function Card({data, funcCarregarTarefas}){
  const [id, setId] = useState(data?.id)
  const [title, setTitle] = useState(data?.title)
  const [description, setDescription] = useState(data?.description)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();

  const excluirTarefa = async () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await api.delete(`/tasks/${id}`);
              // Atualizar a lista após exclusão
              if (funcCarregarTarefas) {
                await funcCarregarTarefas();
              }
            } catch (error) {
              console.error('Erro ao excluir tarefa:', error);
              Alert.alert('Erro', 'Não foi possível excluir a tarefa');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  }
 
  async function irFormulario(){
      navigation.navigate('Formulario', { 
        id: id, 
        title: title, 
        description: description
      });
  }

  return(
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.titulo} numberOfLines={2}>
            {title}
          </Text>
         
          {description && (
            <Text style={styles.descricao} numberOfLines={3}>
              {description}
            </Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.buttonEditar} 
            onPress={irFormulario}
            disabled={loading}
          >
            <Text style={styles.buttonEditarText}>✏️ Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.buttonExcluir, loading && styles.disabledButton]} 
            onPress={excluirTarefa}
            disabled={loading}
          >
            <Text style={styles.buttonExcluirText}>
              {loading ? '⏳' : '🗑️'} {loading ? 'Excluindo...' : 'Excluir'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  cardContent: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    lineHeight: 24,
  },
  descricao: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  buttonEditar: {
    flex: 1,
    backgroundColor: '#f39c12',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#f39c12',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonEditarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonExcluir: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#e74c3c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonExcluirText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
    shadowOpacity: 0.1,
  },
});
 
export default Card;