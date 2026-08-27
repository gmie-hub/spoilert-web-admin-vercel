import type { FC } from "react";

import { Box } from "@chakra-ui/react";

/** Certificate markup is authored against an A4 page (72dpi). */
const CANVAS_WIDTH = 595;
const CANVAS_HEIGHT = 842;

interface ComponentProps {
  /** Raw template markup from the certificates API. */
  markup: string;
  title: string;
  /** 1 renders the page at full size; 0.3 renders a thumbnail. */
  scale: number;
}

/**
 * Renders a certificate template inside a sandboxed iframe so the template's
 * own CSS can never leak into the dashboard, then scales the whole A4 page
 * down to thumbnail size.
 */
const CertificateTemplatePreview: FC<ComponentProps> = ({
  markup,
  title,
  scale,
}) => {
  return (
    <Box
      position="relative"
      w={`${CANVAS_WIDTH * scale}px`}
      h={`${CANVAS_HEIGHT * scale}px`}
      maxW="full"
      overflow="hidden"
      bg="white"
      flexShrink={0}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w={`${CANVAS_WIDTH}px`}
        h={`${CANVAS_HEIGHT}px`}
        transform={`scale(${scale})`}
        transformOrigin="top left"
        pointerEvents="none"
      >
        <iframe
          title={title}
          srcDoc={markup}
          sandbox=""
          loading="lazy"
          style={{ width: "100%", height: "100%", border: "0" }}
        />
      </Box>
    </Box>
  );
};

export default CertificateTemplatePreview;
