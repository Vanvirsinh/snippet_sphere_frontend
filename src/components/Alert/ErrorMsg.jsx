import React from "react";

function ErrorMsg({ errors, path }) {
  return (
    <>
      <div>
        {errors &&
          errors.map((error, index) => {
            if (error.path === path) {
              return (
                <p key={index} className="text-sm text-red-400">
                  {error.msg}
                </p>
              );
            }
            return null;
          })}
      </div>
    </>
  );
}

export default ErrorMsg;
