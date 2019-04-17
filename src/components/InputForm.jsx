import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import flow from 'lodash/flow';

import { analyzeSentiment, analyzeToxicity } from '../actions/analyze';

import {
    getValueFromEvent,
    parseSentiment,
    parseToxicity,
} from '../utils/utils';

const inputFormStyles = Object.freeze({
    containerStyles: Object.freeze({
        height: 'calc(100vh - 56px)',
        width: '100%',
    }),
    reportSectionStyles: Object.freeze({
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '40%',
    }),
    reportHeaderStyles: Object.freeze({
        padding: '0.75rem',
    }),
    formStyles: Object.freeze({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'calc(100% - 40% - 56px)',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    buttonStyles: Object.freeze({
        margin: '1rem',
        height: '50px',
    }),
    textFieldStyles: Object.freeze({
        width: '17rem',
        height: '100%',
    }),
});

function InputForm({
    value,
    analyzeInputSentiment,
    clearInput,
    sentiment,
    toxicity,
    fetching,
    error,
    analyzeInputToxicity,
}) {
    const reportSection = (() => {
        const toxicityScore = (
            <Typography variant="h5" style={inputFormStyles.reportHeaderStyles}>
                Toxicity Prediction: {toxicity ? toxicity.probability : '?'}
            </Typography>
        );

        if (!sentiment || !sentiment.score) {
            return (
                <div style={inputFormStyles.reportSectionStyles}>
                    <Typography
                        variant="h2"
                        style={inputFormStyles.reportHeaderStyles}
                    >
                        <span role="img" aria-label="neutral face">
                            😐
                        </span>
                    </Typography>
                    <Typography
                        variant="h5"
                        style={inputFormStyles.reportHeaderStyles}
                    >
                        Sentiment Score: 0
                    </Typography>
                    {toxicityScore}
                </div>
            );
        }

        const emoji = sentiment.score > 0 ? '😀' : '😠';

        return (
            <div style={inputFormStyles.reportSectionStyles}>
                <Typography
                    variant="h2"
                    style={inputFormStyles.reportHeaderStyles}
                >
                    <span
                        role="img"
                        aria-label={
                            sentiment.score > 0 ? 'grinning face' : 'angry face'
                        }
                    >
                        {emoji}
                    </span>
                </Typography>
                <Typography
                    variant="h5"
                    style={inputFormStyles.reportHeaderStyles}
                >
                    Sentiment Score: {sentiment.score}
                </Typography>
                {toxicityScore}
            </div>
        );
    })();

    const buttonElement = fetching ? (
        <CircularProgress style={inputFormStyles.buttonStyles} />
    ) : (
        <Button
            variant="contained"
            color="primary"
            disabled={fetching}
            onClick={analyzeInputToxicity}
            style={inputFormStyles.buttonStyles}
        >
            Analyze Toxicity
        </Button>
    );

    return (
        <Paper style={inputFormStyles.containerStyles}>
            {reportSection}
            <form
                noValidate
                autoComplete="off"
                style={inputFormStyles.formStyles}
                onSubmit={analyzeInputToxicity}
            >
                {buttonElement}
                <TextField
                    style={inputFormStyles.textFieldStyles}
                    label="Text to analyze"
                    value={value}
                    onChange={analyzeInputSentiment}
                    margin="normal"
                    multiline
                    disabled={fetching}
                />
            </form>
        </Paper>
    );
}

function mapStateToProps({
    analyze: {
        input,
        sentiment,
        toxicity: { data, fetching, error },
    },
}) {
    return {
        input,
        sentiment: sentiment ? parseSentiment(sentiment) : null,
        toxicity: data ? parseToxicity(data) : null,
        fetching,
        error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        analyzeInputSentiment: flow(
            getValueFromEvent,
            analyzeSentiment,
            dispatch,
        ),
        analyzeInputToxicity: flow(
            analyzeToxicity,
            dispatch,
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(InputForm);
