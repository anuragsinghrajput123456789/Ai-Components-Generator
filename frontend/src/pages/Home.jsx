import React, { useState } from 'react';
import Select from 'react-select';
import { BsStars } from 'react-icons/bs';
import { HiOutlineCode } from 'react-icons/hi';
import Editor from '@monaco-editor/react';
import { IoCloseSharp, IoCopy } from 'react-icons/io5';
import { PiExportBold } from 'react-icons/pi';
import { ImNewTab } from 'react-icons/im';
import { FiRefreshCcw } from 'react-icons/fi';
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Home = () => {
  const options = [
    { value: 'html-css', label: 'HTML + CSS (basic styling)' },
    { value: 'html-tailwind', label: 'HTML + Tailwind CSS (custom, modern UI)' },
    { value: 'html-bootstrap', label: 'HTML + Bootstrap (responsive, ready UI)' },
    { value: 'html-foundation', label: 'HTML + Foundation (accessible, enterprise)' },
    { value: 'html-bulma', label: 'HTML + Bulma (flexbox, modern look)' },
    { value: 'html-uikit', label: 'HTML + UIkit (lightweight, modular)' },
    { value: 'html-materialize', label: 'HTML + Materialize (Google Material Design)' },
    { value: 'html-metro4', label: 'HTML + Metro 4 UI (fast, clean UI)' },
    { value: 'html-shoelace', label: 'HTML + Shoelace (web components)' },
    { value: 'html-blazecss', label: 'HTML + Blaze CSS (simple, lightweight)' },
    { value: 'html-spectre', label: 'HTML + Spectre.css (minimal, responsive)' },
    { value: 'html-milligram', label: 'HTML + Milligram (ultra-light)' },
    { value: 'html-picnic', label: 'HTML + Picnic CSS (tiny, quick setup)' },
    { value: 'html-skeleton', label: 'HTML + Skeleton (boilerplate, minimal)' },
    { value: 'html-base', label: 'HTML + Base CSS (simple, extensible)' },
    { value: 'html-pure', label: 'HTML + Pure.css (lightweight, modular)' },
    { value: 'html-css-js', label: 'HTML + CSS + JS (custom dev)' },
    { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap (mixed utility + UI)' }
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAjvpjcJ7JsCFdU_9f0hyFHmB-47F4JmXc"
  });

  async function getResponse() {
    if (!prompt.trim()) return toast.error("Please describe your component first");

    try {
      setLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
     You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${frameWork.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single HTML file.
      `,
      });

      setCode(extractCode(response.text));
      setOutputScreen(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while generating code");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    if (!code.trim()) return toast.error("No code to copy");
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy");
    }
  };

  const downnloadFile = () => {
    if (!code.trim()) return toast.error("No code to download");

    const fileName = "GenUI-Code.html";
    const blob = new Blob([code], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  return (
    <>
      <Navbar />

      {/* Main Container with fixed height to prevent overflow */}
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen flex flex-col overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-15 animate-pulse delay-1500"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-3">
            AI-Powered UI Generator
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-6">
            Transform your ideas into beautiful, responsive code with our AI assistant
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-sm text-gray-400 mt-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-1">
                <span className="text-lg font-bold text-blue-400">25+</span>
              </div>
              <span>Frameworks</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-1">
                <BsStars className="text-lg text-purple-400" />
              </div>
              <span>AI Powered</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-1">
                <HiOutlineCode className="text-lg text-pink-400" />
              </div>
              <span>Clean Code</span>
            </div>
          </div>
        </div>

        {/* Main Content - Fixed height container */}
        <div className="relative z-10 flex-1 pb-8 px-4 lg:px-6 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Input Panel - Fixed height */}
            <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 shadow-2xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <BsStars className="text-xl text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Component Generator</h3>
                  <p className="text-gray-400 text-sm">Describe your vision, we'll build the code</p>
                </div>
              </div>

              <div className="space-y-5 flex-1 flex flex-col">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Framework</label>
                  <Select
                    options={options}
                    value={frameWork}
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "rgba(26, 26, 46, 0.7)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                        boxShadow: "none",
                        borderRadius: "12px",
                        minHeight: "48px",
                        "&:hover": { borderColor: "rgba(255, 255, 255, 0.2)" }
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "rgba(26, 26, 46, 0.95)",
                        backdropFilter: "blur(10px)",
                        color: "#fff",
                        borderRadius: "12px",
                        overflow: "hidden"
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? "rgba(128, 90, 213, 0.5)"
                          : state.isFocused
                            ? "rgba(255, 255, 255, 0.1)"
                            : "transparent",
                        color: "#fff",
                        "&:active": { backgroundColor: "rgba(128, 90, 213, 0.3)" }
                      }),
                      singleValue: (base) => ({ ...base, color: "#fff", fontWeight: "500" }),
                      placeholder: (base) => ({ ...base, color: "#aaa" }),
                      input: (base) => ({ ...base, color: "#fff" })
                    }}
                    onChange={(selected) => setFrameWork(selected)}
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Describe your component</label>
                  <div className="relative flex-1">
                    <textarea
                      onChange={(e) => setPrompt(e.target.value)}
                      value={prompt}
                      className="w-full h-full p-4 bg-slate-700/50 text-white rounded-xl border border-slate-600/50 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none resize-none backdrop-blur-sm"
                      placeholder="Example: Create a modern login form with social media buttons, dark theme, and smooth animations..."
                    ></textarea>
                    <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                      {prompt.length}/500
                    </div>
                  </div>
                </div>

                <button
                  onClick={getResponse}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <ClipLoader color="white" size={20} />
                  ) : (
                    <>
                      <BsStars className="text-lg group-hover:scale-110 transition-transform" />
                      Generate Component
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Panel - Fixed height */}
            <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full">
              {!outputScreen ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <div className="relative mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center text-2xl text-purple-400/80">
                      <HiOutlineCode />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-500 animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-blue-500 animate-pulse delay-1000"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Your Component Awaits</h3>
                  <p className="text-gray-400 text-sm max-w-xs">
                    Describe your component and generate beautiful code that will appear here.
                  </p>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="bg-slate-700/50 backdrop-blur-sm flex border-b border-slate-600/50">
                    <button
                      onClick={() => setTab(1)}
                      className={`flex-1 py-3 px-4 transition-all flex items-center justify-center gap-2 text-sm ${tab === 1
                          ? "bg-slate-800/70 text-white shadow-inner"
                          : "text-gray-400 hover:text-white hover:bg-slate-700/30"
                        }`}
                    >
                      <HiOutlineCode className="text-lg" />
                      Code
                    </button>
                    <button
                      onClick={() => setTab(2)}
                      className={`flex-1 py-3 px-4 transition-all flex items-center justify-center gap-2 text-sm ${tab === 2
                          ? "bg-slate-800/70 text-white shadow-inner"
                          : "text-gray-400 hover:text-white hover:bg-slate-700/30"
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview
                    </button>
                  </div>

                  {/* Toolbar */}
                  <div className="bg-slate-700/30 px-4 py-2 flex items-center justify-between border-b border-slate-600/30">
                    <p className="text-gray-300 font-medium text-xs">Code Editor</p>
                    <div className="flex items-center gap-2">
                      {tab === 1 ? (
                        <>
                          <button
                            onClick={copyCode}
                            className="w-8 h-8 rounded-xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-gray-300 hover:bg-purple-500/20 hover:text-white hover:border-purple-500/30 transition-all"
                            title="Copy code"
                          >
                            <IoCopy className="text-base" />
                          </button>
                          <button
                            onClick={downnloadFile}
                            className="w-8 h-8 rounded-xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-gray-300 hover:bg-purple-500/20 hover:text-white hover:border-purple-500/30 transition-all"
                            title="Export code"
                          >
                            <PiExportBold className="text-base" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setIsNewTabOpen(true)}
                            className="w-8 h-8 rounded-xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-gray-300 hover:bg-purple-500/20 hover:text-white hover:border-purple-500/30 transition-all"
                            title="Open in new tab"
                          >
                            <ImNewTab className="text-base" />
                          </button>
                          <button
                            onClick={() => setRefreshKey(prev => prev + 1)}
                            className="w-8 h-8 rounded-xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-gray-300 hover:bg-purple-500/20 hover:text-white hover:border-purple-500/30 transition-all"
                            title="Refresh preview"
                          >
                            <FiRefreshCcw className="text-base" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Editor / Preview - Fixed height */}
                  <div className="flex-1 min-h-0">
                    {tab === 1 ? (
                      <Editor
                        value={code}
                        height="100%"
                        theme="vs-dark"
                        language="html"
                        options={{
                          fontSize: 13,
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          lineNumbers: "on",
                          glyphMargin: false,
                          folding: true,
                          lineDecorationsWidth: 10,
                          wordWrap: "on"
                        }}
                      />
                    ) : (
                      <iframe
                        key={refreshKey}
                        srcDoc={code}
                        className="w-full h-full bg-white"
                        title="Component preview"
                        sandbox="allow-same-origin allow-scripts"
                      ></iframe>
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
          <div className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white border-b border-gray-700">
            <h2 className="font-bold text-lg">Preview</h2>
            <button
              onClick={() => setIsNewTabOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Close preview"
            >
              <IoCloseSharp className="text-xl" />
            </button>
          </div>
          <iframe
            srcDoc={code}
            className="flex-1 w-full h-full"
            title="Fullscreen preview"
            sandbox="allow-same-origin allow-scripts"
          ></iframe>
        </div>
      )}

      <Footer isDark={true} />
    </>
  );
};

export default Home;