module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo', // Keep your original preset
      'module:metro-react-native-babel-preset', // Add this if it's necessary for your project
    ],
    plugins: [
      [
        'module:react-native-dotenv', // react-native-dotenv plugin configuration
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};

// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
   
//   };
// };

// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     [
//       'module:react-native-dotenv',
//       {
//         moduleName: '@env',
//         path: '.env',
//       },
//     ],
//   ],
// };
    