import sentiment from 'wink-sentiment';

const sentimentAnalyzer = text => sentiment(text);

export default sentimentAnalyzer;
