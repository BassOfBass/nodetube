const express = require("express"); // JSDoc types only
const redisClient = require('../../config/redis');
const _ = require('lodash');
const {
  Upload,
  AdminAction,
  User,
  Subscription,
  React,
  Comment,
  SiteVisit,
  Invite
} = require('../../models/index');
const pagination = require('../../lib/helpers/pagination');

const { uploadServer} = require('../../lib/helpers/settings');

let viewStats, uploadStats, userStats, reactStats, subscriptionStats, searchStats, commentStats, siteVisitStats;

getStats();
setInterval( function(){
  getStats();
}, 1000 * 60 * 1);

/**
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.getAdminOverview = async(req, res) => {
  return res.render('admin/adminOverview', {});
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.dailyStats = async(req, res) => {

  let views = viewStats;
  let uploads = uploadStats;
  let users = userStats;
  let subscriptions = subscriptionStats;
  let reacts = reactStats;
  let searches = searchStats;
  let siteVisits = siteVisitStats;
  let comments = commentStats;

  const array = [views, uploads, users, subscriptions, reacts, searches, comments, siteVisits];

  res.render('admin/dailyStats', {
    title: 'Daily Stats',
    array
  });

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getAdminAudit = async(req, res) => {

  // exclude uploads without an uploadUrl

  let page = req.params.page;
  if (!page) { page = 1; }
  page = parseInt(page);

  const limit = 100;
  const skipAmount = (page * limit) - limit;

  const { startingNumber, previousNumber, nextNumber, numbersArray } = pagination.buildPaginationObject(page);

  try {
    let adminActions = await AdminAction.find({})
    .populate({path: 'adminOrModerator uploadsAffected usersAffected', populate: {path: 'uploader'}})
    .skip(skipAmount).limit(limit).lean();

    adminActions = adminActions.reverse();

    console.log(adminActions);

    res.render('admin/adminAudit', {
      title: 'Admin Audit',
      adminActions,
      startingNumber,
      previousNumber,
      nextNumber,
      numbersArray,
      highlightedNumber: page
    });
  } catch(err){
    console.log(err);

    return res.render('error/500');

  }

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getPending = async(req, res) => {

  // exclude uploads without an uploadUrl
  let uploads = await Upload.find({
    visibility: 'pending'
  }).populate('uploader').lean();

  uploads = _.sortBy(uploads, [function(c){ return c.createdAt; }]).reverse();

  res.render('moderator/pending', {
    title: 'Pending',
    uploads,
    uploadServer
  });

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.getSiteVisitorHistory = async(req, res) => {

  const id = req.params.id;

  console.log(id);

  const visitor = await SiteVisit.findOne({ _id : id }).populate('user');

  console.log(visitor);

  res.render('admin/siteVisitorHistory', {
    title: 'Site Visitor History',
    visitor
  });

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.getSiteVisitors = async(req, res) => {
  let page = req.params.page;
  if(!page){ page = 1; }
  page = parseInt(page);

  const limit = 100;
  const skipAmount = (page * limit) - limit;

  const { startingNumber, previousNumber, nextNumber, numbersArray } = pagination.buildPaginationObject(page);

  try {
    const visitors = await SiteVisit.find({}).sort({ _id : -1  }).populate('user').skip(skipAmount).limit(limit);

    res.render('admin/siteVisitors', {
      title: 'Site Visitors',
      visitors,
      startingNumber,
      previousNumber,
      nextNumber,
      numbersArray,
      highlightedNumber: page
    });
  } catch(err){
    console.log(err);
    return res.render('error/500');
  }

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getUploads = async(req, res) => {

  let page = req.params.page;
  if(!page){ page = 1; }
  page = parseInt(page);

  const limit = 100;
  const skipAmount = (page * limit) - limit;

  const { startingNumber, previousNumber, nextNumber, numbersArray } = pagination.buildPaginationObject(page);

  try {
    const uploads = await Upload.find({}).sort({ _id : -1  }).populate('uploader').skip(skipAmount).limit(limit);

    res.render('admin/uploads', {
      title: 'Uploads',
      uploads,
      startingNumber,
      previousNumber,
      nextNumber,
      numbersArray,
      highlightedNumber: page
    });
  } catch(err){
    console.log(err);
    return res.render('error/500');
  }

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.getComments = async(req, res) => {
  let page = req.params.page;
  if(!page){ page = 1; }
  page = parseInt(page);

  const limit = 100;
  const skipAmount = (page * limit) - limit;

  const { startingNumber, previousNumber, nextNumber, numbersArray } = pagination.buildPaginationObject(page);

  try {
    const comments = await Comment.find({}).sort({ _id : -1  }).populate('commenter upload')
      .skip(skipAmount).limit(limit);

    res.render('admin/comments', {
      title: 'Comments',
      comments,
      startingNumber,
      previousNumber,
      nextNumber,
      numbersArray,
      highlightedNumber: page
    });
  } catch(err){
    console.log('err');
    console.log(err);
  }

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.getNotificationPage = async(req, res) => {
  return res.render('admin/notifications', {});
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.getUsers = async(req, res) => {

  let page = req.params.page;
  if(!page){ page = 1; }
  page = parseInt(page);

  const limit = 100;
  const skipAmount = (page * limit) - limit;

  const { startingNumber, previousNumber, nextNumber, numbersArray } = pagination.buildPaginationObject(page);

  try {
    const users = await User.find({}).populate('user sender upload react comment').skip(skipAmount).limit(limit).sort({ _id : -1  });

    // console.log("users: ")
    // console.log(users);

    res.render('admin/users', {
      title: 'Users',
      users,
      startingNumber,
      previousNumber,
      nextNumber,
      numbersArray,
      highlightedNumber: page
    });
  } catch(err){
    console.log(err);
    return res.render('error/500');
  }

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.reacts = async(req, res) => {

  if(!req.user){
    res.status(404);
    return res.render('error/404', {
      title: 'Not Found'
    });
  }

  if(req.user.role !== 'admin'){
    res.status(404);
    return res.render('error/404', {
      title: 'Not Found'
    });
  }

  let page = req.params.page;
  if(!page){ page = 1; }
  page = parseInt(page);

  const limit = 100;
  const skipAmount = (page * limit) - limit;

  const { startingNumber, previousNumber, nextNumber, numbersArray } = pagination.buildPaginationObject(page);

  try {
    const reacts = await React.find({}).populate({
      path: 'user upload', 
      populate: {path: 'uploader'}
    })
    .skip(skipAmount).limit(limit).sort({ _id : -1  });

    // console.log(reacts);

    return res.render('admin/reacts', {
      title : 'Admin Reacts',
      reacts,
      startingNumber,
      previousNumber,
      nextNumber,
      numbersArray,
      highlightedNumber: page
    });
  } catch(err){
    console.log(err);
    return res.render('error/500');
  }

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.subscriptions = async(req, res) => {

  if(!req.user){
    res.status(404);
    return res.render('error/404', {
      title: 'Not Found'
    });
  }

  if(req.user.role !== 'admin'){
    res.status(404);
    return res.render('error/404', {
      title: 'Not Found'
    });
  }

  let page = req.params.page;
  if(!page){ page = 1; }
  page = parseInt(page);

  const limit = 100;
  const skipAmount = (page * limit) - limit;

  const { startingNumber, previousNumber, nextNumber, numbersArray } = pagination.buildPaginationObject(page);

  try {
    const subscriptions = await Subscription.find({})
    .populate({
      path: 'subscribingUser subscribedToUser drivingUpload',
      populate: {path: 'uploader'}
    })
    .skip(skipAmount).limit(limit).sort({ _id : -1  });

    // console.log(subscriptions);

    return res.render('admin/subscriptions', {
      title : 'Admin Reacts',
      subscriptions,
      startingNumber,
      previousNumber,
      nextNumber,
      numbersArray,
      highlightedNumber: page
    });
  } catch(err){
    console.log(err);
    return res.render('error/500');
  }

};



/**
 * TODO: include pagination
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.getInvitesPage = async(req, res) => {

  if (!req.user || req.user.role !== 'admin') {
    res.status(404);

    return res.render('error/404', {
      title: 'Not Found'
    });

  }

  try {
    const invites = await Invite.find({})
    .populate({
      path: "creator guests"
    })
    .sort({ createdAt: -1 }).exec()

    return res.render("admin/invites", {
      title: "Invites list",
      invites,
    });

  } catch (error) {
    console.log(err);
    return res.render('error/500');
  }
  
}

/**
 * 
 */
async function getStats(){
  let views = await redisClient.getAsync('dailyStatsViews');
  let uploads = await redisClient.getAsync('dailyStatsUploads');
  let users = await redisClient.getAsync('dailyStatsUsers');
  let reacts = await redisClient.getAsync('dailyStatsReacts');
  let subscriptions = await redisClient.getAsync('dailyStatsSubscriptions');
  let siteVisits = await redisClient.getAsync('dailyStatsSiteVisits');
  let comments = await redisClient.getAsync('dailyStatsComments');
  let searches = await redisClient.getAsync('dailyStatsSearches');

  searchStats = JSON.parse(searches);
  commentStats = JSON.parse(comments);
  siteVisitStats = JSON.parse(siteVisits);
  userStats = JSON.parse(users);
  reactStats = JSON.parse(reacts);
  viewStats = JSON.parse(views);
  subscriptionStats = JSON.parse(subscriptions);
  uploadStats = JSON.parse(uploads);

}
