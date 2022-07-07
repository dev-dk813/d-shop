import React from "react";
import TypeWriter from "typewriter-effect";

const TypeWriterText = ({ text }) => {
  return (
    <TypeWriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default TypeWriterText;
