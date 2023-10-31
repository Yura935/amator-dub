import { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import IconButton from "@mui/joy/IconButton";
import Sheet from "@mui/joy/Sheet";
import SvgIcon from "@mui/joy/SvgIcon";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";

const ToggleGroupToolbar = (props: {
  onHandler: (formats: any, color: string) => void;
}) => {
  const [formats, setFormats] = useState(() => ["italic"]);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    props.onHandler(formats, color);
  });

  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: "md",
        display: "flex",
        gap: 2,
        marginLeft: "20px",
        padding: "5px 10px",
      }}
    >
      <ToggleButtonGroup
        variant="plain"
        spacing={0.5}
        value={formats}
        onChange={(event, newFormats) => {
          setFormats(newFormats);
        }}
        aria-label="text formatting"
      >
        <IconButton value="bold" aria-label="bold">
          <FormatBoldIcon />
        </IconButton>
        <IconButton value="italic" aria-label="italic">
          <FormatItalicIcon />
        </IconButton>
        <IconButton value="underlined" aria-label="underlined">
          <FormatUnderlinedIcon />
        </IconButton>
      </ToggleButtonGroup>
      <Divider
        orientation="vertical"
        sx={{ height: "60%", alignSelf: "center" }}
      />
      <Button
        component="label"
        tabIndex={-1}
        role="button"
        aria-label="fill color"
        variant="outlined"
        color="neutral"
        endDecorator={
          <SvgIcon fontSize="md" sx={{ marginRight: "5px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </SvgIcon>
        }
      >
        <AspectRatio
          variant="plain"
          ratio="1"
          sx={{
            margin: "5px",
            borderRadius: "50%",
            width: "1.5em",
            bgcolor: color,
          }}
        >
          <div />
        </AspectRatio>
        <Box
          component="input"
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          sx={{
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: "1px",
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            whiteSpace: "nowrap",
            width: "1px",
          }}
        />
      </Button>
    </Sheet>
  );
};

export default ToggleGroupToolbar;
