import { CohereClient, Cohere } from 'cohere-ai'

import type { KickTemplate } from './types'

const config = {
    useGenerate: process.env.COHERE_MODE === 'generate'
}

/**
 * Generates text using the Cohere API with the provided KickTemplate.
 *
 * @param {KickTemplate} templ - The KickTemplate object used to generate the question.
 * @return {Promise<string>} The generated text.
 */
export async function useCohere(templ: KickTemplate) {
    // Create a new instance of Cohere with the provided API token
    const cohere = new CohereClient({
        token: 'MDA9WUoe1dXsdhH3M9XkVo5wdxS3FXLwHfn8LhDg'
    })

    if (config.useGenerate) {
        // Generate a question using the provided KickTemplate
        const question = templ.makeSingle().slice(8)

        console.log(question)

        // Create a request object with the necessary parameters for generating text
        const req = {
            model: 'command', // specify the model to use for text generation
            temperature: 0, // set the temperature to control the randomness of the generated text
            k: 0, // set the value for top-k sampling
            p: 0.75, // set the value for nucleus sampling
            truncate: Cohere.GenerateRequestTruncate.End, // specify where to truncate the generated text
            frequencyPenalty: 0, // set the frequency penalty
            presencePenalty: 0, // set the presence penalty
            prompt: question // provide the question as the prompt for text generation
        }

        // Generate text using the Cohere API with the request object
        const result = await cohere.generate(req)

        console.log(result.generations[0].text)

        // Return the generated text
        return result.generations[0].text
    }

    const messages = templ.make()

    const l = messages[messages.length-1]

    const req = {
        model: 'command-nightly',
        message: `⫻${l.role}\n${l.content}`,
        chatHistory: messages.slice(1,messages.length-1).map(m => ({
            role: Cohere.ChatMessageRole.User,
            message: `⫻${m.role}\n${m.content}`,
            //userName: m.role
        })),
        temperature: 0.0,
        preambleOverride: messages[0].content,
        promptTruncation: Cohere.ChatRequestPromptTruncation.Auto,
    }

    console.log(req)

    console.log(templ.makeSingle())

    
    const result = await cohere.chat(req)

    console.log(result.text)

    return result.text
}
