import { createReducer } from 'redux-act';
import update from 'immutability-helper';

import {
    clearSentimentInput,
    updateSentimentInput,
    reportSentimentAnalysis,
} from '../actions/analyze';

const initialState = Object.freeze({
    input: '',
    report: null,
});

export default createReducer(
    {
        [updateSentimentInput]: (state, payload) =>
            update(state, {
                input: { $set: payload },
            }),
        [reportSentimentAnalysis]: (state, payload) =>
            update(state, {
                report: { $set: payload },
            }),
        [clearSentimentInput]: () => initialState,
    },
    initialState,
);
