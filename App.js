import Instagram from './Instagram'
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ExFlatlist, Absolute } from './src/Pages';

export default () =>(
    <SafeAreaProvider>
      <ExFlatlist />
    </SafeAreaProvider>
)