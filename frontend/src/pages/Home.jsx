import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCloseSharp, IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  // Framework options
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-js", label: "HTML + Tailwind + JS" },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [apiKey, setApiKey] = useState("");

  // Initialize API key from environment variables
  useEffect(() => {
    // In a real app, you should use environment variables or a secure backend
    // This is just for demonstration purposes
    const key = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY || "";
    setApiKey(key);
  }, []);

  // Extract code safely
  function extractCode(response) {
    if (!response) return "";
    const match = response.match(/```(?:html)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  // Generate code
  async function getResponse() {
    if (!prompt.trim()) {
      toast.error("Please describe your component first");
      return;
    }

    if (!apiKey) {
      toast.error("API key is not configured. Please check your environment variables.");
      return;
    }

    try {
      setLoading(true);
      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-pro",
        contents: `
          You are an experienced programmer with expertise in web development and UI/UX design. 
          You create modern, animated, and fully responsive UI components.
          
          Now, generate a UI component for: ${prompt}  
          Framework to use: ${framework.value}  
          
          Requirements:  
          - The code must be clean, well-structured, and easy to understand.  
          - Optimize for SEO where applicable.  
          - Focus on creating a modern, animated, and responsive UI design.  
          - Include high-quality hover effects, shadows, animations, colors, and typography.  
          - Return ONLY the code, formatted properly in Markdown fenced code blocks.  
          - Do NOT include explanations, text, comments, or anything else besides the code.  
          - Provide the whole code in a single HTML file.
        `,
      });

      const generatedCode = extractCode(response.text);
      setCode(generatedCode);
      setOutputScreen(true);
      toast.success("Code generated successfully!");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Something went wrong while generating code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Copy Code
  const copyCode = async () => {
    if (!code.trim()) {
      toast.error("No code to copy");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  // Download Code
  const downloadFile = () => {
    if (!code.trim()) {
      toast.error("No code to download");
      return;
    }

    const fileName = "GenUI-Component.html";
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("File downloaded successfully");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="w-full p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Component Generator
              </h3>
              <p className="text-gray-400 mt-2">
                Describe your component and let AI code it for you.
              </p>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Framework
                </label>
                <Select
                  options={options}
                  value={framework}
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#fff",
                      boxShadow: "none",
                      minHeight: "44px",
                      "&:hover": { borderColor: "#4B5563" },
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#1f2937",
                      color: "#fff",
                      zIndex: 10,
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? "#4B5563"
                        : state.isFocused
                        ? "#374151"
                        : "#1f2937",
                      color: "#fff",
                      "&:active": { backgroundColor: "#4B5563" },
                    }),
                    singleValue: (base) => ({ ...base, color: "#fff" }),
                    placeholder: (base) => ({ ...base, color: "#9CA3AF" }),
                    input: (base) => ({ ...base, color: "#fff" }),
                  }}
                  onChange={(selected) => setFramework(selected)}
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Describe your component
                </label>
                <textarea
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                  className="w-full min-h-[180px] rounded-xl bg-gray-900/50 border border-gray-700 mt-1 p-4 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-colors"
                  placeholder="Describe your component in detail and AI will generate it..."
                />
              </div>

              <div className="flex items-center justify-between mt-6">
                <p className="text-gray-400 text-sm">
                  Click generate to create your component
                </p>
                <button
                  onClick={getResponse}
                  disabled={loading}
                  className="flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 gap-2 transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <ClipLoader color="white" size={18} />
                  ) : (
                    <BsStars className="text-lg" />
                  )}
                  Generate
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="relative w-full h-[80vh] bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700">
              {!outputScreen ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="p-5 w-16 h-16 flex items-center justify-center text-2xl rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                    <HiOutlineCode />
                  </div>
                  <h4 className="text-lg font-medium text-gray-200 mb-2">
                    Your Component Awaits
                  </h4>
                  <p className="text-gray-400">
                    Describe a component and generate the code to see it here.
                  </p>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="bg-gray-900 w-full h-12 flex items-center gap-2 px-2">
                    <button
                      onClick={() => setTab(1)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                        tab === 1
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Code
                    </button>
                    <button
                      onClick={() => setTab(2)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                        tab === 2
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Preview
                    </button>
                  </div>

                  {/* Toolbar */}
                  <div className="bg-gray-900 w-full h-12 flex items-center justify-between px-4 border-b border-gray-700">
                    <p className="font-medium text-gray-200 text-sm">
                      {tab === 1 ? "Code Editor" : "Component Preview"}
                    </p>
                    <div className="flex items-center gap-2">
                      {tab === 1 ? (
                        <>
                          <button
                            onClick={copyCode}
                            className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                            title="Copy code"
                          >
                            <IoCopy size={16} />
                          </button>
                          <button
                            onClick={downloadFile}
                            className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                            title="Download code"
                          >
                            <PiExportBold size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setIsNewTabOpen(true)}
                            className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                            title="Open in new tab"
                          >
                            <ImNewTab size={14} />
                          </button>
                          <button
                            onClick={() => setRefreshKey((prev) => prev + 1)}
                            className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                            title="Refresh preview"
                          >
                            <FiRefreshCcw size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Editor / Preview */}
                  <div className="h-[calc(100%-6rem)]">
                    {tab === 1 ? (
                      <Editor
                        value={code}
                        height="100%"
                        theme="vs-dark"
                        language="html"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          lineNumbers: "on",
                          scrollbar: {
                            vertical: "auto",
                            horizontal: "auto",
                          },
                        }}
                      />
                    ) : (
                      <iframe
                        key={refreshKey}
                        srcDoc={code}
                        className="w-full h-full bg-white"
                        title="Component preview"
                        sandbox="allow-same-origin"
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Preview Overlay */}
      {isNewTabOpen && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
          <div className="w-full h-14 flex items-center justify-between px-5 bg-gray-800 border-b border-gray-700">
            <p className="font-bold text-white">Preview</p>
            <button
              onClick={() => setIsNewTabOpen(false)}
              className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
              title="Close preview"
            >
              <IoCloseSharp size={20} />
            </button>
          </div>
          <iframe
            srcDoc={code}
            className="flex-1 w-full h-full bg-white"
            title="Fullscreen component preview"
            sandbox="allow-same-origin"
          />
        </div>
      )}
    </>
  );
};

export default Home;