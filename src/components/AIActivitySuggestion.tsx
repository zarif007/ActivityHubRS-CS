'use client'

import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import { Input } from "./ui/Input";
import { colorSchema } from "@/lib/ColorSchema";
import allActivities, { stringifiedList } from "@/lib/temp_getactivities";

const AIActivitySuggestion = () => {

 const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 mx-2`,
    label: `leading-7 text-sm text-gray-400`,
    button: `${colorSchema.button} mt-8 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
 }
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
        model: "text-davinci-002",
        prompt: generatePrompt(prompt),
        temperature: 0.6,
      });
      setApiResponse(result.data.choices[0].text);
      setPrompt('')
    } catch (e) {
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };
  return (
    <div className={styles.wrapper}>
        
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <label className={styles.label}>
            Let AI decide
        </label>
        <Input
          defaultValue={prompt}
          placeholder="I love/Do"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className={styles.button} disabled={loading || prompt.length === 0} type="submit">
          {loading ? "Generating..." : "Generate"}
        </button>

        {
            (apiResponse !== '' && !loading) && <div className={`w-full max-w-lg my-4 p-2 py-4 text-white ${colorSchema.secondaryBackground} ${colorSchema.border}`}>
                {apiResponse}
            </div>
        }
      </form>
    </div>
  );
};


function generatePrompt(prompt: string) {

    const capitalizedPrompt =
      prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();
    return `Suggest me an activity based on this list ${stringifiedList}.
    
    Domain: I Love to paint
    activity: Painting/ Folk art 
    Domain: I am interested in animation
    activity: Animated Film Making - Beginner Level 
    Domain: ${capitalizedPrompt}
    activity:`;
  }

export default AIActivitySuggestion;
