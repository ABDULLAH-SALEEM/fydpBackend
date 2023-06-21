const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
let createContact = new SibApiV3Sdk.CreateContact();
let apiContactInstance = new SibApiV3Sdk.ContactsApi();


async function addContact(email) {
  createContact.email = email;
  apiContactInstance.createContact(createContact).then(
    function (data) {
      console.log("API called successfully. Returned data: ");
    },
    function (error) {
      console.error(error);
    }
  );
}

async function deleteContact(email) {
  apiContactInstance.deleteContact(email).then(
    function () {
      console.log("API called successfully.");
    },
    function (error) {
      console.error(error);
    }
  );
}

async function sendOtpEmail(email, otp) {
  sendSmtpEmail = {
    to: [
      {
        email: email.toLowerCase(),
      },
    ],
    templateId:  1 ,
    params: {
      SMS: otp
    },
  };

  const emailResult = await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log(data)
      console.log("API called successfully.");
    },
    (error) => {
      console.error(error);
    }
  );
}

async function sendQuotationEmail(email, content) {
  sendSmtpEmail = {
    to: [
      {
        email: email.toLowerCase(),
      },
    ],
    templateId: 13,
    params: {
      CONTENT: content
    },
  };

  const emailResult = await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log(data)
      console.log("API called successfully.");
    },
    (error) => {
      console.error(error);
    }
  );
}

async function sendSignupEmail(email, language) {
  sendSmtpEmail = {
    to: [
      {
        email: email
      }
    ],
    templateId: language === 'en' ? 6 : 5,
  };
  const emailResult = await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log("API called successfully.");
    },
    (error) => {
      console.error(error);
    }
  );
}

async function purchasePackage(email) {
  sendSmtpEmail = {
    to: [
      {
        email: email
      }
    ],
    templateId:  9 
  };
  const emailResult = await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log("API called successfully.");
    },
    (error) => {
      console.error(error);
    }
  );
}

async function cancelPackage(email) {
  sendSmtpEmail = {
    to: [
      {
        email: email
      }
    ],
    templateId: 7 
  };
  const emailResult = await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log("API called successfully.");
    },
    (error) => {
      console.error(error);
    }
  );
}

async function purchaseFreePackage(email, language) {
  sendSmtpEmail = {
    to: [
      {
        email: email
      }
    ],
    templateId: language=='en' ? 12 : 11,
  };
  const emailResult = await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log("API called successfully.");
    },
    (error) => {
      console.error(error);
    }
  );
}

async function sendFeedbackEmail(email, feedback) {
  sendSmtpEmail = {
    to: [
      {
        email: email
      }
    ],
    templateId: 2,
    params: {
      FEEDBACK: feedback,
      EMAIL: email
    }
  };

  const emailResult = await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log("API called successfully.");
    },
    (error) => {
      console.error(error);
    }
  );
}

async function sendGoodbyeEmail(email) {
  sendSmtpEmail = {
    to: [
      {
        email: email
      }
    ],
    templateId: 3
  };

  const emailResult = await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log("API called successfully.");
    },
    (error) => {
      console.error(error);
    }
  );
}

module.exports = {
  // sendWelcomeEmail,
  sendOtpEmail,
  sendSignupEmail,
  purchasePackage,
  cancelPackage,
  purchaseFreePackage,
  addContact,
  deleteContact,
  sendGoodbyeEmail,
  sendFeedbackEmail,
  sendQuotationEmail
};
