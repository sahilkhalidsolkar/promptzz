"use client"
import {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePrompt = () => {
   const router= useRouter()
   const{data:session}= useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    })
    const createPrompt=async(e)=>{
        e.preventDefault()
        setSubmitting(true)
        console.log(JSON.stringify({
            prompt:post.prompt,
            tag:post.tag,
            userId:session?.user.id,
        }))
        try {

            const response=await fetch('/api/prompt/new',{
                method:'POST',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag,
                    userId:session?.user.id,
                })
            })

            if(response.ok){
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
    type='Create'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt