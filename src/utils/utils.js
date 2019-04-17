export const getValueFromEvent = ({ target: { value } }) => value;

export const parseReport = ({ score, normalizedScore }) =>
    Object.freeze({
        score,
        normalizedScore,
    });
