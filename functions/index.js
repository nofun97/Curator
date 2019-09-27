const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");

exports.compressImages = functions.storage.object().onFinalize(async object => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.

  // Get the file name.
  const fileName = path.basename(filePath);
  if (fileName.startsWith("compressed_")) {
    return console.log("Already compressed.");
  }
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };
  await bucket.file(filePath).download({ destination: tempFilePath });
  console.log("Image downloaded locally to", tempFilePath);

  // compression command line
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
  await bucket.file(filePath).delete();
  console.log("Original image is deleted");
  
  return fs.unlinkSync(tempFilePath);
});
