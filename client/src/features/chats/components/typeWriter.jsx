import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
export default function Typewriter({ text, speed = 8 }) {
    const [displayed, setDisplayed] = useState("");
    const indexRef = useRef(0);
    const intervalRef = useRef(null);
  
    useEffect(() => {
      if (!text) return;
    
      indexRef.current = 0;
      setDisplayed("");
    
      clearInterval(intervalRef.current);
    
      intervalRef.current = setInterval(() => {
        indexRef.current++;
    
        setDisplayed(text.slice(0, indexRef.current));
    
        if (indexRef.current >= text.length) {
          clearInterval(intervalRef.current);
        }
      }, speed);
    
      return () => clearInterval(intervalRef.current);
    }, [text, speed]); // ✅ include speed
  
    return (
      <ReactMarkdown>
        {displayed + (displayed.length < text.length ? " |" : " ")}
      </ReactMarkdown>
    );
  }