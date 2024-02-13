import DOMPurify from "dompurify"

function LectureHTML({htmlString}) {

  return (
    <div
    dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(htmlString, { WHOLE_DOCUMENT: true })
      }}/>
  )
}

export default LectureHTML