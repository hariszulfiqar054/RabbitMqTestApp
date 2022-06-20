const ampq = require('amqplib/callback_api');

// Establish connection
ampq.connect(process.env.QUEUE_URL, (error, connection) => {
  if (error) {
    throw error;
  }

  //  Create Channel
  connection.createChannel((channelError, channel) => {
    if (channelError) throw channelError;

    // Asset Queue
    const queue = 'test_queue';
    channel.assertQueue(queue);

    // Send Message to Queue
    channel.sendToQueue(queue, Buffer.from('Hello'));

    console.log('Message send to queue ' + queue);
  });
});
