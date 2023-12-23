import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

function HelpDialog(): React.ReactElement {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="">Help</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-black m-0 text-[17px] font-semibold">
            Path Finding Algorithms
          </Dialog.Title>
          <Dialog.Description className="text-black mt-[10px] mb-5 text-[15px] leading-10">
            Select your algorithm from the top left. <br />
            For A*, select a heuristic. <br />
            Left mouse click adds/removes object from the grid. <br />
            You must select your start and end points.
          </Dialog.Description>

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="bg-pink-200 text-pink-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                OK
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-pink-600 hover:bg-pink-200 focus:shadow-pink-100 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default HelpDialog;
