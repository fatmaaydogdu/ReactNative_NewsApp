import {Alert, StyleSheet} from 'react-native';
import React from 'react';
import {ComponentNavigationProps, NewsData} from '../utils/types';
import DetailsCard from '../components/DetailsCard';
import {IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share  from 'react-native-share';


const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@newsData')
    if(value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch(e) {
    // error reading value
    Alert.alert('Something went wrong')
    return;
  }
}

const storeData = async (value: NewsData) => {
  const data: NewsData[] = (await getData()) || [];
  //const parsedValue = JSON.parse(value);
  !data.find((d) => d.title === value.title) ? data.push(value) : data;

  try {
    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem('@newsData', jsonValue)
  } catch (e) {
    // saving error
    return Alert.alert('Something went wrong with storing data')
  }
}

const share = async () => {
  const options = {
    message:""
  }
  try {
    const res = await Share.open(options);
    console.log(res);
  }
  catch(err){
    console.log(err);
  }
}

const NewsOverview = (props: ComponentNavigationProps) => {
  const {title, description, content, image_url} = props?.route?.params as NewsData;

  props.navigation.setOptions({
    headerRight: () => (
      <><IconButton 
      icon="share"
      iconColor="black"
      size={25}
      onPress={share}
      />
      
      <IconButton
        icon="bookmark"
        iconColor="black"
        size={20}
        onPress={() => storeData({
          title, description, content, image_url,
          link: '',
          keywords: [],
          creator: '',
          video_url: '',
          pubDate: '',
          source_id: '',
          category: '',
          country: [],
          language: ''
        })} /></>
    )
    
    })

  return (
   <DetailsCard title={title} description={description} content={content} image_url={image_url}/>
  );
};

export default NewsOverview;

const styles = StyleSheet.create({
  
});
