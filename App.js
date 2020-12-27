import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import Constants from "expo-constants";
import {vibrate} from './utils'

const WORKTIME = 1500
const BREAKTIME = 300

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: "#4EEE94",
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 10,
    width: 100 
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  timeText: {
    alignSelf: "center",
    fontSize: 70,
  }
});

export default function App() {
  return (
    <>
      <Time />
    </>
  );
}

const CustomButton = ({onPress, title}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.7}
    style={styles.buttonContainer}
    >
    <Text
    style={styles.buttonText}
    >{title}</Text>
    </TouchableOpacity>
  )
}

const Time = () => { // function component 
  const [minutes, setMinutes] = useState(WORKTIME) // state hook 
  const [startTime, setStartTime] = useState(false)
  const [workState, setWorkState] = useState(true) 

  useEffect(() => { // occurs after every render
    let timer1; 
    let timer2; 
    if(startTime) { // passed a function , our "effect"
      if(minutes !== 0) {
        timer1 = setTimeout(() => {
          setMinutes(minutes - 1) // rerenders
        }, 1000)
      } 
      else {
        vibrate()
        timer2 = setTimeout(() => {
          setMinutes(!workState ? WORKTIME : BREAKTIME)
          setWorkState(!workState)
        }, 5000)
      }
    }

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [startTime, workState, minutes])

  return (
    <View style = {styles.container}>
      <Text style={styles.timeText}
      >{secConverter(minutes)}
      </Text>
      <CustomButton onPress={() => setStartTime(true)} title="Start"/>
      <CustomButton onPress={() => setStartTime(false)} title="Stop"/>
      <CustomButton onPress={() => {
        setMinutes(WORKTIME)
        setStartTime(false)
        setWorkState(true)
      }} title="Reset"/>
    </View>
  )
}

const secConverter = (sec) => {
  let minutess = Math.floor(sec / 60)
  let seconds = sec % 60 

  minutess = addLeadingZeros(minutess)
  seconds = addLeadingZeros(seconds)
  
  return minutess + ":" + seconds
}

const addLeadingZeros = (val) => {
  if(Math.floor(val / 10) === 0) {
    val = '0' + val
  }
  return val
}

