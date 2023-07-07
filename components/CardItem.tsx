//@ts-nocheck
import { Pressable, StyleSheet, Text, View, Image, Alert } from 'react-native';
import React from 'react';
import { NewsData } from '../utils/types';
import { IconButton, Card, useTheme } from 'react-native-paper';
import { NavigationProp, Route } from '@react-navigation/native';
import moment from "moment";

type Props = {
    title: string;
    image_url: string;
    description: string;
    content: string;
    navigation: NavigationProp<Route>;
    handleDelete?: (val: string) => void;
};

const placeholderImage = require('../assets/news1.jpg');

const CardItem = (props: Props) => {
    const theme = useTheme();
    const handlePress = () => {
        props.navigation.navigate('Haber Detayı', {
            title: props.title,
            description: props.description,
            image_url: props.image_url,
            content: props.content,
            category: props.category
        });
    };
    return (


        <Pressable style={styles.article} onPress={handlePress}>
            {/* image */}
            <Image source={
                props.image_url != null ? { uri: props.image_url } : placeholderImage
            }
                style={styles.image}
            />
            <View style={{ padding: 20 }}>


                {/*    title */}
                <Text style={styles.title}>{props.title}</Text>

                {/*    description */}
                <Text style={styles.description} numberOfLines={3}>
                    {props.description}
                </Text>

                <View style={styles.data}>
                    <Text style={styles.category}>{props.category}</Text>
                    <Text style={styles.date}>{moment(props.pubDate).format("MMM Do YY")}</Text>
                </View>
                
                    {props.handleDelete && (
                    <IconButton style={styles.delete}
                        icon="delete"
                        iconColor="black"
                        size={25}
                        onPress={() => props.handleDelete && props.handleDelete(props.title)} />
                )}
                
                
            </View>
        </Pressable>
    );
};

export default CardItem;

const styles = StyleSheet.create({
    article: {
        width: "80%",
        alignSelf: "center",
        borderRadius: 40,
        borderBottomEndRadius: 40,
        shadowOpacity: 1,
        shadowColor: "#000",
        shadowOffset: {
            height: 5,
            width: 5,
        },
        backgroundColor: "#fff",
        marginTop: 20
    },
    image: {
        height: 200,
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        fontWeight: "400",
        marginTop: 10
    },
    data: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    category: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#e63946"
    },
    date: {
        fontWeight: "bold",
        color: "#e63946",
        fontSize: 15
    },
    source: {
        color: "#e63946",
        fontWeight: "bold",
        fontSize: 18
    },
    delete:{
        direction: 'inherit'
    }
});
