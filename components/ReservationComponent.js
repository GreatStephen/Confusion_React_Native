import React, { Component, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker' // new version of datetimepicker
import * as Animatable from 'react-native-animatable';
// import { Permissions, Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date'
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: '+ this.state.guests + '\nSmoking? ' + this.state.smoking + '\nDate and Time: ' + this.state.date.toISOString(),
            [
            {text: 'Cancel', onPress: () => {this.resetForm();}, style: 'cancel'},
            {text: 'OK', onPress: () => {
                this.presentLocalNotification(this.state.date);
                this.addReservationToCalendar(this.state.date);
                this.resetForm();}},
            ],
            { cancelable: false }
        );
    }
    
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date'
        });

    }

    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted'){
                Alert.alert('Permission not granted to add calendar events');
            }
        }
        return permission;
    }

    async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setHours(startDate.getHours() + 2);

        // MUST create a new calendar to add a new event
        const newCalendarId = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            source: {
                isLocalAccount: true,
                name: 'Me'
            },
            name: 'Me',
            ownerAccount: 'Me',
            accessLevel: Calendar.CalendarAccessLevel.CONTRIBUTOR
        });
        console.log(newCalendarId);
        await Calendar.createEventAsync(newCalendarId, {
            title: 'Con Fusion Table Reservation',
            startDate: startDate,
            endDate: endDate,
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
            timeZone: 'Asia/Hong_Kong'
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        // MUST set a notification handler to define how the device will react to the notification
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: true,
            }),
          });
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Your Reservation',
                body: 'Reservation for '+ date + ' requested',
                sound: true,
                vibrate: true,
                color: '#512DA8'
            },
            trigger: null
        });
    }

    showDatepicker = () => {
        this.setState({show: true});
        this.setState({mode: 'date'});
    };

    showTimepicker = () => {
        this.setState({show:true});
        this.setState({mode: 'time'});
    };
    
    render() {
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={1500} delay={500}>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#512DA8'
                            onValueChange={(value) => this.setState({smoking: value})}>
                        </Switch>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <View style={{marginRight:10}}>
                            <Button onPress={this.showDatepicker} title="Date" />
                        </View>
                        <View>
                            <Button onPress={this.showTimepicker} title="Time" />
                        </View>
                        {
                            this.state.show && (
                                <DateTimePicker 
                                    value={this.state.date}
                                    mode={this.state.mode}
                                    display='default'
                                    is24Hour={false}
                                    onChange={(event, item) => {this.setState({date: item, show:false})}}
                                />
                            )
                        }
                    </View>

                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleReservation()}
                            title="Reserve"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                            />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;