import React from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import { useState } from "react";
import Editor from "@monaco-editor/react";

const options = [
  { value: "html-css", label: "HTML + CSS" },
  { value: "html-tailwind", label: "HTML + Tailwind CSS" },
  { value: "html-bootstrap", label: "HTML + Bootstrap" },
  { value: "html-css-js", label: "HTML + CSS + JS" },
  { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  { value: "React-Component", label: "HTML + React" },
];

// (moved useState inside Home component)

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#1e1e1e",
    borderColor: "#333",
    color: "#fff",
    boxShadow: "none",
    padding: "2px 6px",
    "&:hover": {
      borderColor: "#555",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    marginTop: "5px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#3a3a3a"
      : state.isFocused
      ? "#333"
      : "#2a2a2a",
    color: "#fff",
    cursor: "pointer",
    padding: "10px 12px",
    borderRadius: "6px",
    "&:active": {
      backgroundColor: "#444",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#888",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#bbb",
    "&:hover": { color: "#fff" },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const darkTheme = (theme) => ({
  ...theme,
  borderRadius: 10,
  colors: {
    ...theme.colors,
    primary25: "#333",
    primary: "#555",
  },
});

const Home = () => {
  const [outputScreen, setoutputScreen] = useState(true);

  return (
    <>
      <Navbar />
      <div className="flex items-center px-[100px]  gap-[40px] justify-between">
        <div className="left w-[50%] h-auto py-[30px] mt-5 p-[20px] bg-[#141319]">
          <h3 className="text-[25px] font-bold sp-text">
            Ai components Generator
          </h3>
          <p className="text-gray-500 font-semibold mt-2 text-[16px]">
            Describe your component and Let AI will make it...
          </p>

          <p className="text-[15px] font-bold mt-4">FrameWork</p>
          <Select
            className="mt-2"
            options={options}
            styles={customStyles}
            theme={darkTheme}
            placeholder="Select an option..."
          />
          <p className="text-gray-300 font-semibold mt-2 text-[16px]">
            Describe your component
            <textarea
              className="w-full min-h-[250px] text-white  bg-[#09090b] mt-2 rounded-2xl"
              placeholder="Describe your component and Relax Ai will code..."
            ></textarea>
            <div className="flex items-center justify-between">
              <p>Click on generate button</p>
              <button className="generate flex items-center p-[15px] rounded-lg border-0 cursor-pointer bg-gradient-to-r from-purple-600 via-rose-400 to-pink-500 mt-4  min-h-[35px] text-center">
                Generate{" "}
                <i>
                  <BsStars />
                </i>
              </button>
            </div>
          </p>
        </div>

        {outputScreen === false ? (
          <>
            <div className="right w-[50%] h-[80vh] mt-5 bg-[#141319] rounded-2xl">
              <div className="skeleton w-full h-full flex items-center justify-center flex-col">
                <div className="circle flex items-center justify-center text-[30px] p-[20px] w-[80px] h-[80px] rounded-[50%] bg-gradient-to-r from-purple-600 via-rose-400 to-pink-500 ">
                  <FaCode />
                </div>
                <p className="text-[16px] text-gray-400 mt-2">
                  Your component code & code will be here
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="top w-full h-[60px] flex items-center text-black font-bold gap-[15px] px-[20px]">
              <button className="btn w-[50%] p-[10px]  bg-purple-400 rounded-xl cursor-pointer transition-all">Code</button>
              <button className="btn w-[50%] p-[10px] bg-purple-400 rounded-xl cursor-pointer transition-all">Preview</button>
            </div>
            <div className="editor">
              <Editor
                height="70vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue="// some comment"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
