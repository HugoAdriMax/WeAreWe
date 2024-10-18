const path = require('path');  // Ajoutez cette ligne

module.exports = {
  mode: 'production',  // Ou 'development' selon votre besoin
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),  // Utilise path pour définir le chemin
  },
  devtool: 'source-map'  // Utile si vous êtes en mode développement
};
