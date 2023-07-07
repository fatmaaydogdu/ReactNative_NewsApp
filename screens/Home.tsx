//@ts-nocheck
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Appbar, Chip, Button, useTheme, ProgressBar, MD3Colors} from 'react-native-paper';
import {ComponentNavigationProps, NewsData} from '../utils/types';
import CardItem from '../components/CardItem';

const categories = ["Top", "Sports", "Technology", "Business", "Health"]
const API_KEY = "pub_18994ae5598ce89781699dd29d3997592f80b";

// https://newsdata.io/api/1/news?apikey=pub_18994ae5598ce89781699dd29d3997592f80b&country=tr&language=tr


const Home = (props: ComponentNavigationProps) => {
  const theme = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<NewsData[]>([]);
  const [newsData, setNewsData] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const handleSelect = (val: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.find(p => p === val)
        ? prev.filter(category => category !== val)
        : [...prev, val],
    );
  };

  const handlePress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=tr&language=tr${
      selectedCategories.length > 0
        ? `&category=${selectedCategories.join()}`
        : ''
    }${nextPage?.length > 0 ? `&page=${nextPage}` : ''} `;

    try {
      setIsLoading(true);
      await fetch(URL)
        .then(res => res.json())
        .then(data => {
          setNewsData(prev => [...prev, ...data.results]);
          setNextPage(data.nextPage);
        });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(Object.keys(newsData[0]));

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Anasayfa"></Appbar.Content>
      </Appbar.Header>
      <View style={styles.filtersContainer}>
        {categories.map(category => (
          <Chip
            key={category}
            mode="outlined"
            style={styles.chipItem}
            textStyle={{fontWeight: '400', color: 'white', padding: 1}}
            showSelectedOverlay
            selected={
              selectedCategories.find(c => category === c) ? true : false
            }
            onPress={() => handleSelect(category)}>
            {category}
          </Chip>
        ))}
        <Button
          mode="elevated"
          icon={'sync'}
          labelStyle={{
            fontSize: 14,
            margin: 'auto',
            color: theme.colors.primary,
          }}
          onPress={handlePress}
          style={styles.button}>
          Refresh
        </Button>
      </View>

  <ProgressBar visible={isloading} indeterminate color={MD3Colors.error50} />
      <FlatList
      keyExtractor={(item) => item.title}
        onEndReached={() => handlePress()}
        style={styles.flatList}
        data={newsData}
        renderItem={({item}) => (
          <CardItem
            navigation={props.navigation}
            content={item.content}
            description={item.description || ""}
            image_url={item.image_url}
            title={item.title}
            category = {item.category}
          />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  button: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 40,
  },
  flatList: {
    flex: 1,
    height: 'auto',
  },
});
