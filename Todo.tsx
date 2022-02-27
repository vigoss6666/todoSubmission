import React from 'react'; 
import {useRef, useState} from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList, TextInput,TouchableOpacity } from 'react-native';
import { AntDesign,Entypo } from '@expo/vector-icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


interface todo {
    task:string, 
    id:number,
    checked:boolean 
  }

 function Todo(){
  const [todoList,setTodoList] = useState<Array<todo>>([]);
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const inputRef = useRef(); 
  
  const _renderItem = ({item,index}) => {
     return <View style = {styles.renderMain} testID = {`post-row-${index}`}>
      <View style = {styles.renderInnerView}>
      {item.checked ? <TouchableOpacity onPress = {() => addCompleted(item.id)} testID = {`post-row-update${index}`}>
      <AntDesign name="checkcircleo" size={RFPercentage(4)} color="black" />
      </TouchableOpacity>:
      <TouchableOpacity onPress = {() => addCompleted(item.id)} testID = {`post-row-update1${index}`}>
      <Entypo name="circle" size={RFPercentage(4)} color="black" />
      </TouchableOpacity>
      }
     <TouchableOpacity onPress = {() => addCompleted(item.id)}>
     <Text numberOfLines = {2} style = {styles.renderText}>{item.task}</Text>
     </TouchableOpacity>  
     </View> 
     <TouchableOpacity onPress = {() => _deleteTodo(item.id)} testID = {`post-row-delete-${index}`}>
     <AntDesign name="delete" size={RFPercentage(4)} color="black" style = {styles.renderDelete}/>
     </TouchableOpacity>

     </View>
  }
  const _addTodo = () => {
    if(input.length < 1){
      setError(true); 
      return; 
    }
    setError(false);  
    let copy = todoList.concat(); 
    copy.push({task:input,checked:false, id:Math.floor(Math.random() * 100)})
    setTodoList(copy)
    inputRef.current.clear()
    setInput('')
    
  }
  const _deleteTodo = (id:number) => {
    const copy = todoList.concat();  
    const filtered = copy.filter(val => val.id !== id); 
    setTodoList(filtered); 

  }
  const addCompleted = (id:number) => {
    const copy = todoList.concat();
    let todoIndex = copy.findIndex(val => val.id === id);
    copy[todoIndex].checked = !copy[todoIndex].checked;
    setTodoList(copy);  
  }
  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          
          backgroundColor: "#607D8B",
          marginLeft:10, 
          marginRight:20

        }}
      />
    );
  }

  
  
  return (
    
    <View style = {styles.container}>
      
      <Text style = {styles.headingStyle}> Todo List</Text>
      <View style = {styles.inputMain}>
       <TextInput style = {styles.input} placeholder = "Add Task" placeholderTextColor = "grey" onChangeText = {(text) => setInput(text)} autoCorrect = {false} testID = {'input'} ref = {inputRef}/>
       <TouchableOpacity style = {styles.addTodo} onPress = {() => _addTodo()} testID = "add">
       <AntDesign name="pluscircleo" size={RFPercentage(4)} color="white" />
       </TouchableOpacity>
      </View>
      
      <FlatList 
      testID="post-list"
      data = {todoList}
      keyExtractor = {(item, index) => item.id.toString()+index} 
      renderItem = {_renderItem}
      style = {styles.flatlistStyle}
      ItemSeparatorComponent = {ItemDivider}
      />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#04163b',
      paddingTop:60
      
    },
    headingStyle:{
      alignSelf:'center', 
      fontWeight:'bold', 
      fontSize:RFPercentage(5),
      flex:0.1,
      color:'white'
  
    },
    flatlistStyle:{
     flex:0.7,
     marginBottom:20 
    }, 
    inputMain:{
      flexDirection:'row', 
      alignItems:'center',
      flex:0.2,
      marginLeft:10
    },
    input:{
      height:RFPercentage(5), 
      fontSize:RFPercentage(2),
      borderRadius:10, 
      borderWidth:1,
      marginRight:10,
      flex:0.7,
      marginLeft:10,
      backgroundColor:'white',
      textAlign:'center'
    },
    addTodo:{
      color:'white',
      flex:0.3
    },
    renderMain:{
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'white',
      height:RFPercentage(5),
      marginLeft:10, 
      marginRight:10,
      justifyContent:'space-between'
  
    },
    
    renderText:{
     color:'black', 
     fontSize:RFPercentage(3),
     marginLeft:5, 
     width:RFPercentage(30),
     
    },
    renderInnerView:{
    flexDirection:'row',
    marginLeft:10,
    alignItems:'center'    
    },
    renderDelete:{
      marginRight:10
    }
  
  
  });

  export default Todo; 