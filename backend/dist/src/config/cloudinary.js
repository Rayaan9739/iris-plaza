const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dtcp8qhoy',
  api_key: process.env.CLOUDINARY_API_KEY || '951614482151491',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'IPGYB_3WXHmNlzpaMAGb01tvCVc',
});

/**
 * Create Cloudinary storage configuration for multer
 * @param {string} folder - Cloudinary folder path (e.g., 'rental-platform/room-images')
 * @param {string} resourceType - Resource type: 'image', 'video', 'raw', or 'auto'
 * @returns {CloudinaryStorage}
 */
const createCloudinaryStorage = (folder, resourceType = 'image') => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      resource_type: resourceType,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'mp4', 'mov', 'webm'],
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    },
  });
};

// Pre-configured storage options for different upload types
const storageOptions = {
  // Hero images for marketing pages
  heroImages: createCloudinaryStorage('rental-platform/hero-images', 'image'),
  
  // Room images uploaded by admin
  roomImages: createCloudinaryStorage('rental-platform/room-images', 'image'),
  
  // User documents (ID verification, etc.)
  userDocuments: createCloudinaryStorage('rental-platform/user-documents', 'auto'),
  
  // Payment screenshots uploaded by tenants
  paymentScreenshots: createCloudinaryStorage('rental-platform/payment-screenshots', 'image'),
  
  // Videos (room tours)
  videos: createCloudinaryStorage('rental-platform/videos', 'video'),
  
  // Agreements (PDF files)
  agreements: createCloudinaryStorage('rental-platform/agreements', 'raw'),
};

/**
 * Create multer upload middleware
 * @param {string} storageType - Key from storageOptions
 * @param {number} fileSizeLimit - Max file size in bytes
 */
const upload = (storageType, fileSizeLimit = 10 * 1024 * 1024) => {
  const storage = storageOptions[storageType];
  if (!storage) {
    throw new Error(`Invalid storage type: ${storageType}`);
  }
  
  return multer({
    storage: storage,
    limits: {
      fileSize: fileSizeLimit,
    },
    fileFilter: (req, file, cb) => {
      // Allow common image and document formats
      const allowedMimes = [
        'image/jpeg',
        'image/png', 
        'image/gif',
        'image/webp',
        'application/pdf',
        'video/mp4',
        'video/quicktime',
        'video/webm',
      ];
      
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`Invalid file type: ${file.mimetype}. Allowed: jpg, png, gif, webp, pdf, mp4, mov, webm`), false);
      }
    },
  });
};

// Export configurations and utilities
module.exports = {
  cloudinary,
  storageOptions,
  upload,
  createCloudinaryStorage,
};

// Export individual upload middlewares for convenience
module.exports.heroImagesUpload = upload('heroImages', 10 * 1024 * 1024); // 10MB
module.exports.roomImagesUpload = upload('roomImages', 50 * 1024 * 1024); // 50MB
module.exports.userDocumentsUpload = upload('userDocuments', 10 * 1024 * 1024); // 10MB
module.exports.paymentScreenshotsUpload = upload('paymentScreenshots', 5 * 1024 * 1024); // 5MB
module.exports.videosUpload = upload('videos', 200 * 1024 * 1024); // 200MB
module.exports.agreementsUpload = upload('agreements', 10 * 1024 * 1024); // 10MB
