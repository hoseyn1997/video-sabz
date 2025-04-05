const { setCountingDown, verify_code } = require("./user_queries.js");
const { send_sms } = require("./send_sms.js");

async function handle_send_code(phoneNumber) {
  await send_sms(phoneNumber)
    .then((value) => {
      setCountingDown(phoneNumber, value.code, true);
    })
    .catch((err) => {
      throw err;
    });
}

async function handle_verify_code(phoneNumber, code) {
  try {
    const result = await verify_code(phoneNumber, code);
    // console.log("the first stage result is: ", result);
    return result;
  } catch (error) {
    throw error;
  }
}

async function verification_timed_out(phoneNumber) {
  try {
    const user = await setCountingDown(phoneNumber, "", false);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  handle_send_code,
  handle_verify_code,
  verification_timed_out,
};
