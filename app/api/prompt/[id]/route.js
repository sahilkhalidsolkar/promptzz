import { connectionToDb } from "@utils/database"
import Prompt from "@models/prompt"

// get the prompt

export const GET = async (req, { params }) => {
    try {
        await connectionToDb()
        const prompt = await Prompt.findById(params.id).populate('creator')
        console.log(prompt)
        if (!prompt) return new Response("prompt not Found", {
            status: 404
        })
        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return new Response('Failed to get Prompt', {
            status: 500
        })
    }
}

// PATCH
export const PATCH = async (req, { params }) => {
    try {
        const { prompt, tag } = await req.json()
        await connectionToDb()
        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) return new Response('Prompt not found', {
            status: 404
        })
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        })

    } catch (error) {
        console.log(error)
        return new Response('Failed to update  Prompt', {
            status: 500
        })
    }
}

// Delate
export const DELETE = async (req, { params }) => {
    try {

        await connectionToDb()
        await Prompt.findByIdAndRemove(params.id)

        return new Response("prompt deletd successfully", {
            status: 200
        })

    } catch (error) {
        console.log(error)
        return new Response('Failed to delete  Prompt', {
            status: 500
        })
    }
}