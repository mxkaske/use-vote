import * as React from "react";

const EmptyState = () => {
  return (
    <div>
      <p>Empty State.</p>
      <p>
        Start collecting data by following{" "}
        <a
          href="use-fdbk.vercel.app"
          target="_blank"
          rel="noopener"
          className="underline decoration-gray-300 hover:decoration-gray-400"
        >
          <code>use-fdbk</code> documentation
        </a>
        .
      </p>
    </div>
  );
};

export default EmptyState;
