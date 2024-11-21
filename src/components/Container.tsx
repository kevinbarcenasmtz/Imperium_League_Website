import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container(props: Readonly<ContainerProps>) {
  return (
    <div
    className={`container p-6 md:p-12 lg:p-16 mx-auto ${
      props.className ? props.className : ""
    }`}>      {props.children}
    </div>
  );
}

