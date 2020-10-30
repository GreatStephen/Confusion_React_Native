import React, { Component, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker' // new version of datetimepicker
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
// import { Permissions, Notifications } from 'expo';



class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date'
            // showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    handleReservation() {
        // console.log(JSON.stringify(this.state));
        // this.toggleModal();
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: '+ this.state.guests + '\nSmoking? ' + this.state.smoking + '\nDate and Time: ' + this.state.date.toISOString(),
            [
            {text: 'Cancel', onPress: () => {this.resetForm();}, style: 'cancel'},
            {text: 'OK', onPress: () => {
                this.presentLocalNotification(this.state.date);
                this.resetForm();
                }
            },
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
            // showModal: false
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
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
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

    // toggleModal() {
    //     this.setState({showModal: !this.state.showModal});
    // }
    
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

                    {/* <Modal
                        animationType={'slide'}
                        transparent={false} 
                        visible={this.state.showModal}
                        onDismiss={() => {this.toggleModal(); this.resetForm()}}
                        onRequestClose={() => {this.toggleModal(); this.resetForm()}}>
                        
                        <View style={styles.Modal}>
                            <Text style={styles.modalTitle}>Your Reservation</Text>
                            <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style={styles.modalText}>Smoking? : {this.state.smoking? 'Yes':'No'}</Text>
                            <Text style={styles.modalText}>Date and Time : {this.state.date.toISOString()}</Text>
                            <Button 
                                onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                color="#512DA8"
                                title="Close" 
                                />
                        </View>

                    </Modal> */}
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