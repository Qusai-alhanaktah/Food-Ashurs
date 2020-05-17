import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { AsyncStorage } from 'react-native';

const foodType = [
  {label: 'Eastern Food', value: 'eastern food'},
  {label: 'Fast Food', value: 'fast food'},
  {label: 'Deserts', value: 'desserts'},
]

export default function Donor(props) {
    const [loading, setLoading] = useState(true);
    const [recipients, setRecipients] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newDonor, setNewDonor] = useState({});
    const [showNewDonor, setShowNewDonor] =  useState({});
    const [showRecipients, setShowRecipients] = useState(false);
    const [showRecipientsBtn, setShowRecipientsBtn] = useState(true);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateDonor, setUpdateDonor] = useState({});
    const [showNewDonorModal, setShowNewDonorModal] = useState(false);
  const updatedDonor = id => {
    fetch(`https://food--ashurs.herokuapp.com/api/v1/donor/${id}`,{
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(updateDonor),
    })
    .then(res => res.json())
    .then(data => setShowNewDonor(data));
  }
  const deleteDonor = id => {
    fetch(`https://food--ashurs.herokuapp.com/api/v1/donor/${id}`,{
      headers: { 'Content-Type': 'application/json' },
      method: 'Delete',
      body: undefined,
    })
    .then(res => {
      setShowNewDonor({});
    });
  }

  const addNewDonor = e => {
    fetch('https://food--ashurs.herokuapp.com/api/v1/donor',{
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(newDonor),
    })
    .then(res => res.json())
    .then(data => {
      setShowNewDonor(data);
      setShowNewDonorModal(true);
    });
  }

    const getRecipients = e => {
      fetch('https://food--ashurs.herokuapp.com/api/v1/recipient')
      .then(response => response.json())
      .then(data => {
        setRecipients(data.results);
        setShowRecipientsBtn(false);
        setShowRecipients(true)
      });
    };

    return (
     <ScrollView> 
          <Button onPress={()=>{ AsyncStorage.clear();
                  // props.navigation.navigate('Home');
          }} title='Log Out' color='red'/>
        {showRecipientsBtn  && (
         <Button onPress={()=>  getRecipients() } title="See Recipients" color='green'/> )}
        <TouchableOpacity style={styles.container}>
          {showRecipients && recipients.map( item =>{
            return <View key={item._id} >
                <Text style={styles.text}>{item.name}</Text>
            </View>
          })}
          {!showRecipientsBtn  && (
        <Button onPress={()=> {setShowRecipients(false); setShowRecipientsBtn(true)}} title='X' color='red'/>
          )}
        </TouchableOpacity>



        <Button onPress={()=> setShowForm(true)} title="Let's Donate" color='green'/>
        <Modal visible={showForm}>
        <Button onPress={()=> setShowForm(false)} title="X" color='red'/>
        <Text>Your Name: </Text>
            <TextInput  placeholder='Type Your Name'  style={styles.input}   onChangeText={(value)=>setNewDonor({...newDonor, 'name': value})}/>
            <Text>Food Type: </Text>
            <RadioForm
                radio_props={foodType}
                initial={-1}
                onPress={ value => setNewDonor({...newDonor, 'type': value})}
                buttonSize={20}
                buttonOuterSize={25}
                selectorButtonColor={'green'}
              />
         <Text>Food Mount: </Text>
            <TextInput  placeholder='EX: 10 meal'  style={styles.input}   onChangeText={(value)=>setNewDonor({...newDonor, 'amount': value})}/>
            <Text>Available Time: </Text>
            <TextInput  placeholder='EX: 10 meal'  style={styles.input}  onChangeText={(value)=>setNewDonor({...newDonor, 'available_time': value})}/>
            <Button onPress={()=> {addNewDonor(); setShowForm(false)}} title="Submit" color='#f194ff' />
            </Modal>


            <View >
            {showNewDonor.name && (
              <TouchableOpacity>
              <Text>{showNewDonor.name}</Text>
              <Text>{showNewDonor.type}</Text>
              <Text>{showNewDonor.amount}</Text>
              <Text>{showNewDonor.available_time}</Text>
              <Button  onPress={()=> {setShowUpdateForm(true)}} title="Update" color='gray'/>
              <Button onPress={()=> {deleteDonor(showNewDonor._id); setShowNewDonorModal(false);}} title="Delete" color='red' />
              </TouchableOpacity>
              )}
            <Modal visible={showUpdateForm}>
            <Button onPress={()=> {setShowUpdateForm(false)}} title="X" color='#f194ff' />
           <Text>Your Name: </Text>
            <TextInput  defaultValue={showNewDonor.name}  style={styles.input}  onChangeText={(value)=>setUpdateDonor({...updateDonor, 'name': value})}/>
            <Text>Food Type: </Text>
            <RadioForm
                radio_props={foodType}
                initial={-1}
                onPress={ value => setUpdateDonor({...updateDonor, 'type': value})}
                buttonSize={20}
                buttonOuterSize={25}
                selectorButtonColor={'green'}
              /> 
         <Text>Food Mount: </Text>
            <TextInput  defaultValue={showNewDonor.amount}  style={styles.input}   onChangeText={(value)=>setUpdateDonor({...updateDonor, 'amount': value})}/>
            <Text>Available Time: </Text>
            <TextInput  defaultValue={showNewDonor.available_time}  style={styles.input}  onChangeText={(value)=>setUpdateDonor({...updateDonor, 'available_time': value})}/>
            <Button onPress={()=> {updatedDonor(showNewDonor._id); setShowUpdateForm(false)}} title="Submit" color='#f194ff' />
            </Modal>
            </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
      bottom: 300,
    },
    text: {color: 'green', fontSize: 20,}
  });