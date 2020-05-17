import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { AsyncStorage } from 'react-native';

const foodType = [
  {label: 'Eastern Food', value: 'eastern food'},
  {label: 'Fast Food', value: 'fast food'},
  {label: 'Deserts', value: 'desserts'},
]

export default function Recipient(props) {
    const [loading, setLoading] = useState(true);
    const [donors, setDonors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newRecipient, setNewRecipient] = useState({});
    const [showNewRecipient, setShowNewRecipient] =  useState({});
    const [showDonors, setShowDonors] = useState(false);
    const [showDonorsBtn, setShowDonorsBtn] = useState(true);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateRecipient, setUpdateRecipient] = useState({});
    const [showNewRecipientModal, setShowNewRecipientModal] = useState(false);
  const updatedDonor = id => {
    fetch(`https://food--ashurs.herokuapp.com/api/v1/recipient/${id}`,{
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(updateRecipient),
    })
    .then(res => res.json())
    .then(data => setShowNewRecipient(data));
  }
  const deleteDonor = id => {
    fetch(`https://food--ashurs.herokuapp.com/api/v1/recipient/${id}`,{
      headers: { 'Content-Type': 'application/json' },
      method: 'Delete',
      body: undefined,
    })
    .then(res => {
      setShowNewRecipient({});
    });
  }

  const addNewRecipient = e => {
    fetch('https://food--ashurs.herokuapp.com/api/v1/recipient',{
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(newRecipient),
    })
    .then(res => res.json())
    .then(data => {
      setShowNewRecipient(data);
      setShowNewRecipientModal(true);
    });
  }

    const getDonors = e => {
      fetch('https://food--ashurs.herokuapp.com/api/v1/donor')
      .then(response => response.json())
      .then(data => {
        setDonors(data.results);
        setShowDonorsBtn(false);
        setShowDonors(true)
      });
    };
    // {loading && (
    //   <View >
    //     <ActivityIndicator />
    //   </View>
    // )}
    return (
     <ScrollView> 
               <Button onPress={()=>{ AsyncStorage.clear();
                  // props.navigation.navigate('Home');
          }} title='Log Out' color='red'/>
        {showDonorsBtn  && (
         <Button onPress={()=>  getDonors() } title="See Donors" color='green'/> )}
        <TouchableOpacity style={styles.container}>
          {showDonors && donors.map( item =>{
            return <View key={item._id} >
                <Text style={styles.text}>{item.name}</Text>
            </View>
          })}
          {!showDonorsBtn  && (
        <Button onPress={()=> {setShowDonors(false); setShowDonorsBtn(true)}} title='X' color='red'/>
          )}
        </TouchableOpacity>



        <Button onPress={()=> setShowForm(true)} title="Ask For Food" color='green'/>
        <Modal visible={showForm}>
        <Button onPress={()=> setShowForm(false)} title="X" color='red'/>
        <Text>Your Name: </Text>
            <TextInput  placeholder='Type Your Name'  style={styles.input}  onChangeText={(value)=>setNewRecipient({...newRecipient, 'name': value})}/>
            <Text>Food Type: </Text>
            <RadioForm
                radio_props={foodType}
                initial={-1}
                onPress={ value => setNewRecipient({...newRecipient, 'requestType': value})}
                buttonSize={20}
                buttonOuterSize={25}
                selectorButtonColor={'green'}
              />
         <Text>Identity: </Text>
            <TextInput  placeholder='Your Identity'  style={styles.input}   onChangeText={(value)=>setNewRecipient({...newRecipient, 'identity': value})}/>
            <Text> Contact Number: </Text>
            <TextInput  placeholder='Your  Contact Number'  style={styles.input}   onChangeText={(value)=>setNewRecipient({...newRecipient, 'contactNumber': value})}/>
            <Text>Description: </Text>
            <TextInput  placeholder='Your Description '  style={styles.input}   onChangeText={(value)=>setNewRecipient({...newRecipient, 'description': value})}/>
            <Button onPress={()=> {addNewRecipient(); setShowForm(false)}} title="Submit" color='#f194ff' />
            </Modal>


            <View >
            {showNewRecipient.name && (
              <TouchableOpacity>
              <Text>{showNewRecipient.name}</Text>
              <Text>{showNewRecipient.requestType}</Text>
              <Text>{showNewRecipient.identity}</Text>
              <Text>{showNewRecipient.contactNumber}</Text>
              <Text>{showNewRecipient.description}</Text>
              <Button  onPress={()=> {setShowUpdateForm(true)}} title="Update" color='gray'/>
              <Button onPress={()=> {deleteDonor(showNewRecipient._id); setShowNewRecipientModal(false);}} title="Delete" color='red' />
              </TouchableOpacity>
              )}
            <Modal visible={showUpdateForm}>
            <Button onPress={()=> {setShowUpdateForm(false)}} title="X" color='#f194ff' />
           <Text>Your Name: </Text>
            <TextInput  defaultValue={showNewRecipient.name}  style={styles.input}   onChangeText={(value)=>setUpdateRecipient({...updateRecipient, 'name': value})}/>
            <Text>Food Type: </Text>
            <RadioForm
                radio_props={foodType}
                initial={-1}
                onPress={ value => setUpdateRecipient({...updateRecipient, 'type': value})}
                buttonSize={20}
                buttonOuterSize={25}
                selectorButtonColor={'green'}
              /> 
         <Text>Identity: </Text>
            <TextInput defaultValue={showNewRecipient.identity}   style={styles.input}   onChangeText={(value)=>setUpdateRecipient({...updateRecipient, 'identity': value})}/>
            <Text> Contact Number: </Text>
            <TextInput  defaultValue={showNewRecipient.contactNumber}   style={styles.input}   onChangeText={(value)=>setUpdateRecipient({...updateRecipient, 'contactNumber': value})}/>
            <Text>Description: </Text>
            <TextInput  defaultValue={showNewRecipient.description}   style={styles.input}   onChangeText={(value)=>setUpdateRecipient({...updateRecipient, 'description': value})}/>
           <Button onPress={()=> {updatedDonor(showNewRecipient._id); setShowUpdateForm(false)}} title="Submit" color='#f194ff' />
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