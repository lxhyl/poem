
import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { DateTime } from "luxon"
import { EosIconsThreeDotsLoading } from "./Icon"
export default function Poem(props: { id: string, setTitle: (title: string) => void }) {
    const { setTitle, id } = props
    const [poem, setPoem] = useState<any[]>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        setLoading(true)
        fetch('/api/poem/?id=' + id).then(body => body.json()).then(data => {
            setPoem(Object.values(data.block))

        }).finally(() => setLoading(false))
    }, [id])
    const poemTitle = useMemo(() => {
        if (!poem) return null
        const title = poem[0]?.value?.properties?.title[0]
        return title
    }, [poem])
    useEffect(() => {
        if (!poemTitle || !setTitle) return
        setTitle(`${poemTitle}`)
    }, [poemTitle, setTitle])
    function RenderTitle(props: {
        updateAt: string
        text: string
    }) {
        const { updateAt, text } = props
        const [isHover, setIsHover] = useState(false)
        return <div className="mb-8 relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <p className="h-8 text-center text-lg font-normal cursor-pointer"
            >
                {text}
            </p>
            {isHover && <div className="absolute -bottom-4 italic text-xs text-center w-full text-gray-500">
                {`lxhyl.${updateAt}`}
            </div>}
        </div>
    }
    if (!id) return <div className="my-8 flex">
        也许这里会有一行诗
    </div>
    if (loading) return <div className="flex my-8 items-center">
        写作中<EosIconsThreeDotsLoading />
    </div>
    return (
        <div className="my-4">
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
                        times: [0, 1]
                    }}
                    key={line.value.id}
                    className="my-4 opacity-0">
                    {content.map((text: string, index: number) => {
                        const isHeader = line.value.type === 'page'
                        if (isHeader) {
                            console.log("line", line)
                            const updateAt = DateTime.fromMillis(line.value.last_edited_time).toLocal().toFormat('yyyy-MM-dd')
                            return <RenderTitle text={text} updateAt={updateAt} />
                        }
                        return <p
                            className={`h-8 text-center`} key={index}>
                            {text}
                        </p>
                    })}
                </motion.div>
            })}
            <div>

            </div>
        </div>
    )
}