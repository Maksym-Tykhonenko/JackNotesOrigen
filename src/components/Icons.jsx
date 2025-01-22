import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, active }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case '1':
      imageSource = require('../assets/panel/1.png');
      if (active) iconStyle.push(styles.active);
      break;
    case '2':
      imageSource = require('../assets/panel/2.png');
      if (active) iconStyle.push(styles.active);
      break;
    case '3':
      imageSource = require('../assets/panel/3.png');
      if (active) iconStyle.push(styles.active);
      break;
    case '4':
      imageSource = require('../assets/panel/4.png');
      if (active) iconStyle.push(styles.active);
      break;
    case '5':
      imageSource = require('../assets/panel/5.png');
      if (active) iconStyle.push(styles.active);
      break;
    case 'plus':
      imageSource = require('../assets/icons/plus.png');
      break;
    case 'tag':
      imageSource = require('../assets/icons/tag.png');
      break;
    case 'save':
      imageSource = require('../assets/icons/save.png');
      break;
    case 'upload':
      imageSource = require('../assets/icons/upload.png');
      break;
    case 'share':
      imageSource = require('../assets/icons/share.png');
      break;
    case 'star':
      imageSource = require('../assets/icons/star.png');
      break;
    case 'trash':
      imageSource = require('../assets/icons/trash.png');
      break;
    case 'arrow':
      imageSource = require('../assets/icons/arrow.png');
      break;
    case 'restore':
      imageSource = require('../assets/icons/restore.png');
      break;
    case 'swipe':
      imageSource = require('../assets/icons/swipe.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#fff',
  }
});

export default Icons;
