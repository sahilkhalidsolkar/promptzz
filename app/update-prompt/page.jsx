"use client"
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditPrompt = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    useEffect(() => {
        const getpromptDetails=async()=>{
            const response =await fetch(`/api/prompt/${promptId}`)
            const data=await response.json()
            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }
      if(promptId)  getpromptDetails()
    }, [promptId])


    const updatePrompt = async (e) => {
        e.preventDefault()

        if(!promptId) return alert("Prompt ID not found")

        setSubmitting(true)

        try {

            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if (response.ok) {
                router.push('/')
                setSubmitting(false)
            }
        } catch (error) {
            console.log(error)
            setSubmitting(false)
        }
    }


    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt