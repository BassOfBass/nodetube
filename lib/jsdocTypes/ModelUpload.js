const mongoose = require("mongoose");

/** Represents `Upload.js` model. */
class ModelUpload extends mongoose.Document {
  /**
   * 
   * @param {string} title 
   * @param {string} description 
   * @param {string} originalFileName 
   * @param {string} fileExtension 
   * @param {string} uploadServer 
   * @param {boolean} viralServerOn 
   * @param {string} viralServer 
   * @param {string} hostUrl 
   * @param {string} uniqueTag 
   * @param {"video" | "image" | "audio" | "unknown" | "convert"} fileType 
   * @param {number} originalFileSizeInMb 
   * @param {number} processedFileSizeInMb 
   * @param {number} fileSize 
   * @param {number} bitrateInKbps 
   * @param {{height: string, width: string, aspectRatio: string}} dimensions 
   * @param {number} views 
   * @param {'public' | 'unlisted' | 'private' | 'removed' | 'pending'} visibility 
   * @param {string} thumbnailUrl 
   * @param {string} customThumbnailUrl 
   * @param {string} uploadUrl 
   * @param {mongoose.Schema.Types.ObjectId} uploader 
   * @param {mongoose.Schema.Types.ObjectId[]} checkedViews 
   * @param {mongoose.Schema.Types.ObjectId[]} reacts 
   * @param {mongoose.Schema.Types.ObjectId[]} comments 
   * @param {mongoose.Schema.Types.Mixed} youTubeData 
   * @param {mongoose.Schema.Types.Mixed} youTubeDLData 
   * @param {String} status 
   * @param {boolean} sensitive 
   * @param {'allAges' | 'mature' | 'sensitive'} rating 
   * @param {{generated: string, custom: string, medium: string, large: string}} thumbnails 
   * @param {{high: number}} quality 
   * @param {string} livestreamDate 
   * @param {boolean} uncurated 
   * @param {boolean} moderated 
   * @param {string} category 
   * @param {string} subcategory 
   * @param {number} durationInSeconds 
   * @param {string} formattedDuration 
   * @param {Date} processingCompletedAt 
   * @param {string} webVTTPath 
   * @param {mongoose.Schema.Types.Mixed} ffprobeData 
   */
  constructor(
    title, 
    description, 
    originalFileName, 
    fileExtension,
    uploadServer,
    viralServerOn,
    viralServer,
    hostUrl,
    uniqueTag,
    fileType,
    originalFileSizeInMb,
    processedFileSizeInMb,
    fileSize,
    bitrateInKbps,
    dimensions,
    views = 0,
    visibility = "public",
    thumbnailUrl,
    customThumbnailUrl,
    uploadUrl,
    uploader,
    checkedViews = [],
    reacts,
    comments,
    youTubeData,
    youTubeDLData,
    status,
    sensitive = false,
    rating,
    thumbnails,
    quality,
    livestreamDate,
    uncurated,
    moderated,
    category = "uncategorized",
    subcategory,
    durationInSeconds,
    formattedDuration,
    processingCompletedAt,
    webVTTPath,
    ffprobeData,
  ) {
    super();
    this.title = title;
    this.description = description;
    this.originalFileName = originalFileName;
    this.fileExtension = fileExtension;
    this.uploadServer = uploadServer;
    this.viralServerOn = viralServerOn;
    this.viralServer = viralServer;
    this.hostUrl = hostUrl;
    this.uniqueTag = uniqueTag;
    this.fileType = fileType;
    this.originalFileSizeInMb = originalFileSizeInMb;
    this.processedFileSizeInMb = processedFileSizeInMb;
    this.fileSize = fileSize;
    this.bitrateInKbps = bitrateInKbps;
    this.dimensions = dimensions;
    this.views = views;
    this.visibility = visibility;
    this.thumbnailUrl = thumbnailUrl;
    this.customThumbnailUrl = customThumbnailUrl;
    this.uploadUrl = uploadUrl;
    this.uploader = uploader;
    this.checkedViews = checkedViews;
    this.reacts = reacts;
    this.comments = comments;
    this.youTubeData = youTubeData;
    this.youTubeDLData = youTubeDLData;
    this.status = status;
    this.sensitive = sensitive;
    this.rating = rating;
    this.thumbnails = thumbnails;
    this.quality = quality;
    this.livestreamDate = livestreamDate;
    this.uncurated = uncurated;
    this.moderated = moderated;
    this.category = category;
    this.subcategory = subcategory;
    this.durationInSeconds = durationInSeconds;
    this.formattedDuration = formattedDuration;
    this.processingCompletedAt = processingCompletedAt;
    this.webVTTPath = webVTTPath;
    this.ffprobeData = ffprobeData;
  }

  /** @returns {string} */
  get uploadServerUrl() {}

  /** @returns {string} */
  get thumbnail() {}

  /** @returns {boolean} */
  get lessThan1hOld() {}

  /** @returns {boolean} */
  get lessThan24hOld() {}

  /** @returns {boolean} */
  get lessThan24hOld() {}

  /** @returns {string} */
  get timeAgo() {}

  /** @returns {number} */
  get viewsWithin1hour() {}

  /** @returns {number} */
  get viewsWithin24hour() {}

  /** @returns {number} */
  get viewsWithin1week() {}

  /** @return {number} */
  get viewsWithin1month() {}

  /** @returns {number} */
  get viewsAllTime() {}

  /** @returns {number} */
  get legitViewAmount() {}
}

module.exports = {
  ModelUpload
}