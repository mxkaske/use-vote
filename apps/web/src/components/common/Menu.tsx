import React from "react";
import XIcon from "src/icons/XIcon";
import SideBar from "./SideBar";

// TODO: THINK: of a possible headlessui alternative
// IDEA: move the x pixel perfect on top of hamburger
// and add negative margins in the dialog

const Menu = ({ open, close }: { open: boolean; close: () => void }) => {
  // router = useRouter()
  // TODO: check first slug (docs, examples,...) and filter allContents by pathname
  if (!open) {
    return null;
  }
  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed right-0 top-0 overflow-y-auto">
        {/* TODO: use `container` as default */}
        <div className="flex min-h-full items-center justify-center container mx-auto p-4">
          {/* The actual dialog panel  */}
          <div className="max-w-sm rounded bg-white mx-auto">
            <div className="mx-2 my-3 text-right">
              <button onClick={close}>
                <XIcon />
              </button>
            </div>
            {/* TODO: include `contents` */}
            <div className="p-2 -mt-3">
              <SideBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
