import React, { Component, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button } from 'react-native';
import { Card } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker' // new version of datetimepicker

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            show: false,
            mode: 'date'
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            show: false,
            mode: 'date'
        });
    }

    showDatepicker = () => {
        this.setState({show: true});
        this.setState({mode: 'date'});
    };

    showTimepicker = () => {
        this.setState({show:true});
        this.setState({mode: 'time'});
    }
    
    render() {
        return(
            <ScrollView>
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
                                value={new Date()}
                                mode={this.state.mode}
                                display='default'
                                is24Hour={false}
                                onChange={(event, item) => {this.setState({date: item, show:false})}}
                            />
                        )
                    }
                    {/* <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format=''
                        mode="datetime"
                        placeholder="select date and Time"
                        minDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    /> */}
                </View>

                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        />
                </View>
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
    }
});

export default Reservation;