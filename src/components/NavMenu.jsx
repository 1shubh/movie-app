import React, { useState } from "react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";

export const NavMenu = ({data}) => {
  const [open, setOpen] = useState(false);
  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IoMenu size={30} color="white"/>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Movie Time</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className="grid gap-4">
             {
              data.map((ele,i)=>{
                return <button key={i} className="font-NRegular cursor-pointer px-2 hover:text-secondary border rounded-xl py-2">{ele.name}</button>
              })
             }
          </div>
        </DrawerBody>

        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
