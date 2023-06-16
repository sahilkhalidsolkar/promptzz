import { connectionToDb } from "@utils/database"
import Prompt from "@models/prompt"
export const GET = async (req, { params }) => {
    const userId = params.id
    try {
        await connectionToDb()
        const prompts = await Prompt.find({ creator: userId }).populate('creator')
        console.log(prompts)
        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return new Response('Failed to get Prompts', {
            status: 500
        })
    }
}