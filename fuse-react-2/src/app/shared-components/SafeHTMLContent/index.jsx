import DOMPurify from 'dompurify';


const SafeHTMLContent = ({ html }) => {
  const cleanHTML = DOMPurify.sanitize(html);

  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};

export default SafeHTMLContent;