const express = require("express"); // for JSDoc typing only
const redisClient = require('../../config/redis');
const getFromCache = require('../../caching/getFromCache');
const uploadHelpers = require('../../lib/helpers/settings');
const uploadServer = uploadHelpers.uploadServer;

const { Upload } = require('../../models/index');

const logCaching = process.env.LOG_CACHING;
const defaultLandingPage = process.env.DEFAULT_LANDING_PAGE;

// TODO: pull into its own func
let indexResponse;
/**
 * 
 */
async function setIndex() {
  indexResponse = await redisClient.hgetallAsync('indexValues');

  if (logCaching == 'true') {
    console.log('got index cache');
  }
}

// get the index if its not a filehost
if (!process.env.FILE_HOST  || process.env.FILE_HOST == 'false'){
  setIndex();
  setInterval(function(){
    setIndex();
  }, 1000 * 60 * 2);
}

/**
 * `GET` `/`
 * 
 * Home page.
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.index = async(req, res) => {
  const title = 'Home';

  if (defaultLandingPage == 'overview') { // for the category overview section, defaulted to SFW content
    res.redirect('/media/recent?category=overview&rating=SFW');
  } else if (defaultLandingPage == 'recent') { // for recent uploads without categories, defaulted to SFW
    res.redirect('/media/recent?category=all&rating=SFW');
  } else if (defaultLandingPage == 'globe') { // globe functionality

    // get 150 most popular uploads in last 24h that are sfw and from any category
    let uploads = await getFromCache.getPopularUploads('24hour', 150, 0, 'all', 'SFW', 'all', '');

    res.render('public/globe', {
      title,
      uploadServer,
      uploads
    });

    
  } else { // standard landing page that shows the amount of uploads, users and views
    const response = indexResponse;
    let mediaAmount, channelAmount, viewAmount;

    if (!response) {
      mediaAmount = 0;
      channelAmount = 0;
      viewAmount = 0;
    } else {
      mediaAmount = response.mediaAmount;
      channelAmount = response.channelAmount;
      viewAmount = response.viewAmount;
    }

    res.render('public/home', {
      title,
      mediaAmount,
      channelAmount,
      viewAmount,
      uploadServer
    });
  }
};

/**
 * `GET` `/landing`
 * 
 * Landing page.
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getLandingPage = async(req, res) => {
  const title = 'Home';

  if (defaultLandingPage == 'globe') {
    // get 150 most popular uploads in last 24h that are sfw and from any category
    let uploads = await getFromCache.getPopularUploads('24hour', 150, 0, 'all', 'SFW', 'all', '');

    res.render('public/globe', {
      title,
      uploadServer,
      uploads
    });

  } else {
    const response = indexResponse;
    let mediaAmount, channelAmount, viewAmount;

    if (!response) {
      mediaAmount = 0;
      channelAmount = 0;
      viewAmount = 0;
    } else {
      mediaAmount = response.mediaAmount;
      channelAmount = response.channelAmount;
      viewAmount = response.viewAmount;
    }

    res.render('public/home', {
      title,
      mediaAmount,
      channelAmount,
      viewAmount,
      uploadServer
    });
  }
};

/**
 * `GET` `/globe`
 * 
 * Globe page.
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.globe = async(req, res) => {
  let uploads = await getFromCache.getPopularUploads('24hour', 150, 0, 'all', 'SFW', 'all', '');

  res.render('public/globe', {
    title: 'Globe',
    uploadServer,
    uploads
  });
};

/**
 * `GET` `/random`
 * 
 * Random redirect page page.
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.random = async(req, res) => {
  // and not deleted
  let upload = await Upload.aggregate([
    { $match: { visibility: 'public', status: 'completed' } },
    { $sample: { size: 1 } }
  ]);

  upload = upload[0];

  return res.redirect(`/user/v/${upload.uniqueTag}/`);

  // /user/v/Kqd5SfS
  // console.log(upload);
  // console.log(upload.uniqueTag);
  // res.send('hello');
};

/**
 * `GET` `/`
 * 
 * About page.
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.about = (req, res) => {

  res.render('public/about', {
    title: 'About'
  });
};

/**
 * `GET` `/tos`
 * 
 * Terms of service page
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.tos = async(req, res) => {

  res.render('public/tos', {
    title: 'Terms Of Service'
  });
};

/**
 * `GET` `/privacy`
 * 
 * Privacy policy.
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.privacy = async(req, res) => {

  // res.render('privacy', {
  //   title: 'Privacy'
  // })
  res.send('public/privacy');
};

/**
 * `GET` `/embed/$uploadUniqueTag`
 * 
 * Embed page.
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getEmbed = async function(req, res){

  res.setHeader('X-Frame-Options', 'ALLOW-FROM ' + req.query.domain);
  const uniqueTag = req.params.uniqueTag;

  // TODO: need to increment an embed there
  let upload = await Upload.findOne({
    uniqueTag,
    visibility: { $ne: 'removed' }
  }).populate({path: 'uploader', populate: {path: ''}}).exec();

  if (!upload) {
    console.log('Visible upload not found');
    res.status(404);

    return res.render('error/404');

  }

  res.render('public/embed', {
    title: 'Embed',
    upload,
    uploadServer,
    protocolDomainNameAndTLD: process.env.DOMAIN_NAME_AND_TLD
  });
};

/**
 * `GET` `/docs`
 * 
 * Docs page.
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getDocs = async(req, res) => {

  res.render('public/docs', {
    title: 'Docs'
  });
};

/**
 * `GET` `/donate`
 * 
 * Donation page.
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getDonate = async(req, res) => {
  const stripeToken = process.env.STRIPE_FRONTEND_TOKEN;

  res.render('public/donate', {
    title: 'Donate',
    stripeToken
  });
};

/**
 * `GET` `/plus`
 * 
 * Plus page.
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getPlus = async(req, res) => {

  res.render('public/plus', {
    title: 'Plus'
  });
};

