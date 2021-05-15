const delaySeconds = 0;
const waitTimeSeconds = 0;
const visibilityTimeout = 5;
const topicURLPublish =
  "https://sqs.sa-east-1.amazonaws.com/321360512402/middleClouud";
const topicURLSubscribe =
  "https://sqs.sa-east-1.amazonaws.com/321360512402/sendToFogQueue";

module.exports = {
  QUEUE_URL_PUBLISH: topicURLPublish,
  QUEUE_URL_SUBSCRIBE: topicURLSubscribe,
  VISIBILITY_TIME_OUT: visibilityTimeout,
  WAIT_TIME_SECONDS: waitTimeSeconds,
  DELAY_SECONDS: delaySeconds,
};
