import { createReducer } from 'redux-act';
import update from 'immutability-helper';

import {
    clearSentimentInput,
    updateSentimentInput,
    reportSentimentAnalysis,
    startAnalyzeToxicity,
    failAnalyzeToxicity,
    completeAnalyzeToxicity,
    resetAnalyzeToxicity,
} from '../actions/analyze';

const initialState = Object.freeze({
    input: '',
    sentiment: null,
    toxicity: Object.freeze({
        data: null,
        fetching: false,
        error: null,
    }),
});

export default createReducer(
    {
        [updateSentimentInput]: (state, payload) =>
            update(state, {
                input: { $set: payload },
                toxicity: {
                    data: { $set: null },
                    error: { $set: null },
                },
            }),
        [reportSentimentAnalysis]: (state, payload) =>
            update(state, {
                sentiment: { $set: payload },
            }),
        [startAnalyzeToxicity]: state =>
            update(state, {
                toxicity: {
                    data: { $set: null },
                    fetching: { $set: true },
                    error: { $set: null },
                },
            }),
        [failAnalyzeToxicity]: (state, payload) =>
            update(state, {
                toxicity: {
                    fetching: { $set: false },
                    error: { $set: payload },
                },
            }),
        [completeAnalyzeToxicity]: (state, payload) =>
            update(state, {
                toxicity: {
                    fetching: { $set: false },
                    error: { $set: null },
                    data: { $set: payload },
                },
            }),
        [resetAnalyzeToxicity]: state =>
            update(state, {
                toxicity: { $set: initialState.toxicity },
            }),
        [clearSentimentInput]: () => initialState,
    },
    initialState,
);
