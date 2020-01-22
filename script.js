const { google } = require ('googleapis');
require('dotenv').config;


const oauth2Client = new google.auth.OAuth2("976935493782-mdpb867hgutk4s5n0gdec7b9pnf4hitj.apps.googleusercontent.com", "UDbu_E8WsvMkV95OgO07yX8e", ["http://127.0.0.1"]);

  const GMAIL_SCOPES = [
	
    'https://mail.google.com/',
	
    'https://www.googleapis.com/auth/gmail.modify',
	
    'https://www.googleapis.com/auth/gmail.compose',
	
    'https://www.googleapis.com/auth/gmail.send'
	
  ];

  const url = oauth2Client.generateAuthUrl({
	
    access_type: 'offline',
	
    scope: GMAIL_SCOPES,
	
  });

  console.info(`authUrl: ${url}`);
