//@ts-nocheck

import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Text} from 'react-native-paper';
import {useTheme} from 'react-native-paper';

type Props = {
  title: string;
  image_url: string;
  description: string;
  content: string;
};

const DetailsCard = (props: Props) => {
  const theme = useTheme();
  return (
    <ScrollView>
        <Text
        variant="headlineMedium"
        style={{color: 'black', marginVertical: 10}}>
        {props.title}
      </Text>
      <Card
        contentStyle={{width: Dimensions.get('window').width}}
        style={{backgroundColor: theme.colors.background}}>
        {props.image_url && (
          <Card.Cover source={{uri: props.image_url}}></Card.Cover>
        )}
        <Card.Content>
          <Text
            variant="bodyLarge"
            textBreakStrategy='highQuality'
            style={{ flex:1, textAlign: 'left', marginVertical: 10}}>
            {props.content}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({});
