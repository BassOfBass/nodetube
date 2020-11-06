const express = require("express"); // only for jsdoc typing 
const { SocialPost } = require('../../models/index');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getOneOffSocialPost = async(req, res) => {

  return res.render('socialMedia/oneOffSocialPost', {
    title : 'Create Social Post'
  });
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getCreateSocialPost = async(req, res) => {
  // const socialposts = await SocialPost.find({}).populate('upload');
  const socialposts = await SocialPost.find({}).populate({path: 'upload', populate: {path: 'uploader'}});

  return res.render('socialMedia/createSocialPost', {
    title : 'Create Social Post',
    socialposts
  });
  
};
