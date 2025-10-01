import { useState } from "react";

import RemoveObjectForm from "../components/RemoveObjectForm";
import RemoveObjectOutput from "../components/RemoveObjectOutput";

export default function BlogTitles() {
  const [selected, setSelected] = useState();
  return (
    <div className="flex flex-col md:flex-row w-[90%] min-h-screen gap-5 m-5 ">
      <RemoveObjectForm selected={selected} setSelected={setSelected} />
      <RemoveObjectOutput />
    </div>
  );
}
