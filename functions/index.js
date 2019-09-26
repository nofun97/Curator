const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");
exports.compressImages = functions.storage.object().onFinalize(async object => {
  // [END generateThumbnailTrigger]
  // [START eventAttributes]
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  // [END eventAttributes]

  // [START stopConditions]
  // Exit if this is triggered on a file that is not an image.
  // if (!contentType.startsWith("image/")) {
  //   return console.log("This is not an image.");
  // }

  // Get the file name.
  const fileName = path.basename(filePath);
  if (fileName.startsWith("compressed_")) {
    return console.log("Already compressed.");
  }
  // [END stopConditions]

  // [START thumbnailGeneration]
  // Download file from bucket.
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };
  await bucket.file(filePath).download({ destination: tempFilePath });
  console.log("Image downloaded locally to", tempFilePath);
  // Generate a thumbnail using ImageMagick.
  await spawn("convert", [
    "-strip",
    "-interlace",
    "Plane",
    "-gaussian-blur",
    "0.05",
    "-quality",
    "85%",
    tempFilePath,
    tempFilePath,
  ]);
  console.log("Image is compressed");
  // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
  const compressedFileName = `compressed_${fileName}`;
  const compressedFilePath = path.join(
    path.dirname(filePath),
    compressedFileName
  );
  // Uploading the thumbnail.
  await bucket.upload(tempFilePath, {
    destination: compressedFilePath,
    metadata: metadata,
  });
  console.log("Image is uploaded back to storage");
  // Once the thumbnail has been uploaded delete the local file to free up disk space.
  return fs.unlinkSync(tempFilePath);
  // [END thumbnailGeneration]
});
// [END generateThumbnail]
