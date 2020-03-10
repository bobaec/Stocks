/**
 * Module dependencies.
 */
const express = require('express');
const logger = require('morgan');
const chalk = require('chalk');
const router = require('./routes');
const path = require('path');
const errorHandler = require('errorhandler');
const database = require('../db');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
require('dotenv').config({ path: '.env' });

/**
 * Export our configuration
 */
module.exports = (app) =>{
  /**
   * Express configuration.
   */
  app.set('port', process.env.PORT || 3000);
  app.use('/', router);
  app.use(logger('dev'));
  app.use(errorHandler());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

/**
 * Database setup and connection
 */
database.connectToDB();
