import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import flow from 'lodash/flow';

import { analyzeSentiment } from '../actions/analyze';

import { getValueFromEvent, parseReport } from '../utils/utils';

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
        height: '30%',
    }),
    reportHeaderStyles: Object.freeze({
        padding: '0.75rem',
    }),
    formStyles: Object.freeze({
        display: 'flex',
        width: '100%',
        height: 'calc(100% - 30% - 56px)',
        justifyContent: 'center',
    }),
    textFieldStyles: Object.freeze({
        width: '17rem',
        height: '100%',
    }),
});

function InputForm({ value, analyzeInput, clearInput, report }) {
    const reportSection = (() => {
        if (!report || !report.score) {
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
                        variant="h4"
                        style={inputFormStyles.reportHeaderStyles}
                    >
                        Seniment Score: 0
                    </Typography>
                </div>
            );
        }

        const emoji = report.score > 0 ? '😀' : '😠';

        return (
            <div style={inputFormStyles.reportSectionStyles}>
                <Typography
                    variant="h2"
                    style={inputFormStyles.reportHeaderStyles}
                >
                    <span
                        role="img"
                        aria-label={
                            report.score > 0 ? 'grinning face' : 'angry face'
                        }
                    >
                        {emoji}
                    </span>
                </Typography>
                <Typography
                    variant="h4"
                    style={inputFormStyles.reportHeaderStyles}
                >
                    Sentiment Score: {report.score}
                </Typography>
            </div>
        );
    })();

    return (
        <Paper style={inputFormStyles.containerStyles}>
            {reportSection}
            <form
                noValidate
                autoComplete="off"
                style={inputFormStyles.formStyles}
            >
                <TextField
                    style={inputFormStyles.textFieldStyles}
                    label="Text to analyze"
                    value={value}
                    onChange={analyzeInput}
                    margin="normal"
                    multiline
                />
            </form>
        </Paper>
    );
}

function mapStateToProps({ analyze: { input, report } }) {
    return {
        input,
        report: report ? parseReport(report) : null,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        analyzeInput: flow(
            getValueFromEvent,
            analyzeSentiment,
            dispatch,
        ),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(InputForm);
