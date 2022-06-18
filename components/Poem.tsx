
import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
export default function Poem(props: { id: string, setTitle: (title: string) => void }) {
    console.log("Poem render count")
    const { setTitle, id } = props
    const [poem, setPoem] = useState<any[]>()

    useEffect(() => {
        if (!id) return
        fetch('/api/poem/?id=' + id).then(body => body.json()).then(data => {
            setPoem(Object.values(data.response.block))
        })
    }, [id])
    const poemTitle = useMemo(() => {
        if (!poem) return null
        const title = poem[0]?.value?.properties?.title[0]
        return title
    }, [poem])
    useEffect(() => {
        if (!poemTitle || !setTitle) return
        setTitle(poemTitle)
    }, [poemTitle, setTitle])
    if (!id) return <div className="my-12">
        Maybe there will be this poem
    </div>
    console.log("render count")
    return (
        <div className="my-4 transition-all">
            {poem && poem.map((line, index) => {
                if (line.role !== 'reader') {
                    return null
                }
                const content = line.value.properties?.title || []
                return <motion.div
                    animate={{
                        opacity: [0, 1]
                    }}
                    hidden={!content.length}
                    transition={{
                        duration: index * 0.6,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1]
                    }}
                    key={line.value.id}
                    className="my-4 opacity-0">
                    {content.map((text: string, index: number) =>
                        <p
                            className={`h-8 text-center ${line.value.type === 'page' ? 'text-lg font-normal mb-8' : ""}`} key={`${index}}`}>
                            {text}
                        </p>)}
                </motion.div>
            })}
        </div>
    )
}