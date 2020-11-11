import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'us-east-1' });

async function sendEmail(event, context) {
    const record = event.Records[0];

    const { subject, body, recipient } = JSON.parse(record.body);

    const params = {
        Source: 'jedavard@gmail.com',
        Destination: {
            ToAddresses: [recipient],
        },
        Message: {
            Body: {
                Text: {
                    Data: body,
                },
            },
            Subject: {
                Data: subject,
            },
        },
    };

    try {
        return await ses.sendEmail(params).promise();
    } catch (e) {
        console.error(e);
    }
}

export const handler = sendEmail;
