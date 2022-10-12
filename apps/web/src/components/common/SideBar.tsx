import { Content } from "contentlayer/generated";
import React from "react";
import Thumbs from "../widgets/Thumbs";
import DirContent from "./DirContent";

const SideBar = ({ contents }: { contents?: Content[] }) => {
  return (
    <>
      <DirContent contents={contents} />
      <Thumbs />
    </>
  );
};

export default SideBar;
