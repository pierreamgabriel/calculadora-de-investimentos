import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.techstuff.calculadora',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;