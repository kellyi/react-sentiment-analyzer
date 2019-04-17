import * as toxicity from '@tensorflow-models/toxicity';

const THRESHOLD = 0.9;

export default async function toxicityAnalyzer(text) {
    const model = await toxicity.load(THRESHOLD);
    return await model.classify(text);
}
