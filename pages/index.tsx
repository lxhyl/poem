import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '../components/Header'

import Poem from "../components/Poem"


const Home: NextPage = () => {
  const [title, setTitle] = useState<string>("lxhyl's poem")
  const [pageIds, setPageIds] = useState<string[]>([])
  const [poemId, setPoemId] = useState('')

  useEffect(() => {
    fetch('/api/poemList').then(body => body.json().then(res => {
      setPageIds(res.pages)
      console.log("res.pages", res.pages)
      setPoemId(res.pages[9])
    }))
  }, [])
  const getNextPoem = (step: number) => {
    const len = pageIds.length
    const index = pageIds.indexOf(poemId)
    let nextIndex = (index + step)
    if (nextIndex < 0) nextIndex = len - 1
    if (nextIndex >= len) nextIndex = 0
    setPoemId(pageIds[nextIndex])
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='fixed w-screen h-screen bg-gray-50  dark:bg-gray-900 transition-colors duration-500 ease-in-out'></div>
      <div className='w-screen h-screen font-light relative flex  flex-col items-center font-mono  bg-gray-50  dark:bg-gray-900 dark:text-slate-400 transition-colors duration-500 ease-in-out'>
        <div className='flex w-full'>
          <div>
            {pageIds.map((id, index) => <div key={id} className="text-xs my-1 ml-2 opacity-30" onClick={() => setPoemId(id)}>{`${index}:${id.slice(0, 4)}`}</div>)}
          </div>
          <div className='flex-1'>
            <Poem setTitle={setTitle} id={poemId}></Poem>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home
