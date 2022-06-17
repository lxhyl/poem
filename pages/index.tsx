import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Poem = (props: { id: string }) => {
  const [poem, setPoem] = useState<any[]>()

  useEffect(() => {
    if (!props.id) return
    fetch('/api/poem/?id=' + props.id).then(body => body.json()).then(data => {
      console.log("daata", data)
      setPoem(Object.values(data.response.block))
    })
  }, [props.id])
  useEffect(() => {
    console.log("poem", poem)
  }, [poem])
  if (!props.id) return null
  return (
    <div style={{ margin: "50px 0" }}>
      {poem && poem.map((line, index) => {
        if (line.role === 'reader') {
          return <div key={index}>{line.value?.properties?.title?.[0]}</div>
        }
        return null
      })}
    </div>
  )
}

const Home: NextPage = (props) => {
  const [pageIds, setPageIds] = useState([])
  const [poemId, setPoemId] = useState('')
  useEffect(() => {
    fetch('/api/hello').then(body => body.json().then(res => {
      console.log("Res", res)
      setPageIds(res.pages)
      setPoemId(res.pages[0])
    }))
  }, [])
  const getNextPoem = () => {
    // @ts-ignore
    const index = pageIds.indexOf(poemId)
    const nextIndex = index + 1
    setPoemId(pageIds[nextIndex])
  }
  return (
    <div >
      <Poem id={poemId}></Poem>
      <button onClick={() => getNextPoem()}>Next</button>
    </div>
  )
}

export default Home
