import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {
    render () {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}> 
                <Card title='Contact Information'>
                    <Text
                        style={{margin: 10}}>
                        121, Clear Water Bay Road{'\n'}
                        Clear Water Bay, Kowloon{'\n'}
                        HONG KONG{'\n'}
                        Tel: +852 1234 5678{'\n'}
                        Fax: +852 8765 4321{'\n'}
                        Email:confusion@food.net{'\n'}
                    </Text>
                </Card>
            </Animatable.View>
        );
    }
}

export default Contact;