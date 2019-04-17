import _ from 'lodash';

export const getValueFromEvent = ({ target: { value } }) => value;

export const parseSentiment = ({ score, normalizedScore }) =>
    Object.freeze({
        score,
        normalizedScore,
    });

export const parseToxicity = data =>
    _.chain(data)
        .find({ label: 'toxicity' })
        .get('results')
        .head()
        .toPairs()
        .reduce((acc, next) => {
            if (_.head(next) === 'match') {
                return Object.freeze({
                    ...acc,
                    match: _.last(next),
                });
            }

            return Object.freeze({
                ...acc,
                probability: _.flow(
                    _.last,
                    _.last,
                    _.partialRight(_.round, [2]),
                )(next),
            });
        }, Object.freeze({}))
        .value();
