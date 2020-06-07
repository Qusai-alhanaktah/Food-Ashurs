import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image, ActivityIndicator, FlatList, ScrollView, TouchableOpacity,SafeAreaView } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { logUp, logOut } from './action.js';

const foodType = [
  {label: 'Eastern Food', value: 'eastern food'},
  {label: 'Fast Food', value: 'fast food'},
  {label: 'Deserts', value: 'desserts'},
]

function Recipient(props) {
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
     <SafeAreaView> 
                    <View style={styles.logOutBtn}>
               <Button onPress={()=>{
                  props.logOut()
          }} title='Log Out' color='red'/>
          </View>
          <View style={styles.activateBtn}>
         <Button onPress={()=> setShowForm(true)} title="Ask For Food" color='green'/>
        {showDonorsBtn  && (
         <Button onPress={()=>  getDonors() } title="See Donors" color='green'/> )}
          </View>
          <ScrollView style={styles.donorsContainer}>
        {!showDonorsBtn  && (
          <View style={styles.closeBtn}>
        <Button onPress={()=> {setShowDonors(false); setShowDonorsBtn(true)}} title='X' color='red'/>
        </View>
          )}
          {showDonors && donors.map( item =>{
            return <View style={styles.donors}  key={item._id} >
                <Text style={styles.text}>{item.name}</Text>
            </View>
          })}

        </ScrollView>



        <Modal visible={showForm}>
        <View style={styles.modalCloseBtn}>
        <Button onPress={()=> setShowForm(false)} title="X" color='red'/>
        </View>
        <Text>Your Name: </Text>
            <TextInput  placeholder='Type Your Name'  style={styles.modalText}  onChangeText={(value)=>setNewRecipient({...newRecipient, 'name': value})}/>
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
            <TextInput  placeholder='Your Identity'  style={styles.modalText}   onChangeText={(value)=>setNewRecipient({...newRecipient, 'identity': value})}/>
            <Text> Contact Number: </Text>
            <TextInput  placeholder='Your  Contact Number'  style={styles.modalText}   onChangeText={(value)=>setNewRecipient({...newRecipient, 'contactNumber': value})}/>
            <Text>Description: </Text>
            <TextInput  placeholder='Your Description '  style={styles.modalText}   onChangeText={(value)=>setNewRecipient({...newRecipient, 'description': value})}/>
            <View style={styles.modalBtn}>
            <Button onPress={()=> {addNewRecipient(); setShowForm(false)}} title="Submit" color='#f194ff' />
            </View>
            </Modal>


            <View >
            {showNewRecipient.name && (
              <TouchableOpacity style={styles.record}>
              <Text style={styles.recordItem}>{showNewRecipient.name}</Text>
              <Text style={styles.recordItem}>{showNewRecipient.requestType}</Text>
              <Text style={styles.recordItem}>{showNewRecipient.identity}</Text>
              <Text style={styles.recordItem}>{showNewRecipient.contactNumber}</Text>
              <Text style={styles.recordItem}>{showNewRecipient.description}</Text>
              <View style={styles.recordItemBtn}>
              <Button  onPress={()=> {setShowUpdateForm(true)}} title="Update" color='gray'/>
              <Button onPress={()=> {deleteDonor(showNewRecipient._id); setShowNewRecipientModal(false);}} title="Delete" color='red' />
              </View>
              </TouchableOpacity>
              )}
            <Modal visible={showUpdateForm}>
            <View style={styles.modalCloseBtn}>
            <Button onPress={()=> {setShowUpdateForm(false)}} title="X" color='#f194ff' />
            </View>
           <Text>Your Name: </Text>
            <TextInput  defaultValue={showNewRecipient.name}  style={styles.modalText}   onChangeText={(value)=>setUpdateRecipient({...updateRecipient, 'name': value})}/>
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
            <TextInput defaultValue={showNewRecipient.identity}   style={styles.modalText}   onChangeText={(value)=>setUpdateRecipient({...updateRecipient, 'identity': value})}/>
            <Text> Contact Number: </Text>
            <TextInput  defaultValue={showNewRecipient.contactNumber}   style={styles.modalText}   onChangeText={(value)=>setUpdateRecipient({...updateRecipient, 'contactNumber': value})}/>
            <Text>Description: </Text>
            <TextInput  defaultValue={showNewRecipient.description}   style={styles.modalText}   onChangeText={(value)=>setUpdateRecipient({...updateRecipient, 'description': value})}/>
            <View style={styles.modalBtn}>
           <Button onPress={()=> {updatedDonor(showNewRecipient._id); setShowUpdateForm(false)}} title="Submit" color='#f194ff' />
           </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Recipient);

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
  donorsContainer: {  height: 200,  width: 360,  marginHorizontal: 25, marginVertical:  10},
  donors: {padding: 10, alignItems: 'center', backgroundColor: '#c8e6c9' },
  closeBtn: { width: 360, alignItems: 'flex-end',  backgroundColor: '#c8e6c9'  },
  footer: {marginTop: 200},
  record: {alignItems: 'center', backgroundColor: '#ffab00'},
  recordItem: { padding: 10, fontWeight: 'bold', fontSize: 20, color: '#0277bd'},
  recordItemBtn: {flexDirection: 'row', paddingHorizontal: 50, justifyContent: 'space-between', width: 300},
  modal: {padding: 200},
  modalText: { borderStyle: 'solid', borderWidth: 1, borderRadius: 20, backgroundColor: 'white', fontSize: 15, color: 'blue', textAlign: 'center', marginBottom: 20 },
  modalBtn: {alignItems: 'center'},
  modalCloseBtn: { width: 411, alignItems: 'flex-end', },
});