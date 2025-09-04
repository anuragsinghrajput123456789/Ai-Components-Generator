import React from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";

const options = [
  { value: "html-css", label: "HTML + CSS" },
  { value: "html-tailwind", label: "HTML + Tailwind CSS" },
  { value: "html-bootstrap", label: "HTML + Bootstrap" },
  { value: "html-css-js", label: "HTML + CSS + JS" },
  { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  { value: "React-Component", label: "HTML + React" },
];

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
  return (
    <>
      <Navbar />
      <div className="flex items-center px-[100px]  gap-[40px] justify-between">
        <div className="left w-[50%] h-[80vh] mt-5 p-[20px] bg-[#141319]">
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
            <button className="flex items-center  p-[15px] rounded-lg border-0 cursor-pointer bg-gradient-to-r from-purple-600 via-rose-400 to-pink-500 mt-3 ml-auto min-w-[120px] text-center">
              Generate
            </button>
          </p>
        </div>
        <div className="right w-[50%] h-[80vh] mt-5 bg-[#141319]"></div>
      </div>
    </>
  );
};

export default Home;
