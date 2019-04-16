import { createAction } from 'redux-act';
import flow from 'lodash/flow';

import sentimentAnalyzer from '../utils/sentimentAnalyzer';

export const clearSentimentInput = createAction('CLEAR_SENTIMENT_INPUT');
export const updateSentimentInput = createAction('UPDATE_SENTIMENT_INPUT');
export const reportSentimentAnalysis = createAction(
    'REPORT_SENTIMENT_ANALYSIS',
);

export function analyzeSentiment(text) {
    return dispatch => {
        dispatch(updateSentimentInput(text));

        return flow(
            sentimentAnalyzer,
            reportSentimentAnalysis,
            dispatch,
        )(text);
    };
}
