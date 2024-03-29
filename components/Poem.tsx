
import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { EosIconsThreeDotsLoading } from "./Icon"
export default function Poem(props: { id: string, setTitle: (title: string) => void }) {
    const { setTitle, id } = props
    const [poem, setPoem] = useState<any[]>()
    const [loading, setLoading] = useState(true)
    const [pageRow, setPageRow] = useState<any>()
    useEffect(() => {
        if (!id) return
        setLoading(true)
        setPoem(undefined)
        setPageRow(undefined)
        fetch('/api/poem/?id=' + id).then(body => body.json()).then(data => {
            if (!data.ok) return
            setPoem(Object.values(data.pageContent.block))
            setPageRow(data.pageRaw.recordMap)
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
    const writtenDate = useMemo(() => {
        if (!pageRow?.block) return
        const block: any = Object.values(pageRow.block)?.[0]
        const metaProperties = block?.value?.properties
        const metaWrittenDate = metaProperties?.['Z|YX']?.[0]?.[1]?.[0]
        const date = metaWrittenDate?.[1]?.start_date
        return date
    }, [pageRow])
    function RenderTitle(props: {
        text: string
    }) {
        const { text } = props
        const [isHover, setIsHover] = useState(false)
        return <motion.div className="mb-8 relative flex justify-center"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}

        >
            <motion.p className="w-full text-center text-lg font-normal cursor-pointer"
                animate={{
                    overflow: ['hidden'],
                    opacity: [0, 1]
                }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                }}
            >
                {text}
            </motion.p>
            {isHover && <div className="absolute -bottom-4 italic text-xs text-center w-full text-gray-500">
                {`${writtenDate}`}
            </div>}
        </motion.div>
    }
    if (loading) return <div className="flex w-full my-8 items-center justify-center">
        写作中<EosIconsThreeDotsLoading />
    </div>
    if (!id || !poem || !poem.length) return <div className="my-8 w-full justify-center flex">
        也许这里会有一行诗
    </div>

    return (
        <div className="my-4 mx-2">
            {poem && poem.map((line, index) => {
                if (line.role !== 'reader') {
                    return null
                }
                const content = line.value.properties?.title || []

                return <motion.div
                    animate={{
                        opacity: [0, 1]
                    }}
                    transition={{
                        duration: index * 0.6,
                        ease: "easeInOut",
                        times: [0, 1]
                    }}
                    key={line.value.id}
                    className="my-4 opacity-0">
                    {content.map((text: string[], index: number) => {
                        const isHeader = line.value.type === 'page'
                        if (isHeader) {

                            return <RenderTitle key={index} text={text?.[0]} />
                        }
                        return <p
                            className={`py-2 text-center`} key={index}>
                            {text?.[0]}
                        </p>
                    })}
                </motion.div>
            })}
            <div>

            </div>
        </div>
    )
}