import functions = require("firebase-functions");
import fetch = require("node-fetch");
import {Storage} from "@google-cloud/storage";


// Create a Google Cloud Storage instance
const storage = new Storage();
const bucketName = "gs://impactdisciples-a82a8.appspot.com";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({origin: true});

exports.uploadImageToStorage = functions
  .https.onRequest((req, res) => {
    return cors(req, res, async () => {
      const imageUrl = req.body.url;
      const imageName = "Blogs/" + req.body.name;

      try {
        // Fetch the image from the web
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        // Read the image as a Buffer
        const buffer = await response.buffer();

        // Create a reference to the destination file in Cloud Storage
        const file = storage.bucket(bucketName).file(imageName);

        // Upload the image
        await file.save(buffer, {
          metadata: {
            contentType: response.headers.get("content-type"),
          },
        });

        res.send({success: true, message: file.publicUrl()});
      } catch (error) {
        console.error("Error uploading image:", error);
        res.send({success: false, message: error.message});
      }
    });
  });

