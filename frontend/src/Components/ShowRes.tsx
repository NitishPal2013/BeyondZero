import React from 'react'
import {
  List,
  ListItem,
  ListItemSuffix,
  ListItemPrefix,
  IconButton,
  Typography
} from "@material-tailwind/react";

export function YoutubeIcon() {
  return (
      <img src="https://api.iconify.design/logos:youtube-icon.svg" alt="yt_icon"/>
  );
}

export function DocIcon() {
  return (
      <img src="https://api.iconify.design/ph:link.svg" alt="yt_icon" />
  );
}

export function CrossIcon() {
  return (
      <img src="https://api.iconify.design/material-symbols:close-rounded.svg" alt="yt_icon" />
  );
}

interface URLlistProp{
  URLlist: Array<string>,
  setURLlist: React.Dispatch<React.SetStateAction<string[]>>
}

const ShowRes : React.FC<URLlistProp>  = ({URLlist, setURLlist}: URLlistProp) => {

  return (
    <>
    {URLlist.map((url, index)=>(
    <List key={index}>
          <ListItem ripple = {false} className="py-1 pr-1 pl-4 hover:bg-white" key = {index}>
          <ListItemPrefix key={index}>
            {url.includes("youtube") ? <YoutubeIcon /> : <DocIcon/>}
          </ListItemPrefix>
          <Typography
                  as="a"
                  href="https://google.com"
                  target="_blank"
                  color="white"
                  className="font-medium !text-gray-500 transition-colors hover:!text-gray-900"
                  key={index}
                >
                  {url}
                </Typography>
            <ListItemSuffix key={index}>
              <IconButton variant="text" color="blue-gray" size="sm" onClick={()=>{setURLlist(URLlist.filter((_, i) => i !== index));}} key={index}>
                <CrossIcon />
              </IconButton>
            </ListItemSuffix>
          </ListItem>
        </List>
    ))}
    </>
  )
}

export default ShowRes