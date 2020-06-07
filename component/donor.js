import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image, ActivityIndicator, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { logUp, logOut } from './action.js';

const foodType = [
  {label: 'Eastern Food', value: 'eastern food'},
  {label: 'Fast Food', value: 'fast food'},
  {label: 'Deserts', value: 'desserts'},
]

function Donor(props) {
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
     <SafeAreaView> 
          <View style={styles.logOutBtn}>
          <Button onPress={()=>{
                  props.logOut();
          }} title='Log Out' color='red'/>
          </View>
          <View style={styles.activateBtn}>
        <Button onPress={()=> setShowForm(true)} title="Let's Donate" color='green'/>
        {showRecipientsBtn  && (
         <Button onPress={()=>  getRecipients() } title="See Recipients" color='green'/> )}
        </View>
        <ScrollView style={styles.recipientsContainer}>
        {!showRecipientsBtn  && (
          <View style={styles.closeBtn}>
        <Button onPress={()=> {setShowRecipients(false); setShowRecipientsBtn(true)}} title='X' color='red'/></View>
          )}
          {showRecipients && recipients.map( item =>{
            return <View style={styles.recipients} key={item._id} >
                <Text style={styles.text}>{item.name}</Text>
            </View>
          })}
 
        </ScrollView>



        <Modal visible={showForm} style={styles.modal}>
        <View style={styles.modalCloseBtn}>
        <Button onPress={()=> setShowForm(false)} title="X" color='red'/>
        </View>
        <Text >Your Name: </Text>
            <TextInput  placeholder='Type Your Name'  style={styles.modalText} onChangeText={(value)=>setNewDonor({...newDonor, 'name': value})}/>
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
            <TextInput  placeholder='EX: 10 meal'   style={styles.modalText}  onChangeText={(value)=>setNewDonor({...newDonor, 'amount': value})}/>
            <Text>Available Time: </Text>
            <TextInput  placeholder='EX: 10 meal'  style={styles.modalText} onChangeText={(value)=>setNewDonor({...newDonor, 'available_time': value})}/>
            <View style={styles.modalBtn}>
              <Button onPress={()=> {addNewDonor(); setShowForm(false)}} title="Submit" color='#eeff41' />
            </View>
          </Modal>


            <View >
            {showNewDonor.name && (
              <TouchableOpacity style={styles.record}>
              <Text style={styles.recordItem}>{showNewDonor.name}</Text>
              <Text style={styles.recordItem}>{showNewDonor.type}</Text>
              <Text style={styles.recordItem}>{showNewDonor.amount}</Text>
              <Text style={styles.recordItem}>{showNewDonor.available_time}</Text>
              <View style={styles.recordItemBtn}>
              <Button  onPress={()=> {setShowUpdateForm(true)}} title="Update" color='gray'/>
              <Button onPress={()=> {deleteDonor(showNewDonor._id); setShowNewDonorModal(false);}} title="Delete" color='red' />
              </View>
              </TouchableOpacity>
              )}
            <Modal visible={showUpdateForm}>
            <View style={styles.closeBtn}>
            <Button onPress={()=> {setShowUpdateForm(false)}} title="X" color='#f194ff' />
            </View>
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
            <View style={styles.footer}>

            </View>
    </SafeAreaView>
    )
}
const mapStateToProps = state => ({
  user: state.authReducer.user,
  loggedIn: state.authReducer.loggedIn,
  loading: state.authReducer.loading,
});
const mapDispatchToProps = { logUp, logOut };

export default connect(mapStateToProps, mapDispatchToProps)(Donor);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
      bottom: 300,
    },
    text: {color: 'green', fontSize: 20,},
    logOutBtn: { width: 400, marginVertical: 30, alignItems: 'flex-end',  },
    activateBtn: {flexDirection: 'row', justifyContent: 'space-between', width: 400, paddingHorizontal: 50},
    recipientsContainer: {  height: 200,  width: 360,  marginHorizontal: 25, marginVertical:  10},
    recipients: {padding: 10, alignItems: 'center', backgroundColor: '#c8e6c9' },
    closeBtn: { width: 360, alignItems: 'flex-end',  backgroundColor: '#c8e6c9'  },
    footer: {marginTop: 200},
    record: {alignItems: 'center', },
    recordItem: { padding: 10, fontWeight: 'bold', fontSize: 20, color: '#0277bd'},
    recordItemBtn: {flexDirection: 'row', paddingHorizontal: 50, justifyContent: 'space-between', width: 300},
    modal: {padding: 200},
    modalText: { borderStyle: 'solid', borderWidth: 1, borderRadius: 20, backgroundColor: 'white', fontSize: 15, color: 'blue', textAlign: 'center', marginBottom: 20 },
    modalBtn: {alignItems: 'center'},
    modalCloseBtn: { width: 411, alignItems: 'flex-end', },

  });