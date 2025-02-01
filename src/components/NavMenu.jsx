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
import { useNavigate } from "react-router-dom";

export const NavMenu = ({ data }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IoMenu size={30} color="white" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="w-[40%]">
            <img src="/images/logo2.png" alt="logo" className="w-full" />
          </div>
        </DrawerHeader>
        <DrawerBody>
          <div className="grid gap-4">
            {data.map((ele, i) => {
              return (
                <button
                  key={i}
                  className="font-NRegular cursor-pointer px-2 hover:text-secondary border rounded-xl py-2"
                  onClick={() => navigate(`/category/${ele.id}`)}
                >
                  {ele.name}
                </button>
              );
            })}
          </div>
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
