const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
// const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)


// if (admin.apps.length === 0) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
// }


if (admin.apps.length === 0) {
  admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "jaques-10f93",
    "private_key_id": "7d6c03f1f044e8497cc5511d548b110e4cde0d83",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3Ce9/2hwMlZFd\nyCtYl2yCow0GR3AM2oaDekXKzs+m7j6HeoMKi+kaE43k96HqBQxUtTZ+LEQ3WcLf\nugoaRTza3/cSbru5JazeYhOPJjwJnw2qPlz/HyKqPxHqA7hcOWD6HKs2srHIjVlC\n9gE/h9G1EnFplBREtTzT7qWZCob9BHAFJRiyHxsMJxtd0yh/u+XILZYp4di4z2L8\nbYXaN5VXlVBd8iYawHdntOdJNd0gRZXqduBrqWyE+L0n3yvJeuP6AFRP9UYhntPb\nEHkFc35BAUQauAZyJCOPF1NdErJg2iEKsj1JlZpvgS86oZGaumALa7i4zSMzQmOR\nugOhO6dpAgMBAAECggEAJBMYuV2O3qoRyuZ7KIw7jim9lOm6e0YMcdhE7hpBkdht\nyXzLW+ZETGfjNOfbaQiSrBVFBqwJy9Dsl/SOLixMOKUgiGj7pZt3zSKOUU3LUmgf\nJNkCsiN8TQp+KN2P1dlXNCQ3WGHyqSC2oXxjtZY6rhHS+Wh+cCY6NVjZGWcaQL5r\ns3XsnYa9Bd00HAQLH67kNxK9Gc/aylcXTyr3NvP9sK9rglFJX6suuwMOTt13uxII\n89Ex+tUUq6hOsy1tnWXlclmxOGtcwQk/Ja72S4pPPDX9o4hMqj4xWWjPiCXa29kV\n48o40/p210b9XFdzKmcpLY3Wgi8PGvNWi4UKltwoaQKBgQD0Vh695nqJPK44H35u\nA4v24/zmj02odHNjqpkgh9yXigDn3GEAnNrXZp9DCcTFk1oREya4CjfmTbJfohOf\nl8+N1W4/V8nXFrcvpkiETUtIt9gGcj58Y0sVKCTOE+3HCtGenEXqw+SI+43EJ2uo\n8JE6FBwrlTBtWMtoIU6hrJgBVQKBgQC/xryLgM6Q/GONaQoJFc8Jf/kl4FhDDVo1\n6uQddRha5GttZZh8XzcQ1+TKMavssyB/C/iMlon7S6jmvnd8o5oi2s8nlnUUepkm\n8pdg5Q5rGQ6RDv4wIrW+7GjQrirBitqF9jH2D02oFkvwl9tpkH9ubqTxYFkXDG5e\n4wjY56wdxQKBgQCkw9ZjNKL5HKRXUFWPlnCyArguOgCiUjTlxssP9s44mmVV9XSs\nVxn0G03WhSXeHimkTgfUH3/mnApnFwKoolTiTkTUDj0cAENzrGxGW2EjHmZconmk\no8ij8bgwB5xWluMYVEWJtKPOA+RrnDGrcN5eDeWZNje75R71j1BZEexHKQKBgGlq\nHImyK9mWYkKA0ntb+YoHRjSDtQBmfofUrb9jdhfAJyzjA4aZ7/LaOXDLDO33KI2t\nTto4hXAUjqsHVzaz1y4BiI0CLykqmrTF9F/WiK5l/5PM4fwjmDNyT8slcWshoCyy\nv5O5pb4XQ3bkgj7spp9VQmVLyKzasHCH630PG5ThAoGBAO4bK2QdDw6UPz9NcWzL\nF/kvi3qJVLqb0i8BXD4aZ4bFLUIIsPKNa3+iMit4rTJQsbMtLUKnz23YZsjCNIN/\nB++ufBsIQb4xMGxxcOeHGoLSrQnGeB654e7OKl5Uch0/y5Hnia9wbLTtpHwnG3LF\n8coXFQaRi9fYUgUIBC2oQhY9\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-5gcf4@jaques-10f93.iam.gserviceaccount.com",
    "client_id": "106679886407944888729",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5gcf4%40jaques-10f93.iam.gserviceaccount.com"
  })

  });
}



module.exports = {
  getAuth
};

