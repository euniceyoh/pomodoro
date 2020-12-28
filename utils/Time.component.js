import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import Button from './Button.component'
import {vibrate} from '.'
import TimerStyle from './Time.component.style'

const WORKTIME = 1500
const BREAKTIME = 300

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
      <View style = {TimerStyle.container}>
        <Text style={TimerStyle.timeText}
        >{secConverter(minutes)}
        </Text>
        <Button onPress={() => setStartTime(true)} title="Start"/>
        <Button onPress={() => setStartTime(false)} title="Stop"/>
        <Button onPress={() => {
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

  export default Time