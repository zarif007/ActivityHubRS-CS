"use client";

import { Configuration, OpenAIApi } from "openai";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Input } from "./ui/Input";
import { colorSchema } from "@/lib/ColorSchema";
import { stringifiedList } from "@/lib/temp_getactivities";

const AIActivitySuggestionModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const styles = {
    wrapper: `flex space-y-4 w-full max-w-xl rounded flex-col items-center justify-center py-12 mx-2 border-2 border-gray-700`,
    label: `leading-7 text-sm text-gray-400`,
    button: `${colorSchema.button} cursor-pointer mt-8 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
  };
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(prompt),
        temperature: 0.6,
      });
      setApiResponse(result.data.choices[0].text);
      setPrompt("");
    } catch (e) {
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={styles.wrapper}>
                  <div className="w-full">
                    <form
                      onSubmit={handleSubmit}
                      className="w-full flex items-center flex-col px-2"
                    >
                      <label className={styles.label}>Let AI decide</label>
                      <Input
                        defaultValue={prompt}
                        placeholder="I love/Do"
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                      <button
                        className={styles.button}
                        disabled={loading || prompt.length === 0}
                        type="submit"
                      >
                        {loading ? "Finding..." : "Find"}
                      </button>

                      {apiResponse !== "" && !loading && (
                        <div
                          className={`w-full max-w-lg my-4 p-2 py-4 text-white ${colorSchema.secondaryBackground} ${colorSchema.border}`}
                        >
                          {apiResponse}
                        </div>
                      )}
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

function generatePrompt(prompt: string) {
  const capitalizedPrompt =
    prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();
  return `Suggest me an activity from this list ${stringifiedList}.
    
    Domain: I Love to paint
    activity: Painting/ Folk art 
    Domain: I am interested in animation
    activity: Animated Film Making - Beginner Level 
    Domain: ${capitalizedPrompt}
    activity:`;
}

export default AIActivitySuggestionModal;
