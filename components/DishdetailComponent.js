import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl} from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreator';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <Icon raised
                            reverse
                            name={ props.favorite? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite?console.log('Already favorite'):props.onPress()} />
                        <Icon raised
                            reverse
                            name={'pencil'}
                            type='font-awesome'
                            color='#517fa4'
                            onPress={() => props.toggleModal()} />

                    </View>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            dishId: this.props.navigation.getParam('dishId', ''),
            stars: 5,
            author: '',
            comment: ''
        }

    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    handleComment() {
        console.log(JSON.stringify(this.state));
        this.props.postComment(this.state.dishId, this.state.stars, this.state.author, this.state.comment);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render () {
        const dishId = this.props.navigation.getParam('dishId', '');
        return(
            <ScrollView contentContainerStyle={{paddingBottom: 10}}>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el===dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter(c => c.dishId===dishId)} />

                <Modal
                    animationType={'slide'}
                    transparent={false} 
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal(); this.setState({showModal:false})}}
                    onRequestClose={() => {this.toggleModal(); this.setState({showModal:false})}}>

                    <Rating
                        ratingCount={5}
                        imageSize={30}
                        showRating
                        onFinishRating={(rating) => {
                            console.log(rating);
                            this.setState({stars: rating});
                        }}
                        />

                    
                    <Input
                        placeholder='author'
                        label='author'
                        leftIcon={{type:'font-awesome', name:'user-o'}}
                        onChangeText={(value) => {
                            console.log(value);
                            this.setState({author: value});
                        }}
                        />

                    <Input
                        containerStyle={{marginBottom:10}}
                        placeholder='comment'
                        label='comment'
                        leftIcon={{type:'font-awesome', name:'comment-o'}}
                        onChangeText={(value) => {
                            console.log(value);
                            this.setState({comment: value});
                        }}
                        />
                    
                    <Button 
                        onPress = {() => {
                            // this.setState({dishId: +dishId}); 
                            this.toggleModal(); 
                            this.handleComment();}}
                        color="#512DA8"
                        title="Submit" 
                        />
                    <Button 
                        onPress = {() =>{this.toggleModal(); this.setState({showModal:false})}}
                        color="green"
                        title="Cancel" 
                        />

                </Modal>
            </ScrollView>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);