const dialogflow = require('dialogflow');
const uuid = require('uuid');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('../codechung.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fireship-lessons.firebaseio.com'
});

const { SessionsClient } = require('dialogflow');

exports.dialogflowGateway = functions.https.onRequest((req, res) => {
    return async (req, res) => {
        const { queryInput, queryResult } = req.body

        const sessionClient = new SessionsClient({ credentials: serviceAccount })
        const session = sessionClient.sessionPath('fireship-lessons', sessionId)

        const responses = await sessionClient.detectIntent({ sessionId, queryInput})
        const result = responses[0].queryResult

        return result
    }
})


/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId = 'bobert-265004') {
    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: 'hello',
                // The language used by the client (en-US)
                languageCode: 'en-US',
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }
}

const ChatService = {
    async sendMessage(msg) {
        // console.log('sending: ', msg)
        // // A unique identifier for the given session
        // const projectId = 'bobert-265004'
        const sessionId = uuid.v4();
    
        // // Create a new session
        // const sessionClient = new dialogflow.SessionsClient();
        // const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    
        // console.log(sessionClient, sessionPath)
        // // The text query request.
        // const request = {
        //     session: sessionPath,
        //     queryInput: {
        //         text: {
        //             // The query to send to the dialogflow agent
        //             text: msg,
        //             // The language used by the client (en-US)
        //             languageCode: 'en-US',
        //         },
        //     },
        // };
    
        // // Send request and log result
        // const responses = await sessionClient.detectIntent(request);
        // console.log('Detected intent');
        // const result = responses[0].queryResult;
        // console.log(`  Query: ${result.queryText}`);
        // console.log(`  Response: ${result.fulfillmentText}`);
        // if (result.intent) {
        //     console.log(`  Intent: ${result.intent.displayName}`);
        //     return result.intent.displayName
        // } else {
        //     console.log(`  No intent matched.`);
        // }


        const sessionClient = new SessionsClient({ credentials: serviceAccount })
        const session = sessionClient.sessionPath('huihfsaduy78gyu3')

        const responses = await sessionClient.detectIntent({ session, msg})
        const result = responses[0].queryResult

        return result
    }
}

module.exports = ChatService