"use client";
import { addResponses } from "@/Redux/messageSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowUpward } from "react-icons/md";
import { useRouter } from "next/navigation";
import { isUserLoggedIn } from "@/Redux/authslice";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.token);
  const responses = useSelector((state) => state.responses.messages);
  const dispatch = useDispatch();
  const route = useRouter();
  useEffect(() => {
    const userLoggedInToken = localStorage.getItem("token") ? true : false;
    dispatch(isUserLoggedIn(userLoggedInToken));
  }, []);
  const userResponse = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      route.push("/login");
    }
    try {
      const apiKey = `${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`;
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "gpt-3.5-turbo-instruct",
          prompt: userInput,
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      dispatch(
        addResponses({
          key: Math.floor(Math.random() * Date.now()),
          userPrompt: userInput,
          response: response.data.choices[0].text.trim(),
        })
      );
      setUserInput("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <h1 className="text-center font-bold text-xl my-5">GRROW.AI</h1>
      {responses &&
        isLoggedIn &&
        responses.map((chat) => (
          <div key={chat.key} className="m-5">
            <span className="font-bold">{chat.userPrompt}</span> :{" "}
            {chat.response}
          </div>
        ))}
      <div className="w-screen fixed bottom-0 p-4 bg-slate-100 shadow-2xl">
        <form
          className="flex justify-center items-center rounded-lg border border-black md:mx-40"
          onSubmit={userResponse}
        >
          <input
            type="text"
            placeholder="Message GRROW GPT..."
            className="p-2 outline-none w-full rounded-lg"
            required
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="p-2 bg-gray-400 rounded-lg mx-2">
            <MdArrowUpward />
          </button>
        </form>
      </div>
    </>
  );
};
export default Home;
