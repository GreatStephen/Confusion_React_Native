import React, { Component } from 'react';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl} from '../shared/baseUrl';
import { Loading } from './LoadingComponent';


const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
};

function History(props) {
    return (
        <Card title='Our History'>
            <Text
                style={{margin: 10}}>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par 
                excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, 
                it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star 
                Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.

            </Text>
        </Card>

    );
}

class About extends Component {
    render () {
        const renderLeader = ({item, index}) => {    
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: {uri: baseUrl + item.image }}}
                    />

            )
        };

        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        else {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                    <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderLeader}
                        keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </ScrollView>
            );
        }

        return (
            <ScrollView contentContainerStyle={{paddingBottom: 10}}>
                <History />
                <Card title='Corporate Leadership'>
                    <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderLeader}
                        keyExtractor={item => item.id.toString()}
                        />
                    
                </Card>
                
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);