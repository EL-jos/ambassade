const jwt = require('jsonwebtoken');
const request = require('request');
const { Publisher } = require('mercure');

module.exports = async function (topic, dataForSend){

   /*  //const endpoint = 'XXXXXX.stackhero-network.com';
    const publisherJwtKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InN1YnNjcmliZSI6WyIqIl0sInB1Ymxpc2giOlsiKiJdfX0.M1yJUov4a6oLrigTqBZQO_ohWUsg3Uz1bnLD4MIyWLo';

        // Defining the data we want to dispatch
        const data = {
        // The topic where the data will be pushed
        topic: topic,

        // The data that will send to the topic
        data: JSON.stringify(dataForSend)
    };


    // Generating the bearer
    const bearer = jwt.sign(
        { mercure: { publish: [ data.topic ] } },
        publisherJwtKey
    );


    // Sending the data to Mercure-Hub that will dispatch them to clients
    request.post(
        {
            url: `http://localhost:3000/.well-known/mercure`,
            auth: {
                bearer: bearer
            },
            form: data
        },
        (err, res) => err ? console.error("ERREUR") : console.log("MESSAGE ENVOIE")
    ); */

    const publisher = new Publisher({
        protocol: 'http', // or 'http', but please don't.
        host: 'localhost',
        port: 3000,
        path: '/.well-known/mercure',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InN1YnNjcmliZSI6WyIqIl0sInB1Ymxpc2giOlsiKiJdfX0.M1yJUov4a6oLrigTqBZQO_ohWUsg3Uz1bnLD4MIyWLo',
    });

    // Payload to send to the subscribers.
    const data = {
        '@id': 'http://localhost:3000/books/666.jsonld',
        hello: 'world',
    };

    let reponse = await publisher.publish(
        ['http://ressortissant-1'], // Topics.
        JSON.stringify(dataForSend),
    );

    console.log(reponse);
}