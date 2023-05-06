import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Button,  useTheme,HelperText} from 'react-native-paper'
import firebase from "firebase";
import {StyleSheet, View, Image, ImageBackground,Text,TextInput,KeyboardAvoidingView,Platform,TouchableOpacity} from 'react-native'
import { useHistory } from 'react-router-dom';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Mulish_500Medium,
} from '@expo-google-fonts/mulish';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const SignUp=()=>{
     let [fontsLoaded, error] = useFonts({
    Mulish_500Medium,  
  })

const navigation = useNavigation();
const button = () => {navigation.navigate('Page1')}
const signup = () => {navigation.navigate('Login')}
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword,settConfirmPassword] = useState('')
 const registerUser = (email, password,confirmPassword) => {
  if(password==confirmPassword){
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("User registered!");
        console.log(userCredential.user.uid)
        navigation.navigate('Login');
        firebase.database().ref("/users/" + userCredential.user.uid)
                .set({
                  email: userCredential.user.email,
                })
      })
      .catch(error => {
        alert(error.message);
      });
    }else{
      alert("The passwords are not equal");
    }
  };
  
  return(
 
    <SafeAreaProvider>
    <View>
        <Text style={styles.text}>
          Welcome!
        </Text>
        <Text style={{marginTop:40,alignSelf:"center",fontFamily:"Mulish_500Medium",fontSize:20}}>Please fill out the information below</Text>
      <View >

      <Text style={{marginTop:50,marginLeft:90,fontFamily:"Mulish_500Medium",}}>Email</Text>

        <View style={styles.sectionStyle2}>
 
          <TextInput
            style={{flex: 1, marginLeft:15,fontFamily:"Mulish_500Medium"}}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            underlineColorAndroid="transparent"
            placeholderTextColor="#7a827c"
            required
          />
        </View>
            <Text style={{marginTop:20,marginLeft:90,fontFamily:"Mulish_500Medium",}}>Password</Text>
        <View style={styles.sectionStyle2}>
          <TextInput
            style={{flex: 1,marginLeft:15,fontFamily:"Mulish_500Medium",}}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholderTextColor="#7a827c"
            underlineColorAndroid="transparent"  
            required   
          />
        </View>  

      <Text style={{marginTop:20,marginLeft:90,fontFamily:"Mulish_500Medium",}}>Confirm password</Text>
        <View style={styles.sectionStyle2}>
          <TextInput
            style={{flex: 1,marginLeft:15,fontFamily:"Mulish_500Medium",}}
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={(text) => settConfirmPassword(text)}
            secureTextEntry={true}
            placeholderTextColor="#7a827c"
            underlineColorAndroid="transparent"  
            required   
          />
        </View>  

          <LinearGradient
        colors={['#1d8c2e','#c5d62d']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}
        style={styles.button1}
      >
           <TouchableOpacity onPress={()=>registerUser(email, password, confirmPassword)} style={styles.button1} >
             <Text style={styles.sign}> SIGN UP </Text>  
            </TouchableOpacity>
          </LinearGradient>
         
         <Text style={styles.dumb}>Already have an account?</Text>

         <TouchableOpacity onPress={signup}>
         <Text style={{alignSelf:"center",fontFamily:"Mulish_500Medium",marginTop:5,color:"#1d8c2e",fontSize:15}}>LOGIN</Text>
          </TouchableOpacity>

      </View>

    </View>

  </SafeAreaProvider>
  );
}

export default SignUp

const styles = StyleSheet.create({
  text:{
    fontSize:40,
    marginTop:150,
    color:"black",
    fontFamily:"Mulish_500Medium",
    alignSelf:"center"
  }, 

    sectionStyle2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:"center",
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 20,
    margin: 10,
    width:260, 
    shadowColor: '#171717',
    shadowOffset: {width: -3, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
    button1: {
    marginTop: 20,
    width:200,
    alignSelf:"center",
    borderRadius:20,
    
  },
  sign:{
    color:"white",
    fontSize:20,
    alignSelf:"center",
    marginTop: -10,
    marginBottom:12,
    fontFamily:"Mulish_500Medium",
  },
  dumb:{
    marginTop:8,
    alignSelf:"center",
    fontFamily:"Mulish_500Medium",
  }
})