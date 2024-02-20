import DOMPurify from "dompurify"
import styled from 'styled-components'

const StyledDiv = styled.div`
  text-overflow: ellipsis;
`;

function LectureHTML({ htmlString }) {
  return (
    <StyledDiv
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(htmlString, {
          ADD_TAGS: ['p'],
          FORBID_ATTR: ['style'],
          WHOLE_DOCUMENT: true
        })
      }}
    />
  );
}

export default LectureHTML