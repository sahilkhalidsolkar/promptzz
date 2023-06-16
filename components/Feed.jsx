"use client"
import React,{useState,useEffect} from 'react'
import PromptCardList from './PromptCardList'
const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredPost, setFilteredPost] = useState([])
  useEffect(() => {
    const fetchPosts=async()=>{
      const response =await fetch('/api/prompt' )
      const data=await response.json()
      setPosts(data)
    }
    
    fetchPosts()
  }, [])
  useEffect(() => {
    console.log('running search text')
    let filteredPost=posts.filter(p=>{
      if(p.creator.username.includes(searchText)||p.tag.includes(searchText)||p.prompt.includes(searchText)){
      return true
      }else{
        false
      }
    })
    console.log(filteredPost)
    setFilteredPost(filteredPost)
  }, [searchText])
  
  
  const handleSearchChange=(e)=>{
    setSearchText(e.target.value)
   
  }

 const handleTagClick=(tag)=>{
  setSearchText(tag)
 }

  return (
    <section className='feed'>
      <form className="relative w-full flex-center">
        <input type="text"
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
         className="search_input peer" />
      </form>
     
      <PromptCardList
      data={searchText.length>0? filteredPost : posts}
      handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed