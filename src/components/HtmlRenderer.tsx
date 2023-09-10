import {FC} from "react";
interface IHtmlRendererProps {
    html: string | undefined
}
const HtmlRenderer:FC<IHtmlRendererProps> = ({html}) => {
    return (
        <>
            {html &&
                <span dangerouslySetInnerHTML={{__html: html}} />
            }
        </>
    );
}
export default HtmlRenderer;