import type { FC } from "react";

import { Box, type BoxProps } from "@chakra-ui/react";
import DOMPurify from "dompurify";

interface ComponentProps extends Omit<BoxProps, "dangerouslySetInnerHTML"> {
  html?: string | null;
}

/**
 * Renders tutor/user-authored HTML (e.g. a "text" lesson whose content is
 * `"this is reach <b>bold lesson</b>"`) safely. The markup is sanitised with
 * DOMPurify first, stripping <script>, event handlers and other XSS vectors
 * before it is injected — never pass raw HTML to dangerouslySetInnerHTML.
 */
const RichText: FC<ComponentProps> = ({ html, ...rest }) => {
  const clean = DOMPurify.sanitize(html ?? "");

  return <Box dangerouslySetInnerHTML={{ __html: clean }} {...rest} />;
};

export default RichText;
