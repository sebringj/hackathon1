/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export const Head = () => (
  <head>
      <title>My title</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet" />
  </head>
);


export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <iframe src='https://my.spline.design/untitled-248c8901098b19a62ce3304de7cb96e1/' frameBorder='0' id="articulate-logo"></iframe>
      <div id="content">
        <div class="heading">
          Enter or paste the material you want to test on.
        </div>
        <textarea id="entry"></textarea>
        <button>Generate Test</button>
      </div>
    </div>
  );
}
