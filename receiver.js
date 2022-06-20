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

    // Receive Message to Queue
    channel.consume(
      queue,
      (msg) => {
        console.log('Message received to queue ' + msg.content);
      },
      { noAck: true }
    );
  });
});
