const axios = require("axios");

const APIKEY = process.env.SMS_IR_API_KEY;

async function send_sms(phoneNumber) {
  const generated_code = generate_code();

  var data = JSON.stringify({
    mobile: phoneNumber,
    templateId: "988517",
    parameters: [{ name: "CODE", value: generated_code }],
  });
  var config = {
    method: "post",
    url: "https://api.sms.ir/v1/send/verify",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
      "x-api-key": APIKEY,
    },
    data: data,
  };
  const resp = await axios(config)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

  // console.log('theee respis:', resp)

  return { response: resp, code: generated_code };
}

async function confirm_code(code) {
  try {
    return code === "12345";
  } catch (error) {
    return "please enter the code currectly!";
  }
}

function generate_code(length = 5) {
  const characters = "0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

module.exports = {
  confirm_code,
  send_sms,
};
