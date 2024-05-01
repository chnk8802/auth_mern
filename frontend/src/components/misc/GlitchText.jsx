import { Box } from "@mui/material";
import * as React from "react";
import "./GlitchText.css"

export default function GlitchText() {
  return (
    <Box component="div" className="glitch-wrapper">
      <Box component="div" className="glitch" data-glitch="Google Workspace">
      Google Workspace
      </Box>
    </Box>
  );
}
