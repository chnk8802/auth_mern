import { Box } from "@mui/material";
import * as React from "react";
import "./GlitchText.css"

export default function GlitchText({text}) {
  return (
    <Box component="div" className="glitch-wrapper">
      <Box component="div" className="glitch" data-glitch={text}>
      {text}
      </Box>
    </Box>
  );
}
