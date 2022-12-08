const MailComposer = require('nodemailer/lib/mail-composer')
const path = require('path')
const fs = require('fs')
/**
 * GOOGLE GMAIL API
 * 1st function to get Authorize Code
 */
const getAuthorizeCodeForGmail = () => {
  const testoAuth2Client = new google.auth.OAuth2(
    process.env.TEST_CLIENT_ID,
    process.env.TEST_CLIENT_SECRET,
    process.env.TEST_REDIRECT_URI
  )

  const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send']
  const testUrl = testoAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: GMAIL_SCOPES
  })
  //click on this url
  //then get the authorization code for this app to use GmailAPI of dung@flavorwiki.com
  console.log('Authorize this app by visiting this url:', testUrl)
}
/**
 * GOOGLE GMAIL API
 * 2nd function to get Access Token and Refresh Token for GmailAPI
 */
const getTokenForGmail = () => {
  const testoAuth2Client = new google.auth.OAuth2(
    process.env.TEST_CLIENT_ID,
    process.env.TEST_CLIENT_SECRET,
    process.env.TEST_REDIRECT_URI
  )
  //this this the code from the 1st function above
  const code =
    '4/0AfgeXvt-RYDxukL0Th2i1Wrs_MBDf4P1_eUqr0uxN1OfyG3Op9_3FCpeZWYcwvWJwfALKw'

  testoAuth2Client.getToken(code).then(({ tokens }) => {
    //write this to a json file or print it out
    const tokenPath = path.join(__dirname, 'token.json')
    fs.writeFileSync(tokenPath, JSON.stringify(tokens))
    console.log('Access token and refresh token stored to token.json')
  })
}
/**
 * GOOGLE GMAIL API
 * 3rd function to get send email using GmailAPI
 * the sender Gmail is decided by Client_Id and Client_Secret
 */
const sendGmailAPI = async () => {
  const testoAuth2Client = new google.auth.OAuth2(
    process.env.TEST_CLIENT_ID,
    process.env.TEST_CLIENT_SECRET,
    process.env.TEST_REDIRECT_URI
  )

  //get from the 2nd function above
  const token = {
    access_token:
      'ya29.a0AeTM1ieQotyqw0K2jjeB1aRgRPYFVRDO8kaxBEuaIrzjvL9BiGrCy6Di1fnJd_yjmCu1zIcjkx8OhopbDHhy0n46SSprioZz4VhGjma2KfoHk7C3aVjE5fXOwIdisSSW3-U5EEbqKYgfcV9HSqn7XiOrOfmmaCgYKARsSARESFQHWtWOm1Yv9mr-m3_SpP4qGGmxYkg0163',
    refresh_token:
      '1//0eYogigCW156-CgYIARAAGA4SNwF-L9IrJW4ZbbS84uWBMwJNnlOtryg7H4CCIdwrRD93J0C2B7ubsJZwEGwF3gfFxzWc3RjcJdA',
    scope: 'https://www.googleapis.com/auth/gmail.send',
    token_type: 'Bearer',
    expiry_date: 1670421023255
  }

  testoAuth2Client.setCredentials(token)
  const gmail = google.gmail({ version: 'v1', auth: testoAuth2Client })

  const options = {
    to: 'dunghong362@gmail.com',
    subject: 'Testing Send Test',
    html: `<p> This is a <b>test email</b> from Business App Gmail Test API.</p>`,
    textEncoding: 'base64'
  }

  const rawMessage = await createMail(options)
  gmail.users.messages.send({
    userId: 'me',
    resource: {
      raw: rawMessage
    }
  })
}

/**
 * Helper function for email
 * @param {*} message
 * @returns
 */
const encodeMessage = (message) => {
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}
/**
 * Helper function for email
 * @param {*} options
 * @returns
 */
const createMail = async (options) => {
  const mailComposer = new MailComposer(options)
  const message = await mailComposer.compile().build()
  return encodeMessage(message)
}
