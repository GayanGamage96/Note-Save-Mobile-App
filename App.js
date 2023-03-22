import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const App = () => {
    const [notes, setNotes] = useState([]);
    const [modalNotes, setModalNotes] = useState(false);
    

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [noteId, setNoteId] = useState(null)

    useEffect(() => {
        getListNotes()
    }, [])

    const getListNotes = () => {
        fetch('http://192.168.70.232:5000/api/notes', {
            method: "GET"
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            if (res) {
                setNotes(res.notes)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const handleRemove = (item) => {
        const id = item._id;
        fetch(`http://192.168.70.232:5000/api/notes/${id}`, {
            method: "DELETE",
            body: JSON.stringify({

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()

        }).then(res => {
            console.log(res)
            getListNotes();
        }).catch(err => {
            console.log(err)
        })
    }

    const handleCreate = () => {
        setModalNotes(true)
    }

    const handleCloseModal = () => {
        setModalNotes(false)
    }

    const handleSubmit = () => {

      if(noteId==null){
        fetch(`http://192.168.70.232:5000/api/notes/add`, {
            method: "POST",
            body: JSON.stringify({
            
                title:title,
                description:description

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()

        }).then(res => {
            console.log(res)
            getListNotes();
            setModalNotes(false)
            clearForm()
            
        }).catch(err => {
            console.log(err)
        })
      }else{
        const id =noteId;
        fetch(`http://192.168.70.232:5000/api/notes/update/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title:title,
                description:description

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()

        }).then(res => {
            console.log(res)
            getListNotes();
            setModalNotes(false)
            clearForm()
            setNoteId(null)
        }).catch(err => {
            console.log(err)
        })
      }

        
    }

    const clearForm = () =>{
        setTitle("")
        setDescription("")
    }

    const handleEdit = (item) =>{
       
        setNoteId(item._id)
        setTitle(item.title)
        setDescription(item.description)
        setModalNotes(true)
    }



    return (
        <SafeAreaView>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalNotes}
            >
                
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.addBtn}>New Notes</Text>

                        <View style={{width:'90%',marginVertical:20}}>
                        <Text style={{fontSize:16,fontWeight:'bold',color:'green',marginVertical:10}}>Your note Title</Text>
                          <TextInput 
                          style={styles.txtInput}
                          placeholder="Type Here"
                          value={title}
                          onChangeText={(text)=>{
                            setTitle(text)
                          }}

                          
                          />
                          <Text style={{fontSize:16,fontWeight:'bold',color:'green',marginVertical:10}}>More Details</Text>
                          <TextInput 
                          style={styles.txtInput}
                          value={description}
                          placeholder="Type Here"
                          onChangeText={(text)=>{
                            setDescription(text)
                          }}
                          
                          />
                          </View>

                          <TouchableOpacity
                                style={style=styles.button}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.closeBtn}>Submit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                             style={style=styles.button}
                                onPress={handleCloseModal}
                            >
                                <Text style={styles.closeBtn}>Close</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                
            </Modal>
            <View style={styles.itemContainer}>
                <Text style={styles.txtMain}>Note List{": "}{notes.length}</Text>
                <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={handleCreate}>
                    <Text style={{ color: "blue", fontWeight: "bold" }} >New</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
                {notes.map((item, index) => {
                    return (
                        <View key={index} style={styles.itemContainer}>
                            <View
                                style={styles.item}   
                            >
                               
                                <Text style={styles.title}>{item.title}</Text>
                                
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => handleRemove(item)}>
                                    <Text style={styles.deleteBtn}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleEdit(item)}>
                                    <Text style={styles.editBtn}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}

            </ScrollView>
        </SafeAreaView>
    )
}

export default App

const styles = StyleSheet.create({
    txtMain: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10
    },

    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        marginHorizontal: 10

    },


    item: {
        width: '70%'

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 14,
        color: "blue"
    },
    deleteBtn: {
        color: "red"
    },
    editBtn:{
          color:'green'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:'80%',
        height:'80%'
    },

    closeBtn:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'

    },

    addBtn:{
        color:'gray',
        fontSize:16,
        fontWeight:'bold'

    },

    txtInput:{
        padding:10,
        borderWidth:1,
        borderColor:'black',
        marginBottom:16,
        
    },

    button:{
        width:'60%',
        backgroundColor:'#023e8a',
        padding:10,
        borderRadius:16,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:16
    }
    


})