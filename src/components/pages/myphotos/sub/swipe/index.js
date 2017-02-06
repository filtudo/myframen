import React, { Component } from 'react';
import { Image, ScrollView, Text, StyleSheet } from 'react-native';
import { View } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import SwipeCards from 'react-native-swipe-cards';
import _ from 'lodash';

import sliderEntryStyles, { sliderWidth, itemWidth } from './SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from './index.style';


export default class Swipe extends Component {

    state = {
      selectedPlaylist: 0,
    }

    getSlides() {
          return this.props.playlists.map((entry, index) => {
              return (
                  <SliderEntry
                    key={entry.id}
                    cardKey={entry.id}
                    even={(index + 1) % 2 === 0}
                    title={entry.playlistName}
                    images={entry.photos}
                  />
              );
          });
      }

      get PlaylistItem() {
    return (
        <Carousel
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          firstItem={0}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.6}
          enableMomentum={true}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContainer}
          showsHorizontalScrollIndicator={false}
          snapOnAndroid={true}
          removeClippedSubviews={false}
          onSnapToItem={(entry) => this.setState({'selectedPlaylist': entry })}
        >
            { this.getSlides() }
        </Carousel>
    );
}

handleYup(card){
  const selectedDataId = this.props.playlists[this.state.selectedPlaylist].id;
  console.log(selectedDataId);
}

handleNope(){

}

  render(){
    return (
      <View>
        <View>
          <SwipeCards
            cards={this.props.images}

            renderCard={(image) => <Image style={{height:300, width: sliderWidth, marginBottom:20}} source={{ uri: image.uri }} />}
            renderNoMoreCards={() => <Text>No more cards</Text>}

            handleYup={this.handleYup.bind(this)}
            handleNope={this.handleNope}
          />
        </View>
        <View>
          <ScrollView
            style={styles.scrollview}
            indicatorStyle={'white'}
            scrollEventThrottle={200}
          >
              { this.PlaylistItem }
          </ScrollView>
        </View>

      </View>
    );
  }
}
