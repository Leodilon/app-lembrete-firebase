import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import ENV from './env'
import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp(ENV)
}

const db = firebase.firestore()

export default function App() {

  const [lembrete, setLembrete] = useState('')
  const [lembretes, setLembretes] = useState([])
  
  useEffect(() => {
    db.collection('lembretes').onSnapshot((snapshot) => {
      let aux = []
      snapshot.forEach(doc => {
      aux.push(doc.data())
    })
    setLembretes(lembretesAnterior => aux)
    console.log(lembretes)
    })
  }, [])

  const capturarLembrete = (lembrete) => {
    setLembrete(lembrete)
  }

  const adicionarLembrete = () => {
    db.collection('lembrete').add({
      texto: lembrete,
      data: new Date()
    })
    setLembrete('')
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.entrada}
        placeholder='Digite seu lembrete'
        onChangeText={capturarLembrete}
        value={lembrete}
      />
      <View style={styles.botao}>
        <Button
          title='OK'
          onPress={adicionarLembrete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 12,
  },

  entrada: {
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    fontSize: 14,
    padding: 12,
    width: '80%',
    marginBottom: 12,
    textAlign: 'center'
  },

  botao: {
    width: '80%'
  }
});
