import Instagram from './Instagram'
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ExFlatlist, Absolute, ViewPage, Swipe, SwipeImage } from './src/Pages';

export default () =>(
    <SafeAreaProvider>
      <ExFlatlist />
    </SafeAreaProvider>
)