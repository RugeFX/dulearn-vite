import React, { useState } from "react";

const SelectInput = ({ name, options }) => {
  const [selected, setSelected] = useState("");
  return (
    <select
      className="w-24 px-3 py-3 bg-[#464A83] rounded-lg text-yellow-primary font-bold outline-none focus:shadow-input cursor-pointer transition-shadow"
      name={name}
      onChange={(e) => setSelected(e.target.value)}
      value={selected}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
