import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import { BuildPaths } from './types/config';

export const buildPlugins = ({ html }: BuildPaths): webpack.WebpackPluginInstance[] => {
  return [new HtmlWebpackPlugin({ template: html }), new webpack.ProgressPlugin()];
};
