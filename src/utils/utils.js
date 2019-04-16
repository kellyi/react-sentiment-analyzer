export const getValueFromEvent = ({ target: { value } }) => value;

export const parseReport = ({ score, comparative }) =>
    Object.freeze({
        score,
        comparative,
    });
