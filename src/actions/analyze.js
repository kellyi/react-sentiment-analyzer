import { createAction } from 'redux-act';
import flow from 'lodash/flow';

import sentimentAnalyzer from '../utils/sentimentAnalyzer';
import toxicityAnalyzer from '../utils/toxicityAnalyzer';

export const clearSentimentInput = createAction('CLEAR_SENTIMENT_INPUT');
export const updateSentimentInput = createAction('UPDATE_SENTIMENT_INPUT');
export const reportSentimentAnalysis = createAction(
    'REPORT_SENTIMENT_ANALYSIS',
);

export const startAnalyzeToxicity = createAction('START_ANALYZE_TOXICITY');
export const failAnalyzeToxicity = createAction('FAIL_ANALYZE_TOXICITY');
export const completeAnalyzeToxicity = createAction(
    'COMPLETE_ANALYZE_TOXICITY',
);
export const resetAnalyzeToxicity = createAction('RESET_ANALYZE_TOXICITY');

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

export function analyzeToxicity() {
    return (dispatch, getState) => {
        dispatch(startAnalyzeToxicity());

        const {
            analyze: { input },
        } = getState();

        return toxicityAnalyzer(input)
            .then(data => dispatch(completeAnalyzeToxicity(data)))
            .catch(err => {
                window.console.warn(err);

                return dispatch(failAnalyzeToxicity(err));
            });
    };
}
