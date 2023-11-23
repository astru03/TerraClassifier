const AWS = require('aws-sdk');

// Konfigurieren Sie die AWS SDK mit Ihren AWS-Zugangsdaten
AWS.config.update({
  accessKeyId: 'IHR_ACCESS_KEY_ID', 
  secretAccessKey: 'IHR_SECRET_ACCESS_KEY',
  region: 'IHR_REGION'
});

// Beispiel: Listet alle S3-Buckets auf
const s3 = new AWS.S3();
s3.listBuckets((err, data) => {
  if (err) {
    console.error('Fehler beim Auflisten der S3-Buckets:', err);
  } else {
    console.log('Liste der S3-Buckets:', data.Buckets.map(bucket => bucket.Name));
  }
});
